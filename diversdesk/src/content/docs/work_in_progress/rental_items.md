---
title: Rental Items
description: Read how to create rental items, setup service triggers and assign gear to participants
sidebar:
    label: Rental Items
    order: 8
pagefind: false
robots: noindex, nofollow
---

The Rental Items page shows you an overview of all your entered rental items. On this page you can:

- Manage stock & availability
- Track usage & services
- Add actionable notes

Entered rental categories will automatically appear as filter buttons in the top of your screen. 
<div style="text-align: center;">
  <img 
    src="/images/user_manual/rental-items-bcds.avif" 
    alt="A snippet of a rental inventory"
    class="w-full md:w-full mx-auto"
  />
</div>

## Add a New Rental Item

To create a rental item, click the '+ Create a Rental Item' button in the top right of your screen.

<div style="text-align: center;">
  <img 
    src="/images/user_manual/rental-items-screen.avif" 
    alt="Creating a first rental item"
    class="w-full md:w-full mx-auto"
  />
</div>

This opens a side-panel where you can enter all the rental item's information. Here's an overview of each entry field:
<div style="display: flex; align-items: center;">
  <div class="w-1/2 md:w-2/5 mx-auto" style="margin-right: 20px;">
    <img
      src="/images/user_manual/side-panel-rental-gear.avif"
      alt="Available entry fields for rental items"
      style="max-width: 100%; height: auto; display: block;"
    />
  </div>
  <div class="description-text">
    <p><strong>Category:</strong> Rental category name. <em>E.g. BCD or Wetsuit.</em></p>
    <p><strong>Title:</strong> You can use this field to add either a type or descriptive title that helps you recognize the rental item. <em>E.g. Basic Jacket or Aquaride (Integrated weights).</em></p>
    <p><strong>Brand:</strong> The Brand of your rental Item.</p>
    <p><strong>Size:</strong> If applicable, you can fill the size of your rental item (optional). </p>
    <p><strong>Color:</strong> Color of the item (optional). </p>
    <p><strong>ID Number:</strong> Unique ID Number that's linked to your rental Item. For easy recognizion, we recommend to embed the category in this number. <em>e.g. BCD-001, WS-011, REG-002.</em></p>
    <p><strong>Storage Location:</strong> Location where the rental item is stored. <em>e.g. Rack A or Box 1.</em></p>
    <p><strong>First Use:</strong> This field is automatically filled with the date the item is first rented out. If an item was already in use before entering it in your backend, you can fill the start date here.</p>
    <p><strong>Service Interval:</strong> If applicable, you can set a service interval here. Either a set date and/or number of uses. The service interval is activated as soon as one of these conditions (date or number of uses) is met.</p>
  </div>
</div>

<style>
  .description-text {
    flex: 1; /* Retain flex property */
    font-size: 0.7em; /* Default font size for mobile (smaller) */
  }

  /* Media query for desktop screens (or larger tablets) */
  @media (min-width: 768px) { /* Adjust this breakpoint if needed to match your md: from Tailwind */
    .description-text {
      font-size: 0.9em; /* Larger font size for desktop */
    }
  }
</style>

:::tip[Tip]
Speed up rental item entry using the **Copy button**. This button appears when you open an existing rental item and allows you to duplicate its details. 
:::

## Copying a Rental Item
To speed up rental items entry, you can copy an existing rental item. When copying this, the ID number is duplicated with an added (copy) text behind the existing ID. When you're entering similar items, this will signifcantly speed up the entry process. 

<div class="text-grid" style="grid-template-columns: repeat(4, 1fr);">
  <div class="text-item">
    <p>Tab/click on an existing rental item to open its details.</p>
  </div>
  <div class="text-item">
    <p>Press the Copy button to duplicate all its information.</p>
  </div>
  <div class="text-item">
    <p>Change the unique ID/URL for the new item.</p>
  </div>
    <div class="text-item">
    <p>Save the new rental item to add it to your inventory.</p>
  </div>
</div>

<div style="text-align: center;">
  <img 
    src="/images/user_manual/steps-to-copy-a-rental-item.avif" 
    alt="Steps to copy an existing rental item"
    class="w-full md:w-full mx-auto"
  />
</div>

## Assigning Rental Gear

Assigning Rental gear to your customer can be done from the Day Manifest page.
Clicking on the customer name will open a side panel with Customer information, trip assignment and information and the option to assign rental gear. 

<div style="text-align: center;">
  <img 
    src="/images/user_manual/day-manifest-side-panel.avif" 
    alt="Steps to copy an existing rental item"
    class="w-full md:w-full mx-auto"
  />
</div>

