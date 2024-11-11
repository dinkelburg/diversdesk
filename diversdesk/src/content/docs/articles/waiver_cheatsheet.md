---
title: Waiver Cheatsheet 
description: In depth guide to create a custom waiver that meets your needs.
sidebar:
    label: Waiver Cheatsheet 
    order: 4
---

## Diversdesk Waiver Cheat Sheet
This is a quick reference full of examples you can implement to create your custom Waiver.

## Basic Syntax

<head>
  <!-- Add FontAwesome for the copy icon -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<table style="width: 100%; border-collapse: collapse;">
  <tr>
    <th style="padding: 8px; text-align: center; width: auto;">Element</th>
    <th style="padding: 8px; text-align: center; width: 50%;">Markdown</th>
    <th style="padding: 8px; text-align: center; width: 50%;">Rendered Output</th>
  </tr>

  <!-- Heading Level 1 -->
  <tr>
    <td class="no-border"><pre>Heading 1</pre></td>
    <td onclick="copyToClipboard(this)">
      <span class="markdown-text"># Heading level 1</span>
      <button class="copy-btn"><i class="far fa-copy"></i></button>
      <span class="copied-message">Copied!</span>
    </td>
    <td><h1>Heading 1</h1></td>
  </tr>

  <!-- Heading Level 2 -->
  <tr>
    <td class="no-border"><pre>Heading 2</pre></td>
    <td onclick="copyToClipboard(this)">
      <span class="markdown-text">## Heading level 2</span>
      <button class="copy-btn"><i class="far fa-copy"></i></button>
      <span class="copied-message">Copied!</span>
    </td>
    <td><h2>Heading 2</h2></td>
  </tr>

  <!-- Heading Level 3 -->
  <tr>
    <td class="no-border"><pre>Heading 3</pre></td>
    <td onclick="copyToClipboard(this)">
      <span class="markdown-text">## Heading level 3</span>
      <button class="copy-btn"><i class="far fa-copy"></i></button>
      <span class="copied-message">Copied!</span>
    </td>
    <td><h3>Heading 3</h3></td>
  </tr>

  <!-- Heading Level 4 -->
  <tr>
    <td class="no-border"><pre>Heading 4</pre></td>
    <td onclick="copyToClipboard(this)">
      <span class="markdown-text">## Heading level 4</span>
      <button class="copy-btn"><i class="far fa-copy"></i></button>
      <span class="copied-message">Copied!</span>
    </td>
    <td><h4>Heading 4</h4></td>
  </tr>

  <!-- Bold Text -->
  <tr>
    <td class="no-border"><pre>Bold</pre></td>
    <td onclick="copyToClipboard(this)">
      <span class="markdown-text">**Bold text**</span>
      <button class="copy-btn"><i class="far fa-copy"></i></button>
      <span class="copied-message">Copied!</span>
    </td>
    <td><b>Bold text</b></td>
  </tr>

  <!-- Italic Text -->
  <tr>
    <td class="no-border"><pre>Italic</pre></td>
    <td onclick="copyToClipboard(this)">
      <span class="markdown-text">*Italic text*</span>
      <button class="copy-btn"><i class="far fa-copy"></i></button>
      <span class="copied-message">Copied!</span>
    </td>
    <td><i>Italic text</i></td>
  </tr>

  <!-- Blockquote -->
  <tr>
    <td class="no-border"><pre>Blockquote</pre></td>
    <td onclick="copyToClipboard(this)">
      <span class="markdown-text">>Blockquote</span>
      <button class="copy-btn"><i class="far fa-copy"></i></button>
      <span class="copied-message">Copied!</span>
    </td>
    <td><blockquote>Blockquote</blockquote></td>
  </tr>

<!-- Ordered List -->
<tr>
  <td class="no-border"><pre>Ordered List</pre></td>
  <td onclick="copyToClipboard(this)">
    <span class="markdown-text">1. List Item One
2. List Item Two
</span>
    <button class="copy-btn"><i class="far fa-copy"></i></button>
    <span class="copied-message">Copied!</span>
  </td>
  <td>
    1. List Item One <br>
    2. List Item Two
  </td>
</tr>  
<!-- Unordered List --> 
<tr>
  <td class="no-border"><pre>Ordered List</pre></td>
  <td onclick="copyToClipboard(this)">
    <span class="markdown-text">- List Item One
- List Item Two
</span>
    <button class="copy-btn"><i class="far fa-copy"></i></button>
    <span class="copied-message">Copied!</span>
  </td>
  <td>
  <li> List Item One </li>
  <li> List Item Two </li>
  </td>
</tr>
<!-- Horizontal line -->
<tr>
  <td class="no-border"><pre>Horizontal Line</pre></td>
  <td onclick="copyToClipboard(this)">
    <span class="markdown-text">---
</span>
    <button class="copy-btn"><i class="far fa-copy"></i></button>
    <span class="copied-message">Copied!</span>
  </td>
  <td>
   <hr> <!-- This will render as a horizontal line -->
  </td>
</tr>
</table>


## Input Field Examples

<!-- Second Table with Two Columns -->
<table class="full-width-table">
  <tr>
    <td onclick="copyToClipboard(this)">
      <span class="markdown-text">{% div classname="text-xs text-slate-400" %}**Start Date**{% /div %} {% input name="start_date" placeholder="dd-mm-yyyy" required=true/%}</span>
      <button class="copy-btn"><i class="far fa-copy"></i></button>
      <span class="copied-message">Copied!</span>
    </td>
    <td>
      <img src="/images/input-field-start-date.png" alt="Example Image">
    </td>
  </tr>
  <tr>
    <td onclick="copyToClipboard(this)">
      <span class="markdown-text">{% div className="text-xl text-slate-500" %}Instructor or Guide{% /div %} {% input name="instructor_name" placeholder="Fill a name here"/%}</span>
      <button class="copy-btn"><i class="far fa-copy"></i></button>
      <span class="copied-message">Copied!</span>
    </td>
    <td>
      <img src="/images/input-field-is-or-guide.png" alt="Example Image">
    </td>
  </tr>
</table>

## Image attributes

<!-- 3rd Table with Two Columns -->
<table class="full-width-table">
<!-- Image 1 -->
  <tr>
    <td onclick="copyToClipboard(this)">
      <span class="markdown-text">
![Alt text](https://example.com/example-image.png "Optional Title")</span>
      <button class="copy-btn"><i class="far fa-copy"></i></button>
      <span class="copied-message">Copied!</span>
    </td>
    <td>
      <img src="/images/example-image.png" alt="Example Image">
    </td>
  </tr>
<!-- Image and Header -->
    <tr>
    <td onclick="copyToClipboard(this)">
      <span class="markdown-text">{% div className="flex gap-3" %}
{% div className="w-24" %}
![diversdesklogo](/images/ddlogo.png)
{% /div %}
{% div %}
# Example Waiver Header
## Example Waiver Sub-Header 
{% /div %}
{% /div %}</span>
      <button class="copy-btn"><i class="far fa-copy"></i></button>
      <span class="copied-message">Copied!</span>
    </td>
    <td>
      <img src="/images/example-image-incl-header.png" alt="Example Image">
    </td>
  </tr>
</table>

## Example Waiver

The example waiver below includes most of the elements mentioned in the code examples. It can be used as a handy base where you can simply remove the elements you don’t need.

```html
# Example Waiver

This is a numbered example waiver that holds both the participant and operator as an exmaple.

{% div className="flex gap-3 " %}
{% div className="w-6" %}
**1.**
{% /div %}
{% div %}
Chapter 1 example including indentation. 
{% /div %}
{% /div %}

{% div className="flex gap-3 " %}
{% div className="w-6" %}
**2.**
{% /div %}
{% div %}
Chapter 2 example including indentation
{% /div %}
{% /div %}
This is how you add the participant name: I, {% input value=$participant /%}, now understand how I can create a custom waiver.{% br /%} {% br /%}

---
{% br /%}
## Heading 2 
Your company name can automatically be shown through **{% $operator %}**. Handy if you use a waiver across different branches. Alternatively, you can ofcourse choose to simply write **your company name**.{% br /%} {% br /%}
---

{% br /%}
### Heading 3
A chapter under heading 3 to show you a custom input field to fill the Instructor or Guide's name.
{% input name="instructor_name" placeholder="Instructor or Guide Name"/%}
Followed by a horizontal line.
---
{% br /%}
You got the option to add a smaller footnote text under the signature by using the following:
{% br /%} {% br /%}
{% signature /%}
{% div className="text-xs text-slate-400" %}
Footnote text that is slightly smaller and lighter in color.   
{% /div %}
```

<div class="w-full" style="margin-left: 0;">
  <img 
    src="/images/custom_waiver_screens.png" 
    alt="Create a new waiver through the 'Create' hyperlink"
  />
</div>

<script>
  let lastCopiedMessage = null;

function copyToClipboard(element) {
  // Extract the text content from the cell and replace <br> with real newlines
  const text = element.querySelector('.markdown-text').innerHTML.replace(/<br\s*\/?>/gi, '\n');
  navigator.clipboard.writeText(text).then(() => {
    // Hide the previous "Copied!" message if it's still visible
    if (lastCopiedMessage) {
      lastCopiedMessage.style.display = 'none';
    }
    // Display the new "Copied!" message
    const copiedMessage = element.querySelector('.copied-message');
    copiedMessage.style.display = 'inline';
    lastCopiedMessage = copiedMessage;

    setTimeout(() => {
      copiedMessage.style.display = 'none';
    }, 2000);
  });
}
</script>


<style>
  /* Existing styles for the first table */
  .copied-message {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    background-color: #078662;
    padding: 3px 8px;
    border-radius: 5px;
    font-size: 12px;
    z-index: 10;
  }

  .copy-btn {
    border: none;
    background: none;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    padding: 5px;
    color: #FF7558;
  }

  .copy-btn i {
    font-size: 12px;
    color: #FF7558;
  }

  .copy-btn:hover i {
    color: #FF5733;
  }

  .markdown-text {
    padding-right: 40px;
    display: inline-block;
    white-space: pre-wrap;
  }

  table {
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
  }

  th, td {
    padding: 12px;
    text-align: left;
    position: relative;
  }

  td:hover {
    background-color: #f0f0f0;
  }

  .no-border pre {
    margin: 0;
    padding: 5px;
    text-align: left;
    border: none;
    background: none;
  }

  /* New styles specifically for the second table */
  .full-width-table {
    width: 100%;
    margin: 20px 0;
    border-collapse: collapse;
  }

  .full-width-table td {
    width: 50%;
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
    vertical-align: top;
  }

  .full-width-table td img {
    max-width: 100%;
    height: auto;
  }
</style>
