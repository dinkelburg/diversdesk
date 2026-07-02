import type { ImageMetadata } from "astro";
import heroImage from "@images/hero-image-1920.avif";
import plannerImage from "@images/iPad_pro_detailed_day.avif";
import waiversImage from "@images/custom_waivers_2.avif";
import bookingImage from "@images/blog/diversdesk-customer-booking-process.avif";
import staffImage from "@images/staff_calendar_ipad.png";
import financeImage from "@images/customer_database3.png";
import resortImage from "@images/insights/diversdesk-accommodation-mockup.avif";
import liveaboardImage from "@images/insights/liveaboard-ship.avif";
import opsImage from "@images/MacBookAir.png";

export type SolutionSlug = "dive-centers" | "dive-resorts" | "liveaboards";

export interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LandingFeature {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  detail: string;
  bullets: string[];
  outcomes: string[];
  image: ImageMetadata;
  imageAlt: string;
  appliesTo: SolutionSlug[];
  faqs: FaqItem[];
}

export interface SolutionPage {
  slug: SolutionSlug;
  label: string;
  shortLabel: string;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroIntro: string;
  valueProps: string[];
  pains: Array<{ title: string; text: string }>;
  stats: StatItem[];
  featureSlugs: string[];
  faqs: FaqItem[];
  ctaTitle: string;
  ctaBody: string;
}

export const homeHeroImage = heroImage;

export const homepageStats: StatItem[] = [
  {
    value: 65,
    suffix: "%",
    label: "Faster onboarding",
    detail: "Shorten the time it takes guests to register, sign waivers, and pay before arrival.",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Live availability",
    detail: "Keep direct sales, partners, and operations synced without manual updates.",
  },
  {
    value: 100,
    suffix: "%",
    label: "Paperless guest flow",
    detail: "Collect waivers, passport data, medical forms, and signatures in one digital journey.",
  },
  {
    value: 1,
    label: "Single source of truth",
    detail: "Replace spreadsheets and disconnected tools with one operational system for the business.",
  },
];

export const featureHubStats: StatItem[] = [
  {
    value: 12,
    label: "Core revenue modules",
    detail: "From onboarding and scheduling to POS, finance, reporting, and channel management.",
  },
  {
    value: 3,
    label: "Business models covered",
    detail: "Built for dive centers, resorts, and liveaboards without fragmenting your workflows.",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Always-on sales access",
    detail: "Let customers, agents, and staff access live availability whenever they need it.",
  },
  {
    value: 1,
    label: "Data backbone",
    detail: "Bookings, guests, products, and payments stay connected across the whole operation.",
  },
];

export const homepageFaqs: FaqItem[] = [
  {
    question: "What types of dive businesses can use DiversDesk?",
    answer: "DiversDesk is built for dive centers, dive resorts, and liveaboards that want one system for bookings, operations, onboarding, customer data, payments, and reporting.",
  },
  {
    question: "Can DiversDesk replace multiple tools at once?",
    answer: "Yes. Teams typically use DiversDesk to consolidate planning, scheduling, online bookings, digital onboarding, waivers, POS, CRM, billing, and bookkeeping workflows into one platform.",
  },
  {
    question: "How does DiversDesk reduce onboarding time?",
    answer: "Guests complete registration, waivers, diver medical information, payments, and supporting details through one guided digital flow before arrival, which removes repeated manual handoffs for staff.",
  },
  {
    question: "Can DiversDesk support multi-location or multi-unit operations?",
    answer: "Yes. The platform is designed to keep availability, staff, customer information, and operational workflows aligned across locations, rooms, boats, partners, or departments.",
  },
];

export const featuresFaqs: FaqItem[] = [
  {
    question: "Do I need every module from day one?",
    answer: "No. You can launch with the modules that remove your biggest operational bottlenecks first, then expand as your team adopts more workflows inside DiversDesk.",
  },
  {
    question: "Which features matter most for each business model?",
    answer: "Dive centers usually start with onboarding, planning, rentals, POS, and wages. Resorts add accommodation and split billing. Liveaboards focus on cabins, agents, manifests, and pre-arrival guest data.",
  },
  {
    question: "Can these features scale across multiple teams?",
    answer: "Yes. DiversDesk is designed so that availability, guest data, operational tasks, and financial events stay connected as your business adds more staff, departments, boats, or locations.",
  },
];

export const features: LandingFeature[] = [
  {
    slug: "digital-onboarding",
    title: "Digital onboarding",
    eyebrow: "Faster first impressions",
    summary: "Turn registration, waivers, diver medical collection, and prepayments into one polished guest journey.",
    detail: "Give guests a guided onboarding flow they can complete before they arrive, so your team starts the day with fewer bottlenecks and cleaner records.",
    bullets: [
      "Collect registration data, waivers, and medical details in one flow.",
      "Support multi-language guest journeys with fewer staff interventions.",
      "Reduce desk-side admin and start activities faster.",
    ],
    outcomes: [
      "Less paperwork to chase before check-in.",
      "Fewer errors caused by duplicate data entry.",
      "A smoother handoff from sales to operations.",
    ],
    image: waiversImage,
    imageAlt: "Digital onboarding screens showing registration and waiver completion on mobile.",
    appliesTo: ["dive-centers", "dive-resorts", "liveaboards"],
    faqs: [
      {
        question: "Can guests complete forms before arrival?",
        answer: "Yes. Guests can complete registration, waivers, medical data, and related onboarding steps before they arrive, which reduces congestion at check-in.",
      },
      {
        question: "Does digital onboarding improve operational accuracy?",
        answer: "Yes. When data is entered once by the guest and stored centrally, teams avoid repeated re-entry and reduce common mistakes tied to manual paperwork.",
      },
    ],
  },
  {
    slug: "planner-scheduling",
    title: "Intuitive planner and scheduling",
    eyebrow: "Operations without spreadsheet chaos",
    summary: "Manage trips, courses, staff, boats, and last-minute changes from one clear visual planner.",
    detail: "DiversDesk gives your operations team one place to understand capacity, shift resources quickly, and make confident decisions when the day changes.",
    bullets: [
      "View trips, staff, and assets in one scheduling workspace.",
      "Handle swaps, changes, and capacity issues without losing control.",
      "Give each role the visibility they need without distracting clutter.",
    ],
    outcomes: [
      "Less firefighting when schedules change.",
      "Better use of staff and equipment capacity.",
      "More confident planning during busy periods.",
    ],
    image: plannerImage,
    imageAlt: "A detailed planner view for daily dive operations.",
    appliesTo: ["dive-centers", "dive-resorts"],
    faqs: [
      {
        question: "Can the planner support multiple trips and resources at once?",
        answer: "Yes. The planner is built to coordinate multiple trips, staff members, boats, groups, and activity changes from one place.",
      },
      {
        question: "Is the planner useful for fast-moving operational teams?",
        answer: "Yes. It is designed to make daily adjustments, swaps, and capacity decisions quicker and easier than spreadsheet-based planning.",
      },
    ],
  },
  {
    slug: "booking-engine-channel-manager",
    title: "Booking engine and channel manager",
    eyebrow: "Sell with confidence",
    summary: "Use one booking backbone for direct sales, partner channels, and live availability across your operation.",
    detail: "Replace disconnected booking workflows with one engine that keeps products, inventory, and customer information aligned from inquiry to departure.",
    bullets: [
      "Publish bookable products through direct links or your website.",
      "Keep live availability aligned across channels and teams.",
      "Reduce the overbooking risk created by disconnected systems.",
    ],
    outcomes: [
      "More control over inventory and pricing decisions.",
      "Fewer booking mistakes and follow-up corrections.",
      "A cleaner source of truth for operations and revenue teams.",
    ],
    image: bookingImage,
    imageAlt: "A DiversDesk booking experience for customer reservations.",
    appliesTo: ["dive-centers", "dive-resorts", "liveaboards"],
    faqs: [
      {
        question: "Can DiversDesk support direct bookings and partner channels together?",
        answer: "Yes. Direct sales and partner-driven bookings can run against the same availability model so your team always works from current inventory.",
      },
      {
        question: "How does a single booking source help operations?",
        answer: "It prevents teams from reconciling multiple booking records manually and makes planning, guest management, and billing more reliable.",
      },
    ],
  },
  {
    slug: "inventory-pos-rentals",
    title: "Inventory suite, retail POS, and rentals",
    eyebrow: "Monetize every transaction",
    summary: "Track rentals, retail, and add-on purchases without breaking the guest journey or the audit trail.",
    detail: "Keep your inventory visible, your onboard or on-site sales tidy, and your team confident that every charge is attached to the right guest or booking.",
    bullets: [
      "Handle retail purchases, rentals, and extras in one workflow.",
      "Track stock and operational usage with fewer manual reconciliations.",
      "Keep sales activity tied to the customer and booking record.",
    ],
    outcomes: [
      "Fewer missed charges at checkout.",
      "Cleaner stock visibility across teams.",
      "Better margin control on add-ons and gear.",
    ],
    image: opsImage,
    imageAlt: "DiversDesk running on a laptop for commercial operations.",
    appliesTo: ["dive-centers", "dive-resorts", "liveaboards"],
    faqs: [
      {
        question: "Can retail and rentals live inside the same customer workflow?",
        answer: "Yes. Rentals, retail products, and operational extras can all be managed inside a connected commercial flow so staff do not need separate tools.",
      },
      {
        question: "Why does tying POS to bookings matter?",
        answer: "It reduces lost revenue, makes billing clearer, and helps teams understand the full commercial picture for each guest or group.",
      },
    ],
  },
  {
    slug: "staff-wages-workload",
    title: "Staff wages and workload",
    eyebrow: "Fairer planning, better visibility",
    summary: "Track workload, availability, and wage-relevant activity without maintaining manual side spreadsheets.",
    detail: "Give staff and managers visibility into who is working, what they are assigned to, and how work contributes to payroll calculations.",
    bullets: [
      "Monitor staff calendars and workload from the same operating system.",
      "Reduce manual effort needed for wage calculations and reconciliation.",
      "Bring operational and payroll visibility closer together.",
    ],
    outcomes: [
      "More balanced staffing decisions.",
      "Less back-office cleanup after busy days.",
      "Stronger trust in operational wage data.",
    ],
    image: staffImage,
    imageAlt: "A staff workload and calendar view on a tablet.",
    appliesTo: ["dive-centers", "dive-resorts"],
    faqs: [
      {
        question: "Can managers see workload and wage-related data together?",
        answer: "Yes. DiversDesk helps teams connect activity assignments, calendars, and wage-relevant operational data so payroll conversations become easier.",
      },
      {
        question: "Does this remove the need for manual workload tracking?",
        answer: "It significantly reduces it by keeping staff assignments and activity data in the same workflow used to run daily operations.",
      },
    ],
  },
  {
    slug: "finance-bookkeeping",
    title: "Financial tracking and bookkeeping integration",
    eyebrow: "Finance without rework",
    summary: "Keep billing, payment events, and bookkeeping visibility connected so the finance picture is clearer every day.",
    detail: "DiversDesk helps teams capture commercial activity closer to the point of operation while reducing the gap between operational work and finance follow-through.",
    bullets: [
      "Track billing and payment activity inside the same system as bookings.",
      "Improve handoff quality for external bookkeeping workflows.",
      "Reduce reconciliation friction caused by disconnected tools.",
    ],
    outcomes: [
      "More reliable financial visibility.",
      "Less duplicated administrative work.",
      "Stronger control over revenue follow-up.",
    ],
    image: financeImage,
    imageAlt: "A customer and finance view inside DiversDesk.",
    appliesTo: ["dive-centers", "dive-resorts", "liveaboards"],
    faqs: [
      {
        question: "Can DiversDesk help bridge operations and bookkeeping?",
        answer: "Yes. It captures the commercial events that operations teams create and makes those events easier to track, review, and pass into bookkeeping processes.",
      },
      {
        question: "Why is in-app financial tracking useful?",
        answer: "It gives managers clearer visibility into what has been sold, billed, or paid without waiting for information to be rebuilt from multiple systems later.",
      },
    ],
  },
  {
    slug: "payment-gateways",
    title: "Multiple payment gateway solutions",
    eyebrow: "Capture revenue earlier",
    summary: "Accept online payments and automate collection points so cash flow is stronger and staff spend less time chasing money.",
    detail: "Whether you are selling dives, rooms, cabins, or add-ons, DiversDesk helps move payment collection earlier in the guest journey and keeps transactions connected to the booking.",
    bullets: [
      "Support smoother prepayment and balance collection flows.",
      "Reduce manual payment follow-up by connecting transactions to bookings.",
      "Create a more professional experience for guests and partners.",
    ],
    outcomes: [
      "Improved cash flow visibility.",
      "Fewer missed or delayed payments.",
      "Less manual coordination between sales and finance.",
    ],
    image: financeImage,
    imageAlt: "A financial workflow linked to bookings and customers.",
    appliesTo: ["dive-centers", "dive-resorts", "liveaboards"],
    faqs: [
      {
        question: "Can online payments be tied back to the guest booking?",
        answer: "Yes. Payment activity is designed to stay connected to the booking and customer record so teams do not need separate tracking sheets.",
      },
      {
        question: "Why do multiple gateway options matter?",
        answer: "They help operators support different market needs, improve payment convenience, and avoid relying on one collection flow for every booking scenario.",
      },
    ],
  },
  {
    slug: "agents-partners-portal",
    title: "Agent and partner module",
    eyebrow: "Professional partner selling",
    summary: "Give partners access to live availability, contracted pricing, and cleaner booking collaboration without constant email loops.",
    detail: "A stronger partner workflow helps you grow distribution without surrendering control over inventory, pricing, or follow-up data.",
    bullets: [
      "Share live availability and partner pricing with less manual coordination.",
      "Reduce booking friction for agents and internal staff alike.",
      "Keep partner-driven bookings inside the same operational record.",
    ],
    outcomes: [
      "Faster response times for partner sales.",
      "Less channel confusion for staff.",
      "Better visibility into partner performance.",
    ],
    image: bookingImage,
    imageAlt: "A booking and availability view used to support partner sales.",
    appliesTo: ["dive-centers", "dive-resorts", "liveaboards"],
    faqs: [
      {
        question: "Can agents access live availability themselves?",
        answer: "Yes. DiversDesk can provide partners with controlled access to current availability and contracted commercial terms so they can move faster.",
      },
      {
        question: "Does the partner module help with sales oversight?",
        answer: "Yes. It keeps partner activity connected to the same commercial and operational record your internal team uses.",
      },
    ],
  },
  {
    slug: "accommodation-channel-manager",
    title: "Accommodation module and channel manager",
    eyebrow: "One stay, one journey",
    summary: "Coordinate rooms, diving, guest data, and availability so resort teams stop splitting the guest experience across systems.",
    detail: "For resorts, operations improve when room inventory, diving schedules, payments, and guest communication all reference the same booking reality.",
    bullets: [
      "Align accommodation inventory with dive activities and arrivals.",
      "Reduce guest-service handoffs between departments.",
      "Support a more connected pre-arrival and in-stay experience.",
    ],
    outcomes: [
      "Less departmental friction.",
      "Clearer visibility into the full guest stay.",
      "Stronger control over resort inventory and service delivery.",
    ],
    image: resortImage,
    imageAlt: "Accommodation management screens inside DiversDesk.",
    appliesTo: ["dive-resorts"],
    faqs: [
      {
        question: "Can resort teams manage rooms and diving together?",
        answer: "Yes. The accommodation module is designed to keep room inventory and dive operations connected so teams work from one guest picture.",
      },
      {
        question: "Why is a resort channel manager important?",
        answer: "It helps avoid fragmented availability management and supports a cleaner connection between direct sales, room inventory, and operational planning.",
      },
    ],
  },
  {
    slug: "group-bookings-split-billing-discounts",
    title: "Group bookings, split billing, and discounts",
    eyebrow: "Handle complexity without friction",
    summary: "Manage larger reservations, family or team travel, and mixed payment arrangements without losing billing control.",
    detail: "When bookings involve multiple guests, payers, rooms, or activities, DiversDesk helps teams stay organized and commercial decisions stay traceable.",
    bullets: [
      "Support more flexible billing arrangements for groups and mixed bookings.",
      "Reduce confusion when several people or companies are paying.",
      "Apply discount logic with more confidence and clearer records.",
    ],
    outcomes: [
      "Fewer billing disputes after confirmation.",
      "More confidence when selling packages and group experiences.",
      "Cleaner commercial records for staff and finance teams.",
    ],
    image: bookingImage,
    imageAlt: "A bookings workflow supporting more complex reservations.",
    appliesTo: ["dive-centers", "dive-resorts"],
    faqs: [
      {
        question: "Can DiversDesk handle group reservations with different payment setups?",
        answer: "Yes. It is designed to support more complex booking scenarios, including split billing and discount handling, without forcing staff into manual workarounds.",
      },
      {
        question: "Why do group bookings need a dedicated workflow?",
        answer: "Because group sales often combine multiple guests, products, rates, and payment responsibilities, which creates billing risk if teams rely on disconnected tools.",
      },
    ],
  },
  {
    slug: "vessel-cabin-management",
    title: "Vessel and cabin management",
    eyebrow: "Cabin inventory with control",
    summary: "Manage vessels, cabins, departures, and selling capacity from one place built for liveaboard operations.",
    detail: "Liveaboard operators need clear control over capacity, cabin assignments, departures, and partner sales without rebuilding manifests by hand.",
    bullets: [
      "Keep cabin inventory tied to real operational availability.",
      "Reduce the risk of conflicting vessel or departure records.",
      "Support crew and sales teams with one operational truth.",
    ],
    outcomes: [
      "More confident inventory control for departures.",
      "Less time spent reconciling cabin changes.",
      "A smoother handoff from sales to vessel operations.",
    ],
    image: liveaboardImage,
    imageAlt: "A liveaboard vessel used to represent fleet and cabin management.",
    appliesTo: ["liveaboards"],
    faqs: [
      {
        question: "Can DiversDesk manage cabins and vessel inventory together?",
        answer: "Yes. It is designed to help liveaboard operators control departures, cabins, guest assignments, and availability from one system.",
      },
      {
        question: "How does this help teams avoid overbooking cabins?",
        answer: "It keeps cabin and departure availability anchored to one source of truth rather than scattered partner updates or spreadsheet versions.",
      },
    ],
  },
  {
    slug: "manifests-guest-automation",
    title: "Manifest generation and guest automation",
    eyebrow: "Prepare every departure faster",
    summary: "Generate manifests, collect passport and diving data, and automate guest communications before boarding.",
    detail: "Liveaboard teams move faster when guest preparation, compliance data, reminders, and manifests are connected instead of rebuilt from inboxes and documents.",
    bullets: [
      "Collect passport, medical, and guest details before arrival.",
      "Automate reminders and pre-trip communications.",
      "Generate operational lists for crew, transfers, and departures faster.",
    ],
    outcomes: [
      "Less pre-departure admin stress.",
      "Better preparedness for crew and transfer teams.",
      "A more professional guest experience before embarkation.",
    ],
    image: liveaboardImage,
    imageAlt: "A liveaboard workflow representing guest preparation and manifest generation.",
    appliesTo: ["liveaboards"],
    faqs: [
      {
        question: "Can guests upload passport and medical data before boarding?",
        answer: "Yes. DiversDesk is designed to gather those details before arrival so crews are not chasing critical information at embarkation.",
      },
      {
        question: "Why does automated manifest preparation matter?",
        answer: "It reduces departure-day pressure, gives crews cleaner information, and helps ensure the operation is working from current guest data.",
      },
    ],
  },
];

export const solutions: SolutionPage[] = [
  {
    slug: "dive-centers",
    label: "Software for Dive Centers",
    shortLabel: "Dive Centers",
    metaTitle: "Dive Center Management Software Preview | DiversDesk",
    metaDescription: "Preview the new DiversDesk landing page for dive centers with digital onboarding, flexible planning, bookings, POS, wages, and finance workflows.",
    heroEyebrow: "Built for dive centers",
    heroTitle: "Run the whole dive center without juggling tools.",
    heroIntro: "DiversDesk helps dive centers bring bookings, planning, customer onboarding, rentals, retail, staff coordination, and finance tracking into one operating rhythm.",
    valueProps: [
      "Digital onboarding that shortens the line at the front desk.",
      "A flexible planner that gives operations instant clarity.",
      "Bookings, inventory, staff, and revenue connected in one flow.",
    ],
    pains: [
      {
        title: "No more spreadsheet handoffs",
        text: "Stop rebuilding the same booking, schedule, or billing story across separate tools every day.",
      },
      {
        title: "Sell, plan, and deliver from one source",
        text: "When bookings and planning are connected, your team can react faster without introducing avoidable mistakes.",
      },
      {
        title: "Make admin feel lighter",
        text: "Reduce repetitive work around registrations, rentals, wages, payments, and reconciliation.",
      },
    ],
    stats: [
      {
        value: 65,
        suffix: "%",
        label: "Faster guest onboarding",
        detail: "Complete registration, waivers, and prepayments before guests arrive at the desk.",
      },
      {
        value: 1,
        label: "Shared operating view",
        detail: "Bookings, schedules, staff, payments, and customers stay connected.",
      },
      {
        value: 24,
        suffix: "/7",
        label: "Booking visibility",
        detail: "Direct links and live availability reduce slow back-and-forth selling.",
      },
      {
        value: 100,
        suffix: "%",
        label: "Digital paperwork flow",
        detail: "Move waivers, medicals, and onboarding away from printed forms.",
      },
    ],
    featureSlugs: [
      "digital-onboarding",
      "planner-scheduling",
      "booking-engine-channel-manager",
      "inventory-pos-rentals",
      "staff-wages-workload",
      "finance-bookkeeping",
      "payment-gateways",
      "agents-partners-portal",
      "group-bookings-split-billing-discounts",
    ],
    faqs: [
      {
        question: "Can DiversDesk support trips, courses, rentals, and retail in one workflow?",
        answer: "Yes. DiversDesk is built to help dive centers coordinate commercial and operational workflows together instead of splitting them across separate systems.",
      },
      {
        question: "How does the booking engine reduce errors?",
        answer: "It keeps bookings aligned to one operational record so staff do not need to reconcile availability or customer details across disconnected tools.",
      },
      {
        question: "Can managers track workload and wages without extra spreadsheets?",
        answer: "Yes. Staff workload, assignments, and wage-relevant activity can be managed closer to the day-to-day operation.",
      },
      {
        question: "Can DiversDesk connect payments and bookkeeping workflows?",
        answer: "Yes. It is designed to keep billing and payment events visible inside the operating system while supporting cleaner downstream bookkeeping processes.",
      },
    ],
    ctaTitle: "Give your dive center one operating system.",
    ctaBody: "Replace admin drag with a clearer, faster, more professional guest and staff experience.",
  },
  {
    slug: "dive-resorts",
    label: "Software for Dive Resorts",
    shortLabel: "Dive Resorts",
    metaTitle: "Dive Resort Software Preview | DiversDesk",
    metaDescription: "Preview the new DiversDesk landing page for dive resorts with accommodation workflows, channel management, group bookings, split billing, and digital onboarding.",
    heroEyebrow: "Built for dive resorts",
    heroTitle: "Connect the guest stay, the dive schedule, and the billing flow.",
    heroIntro: "DiversDesk gives dive resorts one coordinated system for accommodation, diving, onboarding, payments, and guest communication so service stays polished even when operations get complex.",
    valueProps: [
      "Unify accommodation and diving around the same guest record.",
      "Handle split billing, discounts, and group travel without losing control.",
      "Help front office and dive teams work from the same reality.",
    ],
    pains: [
      {
        title: "Stop switching between departments and tools",
        text: "When room inventory, dive activities, and guest data are separated, service quality slips and admin grows.",
      },
      {
        title: "Deliver a smoother arrival experience",
        text: "Guests can complete the critical paperwork and payment steps before they reach the resort, so the stay starts cleaner.",
      },
      {
        title: "Handle complex bookings with confidence",
        text: "Groups, packages, family travel, and different payers become easier to manage when the data is connected.",
      },
    ],
    stats: [
      {
        value: 2,
        label: "Revenue streams in one journey",
        detail: "Manage diving and accommodation without forcing staff into separate booking realities.",
      },
      {
        value: 24,
        suffix: "/7",
        label: "Live accommodation visibility",
        detail: "Keep availability closer to real demand across direct and partner-led selling.",
      },
      {
        value: 65,
        suffix: "%",
        label: "Faster pre-arrival onboarding",
        detail: "Collect the operational details you need before guests check in at the property.",
      },
      {
        value: 1,
        label: "Guest record",
        detail: "Keep the stay, the dive plan, and the billing story connected from start to finish.",
      },
    ],
    featureSlugs: [
      "digital-onboarding",
      "planner-scheduling",
      "booking-engine-channel-manager",
      "inventory-pos-rentals",
      "finance-bookkeeping",
      "payment-gateways",
      "agents-partners-portal",
      "accommodation-channel-manager",
      "group-bookings-split-billing-discounts",
      "staff-wages-workload",
    ],
    faqs: [
      {
        question: "Can DiversDesk manage rooms and diving together?",
        answer: "Yes. Dive resorts can use DiversDesk to coordinate accommodation and diving around the same booking and guest data model.",
      },
      {
        question: "Does it support split billing and group reservations?",
        answer: "Yes. DiversDesk is designed to handle more complex commercial scenarios such as groups, mixed payments, and resort-style package bookings.",
      },
      {
        question: "Can staff see both accommodation and operational planning?",
        answer: "Yes. The goal is to reduce departmental blind spots by keeping planning and guest information closer together.",
      },
      {
        question: "How does pre-arrival onboarding help resort teams?",
        answer: "It reduces check-in friction, improves data quality, and helps the guest arrive ready for a smoother stay and dive experience.",
      },
    ],
    ctaTitle: "Give your resort a cleaner operational backbone.",
    ctaBody: "Unify rooms, diving, guest communication, billing, and service delivery before complexity slows the team down.",
  },
  {
    slug: "liveaboards",
    label: "Software for Liveaboards",
    shortLabel: "Liveaboards",
    metaTitle: "Liveaboard Management Software Preview | DiversDesk",
    metaDescription: "Preview the new DiversDesk landing page for liveaboards with vessel and cabin management, channel sales, agent access, manifests, onboarding, and onboard billing.",
    heroEyebrow: "Built for liveaboards",
    heroTitle: "Sell cabins smarter and prepare every departure with less friction.",
    heroIntro: "DiversDesk gives liveaboard operators one connected system for cabin inventory, agents, direct sales, guest prep, manifests, payments, and onboard commercial activity.",
    valueProps: [
      "Manage vessel and cabin inventory from one source of truth.",
      "Sync availability across direct sales, agents, and channels.",
      "Collect guest details, automate reminders, and generate manifests faster.",
    ],
    pains: [
      {
        title: "Reduce pre-departure admin stress",
        text: "Stop chasing passports, medical details, dive information, and final balances through inboxes and spreadsheets.",
      },
      {
        title: "Make partner selling feel controlled",
        text: "Agents need current availability and clear terms, but the crew still needs one accurate departure record.",
      },
      {
        title: "Run onboard revenue through the same system",
        text: "Keep cabins, extras, retail, and final billing attached to the same guest and trip story.",
      },
    ],
    stats: [
      {
        value: 24,
        suffix: "/7",
        label: "Agent access",
        detail: "Give partners live visibility into availability and contracted pricing without constant manual follow-up.",
      },
      {
        value: 100,
        suffix: "%",
        label: "Paperless guest preparation",
        detail: "Collect passport data, forms, and trip-critical details before the guest boards.",
      },
      {
        value: 1,
        label: "Departure record",
        detail: "Keep cabins, guests, manifests, billing, and crew-facing information tied together.",
      },
      {
        value: 9,
        label: "Core liveaboard workflows",
        detail: "Cover sales, agents, onboarding, manifests, payments, inventory, and onboard commercial operations.",
      },
    ],
    featureSlugs: [
      "booking-engine-channel-manager",
      "agents-partners-portal",
      "inventory-pos-rentals",
      "payment-gateways",
      "finance-bookkeeping",
      "vessel-cabin-management",
      "manifests-guest-automation",
      "digital-onboarding",
    ],
    faqs: [
      {
        question: "Can agents see live cabin availability and contracted rates?",
        answer: "Yes. DiversDesk is designed to support agent-facing availability and pricing access while keeping the operator in control of the core departure record.",
      },
      {
        question: "Can guests submit passport and medical information before boarding?",
        answer: "Yes. Guests can complete critical onboarding steps before arrival so crew are not collecting operationally important details at embarkation.",
      },
      {
        question: "Does DiversDesk support onboard billing and extras?",
        answer: "Yes. Onboard commercial activity can stay tied to the guest journey so teams can handle extras, retail, and final billing more cleanly.",
      },
      {
        question: "Can crews generate manifests quickly?",
        answer: "Yes. DiversDesk is designed to help liveaboard teams generate the lists and departure-ready information they need without rebuilding it manually.",
      },
    ],
    ctaTitle: "Prepare every sailing with less operational drag.",
    ctaBody: "Keep cabins, agents, guests, crew, and commercial events aligned before and during every trip.",
  },
];

export const featureMap: Record<string, LandingFeature> = Object.fromEntries(
  features.map((feature) => [feature.slug, feature])
);

export const solutionMap: Record<SolutionSlug, SolutionPage> = Object.fromEntries(
  solutions.map((solution) => [solution.slug, solution])
) as Record<SolutionSlug, SolutionPage>;

export const mainPageTestimonials = [
  {
    content:
      '"The system is not only user-friendly but also incredibly efficient, allowing me to easily schedule dives, track payments, and effectively oversee and coordinate activities."',
    author: "TI",
    role: "Owner | Jom Adventure",
    avatarSrc: "/images/jomadventure_avatar.png",
    starCount: 5,
  },
  {
    content:
      '"We are particularly impressed with the platform\'s ease of use and the responsive support team, who listen to and act on our feedback."',
    author: "Miikka",
    role: "Manager | Bali Dive Resort and Spa",
    avatarSrc: "/images/bdrs_avatar.png",
    starCount: 5,
  },
  {
    content:
      '"The transition from our previous platform to DiversDesk was extremely smooth thanks to the intuitiveness of the tool. Our guests are also extremely happy."',
    author: "Louis",
    role: "Manager | Reeflex Divers",
    avatarSrc: "/images/louis_avatar.png",
    starCount: 5,
  },
  {
    content:
      '"DiversDesk has truly transformed the way we manage our dive operations. Our customers often comment on how intuitive and easy to navigate our booking platform is."',
    author: "Cheryl",
    role: "Owner | HGL Tours",
    avatarSrc: "/images/avatar-default.png",
    starCount: 5,
  },
];

export const getFeaturesForSolution = (solutionSlug: SolutionSlug) =>
  features.filter((feature) => feature.appliesTo.includes(solutionSlug));