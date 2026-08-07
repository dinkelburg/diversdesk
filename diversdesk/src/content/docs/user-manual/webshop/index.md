---
title: Webshop
description: Use the Webshop section to understand the customer-facing online booking and sales flow across your Diversdesk setup.
slug: user_manual/webshop
robots: noindex
---

The top-level **Webshop** section is the customer-facing online booking and sales layer of Diversdesk.

Use this section when you want to understand how customers move through your public shop and how the different webshop tabs connect back to your internal setup.

The Webshop area is organized into public-facing tabs:

- **Activities** for activity booking offers
- **Retail** for product sales
- **Accommodation** for room or stay bookings
- **About** for business information, contact details, and reviews

## How Webshop Navigation Works

When a customer opens your shop, Diversdesk redirects them to the first available tab in this order:

1. **Activities**
1. **Retail**
1. **Accommodation**
1. **About**

In practice:

- **Activities** is always available
- **Retail** is shown publicly when retail mode is set to **Checkout**
- **Accommodation** is shown publicly when accommodation mode is set to **Checkout**
- **About** is always available as the fallback page

For managers, Retail and Accommodation can still be accessed internally when those parts of the system are enabled, even if they are not currently exposed as public checkout tabs.

## What Each Tab Is Used For

- **Activities**: browse categories, featured activities, and activity detail pages
- **Retail**: browse categories, brands, featured items, and product detail pages
- **Accommodation**: select dates or departures, review room availability, and add stays to cart
- **About**: show your operator profile, contact details, languages, and reviews

## Activities-Specific Booking Controls

For the **Activities** webshop tab, keep these operational rules in mind:

- Category deletion is only possible when that category has no underlying activities.
- If a category still contains activities, move those activities to another category or delete them first.
- Per-activity **Blocked Dates** can be configured in the activity side panel to prevent customer bookings on specific dates.
- Booking lifecycle behavior can be configured under **Settings > General** (for example manual approval, or time-bounded auto-approve/auto-decline windows).
- Booking lead-time limits (how far in advance customers can book) are configured under **Settings > General**.

Integrated payment gateways can also enforce mandatory partial or full checkout payment per activity category, based on your payment setup.

## Shop Settings

Managers can open **Shop Settings** from the settings icon in the Webshop top bar.

This page is used to upload hero banner images for:

- Activities
- Retail
- Accommodation

If multiple images are uploaded, they rotate automatically on the public shop pages.

The Retail and Accommodation hero-banner sections appear in Shop Settings when those checkout modes are enabled.

## Checkout Payment Behavior

The Webshop pages control what customers can browse and add to cart, but they do not decide by themselves how much must be paid during checkout.

Required checkout payment is based on your establishment checkout payment percentages for:

- Activities
- Accommodation
- Retail

If one of these percentages is above 0, Diversdesk requires that portion of the relevant sale total during checkout.

Use the page-specific guides below for the operational details of each webshop area:

- [Activities Webshop](/user_manual/activities/webshop/)
- [Accommodation Webshop](/user_manual/accommodation/webshop/)
- [Retail POS Webshop](/user_manual/retail-pos/webshop/)
