---
audiences: ["liveaboard-operators", "operators"]
title: Understanding Diversdesk's 0.5% Platform Fee for Stripe Payments
description: Learn how Diversdesk's 0.5% platform fee is calculated on Stripe payments and how it relates to Stripe's processing charges.
slug: faq/how-does-the-stripe-platform-fee-work
draft: true
sidebar:
    label: How does the Stripe platform fee work?
    hidden: true
pagefind: false
robots: noindex, nofollow
---

Diversdesk lets you accept online card payments through Stripe directly within your booking workflow. When you process a payment through this integration, Diversdesk adds a **platform fee of 0.5% of the transaction amount**, in addition to Stripe's own processing fees.

Knowing how these charges work makes it easier to calculate your payment costs and plan your pricing.

The Diversdesk platform fee is calculated by multiplying the payment amount by **0.005**. For example:

| Payment amount | Diversdesk platform fee |
|---|---:|
| 100 | 0.50 |
| 500 | 2.50 |
| 1,000 | 5.00 |

All amounts above are expressed in the same transaction currency. These examples show only the Diversdesk platform fee; Stripe's processing charges are additional.

Stripe charges separately for processing the payment. Its applicable fees depend on factors such as your account's country, payment method, and pricing agreement. International cards and currency conversion can also affect the cost. You can check the rates applicable to your business on [Stripe's pricing page](https://stripe.com/pricing).

To calculate the combined cost of a payment, use:

**Total payment fees = applicable Stripe fees + (payment amount × 0.5%)**

For example, on a payment of 1,000, the Diversdesk fee is 5. If Stripe's fees for that transaction were 30, the combined payment fees would be 35. The Stripe amount in this example is illustrative, rather than a quoted processing rate.

The distinction between the two charges is straightforward: Stripe's fee covers payment processing, while Diversdesk's platform fee applies to using Stripe through the Diversdesk integration. The 0.5% is calculated on the transaction amount, rather than on Stripe's fee.

If you would like help enabling Stripe or understanding the platform fee for your dive center, contact the Diversdesk team.
