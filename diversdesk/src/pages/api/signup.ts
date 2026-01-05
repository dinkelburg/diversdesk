import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();

  // Get redirect URLs from form
  const successUrl = formData.get("redirect") as string || "/signup2-trial/success";
  const errorUrl = formData.get("redirect_error") as string || "/signup2-trial/error";

  // 1. Honeypot check - if filled, it's likely a bot
  const honeypot = formData.get("website");
  if (honeypot) {
    console.error("Bot prevention: honeypot field was filled");
    return redirect(errorUrl, 302);
  }

  // 2. Time validation - form submitted in less than 3 seconds is likely a bot
  const startTime = formData.get("start") as string;
  if (startTime) {
    const formStartDate = new Date(startTime);
    const now = new Date();
    if (now.getTime() - formStartDate.getTime() < 3000) {
      console.error("Bot prevention: form submitted too quickly (< 3 seconds)");
      return redirect(errorUrl, 302);
    }
  }

  // 3. reCAPTCHA v3 verification
  const captchaToken = formData.get("captcha_token") as string;
  const secretKey = import.meta.env.GOOGLE_RECAPTCHA_SECRET_KEY;

  if (captchaToken && secretKey) {
    try {
      const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: captchaToken,
        }).toString(),
      });

      const body = await response.json();

      if (typeof body.score === "number") {
        console.log("reCAPTCHA score:", body.score);
        // Score ranges from 0.0 to 1.0, where 1.0 is very likely a human
        // Typically, scores below 0.5 are considered suspicious
        if (body.score < 0.3) {
          console.error("Bot prevention: reCAPTCHA score too low:", body.score);
          return redirect(errorUrl, 302);
        }
      } else {
        console.error("Invalid reCAPTCHA response:", body);
      }
    } catch (error) {
      console.error("reCAPTCHA verification failed:", error);
      // Continue anyway - don't block users if reCAPTCHA fails
    }
  }

  // All validations passed - forward form data to Make webhook
  const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/ar41zuw1ke0a2m5fwk7pnrxo67284s1q";

  // Convert form data to JSON object (excluding internal fields)
  const formDataObj: Record<string, string> = {};
  const excludeFields = ["website", "start", "redirect", "redirect_error", "captcha_token", "remember-me"];

  formData.forEach((value, key) => {
    if (!excludeFields.includes(key) && typeof value === "string") {
      formDataObj[key] = value;
    }
  });

  try {
    const webhookResponse = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObj),
    });

    if (!webhookResponse.ok) {
      console.error("Make webhook error:", webhookResponse.status, await webhookResponse.text());
      return redirect(errorUrl, 302);
    }

    console.log("Form submission sent to Make webhook successfully");
  } catch (error) {
    console.error("Failed to send to Make webhook:", error);
    return redirect(errorUrl, 302);
  }

  return redirect(successUrl, 302);
};
