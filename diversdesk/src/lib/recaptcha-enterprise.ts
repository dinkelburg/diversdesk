export const RECAPTCHA_ENTERPRISE_SITE_KEY =
  "6Lcc7ZkqAAAAADf9KNtDxhLKVTLM6a-w3EqzPBmW";
export const RECAPTCHA_MINIMUM_SCORE = 0.3;

export const RECAPTCHA_ACTIONS = {
  signup: "signup",
  liveaboardWaitlist: "liveaboard_waitlist",
} as const;

const LOOPBACK_HOSTNAMES = new Set([
  "localhost",
  "127.0.0.1",
  "::1",
  "[::1]",
]);

type RecaptchaFailureReason =
  | "missing-token"
  | "missing-configuration"
  | "assessment-request-failed"
  | "assessment-response-invalid"
  | "invalid-token"
  | "action-mismatch"
  | "hostname-mismatch"
  | "missing-score"
  | "score-too-low";

export type RecaptchaVerificationResult =
  | {
      ok: true;
      score: number;
    }
  | {
      ok: false;
      reason: RecaptchaFailureReason;
      status?: number;
    };

interface RecaptchaAssessment {
  tokenProperties?: {
    valid?: boolean;
    action?: string;
    hostname?: string;
  };
  riskAnalysis?: {
    score?: number;
  };
}

interface VerifyRecaptchaOptions {
  token: string | null | undefined;
  projectId: string | null | undefined;
  apiKey: string | null | undefined;
  expectedAction: string;
  expectedHostname: string;
  userAgent?: string | null;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

export function getRecaptchaAction(
  formType: FormDataEntryValue | null,
): string {
  return formType === "liveaboard_waitlist"
    ? RECAPTCHA_ACTIONS.liveaboardWaitlist
    : RECAPTCHA_ACTIONS.signup;
}

export function shouldBypassRecaptcha(
  isDevelopment: boolean,
  hostname: string,
): boolean {
  return isDevelopment && LOOPBACK_HOSTNAMES.has(normaliseHostname(hostname));
}

export async function verifyRecaptchaEnterprise({
  token,
  projectId,
  apiKey,
  expectedAction,
  expectedHostname,
  userAgent,
  fetchImpl = fetch,
  timeoutMs = 5_000,
}: VerifyRecaptchaOptions): Promise<RecaptchaVerificationResult> {
  if (!token?.trim()) {
    return { ok: false, reason: "missing-token" };
  }

  if (!projectId?.trim() || !apiKey?.trim()) {
    return { ok: false, reason: "missing-configuration" };
  }

  const event: Record<string, string> = {
    token,
    siteKey: RECAPTCHA_ENTERPRISE_SITE_KEY,
    expectedAction,
  };

  if (userAgent?.trim()) {
    event.userAgent = userAgent;
  }

  let response: Response;

  try {
    response = await fetchImpl(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/assessments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({ event }),
        signal: AbortSignal.timeout(timeoutMs),
      },
    );
  } catch {
    return { ok: false, reason: "assessment-request-failed" };
  }

  if (!response.ok) {
    return {
      ok: false,
      reason: "assessment-request-failed",
      status: response.status,
    };
  }

  let assessment: RecaptchaAssessment;

  try {
    assessment = (await response.json()) as RecaptchaAssessment;
  } catch {
    return { ok: false, reason: "assessment-response-invalid" };
  }

  if (assessment.tokenProperties?.valid !== true) {
    return { ok: false, reason: "invalid-token" };
  }

  if (assessment.tokenProperties.action !== expectedAction) {
    return { ok: false, reason: "action-mismatch" };
  }

  if (
    normaliseHostname(assessment.tokenProperties.hostname) !==
    normaliseHostname(expectedHostname)
  ) {
    return { ok: false, reason: "hostname-mismatch" };
  }

  const score = assessment.riskAnalysis?.score;

  if (typeof score !== "number" || !Number.isFinite(score)) {
    return { ok: false, reason: "missing-score" };
  }

  if (score < RECAPTCHA_MINIMUM_SCORE) {
    return { ok: false, reason: "score-too-low" };
  }

  return { ok: true, score };
}

function normaliseHostname(hostname: string | undefined): string {
  return hostname?.trim().toLowerCase().replace(/\.$/, "") ?? "";
}
