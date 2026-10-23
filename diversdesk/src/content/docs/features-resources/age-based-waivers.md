---
audiences: ["liveaboard-operators", "operators"]
title: Age based waiver requirements
description: Require a waiver for a specific age group within an onboarding journey using From and Under.
slug: features-resources/age-based-waivers
sidebar:
    label: Age Based Waiver Requirements
    order: 8
robots: noindex
---

Each waiver added to an onboarding journey defaults to **Always**. Add an age condition when only participants in a particular age group need to complete it. The requirement belongs to that onboarding journey, so the same waiver can have different requirements in different journeys.

## Choose From or Under

| Condition | Who needs the waiver? |
| --- | --- |
| **From 50** | Participants aged 50 or older. Age 50 is included. |
| **Under 50** | Participants younger than 50. Age 50 is excluded. |

For a waiver required for children, choose **Under 18**. For a rule that says **over 50**, choose **From 51** because ages are measured in completed years.

## Set the requirement

1. Open the onboarding journey and add or find the waiver.
2. Open the **ellipsis menu** beside the waiver and select **Edit requirement**.
3. Choose **Based on age**.
4. Select **From** or **Under**, then enter the age in years.
5. Save the requirement, then save the onboarding journey.

The requirement appears beside the waiver name. To remove the age condition, edit the requirement and choose **Always**.

For the wider setup process, see [Creating Onboarding Journeys](/workflows/creating-onboarding-journeys/).

## How age is calculated

DiversDesk uses completed years on the **activity start date**. If no activity is assigned, it uses today's date.

For example, a participant who is 49 when registering but turns 50 before the activity starts meets a **From 50** condition. On their 50th birthday, they meet **From 50** and no longer meet **Under 50**.

Date of birth is required when an onboarding journey contains an age condition so DiversDesk can determine which waivers the participant needs to complete.

## Use different rules in different journeys

A waiver can be required for everyone in one journey and only for participants **From 50** in another. Changing the requirement affects only the journey you are editing, not the waiver's requirements in other journeys.

## Existing age conditions

Previously saved conditions keep the same meaning. **Greater than 50** appears as **From 51**, **At least 50** as **From 50**, and **At most 50** as **Under 51**.
