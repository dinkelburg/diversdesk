---
title: "How Diversdesk Protects Your Data"
description: "Understand how Diversdesk protects your dive business data with private document storage, controlled staff access, secure sign-in, and cloud storage encryption."
slug: docs/insights/data-safety
sidebar:
  label: Data Safety
  order: 1
robots: noindex
---

**Protecting your business and customer data is a core part of Diversdesk.** Our document storage is built on enterprise cloud infrastructure through Google Cloud Storage, with **AES-256 encryption at rest**, private storage for signed waiver PDFs, and temporary document download links. Secure sign-in and staff permissions add protection inside the application.

These protections are part of the service, alongside ongoing security updates and backups. **You can confidently use Diversdesk for the customer records, bookings, and paperwork your operation needs.** The sections below explain how access is controlled, how authority requests are handled, and how your team can manage information safely.

## Who Can Access Our Business Records?

Your business records are associated with your operation, and staff access depends on memberships and permissions. **Other dive centers do not gain access to your customer list or business records simply because they also use Diversdesk.**

Access also includes the customer-facing features you use. Booking and registration links can give their holders access to the relevant booking or participant information. Share them only with the intended recipients and treat them as confidential. These links are separate from the temporary document download links described below; the ten-minute expiry does not apply to every customer-facing link.

**Diversdesk administrators have privileged access.** The platform is not a storage vault that only your business can decrypt. Encryption protects stored files, while application permissions control access during normal use. Our [Privacy Policy](/privacy-policy/) also states that we do not rent or sell your information to third parties outside Diversdesk or the company.

## Would You Give an Authority Access to Our Data?

**An authority's request is not automatic permission to view your records.** Any request needs to be assessed under applicable law and our Privacy Policy.

The policy allows us to access, preserve, or disclose information when we have a good-faith belief that the law requires it, such as in response to a court order, warrant, or subpoena. It also allows disclosure in specified fraud-prevention, illegal-activity, protection, and safety situations. Information subject to a legal request or investigation may need to be retained longer.

That means we cannot promise that your records could never be disclosed. Privacy and security protections do not make stored information exempt from legal obligations. See **Legal Requests and Preventing Harm** in our [Privacy Policy](/privacy-policy/) for the full wording.

## Should We Add Everything to Diversdesk?

Diversdesk is built to manage your operational records, including bookings, customer details, signed waivers, and the registration information your business needs. These are the records its workflows are designed to handle.

**Store what you need to run your operation, rather than every piece of information you have.** Keep notes factual and relevant, collect sensitive information only when needed, and review who can access it and how long you should retain it. Do not use customer notes or uploads to store passwords, login codes, or unrelated confidential material.

Medical declarations and identity documents deserve particular care. Use the relevant registration or document workflow when your operation needs them, and contact support if you are unsure where a sensitive record belongs. This approach helps you use Diversdesk confidently without collecting unnecessary information.

## Professional Cloud Infrastructure

Our hosting setup is based in Singapore. For document storage, Diversdesk uses **Google Cloud Storage**, a managed service backed by Google's cloud infrastructure.

Google Cloud Storage automatically encrypts stored files before writing them to disk. Google documents the use of **AES-256 encryption at rest** and, for its standard encryption, the same hardened key management systems it uses for its own encrypted data. You can read more in [Google's Cloud Storage encryption documentation](https://docs.cloud.google.com/storage/docs/encryption/default-keys).

For your operation, that means signed waiver PDFs stored through this service benefit from established cloud storage encryption. Diversdesk adds its own application controls to decide who can access those documents.

## Private Storage for Signed Waivers

Signed waivers can contain personal and medical information. When Diversdesk generates a signed waiver PDF, it saves the document in private cloud storage and attaches it to the relevant participant waiver record.

**Generated signed waiver PDFs are marked private**, keeping them separate from public files such as images used on a registration page. This distinction lets you present your business publicly while handling signed customer documents through a controlled access flow.

## Permission Checks and Temporary Download Links

When someone requests a private document through Diversdesk, the application checks whether they have access to the associated record before issuing a download link.

The standard file download flow uses a **signed link that expires after ten minutes**. The signature authorizes access to that particular file for a limited period; the link does not provide a permanent public address for the document.

During that period, anyone holding the link may be able to use it, so treat it as confidential. A downloaded copy remains on the receiving device after the link expires. Your team should handle those copies with the same care as any other customer record.

## Staff Access That Fits Their Responsibilities

Your team members have different responsibilities, and their access should reflect that. Diversdesk supports staff roles and permissions so you can give people the access their work requires.

For example, an instructor without an additional role can view their own schedule. Staff+ access provides broader visibility into planning and day operations, with limited operational editing. Managers have broader access to view and edit the operation's content. See the [staff permissions guide](/user_manual/staff/permissions/) for details.

Assigning the appropriate role helps you control who can view information and make changes. Review access when staff join, change responsibilities, or leave your business.

## Secure Sign-In and Protected Sessions

Diversdesk offers sign-in through a Google account, email verification, or a password. Email one-time passwords have a short validity period, and Google sign-in tokens are verified on the server.

For password-based access, **passwords are stored as salted hashes**, rather than readable passwords. This allows the application to check a password without storing the original text.

Your login session is protected by a signed cookie sent over a secure connection. The application checks the signature to reject altered session information and checks whether your session has expired or been ended. The cookie is also protected from access by ordinary browser scripts.

Use individual accounts for your team and protect the email or Google accounts used to sign in. Those accounts are an important part of keeping access to your operation secure.

## Backups and Ongoing Maintenance

Data protection also means preparing for loss and keeping software maintained. Diversdesk's service includes security backups and centrally delivered security patches and bug fixes, as described in our [Terms and Conditions](/terms-conditions/).

If you need help with missing records or recovering data, contact support with the affected booking or customer record and when you noticed the issue. The team can assess the available recovery options. Contact us for details about backup retention and recovery arrangements for your service.

## Supporting Responsible Data Handling

The protections in Diversdesk support your team's day-to-day handling of customer information. Your operation also determines which information to collect, who should have access, and how long records are needed.

Collect only the information your operation needs, review staff permissions, and handle exports and downloaded documents carefully. For customer information entered into the software, our terms describe your business as the data controller and Diversdesk as the data processor.

Our [Privacy Policy](/privacy-policy/) and [Terms and Conditions](/terms-conditions/) explain the contractual arrangements. Contact us if you need details about processing locations, service providers, or support with a data request.

## Talk to Us About Data Protection

If you have a question about staff access, a customer data request, or a document shared with the wrong person, contact support. Include the relevant record reference and a description of the issue. Avoid sending passwords, login codes, or unnecessary copies of sensitive customer documents.

**Have a question about your data?** [Contact the Diversdesk team](/contact/).
