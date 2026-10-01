---
title: Why doesn't the registration form update after I edit it in Form Builder?
description: Learn why Form Builder changes do not update existing bookings and how to change the onboarding journey on an activity card.
slug: faq/why-does-the-registration-form-not-update-after-editing-form-builder
sidebar:
    label: Why isn't my registration form updating?
    order: 9
robots: noindex
---

If you edit an onboarding journey in **Form Builder** but an existing booking still shows the old registration form, this is expected. **A booking keeps the onboarding setup it had when it was created.** Later changes in Form Builder do not automatically update that booking.

## Why does this happen?

Form Builder defines the onboarding journeys used when bookings are created. Each booking keeps its own setup, including the journey connected to its activities. This preserves an accurate record of the registration and paperwork requested for that booking.

If every Form Builder edit also changed existing bookings, a past or completed registration could appear to require fields or waivers that the guest was never asked to complete. Keeping the original setup prevents the booking record from becoming misleading.

For example, if you add a required field to the *Fun Diver* journey today, a booking created yesterday will continue to use the journey setup saved with that booking.

<!-- Add image: the updated journey in Form Builder alongside an existing booking that still shows the earlier form. -->

## How do I update an existing booking?

Change the onboarding journey **inside the booking's activity card**:

1. Open the existing booking.
2. Select the activity card whose registration form needs to change. This opens the activity's side panel.
3. Adjust the **onboarding journey** for that activity and save the change.
4. Check the booking's registration page to confirm that the correct form and paperwork are shown.

If the booking contains several activity cards that need the change, update each relevant card.

<!-- Add WebM walkthrough: open a booking, select an activity card, change its onboarding journey, save, and check the registration page. -->

## Still not seeing the expected form?

Check which onboarding journey is connected to the activity. Go to **Settings → Customer Onboarding → Activities (Forms)**, find the activity, and confirm that it uses the journey you edited in Form Builder. If a different journey is connected, select the correct one and save.

This activity setting determines the journey used for **new bookings** of that activity. For a booking that already exists, also update the journey on its activity card as described above.

<!-- Add image: the connected onboarding journey for an activity on the Activities (Forms) page. -->

:::tip
Edit the journey in **Form Builder**, check its activity connection under **Activities (Forms)**, and update the **activity card** for any existing booking that needs the new form.
:::

For help creating and editing journeys, see [Creating Customer Onboarding Journeys](/workflows/creating-onboarding-journeys/).
