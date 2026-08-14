---
title: Managing Tiered Activities
description: Add, adjust, schedule, and price tiered activities from a single activity card in a booking.
slug: workflows/tiered-activity-workflow
sidebar:
    label: Managing Tiered Activities
    order: 7
robots: noindex
---

## When to Use Tiered Activities

Use tiered activities when the price should change automatically as guests add dives or days. This is particularly useful for guests who stay for several days and choose their dive days as their plans develop.

This is especially useful for:

* Multi-dive packages.
* Dive-and-stay guests who choose dives during their accommodation stay.
* Packages with pricing thresholds.
* Offers where the booked amount should determine the final total.

## Workflow Overview

The tiered activity workflow usually follows these steps:

1. Configure a tiered rate and its entry levels on the [Pricing page](/user_manual/activities/pricing/).
1. Add the tiered activity to the booking.
1. Use the activity side panel to adjust dives or days as the guest's plans develop.
1. Review the recalculated price and generated title before saving.

## Step 1. Configure Tiered Pricing

Start on the **Pricing** page and open the **Tiered Rates** tab.

Create the rate, then define the entry levels you want to display in the webshop or use most often when adding an activity to a booking. Common entry levels include two dives per day or three dives per day.

Typical examples include:

* A starting price for two dives.
* A different rate once a guest reaches a higher dive count.
* Volume or graduated pricing rules for package-based offers.

Choose **Volume** when every dive uses the price from the highest matching tier. Choose **Graduated** when each tier contributes progressively to the final total.

## Step 2. Create the Activity or Booking

Add the tiered activity to a booking using the entry level that best matches the guest's expected package. The entry level is a starting point, not a separate activity that must exactly match the final package.

The booking keeps this work on one activity card. As the guest confirms more dives or days, update that card instead of using **Schedule again** or adding a duplicate activity for each extra day.

## Step 3. Adjust Dives or Days

Open the tiered activity in the booking and select **Edit**. Update the number of dives or sessions to match the real agreement. Diversdesk recalculates the price using the matching tier and updates the generated title to show the count, for example `6 Fun Dives`.

For a tiered activity, this is the normal way to extend a package. Do not use **Schedule again** when you are adding days or dives to the same tiered package.

That means you do not need to create an increasingly long list of nearly identical activities or manually recalculate the package total whenever a guest changes plans.

## Step 4. Use the Daily Multiplier When Appropriate

The **daily multiplier** keeps the number of dives proportional to the activity duration. For example, if an activity is configured for two dives per day, changing it from two days to three days updates it from four dives to six dives and recalculates the price.

Use this option for packages with a consistent number of dives each day. Use the flexible dive/session option when a guest's dive count should not be tied to the number of days, for example when they decide to skip a day.

## Step 5. Review the Updated Price

After the booking details are updated, review the recalculated total before saving.

Check that:

* The selected package scope is correct.
* The booking reflects the intended number of dives and days.
* The generated title shows the expected dive count.
* The resulting total matches the tier you expected.

## Practical Example

Imagine a guest staying for five days initially plans two dives, then decides to dive on three additional days.

With a fixed-price activity, you would normally add another activity or adjust the price manually to reflect the new plan.

With a tiered activity, update the dive count or add days through the daily multiplier. Diversdesk keeps the plan on one activity card, updates the title, and applies the correct tier automatically.

## Best Practice

Use tiered pricing when the commercial offer itself changes with the number of dives or days.

If duration is only there for planning and should not influence what the customer pays, keep the activity on fixed pricing instead.
