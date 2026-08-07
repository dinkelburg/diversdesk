import assert from "node:assert/strict";
import test from "node:test";

import {
  RECAPTCHA_ACTIONS,
  RECAPTCHA_ENTERPRISE_SITE_KEY,
  getRecaptchaAction,
  shouldBypassRecaptcha,
  verifyRecaptchaEnterprise,
} from "../src/lib/recaptcha-enterprise";

const validAssessment = {
  tokenProperties: {
    valid: true,
    action: RECAPTCHA_ACTIONS.signup,
    hostname: "www.diversdesk.com",
  },
  riskAnalysis: {
    score: 0.9,
  },
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function validOptions(fetchImpl: typeof fetch) {
  return {
    token: "token",
    projectId: "traveltruster-singapore",
    apiKey: "test-api-key",
    expectedAction: RECAPTCHA_ACTIONS.signup,
    expectedHostname: "www.diversdesk.com",
    fetchImpl,
  };
}

test("selects the action enforced by the server", () => {
  assert.equal(getRecaptchaAction(null), RECAPTCHA_ACTIONS.signup);
  assert.equal(getRecaptchaAction("trial"), RECAPTCHA_ACTIONS.signup);
  assert.equal(
    getRecaptchaAction("liveaboard_waitlist"),
    RECAPTCHA_ACTIONS.liveaboardWaitlist,
  );
});

test("bypasses reCAPTCHA only for loopback hosts in development", () => {
  for (const hostname of ["localhost", "127.0.0.1", "::1", "[::1]"]) {
    assert.equal(shouldBypassRecaptcha(true, hostname), true);
    assert.equal(shouldBypassRecaptcha(false, hostname), false);
  }

  assert.equal(shouldBypassRecaptcha(true, "www.diversdesk.com"), false);
  assert.equal(shouldBypassRecaptcha(true, "192.168.1.10"), false);
});

test("fails closed without a token or complete server configuration", async () => {
  let requests = 0;
  const fetchImpl = (async () => {
    requests += 1;
    return jsonResponse(validAssessment);
  }) as typeof fetch;

  assert.deepEqual(
    await verifyRecaptchaEnterprise({ ...validOptions(fetchImpl), token: "" }),
    { ok: false, reason: "missing-token" },
  );
  assert.deepEqual(
    await verifyRecaptchaEnterprise({ ...validOptions(fetchImpl), apiKey: "" }),
    { ok: false, reason: "missing-configuration" },
  );
  assert.equal(requests, 0);
});

test("creates a native Enterprise assessment without putting the API key in the URL", async () => {
  let requestUrl = "";
  let requestInit: RequestInit | undefined;
  const fetchImpl = (async (
    input: string | URL | Request,
    init?: RequestInit,
  ) => {
    requestUrl = input.toString();
    requestInit = init;
    return jsonResponse(validAssessment);
  }) as typeof fetch;

  const result = await verifyRecaptchaEnterprise(validOptions(fetchImpl));

  assert.deepEqual(result, { ok: true, score: 0.9 });
  assert.equal(
    requestUrl,
    "https://recaptchaenterprise.googleapis.com/v1/projects/traveltruster-singapore/assessments",
  );
  assert.equal(
    new Headers(requestInit?.headers).get("x-goog-api-key"),
    "test-api-key",
  );
  assert.deepEqual(JSON.parse(String(requestInit?.body)), {
    event: {
      token: "token",
      siteKey: RECAPTCHA_ENTERPRISE_SITE_KEY,
      expectedAction: RECAPTCHA_ACTIONS.signup,
    },
  });
});

test("rejects invalid tokens, action and hostname mismatches, and low or missing scores", async () => {
  const cases = [
    [
      {
        ...validAssessment,
        tokenProperties: { ...validAssessment.tokenProperties, valid: false },
      },
      "invalid-token",
    ],
    [
      {
        ...validAssessment,
        tokenProperties: {
          ...validAssessment.tokenProperties,
          action: "other",
        },
      },
      "action-mismatch",
    ],
    [
      {
        ...validAssessment,
        tokenProperties: {
          ...validAssessment.tokenProperties,
          hostname: "attacker.example",
        },
      },
      "hostname-mismatch",
    ],
    [{ ...validAssessment, riskAnalysis: {} }, "missing-score"],
    [{ ...validAssessment, riskAnalysis: { score: 0.29 } }, "score-too-low"],
  ] as const;

  for (const [assessment, reason] of cases) {
    const fetchImpl = (async () => jsonResponse(assessment)) as typeof fetch;
    assert.deepEqual(await verifyRecaptchaEnterprise(validOptions(fetchImpl)), {
      ok: false,
      reason,
    });
  }
});

test("rejects network, HTTP, and malformed JSON failures", async () => {
  const networkFailure = (async () => {
    throw new Error("network unavailable");
  }) as typeof fetch;
  assert.deepEqual(
    await verifyRecaptchaEnterprise(validOptions(networkFailure)),
    {
      ok: false,
      reason: "assessment-request-failed",
    },
  );

  const httpFailure = (async () => jsonResponse({}, 429)) as typeof fetch;
  assert.deepEqual(await verifyRecaptchaEnterprise(validOptions(httpFailure)), {
    ok: false,
    reason: "assessment-request-failed",
    status: 429,
  });

  const malformedJson = (async () => new Response("not json")) as typeof fetch;
  assert.deepEqual(
    await verifyRecaptchaEnterprise(validOptions(malformedJson)),
    {
      ok: false,
      reason: "assessment-response-invalid",
    },
  );
});
