---
audiences: ["liveaboard-operators", "operators"]
title: Add-ons
description: Create add-ons, configure their prices and booking access, connect activities, and link rental gear from the shared side panel.
slug: features-resources/add-ons
sidebar:
  label: Add-ons
  order: 3
robots: noindex
---

Add-ons are extra items or services offered alongside activities, such as a private guide, a transfer, or rental equipment. Manage them on **Pricing > Add-ons**. The list shows their prices, basis, selection default, activity connections, booking access, and price default.

## Creating an Add-on

Choose **Create Add-on** at the top right. Creation opens in a side panel. Enter the following settings:

| Field | What it controls |
| --- | --- |
| **Add-on name** | The name shown for the extra. Keep it short and recognisable. |
| **Price** and **Currency** | The amount and currency to charge. Currency starts with the establishment default. |
| **Basis** | Apply the price per day, per dive, per trip, or as a one-time fee. |
| **Price Default** | **Per person** charges each guest separately; **Per booking** charges once for the booking. |
| **Who Can Book This?** | **Customers and managers** allows customer selection in the supported booking flows; **Managers only** keeps selection with staff. |
| **Selection Default** | Leave the extra unselected, or preselect it by default. A preselected extra can still be removed. |

Use the info icons beside the field titles for explanations. Choose **Create** to save, or **Cancel** to leave without creating the add-on.

### Connect Activities Before Saving

Expand **Connected activities** and tick the activities that should offer the add-on. The number beside the title shows the selected activity count. Use its info icon for an explanation.

**Bulk select activities...** adds all activities or a whole category without removing other selections. Fully selected groups have a checkmark. A split count, such as 1/3, indicates a partial selection. Adjust individual checkboxes afterward, or choose **Clear** to remove the draft's activity selections.

Save the add-on to apply its activity connections. Booking access and activity connections work together: allowing customers to choose an add-on does not connect it to an activity automatically.

## Rental Add-ons

Rental add-ons connect the same pricing fields to equipment categories. Create them from Add-ons or from [Rental Pricing](/user_manual/rentals/rental-pricing/); both pages manage the same add-on.

### Create a Rental Add-on

1. Choose **Create Add-on** and enter the name and price.
2. In **Rental gear**, enable **Use as a rental add-on**.
3. Choose **One equipment category** or **Equipment set**, then select the included categories.
4. Connect the activities that should offer the rental and choose **Create**.

Rental add-ons stay optional and per person. The form prevents a per-booking price default, preselection by default, and a per-dive basis. If you enable rental mode after choosing a per-dive basis, the form changes it to per day. Per-day, per-trip, and one-time fee prices are supported.

An equipment category can have only one individual rental price. Categories that already have one are greyed out for another individual price; hover to see the reason. Equipment sets can include categories with individual prices.

Use the orange **Create new** link beside **Included rental categories** to add a missing rental item in the shared panel. Saving returns to your add-on draft and selects its category when available for that offering.

### Connect an Existing Add-on to Rental Gear

Open its details, expand **Rental gear**, and choose **Connect to rental gear**. The rental-price panel opens with the add-on selected. Existing add-ons must be per person, not selected by default, use a per-day, per-trip, or one-time fee basis, and have no existing rental connection to be eligible.

The existing add-on's price, booking access, and activity connections are reused. Review the offering, categories, and activities before saving. Physical inventory items are maintained separately on [Rental Items](/user_manual/rentals/rental-items/).

## Viewing and Editing Add-ons

Select an add-on's name to open its details, then choose **Edit**. Connected rental gear appears in **Rental gear**, in the same position as in the editor. Its count shows how many categories are included. Expand **Connected activities** to see linked activities and open them.

Linked rentals use the shared editor. Saving updates the add-on settings, rental categories, and activity connections together. The same changes are visible from Rental Pricing.

Drag add-ons to change their order, then choose **Save Order**. Rental prices share the Add-ons order.

## Showing Add-ons in Daily Operations

On the **Detailed Day** view, enable the **Add-on** column through the page's column controls to display connected add-ons alongside your daily plan.

For rental setup, guest rental choices, and equipment sets, continue with [Rental Pricing](/user_manual/rentals/rental-pricing/).
