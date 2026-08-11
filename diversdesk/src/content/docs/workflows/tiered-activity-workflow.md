---
title: Tiered Activity Workflow
description: Set up and operate activities where the final price changes automatically based on the booked quantity or selected tier.
slug: workflows/tiered-activity-workflow
sidebar:
    label: Tiered Activity Workflow
    order: 7
robots: noindex
---

## Use Case

Use this workflow when you offer an activity or package where the final price should change automatically based on what the customer books.

This is especially useful for:

* Multi-dive packages.
* Packages with pricing thresholds.
* Offers where the booked amount should determine the final total.

## When to Use This Workflow

Choose a tiered activity workflow when changing the booked quantity, duration, or included dives should move the booking into another pricing level automatically.

If the activity should always keep one total price regardless of duration changes, use a fixed-price setup instead.

## Workflow Overview

The tiered activity workflow usually follows these steps:

1. Configure the activity with **tiered pricing** on the Pricing page.
1. Define the tiers that should apply at different quantity or package thresholds.
1. Create the booking using the appropriate base product or activity.
1. Adjust the booked amount, duration, or included dives as the customer confirms their package.
1. Review the recalculated total and save the booking once the package matches the agreed scope.

## Step 1. Configure Tiered Pricing

Start on the **Pricing** page and open the **Tiered Pricing** tab.

There, define the pricing levels that should apply to your package structure. This allows Diversdesk to determine the correct total automatically when the activity details change.

Typical examples include:

* One price for a smaller dive package.
* Another price once a higher dive count is reached.
* Volume or graduated pricing rules for package-based offers.

## Step 2. Create the Activity or Booking

Create the activity in the Planner or from the appropriate booking flow, using the base product that best matches the expected package.

At this stage, the activity acts as the starting point for the booking. You can then refine the actual scope once the customer confirms the final amount.

## Step 3. Adjust the Quantity or Duration

When the customer adds more dives, extends the package, or confirms a different scope than originally expected, edit the activity so the booked amount matches the real agreement.

With a tiered setup, this is the point where the final price can change automatically.

That means you do not need to manually recalculate the package total each time the activity moves into another defined pricing tier.

## Step 4. Review the Updated Price

After the booking details are updated, review the recalculated total before saving.

Check that:

* The selected package scope is correct.
* The booking reflects the intended number of dives or included units.
* The resulting total matches the tier you expected.

## Practical Example

Imagine a guest first plans for a smaller dive package, but later decides to add more dives.

With fixed pricing, you would usually need to adjust the total manually or switch products.

With tiered pricing, you can update the relevant activity details and let Diversdesk apply the correct pricing tier automatically.

## Best Practice

Use tiered pricing when the commercial offer itself changes with quantity.

If duration is only there for planning and should not influence what the customer pays, keep the activity on fixed pricing instead.
