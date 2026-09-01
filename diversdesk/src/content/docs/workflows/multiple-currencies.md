---
title: Working with Multiple Currencies
description: Add items and record payments in another currency while keeping the booking bill in one currency.
slug: workflows/multiple-currencies
sidebar:
    label: Working with Multiple Currencies
    order: 8
robots: noindex, nofollow
---

Use this workflow when a booking is billed in one currency but an item is priced, or a payment is collected, in another currency. For example, a trip can be sold in USD while onboard purchases are priced and collected in IDR.

A booking always has one **booking currency**. All bill totals, discounts, taxes, outstanding balances, and invoices use that currency.

## Workflow Overview

1. Add the item to the booking in its original currency.
1. Review the converted value in the booking bill.
1. Record the payment in the currency the customer used.
1. Review the saved conversion details when needed.

## Step 1. Add an Item in Another Currency

Add the activity, accommodation, retail item, or other charge to the booking in its original currency. When that currency differs from the booking currency, Diversdesk:

1. keeps the original amount and currency
1. converts the amount into the booking currency using the current reference rate
1. saves the rate and conversion time with the sale
1. includes the converted value in the single-currency booking bill

## Step 2. Review the Converted Value

The bill marks the booking-currency value as **Converted**. The original amount appears directly underneath it.

Select the original amount to review the saved rate, rate date, provider, and conversion time.

## Step 3. Record the Payment

Payments do not have to use the booking currency. Record the payment in the currency the customer actually used. Diversdesk converts the payment into the booking currency and applies that value to the outstanding balance.

The payment method determines which currencies are available:

- Manual payments can use any supported currency.
- Stripe can use currencies supported by the connected Stripe account.
- Xendit and Sentoo payments must use the currency configured for the connected gateway account.

## Step 4. Check the Conversion Details

Exchange rates can change between the time an item is added and the time a payment is recorded. Diversdesk therefore saves the conversion details separately for both events.

Use those saved details when you need to confirm why the converted sale value and converted payment value differ.

## Example

- Booking currency: USD
- Onboard item: IDR 400,000
- Bill: the converted USD value, with IDR 400,000 shown underneath
- Payment: IDR 400,000 recorded and applied to the USD booking balance

Return to the [Booking Page guide](/user_manual/bookings/booking-page/) for the other actions available within an individual booking.
