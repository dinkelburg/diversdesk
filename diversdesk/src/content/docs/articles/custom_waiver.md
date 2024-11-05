---
title: Create a Custom Waiver 
description: In depth guide to create a custom waiver that meets your needs.
sidebar:
    label: Create a Custom Waiver
    order: 3
    badge: new
---

The Waiver page offers all the functionality you need to create a custom, well-designed waiver that goes beyond legal protection. This tool is designed to help you build trust with your customers by setting clear expectations, reinforcing transparency, and showing attention to detail in every aspect of your business.

We’ve released a robust set of features that allow you to tailor open text input fields for any scenario, ensuring each waiver is as unique as the services you provide. With these customizable options, you can add the exact clauses, language, and brand elements your business requires. 

<div class="w-full md:w-3/5 mx-auto">
  <img 
    src="/images/select_waivers_page.png" 
    alt="Selecting the product page through the hamburger menu"
  />
</div>

By default the waiver page will show the available certification organisation waivers from the organisation your business is connected to. Those waivers can solely be viewed and not edited. 

## Creating a New Waiver
You can create a new waiver through the create hyperlink. 

<div class="w-full md:w-3/5 mx-auto">
  <img 
    src="/images/create_a_new_waiver.png" 
    alt="Create a new waiver through the 'Create' hyperlink"
  />
</div>

There's a few basic settings to set when creating a waiver. Those are described on the 'Creating Onboarding Journeys' page of the user manual. If you've missed those, you can find them below:

<details>
  <summary>Click here to view the waiver settings and input fields</summary>

  **Identifier**  
  Umbrella name for this waiver. This is used for you to recognize the waiver, regardless the different names per language 'Display name' used.

  **Valid term**  
  The period a signed waiver remains valid or is open for signing to your customer. 
  :::note[Note]
  Leaving this field open only keeps this waiver valid for the current registration.
  :::

  **Signature required checkbox**  
  Determines if this waiver is shown as a separate signed waiver, or embedded into your registration form as a tick box.

  **Language**  
  The language used for the waiver you're creating.

  **Display name**  
  The dedicated name for the language you're entering. This is the name that your customers will see.

  **Text input field**  
  The actual waiver text can be entered here. Through the available cheatsheet, you can see what 'markdown' text formatting options can be made.
</details>

### Input Field:
To create an input field you can use the 'Input' hyperlink. This will create the following: 
```html
{% input value= /%} 
```
A value is expected behind the compare sign =. You can fill the prefill your desired text or 'Insert' one of the available attributes.
:::note[Note]
Keep in mind that a value is expected, leaving the input value empty as shown above does not make your field appear.
:::

*Optional default values in the input field:*
- *participant* Custom
- *operator*
- *Custom*

Selecting both 'Input' and **'participant'** after each other will create the following.
```html
{% input value=$participant /%} 
```
Selecting both 'Bold' and **'operator'** after each other will create the following.
```html
**{% $operator %}**
```
### Additional attributes for an input field
May you want to give your customer more freedom and seek to create an open text input field, you can use the following attributes.

<ul>
<li>name: </br>
The name (key) under which the entered text gets saved, if you have multiple inputs, use different names. </li>
<li>placeholder: </br>
A guiding text shown when the input is empty. </li>
<li>required: </br>
Use if the input field is required</li>
<li>defaultValue: </br>
The value the input is filled with by default. This can be overwritten by your customer</li>
<li>value: </br>
The value the input is filled with. Fixed value Value that cannot be changed</li>
</ul>

### Examples
To show you what's possible using the waivers we've created a few examples below which you can copy and paste into your custom waiver.

#### Date Input Field + Title & Guiding Text
```html
{% div classname="text-m text-slate-400" %}**Input Field Title Here**{% /div %} {% input name="First_day" placeholder="dd-mm-yyyy"/%} 
```
#### Date Input Field + Small Title + Default Value
```html
{% div className="text-xs text-slate-500" %}**Input Field Title Here**{% /div %} {% input name="start_date" placeholder="dd-mm-yyyy" /%} 
```

<div class="w-full md:w-3/5 mx-auto text-left">
  <img 
    src="/images/input-field-example-1.png" 
    alt="Selecting the product page through the hamburger menu"
  />
</div>