# Data safety article: evidence and publication review

Draft: `src/content/docs/insights/data-safety.md`, documentation hub route `/docs/insights/data-safety/`.
Created 2026-09-27. The article belongs to the documentation hub's Insights sidebar section and describes the live application's controls on `master`, not the static website or feature-only behavior. It is linked from the hub landing page and marked `noindex`, consistent with user-facing documentation. Nothing has been deployed. Resolve the publication items below before deploying this article.

## Evidence inspected

The static website checkout is on `main`. The separate local `../traveltruster` application checkout is on `feature/feature` (`409636a78`); Bart identified `master` (`8b067ee22`) as live. Both branches were inspected read-only, without checkout, edits, commits, or branch changes. The core files cited for storage, waiver PDF generation, download authorization, password hashing, session cookies, Google token verification, and OTPs have no differences between those two branches or the working tree. Live cloud configuration and the actually deployed revision have not been verified. Repository code demonstrates implemented controls, not a security audit or proof of production configuration.

| Article statement | Evidence |
| --- | --- |
| Hosting setup based in Singapore | Bart confirmed Singapore in this task. This does not establish residency of every service, file, log, or backup. |
| Google Cloud Storage document storage | `../traveltruster/tanstack/app/utils/google-cloud-storage.server.ts` uses the Google Cloud Storage SDK and separate private/public buckets. |
| Generated waiver PDFs private | `../traveltruster/tanstack/app/domain/waiver/participant-waiver-pdf.server.ts` writes to the private bucket and records `public: false`. |
| Download authorization and ten-minute signed URLs | `../traveltruster/tanstack/app/domain/file/file-download.server.ts`; participant waiver download predicates in `app/domain/file/file-targets.ts`. Do not generalize this to every attachment or integration. |
| Passwords salted and hashed | `../traveltruster/tanstack/app/server/auth/auth.password.server.ts` uses bcrypt. |
| Signed, secure, HttpOnly production session cookies; server session expiry/revocation checks | `../traveltruster/tanstack/app/utils/session-cookie.ts` and `session.server.ts`. These are signatures, not encrypted cookies. |
| Short-lived email OTPs | `../traveltruster/tanstack/app/domain/otp/otp-vars.ts`, `otp-actions.server.ts`. Email OTP login alone is not a claim of multifactor authentication. |
| Server verification of Google tokens | `../traveltruster/tanstack/app/utils/firebase.server.ts`. |
| Staff roles | Website `src/content/docs/user-manual/staff/permissions.md`; application membership predicates in `app/domain/file/file-targets.ts`. |
| Establishment-scoped customer access | Live `master`: `app/domain/member/member-queries.server.ts` and `app/domain/participant/participant-auth-queries.server.ts` scope member access by establishment. This is not a blanket claim that every endpoint has been audited. |
| Privileged administrators and customer-facing links | Developer's explanation supplied by Bart; live `master` membership queries include privileged editor status, and participant access queries include customer/session/token access paths. No claim that administrators cannot read records or that all shared links expire in ten minutes. |
| Authority requests and disclosure exceptions | Website Privacy Policy, "Legal Requests and Preventing Harm". Do not promise disclosure only under a court order, automatic customer notification, or rejection of every informal request: the current policy is broader and no formal request-handling procedure was verified. |
| Backups and centrally delivered patches | Website `src/terms/terms-conditions.mdx`, sections 1, 7, and 16. No verified schedule, restoration test, retention period, or recovery target. |
| Cloud Storage encryption | https://docs.cloud.google.com/storage/docs/encryption/default-keys (checked 2026-09-27). Provider statement applies to this storage service, not the entire application. |

## Publication items

1. Confirm the deployed application revision matches the controls described. Verify private bucket IAM/public access prevention and the classification of existing sensitive files in production.
2. Reconcile the website's legal pages with the actual provider and regional setup. Terms section 16.4 says Microsoft/Europe; the privacy policy says transfers to the Netherlands. Bart confirms Singapore hosting, while the application uses Google Cloud Storage and monitoring describes DigitalOcean managed PostgreSQL. These statements may describe different processing activities; obtain the complete processing-location and subprocessor inventory before changing contractual language.
3. Confirm database provider/region, enforced TLS, encryption, actual backup retention, and restoration procedures. DigitalOcean's documented managed PostgreSQL capabilities are provider features, not proof of this deployment: https://docs.digitalocean.com/products/databases/postgresql/details/features/.
4. A legacy database connection comment in `../traveltruster/tanstack/app/misc/database.server.ts` contains a credential-like value. Its validity was not tested. Have the owner verify revocation/rotation and remove the embedded credential; no secret is reproduced here. This is a concrete issue to resolve before broad security marketing claims.

## Claim boundaries

Use specific descriptions such as "Google Cloud Storage encryption at rest, private waiver storage, controlled staff access, and temporary download links."

Do not claim "same security as Google", "enterprise-level security" for the entire platform, "fully secure", end-to-end encryption, platform-wide AES-256, ISO 27001/SOC 2 certification, guaranteed GDPR/PDPA compliance, all data stays in Singapore, immutable audit trails, zero data loss, or 24/7 security monitoring without evidence for that exact scope.

Google does explicitly describe using its own hardened key management systems for standard Cloud Storage encryption. That narrow comparison is supported and is included in the article. It does not imply that Diversdesk has Google's full organizational or application security program.

Shared responsibility reference: https://docs.cloud.google.com/architecture/framework/security.

Customer privacy questions were added explicitly on 2026-09-27: access by other operators, privileged administrators, confidential booking links, authority requests, and appropriate long-term record collection. Data-minimisation guidance reference: https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en.
