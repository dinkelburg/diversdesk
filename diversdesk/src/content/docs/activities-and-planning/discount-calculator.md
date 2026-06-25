---
title: Discount Calculator
description: Create, apply, and manage reusable booking discounts with clear previews before you confirm them.
slug: user_manual/discount-calculator
sidebar:
    label: Discount Calculator
    order: 2
robots: noindex
---

## What the Discount Calculator does

The Discount Calculator lets you build reusable discount rules and apply them to a booking in a controlled way.

You can use it to:

- apply a discount to the whole booking
- apply a discount to one or more specific participants
- save a rule so your team can reuse it later
- preview the effect before you apply it
- remove or update an applied discount without editing each bill line manually

## Before you start

The calculator works with **Discount Rules**.

Older bookings may still contain a **legacy discount** that was added through the activity card. Those discounts are still supported, but they are handled separately from the new Discount Rules.

If you open the calculator on a booking with a legacy discount, Diversdesk will show you that clearly. Legacy discounts should be edited from the activity card they came from.

## Open the calculator

1. Open the booking you want to adjust.
2. Open the **Discount calculator** panel.
3. Choose an existing rule, or create a new one.

## Create a Discount Rule

When you create a new rule, you define the basic logic once and then reuse it whenever needed.

### Rule name

Give the rule a clear name your team will recognise, such as:

- Early Bird 10%
- Staff Discount
- Family Promotion
- Instructor Courtesy Discount

### Type

You can choose between two rule types:

- **Percentage**: subtracts a percentage from the selected amount
- **Fixed amount**: subtracts one exact amount

### Application mode

You can also choose how the discount should be applied:

- **Booking total**: applies the discount to the selected bill lines in the booking
- **Participant allocation**: applies the discount to one or more selected participants

### Default applied to

For percentage rules, you can define the default line groups the rule should use when selected.

These can include:

- Activities
- Add-ons
- Accommodation
- Retail

This is only the starting selection. You can still change the selection before applying the rule.

### Save rule

After entering the rule details, click **Save rule**. The rule will then appear in the rule list and can be used again on future bookings.

## Apply a discount to the booking total

Choose **Booking total** when the discount should affect the booking as a whole instead of specific people.

This is useful for:

- booking-wide promotions
- package discounts
- goodwill discounts on the full bill

When using this mode:

- you select which bill lines are included
- percentage discounts only affect the selected lines
- fixed discounts are spread across the included bill lines, while the total deduction remains the exact fixed amount you entered

The calculator shows a live summary so you can review the numbers before applying the discount.

## Apply a discount to specific participants

Choose **Participant allocation** when the discount belongs to one or more people in the booking instead of the whole booking.

This is useful for:

- staff discounts
- instructor discounts
- child pricing adjustments
- compensation for one specific guest

In this mode, each selected participant gets their own discount result.

### Percentage discount for participants

For a participant percentage discount, Diversdesk calculates the discount on the eligible lines linked to the selected participant.

If the current selection includes shared or unassigned value, the calculator also shows how that part is distributed so you can review the base amount clearly.

### Fixed discount for participants

For participant fixed discounts, you can choose between:

- **Shared amount**: the entered amount is split across the selected participants
- **Amount per participant**: the entered amount is applied once to each selected participant

Important behaviour:

- a participant cannot receive more fixed discount than their remaining billable balance
- if a participant has no eligible balance left, the discount for that participant is capped at zero
- Diversdesk warns you when some selected participants have no billable balance left

## Review the preview before applying

Before you apply a discount, the calculator shows a preview of the result.

Depending on the mode, you will see values such as:

- gross total
- discount scope or selection total
- other applied discounts
- preview discount amount
- remaining balance

Use this preview to confirm that the discount is affecting the correct lines or participants.

## Warnings you may see

The calculator helps prevent pricing mistakes by showing warnings when needed.

Examples include:

- the discount will stack with an existing discount
- the combined discounts would push the total below zero
- the new discount would create an overpayment and may require a refund
- a selected participant has no remaining balance for a fixed discount

If you see a warning, review the preview carefully before applying the rule.

## Update, preview, or remove an applied discount

Once a rule has been applied, you can still manage it from the calculator.

You can:

- update the selected rule and apply the new version
- open the customer preview
- remove the discount from the booking

This keeps discount management in one place and makes changes easier to follow.

## Legacy discounts

Some older bookings still use the previous discount method.

For those bookings:

- the calculator marks the discount as **Legacy**
- legacy discounts are not automatically converted into new Discount Rules
- legacy discounts should be edited in the original activity card

This separation helps keep older bookings stable while newer bookings use the more flexible rule-based system.

## Good practice for operators

- Use clear rule names so everyone on the team understands when a rule should be used.
- Check the preview before applying any discount.
- Be extra careful when stacking multiple discounts on the same booking.
- Use participant allocation only when the discount truly belongs to specific guests.
- Edit legacy discounts in their original activity card instead of trying to rebuild them inside the calculator.
