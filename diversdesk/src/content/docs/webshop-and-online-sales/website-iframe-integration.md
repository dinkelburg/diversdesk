---
title: Website Iframe Integration
description: Add your Diversdesk webshop or booking page to your own website using an iframe.
slug: articles/website_iframe_integration
sidebar:
    label: Website Iframe Integration
    order: 2
robots: noindex
---

You can embed your Diversdesk booking page directly into your own website with an iframe. This is the fastest way to let customers book without sending them to a separate page.

## Decide What You Want to Embed

In practice, there are two common choices:

- Embed your **general webshop** so customers can browse first.
- Embed **one specific activity page** when you want to drive bookings for one offer.

:::tip
In marketing pages and ads, linking directly to a specific activity usually improves conversion because customers land on the exact offer immediately.
:::

## How to Copy the Correct URL in Diversdesk

### A. Copy your General Webshop URL

1. Open your Diversdesk webshop view.
2. Copy the page URL from the browser address bar.
3. Paste this URL into the iframe `src`.

<!-- Suggested media slot (add your own recording file):

```text
/images/user_manual/copy-general-webshop-url.gif
``` -->

### B. Copy a Specific Activity URL

1. Open the activity page you want to promote.
2. Copy the page URL from the browser address bar.
3. Paste this URL into the iframe `src`.

<!-- Suggested media slot (add your own recording file):

```text
/images/user_manual/copy-specific-activity-url.gif
``` -->

## Before You Start

Make sure you have:

- Your published Diversdesk booking page URL.
- Access to edit your website (WordPress, Wix, Squarespace, Webflow, custom HTML, etc.).

:::tip
Use your live booking URL (not a temporary or staging page) so customers always see the correct booking flow.
:::

## Basic Iframe Embed Code

Copy and paste this into the page where you want the booking flow to appear:

```html
<iframe
    src="https://YOUR-BOOKING-URL"
    title="Book with Diversdesk"
    width="100%"
    height="1000"
    style="border: 0; display: block;"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
></iframe>
```

Replace `https://YOUR-BOOKING-URL` with your actual Diversdesk booking link.

Use the exact URL you copied from Diversdesk:

- General webshop URL for browse-first flows.
- Specific activity URL for campaign or product-specific flows.

## Recommended Responsive Version

Use this version if you want better behavior across desktop and mobile screens:

```html
<div style="width: 100%; max-width: 1200px; margin: 0 auto;">
    <iframe
        src="https://YOUR-BOOKING-URL"
        title="Book with Diversdesk"
        style="width: 100%; min-height: 100vh; border: 0; display: block;"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
</div>
```

## Side Panel Layout (Recommended for Informational Pages)

If you want to show text, FAQs, or key details next to the booking flow, use a 2-column side panel layout:

```html
<div
    style="
        display: grid;
        grid-template-columns: 320px 1fr;
        gap: 24px;
        align-items: start;
    "
>
    <aside
        style="
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 16px;
            position: sticky;
            top: 24px;
            height: fit-content;
        "
    >
        <h3 style="margin-top: 0;">Booking Information</h3>
        <p>Add trip notes, what to bring, and cancellation policy here.</p>
    </aside>

    <iframe
        src="https://YOUR-BOOKING-URL"
        title="Book with Diversdesk"
        style="width: 100%; height: 1800px; border: 0; display: block;"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
</div>
```

For mobile screens, stack these blocks vertically in your page builder.

## Mobile-Friendly Side Panel Example

If your website builder does not support responsive grid settings well, use this stacked version that works nicely on mobile:

```html
<div style="display: flex; flex-direction: column; gap: 16px;">
    <div
        style="
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 16px;
            background: #ffffff;
        "
    >
        <h3 style="margin-top: 0;">Before You Book</h3>
        <p style="margin-bottom: 0;">Add important notes, requirements, or FAQs here.</p>
    </div>

    <iframe
        src="https://YOUR-BOOKING-URL"
        title="Book with Diversdesk"
        style="width: 100%; height: 1800px; border: 0; display: block;"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
</div>
```

## Live Test Examples

We added test pages in this website so you can see real implementations:

<!-- markdownlint-disable MD033 -->
- Side panel layout example: <a href="/iframe-test" target="_blank" rel="noopener noreferrer">Open /iframe-test in a new tab</a>
- General webshop embed example: <a href="/iframe-test-general" target="_blank" rel="noopener noreferrer">Open /iframe-test-general in a new tab</a>
- Specific activity embed example: <a href="/iframe-test-activity" target="_blank" rel="noopener noreferrer">Open /iframe-test-activity in a new tab</a>
<!-- markdownlint-enable MD033 -->

:::note
These example pages are set to `noindex, nofollow` and are intended for testing and internal reference.
:::

## Placement Tips

- Add the iframe on a dedicated page like **Book Now** for best performance.
- Keep `width="100%"` (or `style="width: 100%"`) so the booking flow scales to smaller screens.
- Start with a height between `1200` and `1800` pixels, then adjust based on your layout.
- Avoid placing the iframe inside very narrow columns.

## Platform Notes

- **WordPress:** Use a Custom HTML block.
- **Wix / Squarespace / Webflow:** Use an Embed/Code element.
- **Custom website:** Paste the snippet directly in your HTML template.

## Troubleshooting

If the booking page does not show:

- Confirm your booking URL opens correctly in a new browser tab.
- Check that no page-builder setting is stripping iframe code.
- Make sure your iframe is not inside a hidden tab/accordion with fixed height.
- Clear website cache/CDN cache after publishing changes.

If your page cuts off part of the booking form:

- Increase iframe height.
- Remove parent containers with `overflow: hidden`.
- If needed, start with `1800` and go higher for long booking flows.

## Verify Your Setup

After publishing:

- Open the page on desktop and mobile.
- Complete a test booking flow.
- Confirm your branding and page spacing look correct.

Once this works, your customers can book directly from your own website while using the full Diversdesk booking experience.
