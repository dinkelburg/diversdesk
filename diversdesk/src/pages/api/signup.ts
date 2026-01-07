import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();

  // 1. Setup Redirects and URLs
  const successUrl = formData.get("redirect") as string || "/signup2-trial/success";
  const errorUrl = formData.get("redirect_error") as string || "/signup2-trial/error";
  
  const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/ar41zuw1ke0a2m5fwk7pnrxo67284s1q";
  const SECOND_WEBHOOK_URL = "https://hook.eu1.make.com/9xvwjor89g3e9r1q5kptvpf1tomh5hbw"; 

  // 2. Bot Prevention: Honeypot & Timing
  const honeypot = formData.get("website");
  const startTime = formData.get("start") as string;
  const now = new Date();

  if (honeypot || (startTime && now.getTime() - new Date(startTime).getTime() < 3000)) {
    console.error("Bot prevention: Honeypot or Timing triggered");
    return redirect(errorUrl, 302);
  }

  // 3. Bot Prevention: reCAPTCHA v3 (Fail-Open)
  const captchaToken = formData.get("captcha_token") as string;
  const secretKey = import.meta.env.GOOGLE_RECAPTCHA_SECRET_KEY;

  if (captchaToken && secretKey) {
    try {
      const captchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: secretKey,
          response: captchaToken,
        }).toString(),
      });

      const captchaBody = await captchaResponse.json();

      // Only block if we have a definitive low score
      if (captchaBody.success && typeof captchaBody.score === "number" && captchaBody.score < 0.3) {
        console.error("Bot prevention: reCAPTCHA score too low:", captchaBody.score);
        return redirect(errorUrl, 302);
      }
    } catch (error) {
      // If Google is down, we log it but continue so we don't lose the trial user
      console.warn("reCAPTCHA verification failed/timed out, proceeding anyway.");
    }
  }

  // 4. Data Preparation
  const formDataObj: Record<string, string> = {};
  const excludeFields = ["website", "start", "redirect", "redirect_error", "captcha_token", "remember-me"];

  formData.forEach((value, key) => {
    if (!excludeFields.includes(key) && typeof value === "string") {
      formDataObj[key] = value;
    }
  });

  // 5. Execute Webhooks in Parallel
  try {
    const results = await Promise.allSettled([
      fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataObj),
      }),
      fetch(SECOND_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataObj),
      }),
    ]);

    // Check the Primary Webhook (Make)
    const makeResult = results[0];
    if (makeResult.status === "rejected" || !makeResult.value.ok) {
      console.error("Primary Webhook (Make) failed");
      return redirect(errorUrl, 302);
    }

    // Check the Secondary Webhook (Optional)
    const secondResult = results[1];
    if (secondResult.status === "rejected" || !secondResult.value.ok) {
      console.warn("Secondary Webhook failed, but proceeding to success page.");
    }

  } catch (error) {
    console.error("Critical error in webhook processing:", error);
    return redirect(errorUrl, 302);
  }

  return redirect(successUrl, 302);
};