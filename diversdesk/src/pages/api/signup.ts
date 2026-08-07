import type { APIRoute } from "astro";
import { getSecret } from "astro:env/server";
import {
  getRecaptchaAction,
  shouldBypassRecaptcha,
  verifyRecaptchaEnterprise,
} from "@/lib/recaptcha-enterprise";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();

  // 1. Setup Redirects and URLs
  const successUrl =
    (formData.get("redirect") as string) || "/signup2-trial/success";
  const errorUrl =
    (formData.get("redirect_error") as string) || "/signup2-trial/error";
  const formType = formData.get("type") as string | null;

  const MAKE_WEBHOOK_URL =
    "https://hook.eu1.make.com/ar41zuw1ke0a2m5fwk7pnrxo67284s1q";
  const SECOND_WEBHOOK_URL =
    "https://hook.eu1.make.com/9xvwjor89g3e9r1q5kptvpf1tomh5hbw";
  const LIVEABOARD_WAITLIST_WEBHOOK_URL =
    "https://hook.eu1.make.com/hflhcblecswkbatlllnut3iam12mta7v";

  // 2. Bot Prevention: Honeypot & Timing
  const honeypot = formData.get("website");
  const startTime = formData.get("start") as string;
  const now = new Date();

  if (
    honeypot ||
    (startTime && now.getTime() - new Date(startTime).getTime() < 3000)
  ) {
    console.error("Bot prevention: Honeypot or Timing triggered");
    return redirect(errorUrl, 302);
  }

  // 3. Bot Prevention: native reCAPTCHA Enterprise assessment (fail closed)
  const requestHostname = new URL(request.url).hostname;
  const bypassRecaptcha = shouldBypassRecaptcha(
    import.meta.env.DEV,
    requestHostname,
  );

  if (!bypassRecaptcha) {
    const captchaToken = formData.get("captcha_token");
    const captchaResult = await verifyRecaptchaEnterprise({
      token: typeof captchaToken === "string" ? captchaToken : null,
      projectId: getSecret("GOOGLE_RECAPTCHA_PROJECT_ID"),
      apiKey: getSecret("GOOGLE_RECAPTCHA_API_KEY"),
      expectedAction: getRecaptchaAction(formType),
      expectedHostname: requestHostname,
      userAgent: request.headers.get("user-agent"),
    });

    if (!captchaResult.ok) {
      console.error(
        "Bot prevention: reCAPTCHA Enterprise rejected submission",
        {
          reason: captchaResult.reason,
          status: captchaResult.status,
        },
      );
      return redirect(errorUrl, 302);
    }
  }

  // 4. Data Preparation
  const formDataObj: Record<string, string> = {};
  const excludeFields = [
    "website",
    "start",
    "redirect",
    "redirect_error",
    "captcha_token",
    "remember-me",
  ];

  formData.forEach((value, key) => {
    if (!excludeFields.includes(key) && typeof value === "string") {
      formDataObj[key] = value;
    }
  });

  const webhookTargets =
    formType === "liveaboard_waitlist"
      ? [LIVEABOARD_WAITLIST_WEBHOOK_URL]
      : [MAKE_WEBHOOK_URL, SECOND_WEBHOOK_URL];

  // 5. Execute Webhooks in Parallel
  try {
    const results = await Promise.allSettled(
      webhookTargets.map((webhookUrl) =>
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formDataObj),
        }),
      ),
    );

    // Check the Primary Webhook
    const makeResult = results[0];
    if (makeResult.status === "rejected" || !makeResult.value.ok) {
      console.error("Primary Webhook (Make) failed");
      return redirect(errorUrl, 302);
    }

    // Check the Secondary Webhook (Optional)
    const secondResult = results[1];
    if (
      secondResult &&
      (secondResult.status === "rejected" || !secondResult.value.ok)
    ) {
      console.warn("Secondary Webhook failed, but proceeding to success page.");
    }
  } catch (error) {
    console.error("Critical error in webhook processing:", error);
    return redirect(errorUrl, 302);
  }

  return redirect(successUrl, 302);
};
