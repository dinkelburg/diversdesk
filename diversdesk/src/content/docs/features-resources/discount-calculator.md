---
title: Discount Calculator
description: Create, apply, and manage reusable booking discounts with clear previews before you confirm them.
slug: features-resources/discount-calculator
sidebar:
    label: Discount Calculator
    order: 2
robots: noindex
---

With the Discount Calculator you can build reusable discount rules and apply them to a booking or specific guests in a controlled way. It allows you to:

* Apply discounts to an entire booking or specific guests.
* Save rules for team-wide reuse.
* Preview calculations in real time before applying them.
* Update or remove discounts without manually editing individual bill lines.

## Create a Discount Rule
The discount calculator can be found inside the bill section of a booking. Clicking +Discount opens the Discount Calculator side paanel where you can create, apply and manage your rules.

### 1. Define Rule Basics
* **Rule Name:** Use clear, recognizable names for your team (e.g., *Early Bird 10%*, *Staff Discount*, *Instructor Courtesy*).
* **Type:** Choose **Percentage** (subtracts a % of the selected amount) or **Fixed amount** (subtracts an exact monetary value).

### 2. Choose the Application Mode
* **Booking total:** Applies the discount across selected bill lines for the whole booking.
* **Participant allocation:** Targets specific guests within the booking.

### 3. Set Default Line Groups (Percentage Rules Only)
Select which default revenue categories the rule targets. You can still modify these selections on the fly before applying the discount:
* Activities
* Add-ons
* Accommodation
* Retail

Click **Save rule** to add it to your permanent library.

## Apply a Discount to the Booking Total

Choose **Booking total** for booking-wide promotions, package deals, or general goodwill discounts. 

* **Line Selection:** You control exactly which bill lines are included.
* **Percentage Rules:** Only affect the specific line groups selected.
* **Fixed Rules:** The total deduction matches your exact fixed amount and is distributed proportionally across the selected bill lines.

> **Tip:** The calculator displays a live summary so you can verify the math before saving.

## Apply a Discount to Specific Guests

Choose **Participant allocation** when a discount belongs to individual travelers (e.g., staff rates, child pricing adjustments, or targeted guest compensation). Each selected guest receives an individual discount calculation.

### Percentage Discounts
Calculated strictly against the eligible bill lines linked to that specific guest. If the booking includes shared or unassigned costs, the calculator shows how those are distributed so the base amount remains completely transparent.

### Fixed Discounts
When applying a fixed amount to guests, select one of two behaviors:
* **Shared amount:** The total amount is split evenly among the selected guests.
* **Amount per participant:** The full amount is applied individually to *each* selected guest.

**Important Safeguards:**
* A guest's discount cannot exceed their remaining billable balance.
* If a guest has no eligible balance left, their discount caps at zero.
* Diversdesk will flag a warning if a selected guest has no remaining balance.

## Review & Manage Applied Discounts

### Live Previews
Before confirming, review the real-time breakdown to ensure the discount targets the correct lines or guests. The preview displays:
* Gross total & remaining balance.
* Discount scope / selection total.
* Any existing applied discounts & the new preview discount amount.

### System Warnings
The calculator actively prevents pricing errors by warning you if:
* The discount stacks with an existing rule.
* Combined discounts push the booking total below zero.
* The discount creates an overpayment (requiring a refund).
* A selected guest has no balance left to discount.

### Updates and Removals
Once applied, you can manage everything right from the calculator panel: update the rule version, view the customer preview, or completely remove the discount.

## Legacy Discounts

Older bookings may contain discounts applied via the legacy activity card system. 

* **Separation:** The calculator marks these as **Legacy**. They are not automatically converted into new Discount Rules.
* **Management:** Legacy discounts must be edited directly on the original activity card where they were created. This prevents calculations on older bookings from breaking.

## Quick Best Practices

* **Be descriptive:** Name rules clearly so staff instantly know when to use them.
* **Trust the preview:** Always double-check the live summary numbers before hitting apply.
* **Watch out for stacking:** Take extra care when compounding multiple discounts on a single bill.
* **Target accurately:** Only use guest allocation if the discount belongs strictly to specific individuals.