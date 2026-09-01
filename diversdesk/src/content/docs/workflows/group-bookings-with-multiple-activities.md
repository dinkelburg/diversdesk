---
title: Managing Group Bookings with Multiple Activities
description: Create one group booking for different activities and schedule only the participants who continue on another day.
slug: workflows/group-bookings-with-multiple-activities
sidebar:
    label: Group Bookings with Multiple Activities
    order: 4
robots: noindex
---

Use one booking when members of the same group are joining different activities or when only part of the group continues on another day. This keeps the participants, paperwork, activities, and billing together while allowing each activity to have its own participant count.

## Example Scenario

Imagine a group of eight guests:

* Five guests are diving.
* Three guests are snorkeling.
* The next day, only three of the five divers decide to join another standard day-diving activity.

The booking should contain two activities for the first day, with five registration slots for diving and three registration slots for snorkeling. The additional diving activity on the next day should have only three participant slots.

## Step 1. Create the Group Booking

Create a new managed booking from the **Bookings** page or the **Planner** and enter the total group size. In this example, the booking has eight participants.

Add the first activity and set its participant count to the number of people joining it. Then select **+Manage → Add activity** and add the second activity.

:::tip[Configure your activity-creation defaults]
Under **Settings → General**, you can choose the default activity start date and default number of participants used when creating a new activity.

New activities use **Next day** as the start date by default. You can change this to **Today** or **Always empty**. Choose **Always empty** when you want the manager or user creating the booking to actively enter and verify the date every time. The date is never prefilled with this option, helping prevent someone from accepting an incorrect default without checking it.

You can also change the default participant count to match the most common booking size for your operation. These defaults make new activity creation faster, but the user should still confirm both fields for every booking. When adding an activity to an existing group booking, Diversdesk may instead use the booking's participant total, so always review the participant count before saving.

See [Settings](/user_manual/settings/) for more information about your environment configuration.
:::

For this example, the booking should contain:

| Activity | Registration slots |
| --- | ---: |
| Day diving | 5 |
| Snorkeling | 3 |

:::caution[Check the participant count]
When you add an activity, Diversdesk initially fills the participant count with the total number of participants in the booking. Change this number to the actual number joining that activity before saving. In this example, do not leave both activities set to eight participants.
:::

## Step 2. Let Every Group Member Register Individually

Share the booking's unique URL with the group organizer or directly with every group member. The same URL can be used by everyone until the available registration slots are filled.

Each guest then:

1. Opens the shared booking URL.
1. Selects the activity or activities they are participating in.
1. Completes their own registration details and required paperwork.
1. Submits their registration.

The five divers select the day-diving activity, while the three snorkelers select the snorkeling activity. If a guest is joining more than one activity, they can select each relevant activity during registration.

This allows every guest to complete the correct onboarding journey and paperwork for their activity without creating separate bookings for the divers and snorkelers.

For more information about sharing a booking and registering group members, see [Customer Registration/Booking Methods](/workflows/registration-methods/#11-share-the-booking-url).

## Step 3. Add an Activity for the Next Day

When only part of the group decides to continue the next day, add another activity to the same booking. You can do this in two ways.

### Option 1. Schedule the Same Activity Again

Use **Schedule again** when the guests are repeating the same standard activity, for example another day of the same day-diving activity or trip.

1. Open the existing day-diving activity card.
1. Select **Schedule again** in the activity side panel.
1. Confirm the date for the next activity.
1. Change the participant count to three.
1. If the guests are already registered, connect only the three participants who are joining.
1. Review the details and save the activity.

:::caution[Schedule again copies the participant count]
**Schedule again** initially uses the participant count from the original activity. In this example, it starts with five participants because five guests joined the first diving day. Reduce it to three before saving the next day's activity.
:::

### Option 2. Add a Different Activity

Use **+Manage → Add activity** when the group chooses a different activity or when you want to create it independently.

1. Open the booking and select **+Manage → Add activity**.
1. Select the new activity and its date.
1. Change the participant count to three.
1. If the guests are already registered, connect only the three participants who are joining.
1. Review the details and save the activity.

Remember that **Add activity** initially uses the total number of participants in the booking. In this example, the default is eight, so it must be reduced to three.

## Final Check

Before confirming the updated booking, verify that:

* Each first-day activity has the correct number of registration slots.
* Every registered guest is connected only to the activities they are joining.
* The next-day activity includes only the guests who decided to continue.
* The participant count, price, date, and meeting details are correct for every activity.

:::tip[Use Schedule again for repeat day activities]
For a standard activity that is repeated on another day, **Schedule again** is usually the quickest option because it carries the activity details forward. Always check the participant count before saving. For a tiered package, update the existing activity instead; see [Managing Tiered Activities](/workflows/tiered-activity-workflow/).
:::
