import type { SolutionSlug } from "./newLanding";

// Shared by the navigation and directory so both expose the same feature set.
export const featureGroups = [
  {
    id: "bookings-payments",
    title: "Bookings & payments",
    description: "Connect the sale, the guest, and the payment.",
    features: [
      { slug: "booking-engine-channel-manager", label: "Online bookings & availability" },
      { slug: "agents-partners-portal", label: "Agent & partner portal" },
      { slug: "group-bookings-split-billing-discounts", label: "Group bookings & split billing" },
      { slug: "payment-gateways", label: "Online payments" },
      { slug: "finance-bookkeeping", label: "Financial tracking & bookkeeping" },
    ],
  },
  {
    id: "daily-operations",
    title: "Daily operations",
    description: "Prepare guests, plan the day, and coordinate your team.",
    features: [
      { slug: "digital-onboarding", label: "Digital onboarding & waivers" },
      { slug: "planner-scheduling", label: "Planning & scheduling" },
      { slug: "inventory-pos-rentals", label: "Inventory, retail & rentals" },
      { slug: "staff-wages-workload", label: "Staff workload & wages" },
    ],
  },
  {
    id: "accommodation-liveaboards",
    title: "Accommodation & liveaboards",
    description: "Bring stays and departures into your guest workflow.",
    features: [
      { slug: "accommodation-channel-manager", label: "Accommodation & channel management" },
      { slug: "vessel-cabin-management", label: "Vessel & cabin management" },
      { slug: "manifests-guest-automation", label: "Manifests & guest preparation" },
    ],
  },
];

type Step = { title: string; text: string };
interface FeatureContent {
  heading: string;
  steps: Step[];
  contexts: Partial<Record<SolutionSlug, string>>;
  questions: { question: string; answer: string }[];
  guides: { title: string; href: string; description: string }[];
  related: string[];
}

export const featureContent: Record<string, FeatureContent> = {
  "digital-onboarding": {
    heading: "Digital registration and waivers for dive businesses.",
    steps: [
      { title: "Set up the guest journey", text: "Choose the registration details and waivers your guests need. Custom waivers can have their own language, validity period, and signature requirement." },
      { title: "Share the booking link", text: "Send guests their booking URL by email, WhatsApp, or your preferred channel so they can review their booking and complete their registration before arrival." },
      { title: "Prepare for check-in", text: "Review the guest information and paperwork in the booking, then follow up on anything still missing before the activity or departure." },
    ],
    contexts: {
      "dive-centers": "Prepare fun divers and course students before they reach the front desk. Connect the appropriate registration and waivers to their onboarding journey.",
      "dive-resorts": "Use the time before check-in to collect diver information, so your dive team can prepare activities while the front office handles the arrival.",
      liveaboards: "Share the booking link before embarkation so guests can complete their required paperwork. For partner bookings, guest registration stays separate from partner settlement.",
    },
    questions: [
      { question: "Can I customize the waivers guests receive?", answer: "Yes. Custom waivers support language-specific names and text, a validity period, and a signature requirement. Connect the relevant waivers to your onboarding journey." },
      { question: "Does copying the booking link send an email?", answer: "No. Copy the booking URL and send it through your chosen communication channel. In the partner portal, copying the URL does not itself send an email." },
    ],
    guides: [
      { title: "Create an onboarding journey", href: "/help/operators/workflows/creating-onboarding-journeys/", description: "See how custom waivers and registration journeys are configured." },
      { title: "Share guest paperwork through the partner portal", href: "/help/partners/liveaboard-partner-portal/paperwork/", description: "Review what guests see when they open their booking link." },
    ],
    related: ["booking-engine-channel-manager", "planner-scheduling", "manifests-guest-automation"],
  },
  "planner-scheduling": {
    heading: "Plan dive trips, courses, and resources in one place.",
    steps: [
      { title: "Review the day", text: "Bring scheduled activities, guests, staff, and boats into a visual planning workspace instead of rebuilding the day in a spreadsheet." },
      { title: "Make the assignments", text: "Coordinate the people and resources needed for each trip or course, with booking information close to the operational plan." },
      { title: "Adjust when plans change", text: "Use the planner to handle guest moves and changes to trips. Review the destination and capacity when moving a group." },
    ],
    contexts: {
      "dive-centers": "Coordinate several trips or courses on the same day. Keep the guest schedule and staff assignments visible when a boat, group, or activity changes.",
      "dive-resorts": "Plan diving across a guest's stay and give your dive team a shared view of scheduled activities alongside the resort's booking workflow.",
    },
    questions: [
      { question: "How does the planner relate to direct bookings?", answer: "Direct activity bookings are automatically scheduled in the planner and identified as direct bookings. Staff can then coordinate the operational resources around them." },
      { question: "Where can I learn the newer planner workflow?", answer: "The Planner Beta guide explains Trip Focus, guest moves, and capacity checks. Use the guide for the planner version enabled in your workspace." },
    ],
    guides: [
      { title: "Planner guide", href: "/help/operators/user_manual/activities/planner/", description: "Follow the day-to-day scheduling workflow." },
      { title: "Planner Beta guide", href: "/help/operators/user_manual/activities/beta-planner/", description: "Explore Trip Focus and changes to guest assignments." },
    ],
    related: ["booking-engine-channel-manager", "staff-wages-workload", "digital-onboarding"],
  },
  "booking-engine-channel-manager": {
    heading: "Turn website visitors into dive bookings.",
    steps: [
      { title: "Choose the booking entry point", text: "Link customers to your webshop, a specific activity, or its booking form. You can also embed the webshop or a booking page in your website." },
      { title: "Let guests select their activity", text: "Customers choose the activity, date, and participants, then enter their booking details. You decide how much registration information to request." },
      { title: "Continue into guest preparation", text: "The activity booking appears in the planner, and guests continue to the registration page for the paperwork connected to their journey." },
    ],
    contexts: {
      "dive-centers": "Let visitors book an activity and date from your website, then bring that booking into the planner for staff and resource assignments.",
      "dive-resorts": "Offer a direct route to book diving and connect visitors to your accommodation offering. Keep each product's availability and setup clear.",
      liveaboards: "Connect departure availability with your sales workflow. Use the partner portal for agent-led cabin reservations and review the terms of each booking.",
    },
    questions: [
      { question: "Do customers have to start on the full webshop?", answer: "No. You can share the full My Page webshop, a specific activity, or a link directly to the activity's booking form." },
      { question: "Can I embed bookings in my own website?", answer: "Yes. The website integration guide covers embedding your DiversDesk webshop or a specific booking page using an iframe." },
    ],
    guides: [
      { title: "Set up direct bookings", href: "/help/operators/features-resources/direct-bookings/", description: "Compare entry points and follow the customer booking flow." },
      { title: "Website integration guide", href: "/help/operators/features-resources/website-iframe-integration/", description: "Embed the booking experience in your website." },
    ],
    related: ["digital-onboarding", "agents-partners-portal", "payment-gateways"],
  },
  "inventory-pos-rentals": {
    heading: "Keep equipment rentals and retail sales connected to guests.",
    steps: [
      { title: "Organize what you offer", text: "Set up rental items and retail stock so your team can work from a shared list of equipment and products." },
      { title: "Record rentals and purchases", text: "Keep guest rentals, retail purchases, and extras within the commercial workflow rather than maintaining separate checkout notes." },
      { title: "Review equipment and stock", text: "Use the rental overview and retail stock pages to review the items your team manages and the sales attached to guest records." },
    ],
    contexts: {
      "dive-centers": "Coordinate rental equipment for divers and record shop purchases alongside their booking, so reception can review the guest's charges together.",
      "dive-resorts": "Keep gear rental and dive-shop purchases connected to the guest, reducing handoffs between the dive operation and the team reviewing charges.",
      liveaboards: "Record rental equipment and onboard purchases against the guest workflow so extras are available when the team reviews final billing.",
    },
    questions: [
      { question: "Where does my team manage rental items?", answer: "Rental Items is used to set up your rental offering. Rental Overview provides a separate view for reviewing rental activity." },
      { question: "Is retail stock managed in the rental list?", answer: "Retail stock has its own page within the retail and POS workflow. Rentals and retail remain distinct activities within the same platform." },
    ],
    guides: [
      { title: "Rental items guide", href: "/help/operators/user_manual/rentals/rental-items/", description: "Set up the equipment you make available for rental." },
      { title: "Retail stock guide", href: "/help/operators/user_manual/retail-pos/retail-stock/", description: "Review the retail inventory workflow." },
    ],
    related: ["finance-bookkeeping", "payment-gateways", "planner-scheduling"],
  },
  "staff-wages-workload": {
    heading: "Connect staff workload with the activities you run.",
    steps: [
      { title: "Plan the assignments", text: "Use the operational schedule to coordinate instructors and other team members around the activities being delivered." },
      { title: "Review workload", text: "Check how scheduled work is distributed across the team and identify days with unusually high planning pressure." },
      { title: "Prepare the wage review", text: "Keep wage-relevant activity close to the operational record so managers have the assignment context when reviewing staff work." },
    ],
    contexts: {
      "dive-centers": "Compare instructor workload across courses and trips when making the next assignment, rather than relying on a separate staffing spreadsheet.",
      "dive-resorts": "Review pressure across a busy week of guest activities and adjust the dive team's assignments using the same planning information.",
    },
    questions: [
      { question: "What does the Workload page show?", answer: "It helps managers review how work is distributed across instructors or team members and spot periods with high scheduling pressure." },
      { question: "How does workload differ from the planner?", answer: "The planner supports day-to-day scheduling. Workload is a management view that supports staffing decisions based on the scheduled operational load." },
    ],
    guides: [{ title: "Staff workload guide", href: "/help/operators/user_manual/staff/workload/", description: "Understand the management view alongside the planner and manifest." }],
    related: ["planner-scheduling", "finance-bookkeeping", "booking-engine-channel-manager"],
  },
  "finance-bookkeeping": {
    heading: "Connect booking activity, payment records, and bookkeeping.",
    steps: [
      { title: "Review what was sold", text: "Use the sales workflow to review commercial activity connected to guest bookings and other customer purchases." },
      { title: "Check the payments", text: "Review payment history and statuses separately from the sold products, including pending, completed, and refunded payments." },
      { title: "Connect QuickBooks", text: "Connect your QuickBooks account, review the tax-code setup, and assign the integration to the relevant payment methods." },
    ],
    contexts: {
      "dive-centers": "Review payments for courses, trips, rentals, and shop purchases using records connected to the daily operation.",
      "dive-resorts": "Keep room and activity billing within the guest workflow, then review sales and payment activity with your finance team.",
      liveaboards: "Follow the commercial record from reservation to guest extras. For partner bookings, distinguish the partner's settlement from customer payment arrangements.",
    },
    questions: [
      { question: "Does DiversDesk have a QuickBooks integration?", answer: "Yes. The setup guide covers connecting your QuickBooks account, reviewing tax codes, and assigning the integration to payment methods in DiversDesk." },
      { question: "Why are Sales and Payments separate views?", answer: "Sales focuses on the product or service sold. Payments focuses on the transaction history and status of incoming or returned money." },
    ],
    guides: [
      { title: "Connect QuickBooks", href: "/help/operators/features-resources/connecting-quickbooks/", description: "Follow the account connection and payment-method setup." },
      { title: "Payments reporting guide", href: "/help/operators/user_manual/reporting/payments/", description: "Review payment history and transaction statuses." },
    ],
    related: ["payment-gateways", "group-bookings-split-billing-discounts", "inventory-pos-rentals"],
  },
  "payment-gateways": {
    heading: "Keep online payments connected to the booking.",
    steps: [
      { title: "Configure your payment options", text: "Choose the payment setup for your operation and the collection steps guests should complete as part of their booking journey." },
      { title: "Share the customer booking", text: "Give guests access to their booking so they can review the information and complete the payment steps required for that reservation." },
      { title: "Review payment status", text: "Use the Payments page to check the transaction history, including pending payments, completed payments, and refunds." },
    ],
    contexts: {
      "dive-centers": "Collect payment as part of the booking journey and let reception check the payment record before the guest's activity.",
      "dive-resorts": "Keep payment activity connected to guest reservations so the team can review the record when discussing room and activity charges.",
      liveaboards: "Review the payment schedule and collector for each reservation. Partner transfers and customer payments can have different responsibilities and deadlines.",
    },
    questions: [
      { question: "Where can staff check whether a payment completed?", answer: "The Payments page shows payment activity linked to bookings, webshop checkouts, and customer sales, including status and payment history." },
      { question: "Does a reported partner transfer count as a recorded payment?", answer: "No. In the partner workflow, a reported transfer awaiting review still needs operator review. The outstanding balance changes when payment is recorded." },
    ],
    guides: [
      { title: "Review payments", href: "/help/operators/user_manual/reporting/payments/", description: "Check incoming payments, refunds, and transaction history." },
      { title: "Partner invoices and payments", href: "/help/partners/liveaboard-partner-portal/payments/", description: "Understand settlement responsibilities and transfer reporting." },
    ],
    related: ["finance-bookkeeping", "booking-engine-channel-manager", "group-bookings-split-billing-discounts"],
  },
  "agents-partners-portal": {
    heading: "Give liveaboard partners a clear path from availability to booking.",
    steps: [
      { title: "Check departure availability", text: "Invited partners select the operator, vessel, dates, and guest count, then review cabins, prices, and departure information." },
      { title: "Place and confirm an option", text: "Partners choose cabins and place an option. They review its deadline and any approval requirements before confirming the reservation." },
      { title: "Prepare guests and settlement", text: "Partners share the guest paperwork link, access their invoice, and report transfers according to the reservation's payment instructions." },
    ],
    contexts: {
      "dive-centers": "When arranging liveaboard travel for your divers through an operator that invites you, use the partner portal to check departures and manage the reservation.",
      "dive-resorts": "Use an invited partner account to arrange onward liveaboard travel for guests, keeping paperwork and the operator's payment deadlines visible in the reservation.",
      liveaboards: "Give invited agents access to departure and cabin availability, then keep options, confirmations, guest paperwork, and settlement within the partner booking workflow.",
    },
    questions: [
      { question: "Does viewing a departure reserve cabin space?", answer: "No. Opening a trip shows available spaces. The partner must choose cabins and complete the option workflow to request the reservation." },
      { question: "Will guests see the partner's contracted prices?", answer: "The guest paperwork view shows partner-billed items as Through partner instead of displaying partner prices. Separately charged customer extras may still show prices." },
    ],
    guides: [{ title: "Partner booking manual", href: "/help/partners/", description: "Walk through availability, options, confirmation, paperwork, and settlement." }],
    related: ["vessel-cabin-management", "digital-onboarding", "payment-gateways"],
  },
  "accommodation-channel-manager": {
    heading: "Manage accommodation alongside your dive operation.",
    steps: [
      { title: "Set up room types and rooms", text: "Define room types, standard and maximum occupancy, base prices, and the individual bookable units beneath each room type." },
      { title: "Configure the rates", text: "Use price rules for nightly adjustments, seasonal pricing, or additional guests, with fixed amounts or percentage changes." },
      { title: "Manage reservations", text: "Use the accommodation calendar to work with reservations and keep the guest's stay connected to the wider booking workflow." },
    ],
    contexts: { "dive-resorts": "Coordinate the guest's room reservation with the diving you offer. Front office and dive staff can work within the same platform while using the views relevant to their responsibilities." },
    questions: [
      { question: "What is the difference between a room type and a room?", answer: "A room type defines shared characteristics such as occupancy and base price. Rooms are the individual bookable units beneath it, such as Room 1, Room 2, or individual beds." },
      { question: "Can rates change by season or occupancy?", answer: "Yes. Price rules support nightly adjustments and additional-person charges. Rules can use fixed amounts or percentages and can be restricted to days of the week." },
    ],
    guides: [
      { title: "Accommodation calendar guide", href: "/help/operators/user_manual/accommodation/calendar/", description: "Configure room types, units, reservations, and price rules." },
      { title: "Accommodation webshop guide", href: "/help/operators/user_manual/accommodation/webshop/", description: "Explore the accommodation booking experience." },
    ],
    related: ["group-bookings-split-billing-discounts", "digital-onboarding", "payment-gateways"],
  },
  "group-bookings-split-billing-discounts": {
    heading: "Manage group reservations and shared charges clearly.",
    steps: [
      { title: "Bring the group into one booking", text: "Keep the participants and booked activities together so staff can review the reservation before adjusting its charges." },
      { title: "Set the discount or split", text: "Use discount rules for the full booking or selected participants, and use split billing where charges need to be shared." },
      { title: "Preview before confirming", text: "Review the changed totals, warnings, and customer-facing billing outcome before saving the adjustment." },
    ],
    contexts: {
      "dive-centers": "Handle course groups and families with several participants. Review discounts and shared charges without losing the total booking picture.",
      "dive-resorts": "Coordinate groups booking a combination of stays and activities, with a clearer review of which participants or payers carry each charge.",
    },
    questions: [
      { question: "Can a discount apply to selected guests?", answer: "Yes. Discount targeting supports the full booking or selected participants, with fixed amounts and percentages." },
      { question: "Can staff review the result before saving?", answer: "Yes. The billing workflow includes a preview of totals and customer-facing outcomes so staff can review the adjustment before confirmation." },
    ],
    guides: [{ title: "Discount calculator guide", href: "/help/operators/features-resources/discount-calculator/", description: "Review discount rules, participant targeting, and shared amounts." }],
    related: ["booking-engine-channel-manager", "finance-bookkeeping", "accommodation-channel-manager"],
  },
  "vessel-cabin-management": {
    heading: "Connect cabin availability with liveaboard departures.",
    steps: [
      { title: "Review the departure", text: "Keep the vessel, dates, and cabin availability together so the sales team can work from the departure being sold." },
      { title: "Coordinate cabin reservations", text: "Connect cabin choices and guest counts with the reservation. Partner options have their own deadlines and may require approval." },
      { title: "Prepare the guest handoff", text: "Continue from the reservation into guest paperwork and the information needed to prepare the departure." },
    ],
    contexts: { liveaboards: "Keep cabin choices tied to a particular vessel and departure. Sales and crew can follow the reservation and its guest preparation without recreating the booking in a separate document." },
    questions: [
      { question: "Can partners filter departures before choosing cabins?", answer: "Yes. The partner availability workflow supports selecting an operator, vessel, dates, and number of guests before reviewing a departure's cabins and prices." },
      { question: "Are all partner options immediately confirmed?", answer: "No. Options have deadlines, and some requests require operator approval. A tentative departure also requires approval before confirmation." },
    ],
    guides: [{ title: "Departure availability and cabin selection", href: "/help/partners/liveaboard-partner-portal/availability/", description: "See the partner-facing workflow for departures, cabins, and holds." }],
    related: ["agents-partners-portal", "manifests-guest-automation", "payment-gateways"],
  },
  "manifests-guest-automation": {
    heading: "Prepare guest information before your liveaboard departs.",
    steps: [
      { title: "Collect guest paperwork", text: "Share the booking URL so guests can enter their registration information and complete the paperwork required for their trip." },
      { title: "Follow up on missing details", text: "Review the reservation and guest preparation before departure. Check the operator's communication settings rather than assuming an email has been sent." },
      { title: "Prepare the operational lists", text: "Use the collected guest and booking information for manifests and departure preparation instead of rebuilding the same details from messages." },
    ],
    contexts: { liveaboards: "Prepare crew and transfer information before embarkation. Keep guest details and paperwork connected to the reservation, with follow-up focused on the information still needed." },
    questions: [
      { question: "Where do guests complete their paperwork?", answer: "The booking URL opens their booking and guest-registration information. Named guests select their name and verify their email; unnamed guests can register for an available place." },
      { question: "Should partners wait for paperwork before arranging payment?", answer: "No. The partner manual treats paperwork and settlement as separate responsibilities. Follow the payment deadline while continuing to collect missing guest information." },
    ],
    guides: [
      { title: "Guest paperwork guide", href: "/help/partners/liveaboard-partner-portal/paperwork/", description: "Understand booking links, guest details, and paperwork follow-up." },
      { title: "Day manifest guide", href: "/help/liveaboard-operators/user_manual/activities/day-manifest/", description: "Review the guest and operational information available in the manifest." },
    ],
    related: ["digital-onboarding", "vessel-cabin-management", "agents-partners-portal"],
  },
};
