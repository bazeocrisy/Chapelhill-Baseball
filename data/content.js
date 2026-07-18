/* ==========================================================================
   CHAPEL HILL BASEBALL — SITE CONTENT
   ==========================================================================

   THIS IS THE FILE YOU EDIT.

   Everything on the homepage — text, dates, links, sponsors, announcements —
   comes from this one file. You do not need to touch the HTML or the CSS.

   HOW TO EDIT:
     - Text goes between "quotes". Keep the quotes.
     - Each item ends with a comma.
     - To remove something, delete its whole block (from { to },).
     - To add something, copy an existing block and change the text.
     - Save the file, then refresh the page in your browser.

   Anything marked  [PLACEHOLDER]  still needs real information.
   ========================================================================== */

const SITE = {

  /* ------------------------------------------------------------------------
     1. BRAND COLORS
     ------------------------------------------------------------------------
     [PLACEHOLDER — AWAITING OFFICIAL CONFIRMATION]

     These are TEMPORARY approximations, not confirmed school colors.
     Chapel Hill is documented as purple and black, but the exact official
     values have not been supplied by the school or district.

     Once the athletic department or district communications office confirms
     the official hex values, type them in below. Nothing else needs to change.
  ---------------------------------------------------------------------------*/
  colors: {
    purple:     "#4A2072",   // [PLACEHOLDER] primary — awaiting official value
    purpleDeep: "#31164C",   // [PLACEHOLDER] darker step for headings
    purpleDark: "#1C0C2C",   // [PLACEHOLDER] darkest step for footer/bars
    purpleLift: "#6E3E97",   // [PLACEHOLDER] lighter step for hover states
    purpleWash: "#F5F1F9",   // [PLACEHOLDER] tinted section background
    accent:     "#E8B33C",   // [PLACEHOLDER] action color — buttons only
    black:      "#0B0B0D",
  },

  /* ------------------------------------------------------------------------
     2. IDENTITY
  ---------------------------------------------------------------------------*/
  identity: {
    programName: "Chapel Hill Baseball",
    orgName:     "Baseball Booster Club",
    schoolName:  "Chapel Hill High School",

    // [PLACEHOLDER] Temporary text mark. Replace `logoSrc` with the
    // school-approved Panther logo once the athletic department supplies it.
    // Do not substitute artwork found online — it must be approved.
    logoSrc:     "",         // e.g. "assets/logos/panthers-approved.png"
    logoAlt:     "Chapel Hill Panthers",
  },

  /* ------------------------------------------------------------------------
     3. HERO
  ---------------------------------------------------------------------------*/
  hero: {
    headline: "Chapel Hill Baseball",
    subhead:  "Panther Baseball Booster Club",
    intro:    "Everything a Panther baseball family needs for the season — forms, dates, meetings, and announcements — in one place instead of six group texts.",
    primaryCta:   { label: "Required forms",     href: "physical-forms.html" },
    secondaryCta: { label: "Become a sponsor",   href: "sponsors.html" },

    // [PLACEHOLDER] Illustrated field graphic standing in for a real photo.
    // Replace with a photograph of the Chapel Hill baseball field or team.
    image: "assets/img/hero-field.svg",
    imageAlt: "[PLACEHOLDER] Illustrated baseball field — replace with a real photo of the Chapel Hill field",
  },

  /* ------------------------------------------------------------------------
     4. FEATURED ANNOUNCEMENT — the one thing that matters most right now
        Shown directly under the hero. Update it or delete the block to hide.
  ---------------------------------------------------------------------------*/
  featured: {
    tag:   "[PLACEHOLDER] Upcoming",
    title: "[PLACEHOLDER] Preseason parent meeting",
    body:  "[PLACEHOLDER] Replace with the next real baseball event or the most urgent announcement. This slot is for the single thing you most need parents to see.",
    date:  "[PLACEHOLDER] Date TBD",
    cta:   { label: "Parent information", href: "parents.html" },
  },

  /* ------------------------------------------------------------------------
     5. SEASON STRIP — the three dates parents check most
        UPDATE AT THE START OF EACH SEASON.
        Add or remove items freely; the row re-flows on its own.
  ---------------------------------------------------------------------------*/
  seasonStrip: [
    { label: "Next parent meeting", value: "[PLACEHOLDER] TBD" },
    { label: "Physicals due",       value: "[PLACEHOLDER] TBD" },
    { label: "Tryouts begin",       value: "[PLACEHOLDER] TBD" },
  ],

  /* ------------------------------------------------------------------------
     6. SPONSORS
        Three editable levels. Add sponsors by copying a block inside `items`.
        `logo` may be left as "" — a labeled placeholder tile shows instead.
  ---------------------------------------------------------------------------*/
  sponsors: {
    heading: "Our sponsors",
    intro:   "These businesses fund the equipment, the uniforms, and the field. Please give them your business.",
    note:    "[PLACEHOLDER] No sponsors have been entered yet. Tiles below are empty placeholders showing how real sponsor logos will appear.",

    levels: [
      {
        name: "Premier Sponsors",
        blurb: "[PLACEHOLDER] Describe what this level includes.",
        // Empty placeholder slots. Replace `name` and add a `logo` path.
        items: [
          { name: "", logo: "" },
          { name: "", logo: "" },
          { name: "", logo: "" },
        ],
      },
      {
        name: "Supporting Sponsors",
        blurb: "[PLACEHOLDER] Describe what this level includes.",
        items: [
          { name: "", logo: "" },
          { name: "", logo: "" },
          { name: "", logo: "" },
          { name: "", logo: "" },
        ],
      },
      {
        name: "Community Partners",
        blurb: "[PLACEHOLDER] Describe what this level includes.",
        items: [
          { name: "", logo: "" },
          { name: "", logo: "" },
          { name: "", logo: "" },
          { name: "", logo: "" },
          { name: "", logo: "" },
          { name: "", logo: "" },
        ],
      },
    ],

    cta: {
      heading: "Support Panther baseball",
      body:    "[PLACEHOLDER] Describe what a sponsor receives and roughly what it costs. Sponsorship funds equipment, uniforms, and field upkeep, and keeps the program open to every player regardless of family finances.",
      label:   "Become a sponsor",
      href:    "sponsors.html",
    },
  },

  /* ------------------------------------------------------------------------
     7. QUICK LINKS FOR PARENTS
        Reorder by moving blocks. Remove by deleting a block.
        `external: true` adds an "Official" tag and opens in a new tab.
  ---------------------------------------------------------------------------*/
  quickLinks: {
    heading: "Where do I need to go?",
    items: [
      {
        title: "Physical & required forms",
        body:  "Download the GHSA packet, see what has to be signed, and find out where to turn it in.",
        href:  "physical-forms.html",
      },
      {
        title: "Parent information",
        body:  "Meeting schedule, important dates, required documents, and answers to the usual questions.",
        href:  "parents.html",
      },
      {
        title: "Baseball schedule",
        body:  "Game dates and times are maintained by the school athletics department.",
        href:  "https://chhs.dcssga.org/o/chhs/events",
        external: true,
      },
      {
        title: "Booster Club",
        body:  "Who we are, what we fund, when we meet, and how to get involved.",
        href:  "booster-club.html",
      },
      {
        title: "Volunteer",
        body:  "Concessions, field work, team meals, fundraising. Every shift helps, however small.",
        href:  "booster-club.html#volunteer",
      },
      {
        title: "Contact us",
        body:  "Reach the Booster Club board or the baseball coaching staff.",
        href:  "contact.html",
      },
    ],
  },

  /* ------------------------------------------------------------------------
     8. FORMS
  ---------------------------------------------------------------------------*/
  forms: {
    heading: "Physical & required forms",
    body:    "No physical on file means no practice, no tryout, no workout. A GHSA physical is valid for one school year — last season's does not carry over.",
    items: [
      {
        title: "GHSA preparticipation physical",
        body:  "[PLACEHOLDER] Link to the official GHSA form once the athletic department confirms the current version.",
        href:  "#",
        external: true,
      },
      {
        title: "Instructions & submission",
        body:  "What has to be signed, common mistakes, and where the completed packet goes.",
        href:  "physical-forms.html",
      },
    ],
  },

  /* ------------------------------------------------------------------------
     9. BOOSTER CLUB SUMMARY
  ---------------------------------------------------------------------------*/
  boosterClub: {
    heading: "About the Booster Club",
    body:    "The Chapel Hill Baseball Booster Club is a volunteer group of parents and community members supporting Panther baseball — funding equipment and uniforms, keeping the field ready, feeding the team on long game days, and making sure no player misses out over cost.",
    note:    "[PLACEHOLDER] Confirm this description with the board before launch.",
    cta:     { label: "Learn more", href: "booster-club.html" },
  },

  /* ------------------------------------------------------------------------
     10. CONTACT
  ---------------------------------------------------------------------------*/
  contact: {
    heading: "Contact",
    intro:   "The Booster Club handles fees, volunteering, and sponsorship. Anything about tryouts, practice, roster, or playing time goes to the coaching staff.",
    items: [
      {
        role:  "Baseball Booster Club",
        name:  "[PLACEHOLDER] Board contact name",
        email: "[PLACEHOLDER] email@example.org",
      },
      {
        role:  "Baseball program",
        name:  "[PLACEHOLDER] Coaching staff contact",
        email: "[PLACEHOLDER] email@example.org",
      },
      {
        role:  "Sponsorship",
        name:  "[PLACEHOLDER] Sponsorship chair",
        email: "[PLACEHOLDER] email@example.org",
      },
    ],
  },

  /* ------------------------------------------------------------------------
     11. OFFICIAL SCHOOL LINKS
         Verified from chhs.dcssga.org. All open in a new tab and are
         labeled "Official" so nobody mistakes this site for the district's.
  ---------------------------------------------------------------------------*/
  official: {
    heading: "Official school resources",
    intro:   "Schoolwide information lives on the official Chapel Hill High School website. We link to it rather than copy it, so it never goes out of date here.",
    schoolSite: "https://chhs.dcssga.org/o/chhs",
    links: [
      { label: "Chapel Hill High School",  href: "https://chhs.dcssga.org/o/chhs" },
      { label: "School calendar",          href: "https://chhs.dcssga.org/o/chhs/events" },
      { label: "Athletics",                href: "https://chhs.dcssga.org/o/chhs" },
      { label: "Registration",             href: "https://chhs.dcssga.org/o/dcss/page/registration" },
      { label: "Attendance",               href: "https://chhs.dcssga.org/o/chhs/page/attendance" },
      { label: "Transportation",           href: "https://chhs.dcssga.org/o/dcss/page/transportation" },
      { label: "Pay online",               href: "https://chapelhillhs.revtrak.net" },
    ],
    school: {
      name:    "Chapel Hill High School",
      address: "4899 Chapel Hill Road",
      city:    "Douglasville, GA 30135",
      phone:   "770.651.6200",
      phoneHref: "tel:7706516200",
    },
  },

  /* ------------------------------------------------------------------------
     12. FOOTER DISCLAIMER — required. Do not remove.
  ---------------------------------------------------------------------------*/
  disclaimer: "This website supports the Chapel Hill High School Baseball program and Baseball Booster Club. Please visit the official Chapel Hill High School website for school policies, district information, official schedules, registration, transportation, and other schoolwide resources.",

  draftNotice: "Draft — content is placeholder and pending Booster Club board review.",
};
