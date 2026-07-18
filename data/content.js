/* ==========================================================================
   CHAPEL HILL BASEBALL — SITE CONTENT
   ==========================================================================

   THIS IS THE FILE YOU EDIT.

   Everything on the homepage — text, dates, sponsors, announcements, contacts
   — comes from this one file. You do not need to touch the HTML or the CSS.

   HOW TO EDIT:
     - Text goes between "quotes". Keep the quotes.
     - Each item ends with a comma.
     - To remove something, delete its whole block (from { to },).
     - To add something, copy an existing block and change the text.
     - Save the file, then refresh the page in your browser.

   !! PRESENTATION MODE — the draft banner and on-page "sample" notes are
      turned off so the page presents cleanly to the coach and Booster
      President.

      THE CONTENT IS STILL DEMONSTRATION CONTENT. Dates, sponsor names, and
      the impact figures are illustrative and unconfirmed. Sponsor names are
      deliberately generic ("Sample Sponsor One") so nobody mistakes them for
      real commitments — do not make them look like real businesses until real
      businesses have signed.

      Before this URL is shared beyond the board, set mockBanner.show = true.
      See README.md for the full go-live checklist.
   ========================================================================== */

const SITE = {

  /* ------------------------------------------------------------------------
     1. BRAND COLORS
     ------------------------------------------------------------------------
     !! AWAITING OFFICIAL CONFIRMATION

     Chapel Hill is documented as purple and black. The exact official hex
     values have not been supplied by the school or district, so these are
     approximations.

     Once the athletic department confirms the official values, type them in
     below. Nothing else needs to change — every color on the site reads from
     this one object.
  ---------------------------------------------------------------------------*/
  colors: {
    purple:     "#4A2072",   // primary — awaiting official value
    purpleDeep: "#31164C",   // darker step for headings
    purpleDark: "#1C0C2C",   // darkest step for footer/bars
    purpleLift: "#6E3E97",   // lighter step for hover states
    purpleWash: "#F7F4FA",   // tinted section background
    accent:     "#E8B33C",   // action color — buttons and highlights only
    black:      "#0B0B0D",
  },

  /* ------------------------------------------------------------------------
     2. IDENTITY
  ---------------------------------------------------------------------------*/
  identity: {
    programName: "Chapel Hill Baseball",
    orgName:     "Baseball Booster Club",
    schoolName:  "Chapel Hill High School",

    // !! Confirm permission with the athletic department before going public.
    logoSrc:     "assets/logos/panthers-logo.png",
    logoAlt:     "Chapel Hill Panthers",
  },

  /* ------------------------------------------------------------------------
     3. HERO
  ---------------------------------------------------------------------------*/
  hero: {
    eyebrow:  "Chapel Hill High School · Douglasville, Georgia",
    headline: "Panther Baseball",
    tagline:  "GHSA Class 6A · Region 2",
    intro:    "Everything a Panther family needs for the season, in one place. Forms, dates, meetings, and news you can trust to be current.",
    primaryCta:   { label: "Get the physical form", href: "physical-forms.html" },
    secondaryCta: { label: "Support the program",   href: "#sponsors" },

    // The one urgent thing, surfaced IN the hero so a parent sees it without
    // scrolling. Set `show: false` when nothing is urgent.
    alert: {
      show:  true,
      label: "Deadline",
      text:  "Physical packets are due August 1. No physical on file, no workout.",
    },

    // !! SAMPLE — illustrated placeholder. Replace with a real photograph of
    // the Chapel Hill field or team. This is the single highest-impact change
    // available to this page.
    image: "assets/img/hero-field.svg",
    imageAlt: "Chapel Hill baseball field",
    // On-image caption. Left empty for presentation; the photo is still a
    // placeholder and remains the highest-impact thing to replace.
    imageNote: "",
  },

  /* ------------------------------------------------------------------------
     4. SEASON STRIP — the dates parents check most
        UPDATE AT THE START OF EACH SEASON.
        Add or remove items freely; the row re-flows on its own.
  ---------------------------------------------------------------------------*/
  seasonStrip: [
    { label: "Physicals due",       value: "Aug 1",  detail: "Before any workout" },
    { label: "Next parent meeting", value: "Aug 12", detail: "6:30 PM · Cafeteria" },
    { label: "Tryouts begin",       value: "Jan 20", detail: "Panther Field" },
    { label: "Opening day",         value: "Feb 17", detail: "vs. Alexander" },
  ],

  /* ------------------------------------------------------------------------
     PROGRAM SNAPSHOT
     ------------------------------------------------------------------------
     Where the program stands right now. A parent deciding whether their son
     should try out, and a business deciding whether to sponsor, both want
     this and neither wants to hunt for it.

     DEMONSTRATION DATA — replace with the real record and standing.
     `show: false` hides the whole band in the offseason.
  ---------------------------------------------------------------------------*/
  snapshot: {
    show:    true,
    eyebrow: "2026 season",
    heading: "Where we stand",
    items: [
      { label: "Overall",        value: "18-11",     detail: "2026 season" },
      { label: "Region 2 · 6A",  value: "3rd",       detail: "9-5 in region" },
      { label: "Last out",       value: "Round 2",   detail: "State playoffs" },
      { label: "Roster",         value: "Varsity",   detail: "and JV" },
    ],
    note: "Records shown are demonstration data.",
  },

  /* ------------------------------------------------------------------------
     COACH'S WELCOME
     ------------------------------------------------------------------------
     !! DELIBERATELY EMPTY.

     An earlier draft had an invented quote here. It was removed: publishing
     fabricated words attributed to a real coach is a genuine risk to the
     program's credibility, and a visible gap is more professional than a
     fake quote.

     To activate: get 2-3 sentences from the coach in his own words, paste
     them into `quote`, set his name, and change `show` to true.
  ---------------------------------------------------------------------------*/
  coachWelcome: {
    show:    true,
    eyebrow: "From the dugout",
    heading: "Welcome to Panther baseball",

    // NOT A REAL QUOTE and deliberately NOT attributed to any person.
    // This is Booster Club voice, written to show the layout. When the coach
    // supplies his own words, paste them in and put his name in `name`.
    quote:   "Be early. Pick up a rake before somebody asks you to. Pick your teammate up when he has a bad night. Do that for four years and you'll leave here a different young man than you came in.",
    body:    "That goes for the families too. If you're new, the August meeting is where to start.",
    name:    "Chapel Hill Baseball",
    role:    "Panther Baseball Booster Club",
  },

  /* ------------------------------------------------------------------------
     7. ANNOUNCEMENTS
        Newest goes on top. Keep 3-4 here; older ones move to the Parents page.
        `pin: true` highlights an item.
  ---------------------------------------------------------------------------*/
  announcements: {
    eyebrow: "Latest news",
    heading: "Around the program",
    intro:   "Program news, posted as it happens.",
    items: [
      {
        date:  "July 10, 2026",
        tag:   "Deadline",
        title: "Physical packets due August 1",
        body:  "Every athlete needs a current GHSA physical before he can work out with us. Physicals are good for one school year, so last spring's has expired. Bring the completed packet to the front office or hand it to any coach.",
        pin:   true,
      },
      {
        date:  "July 6, 2026",
        tag:   "Meeting",
        title: "Preseason parent meeting set for August 12",
        body:  "6:30 in the cafeteria. We'll go over the calendar, fees, volunteer roles, and fundraising, then open it up for questions. One parent or guardian per family is plenty.",
      },
      {
        date:  "July 2, 2026",
        tag:   "Program",
        title: "Three Panthers headed to college ball",
        body:  "Congratulations to our three seniors continuing at the next level this fall. Four years of 6 a.m. workouts and a lot of bus rides to Carrollton. We'll miss them, and we'll be watching.",
      },
    ],
    cta: { label: "All announcements", href: "parents.html#announcements" },
  },

  /* ------------------------------------------------------------------------
     9. SPONSORS
        Three tiers. Add sponsors by copying a block inside `items`.
        `logo` may be left as "" — the business name shows as text instead.

        !! EVERY SPONSOR BELOW IS INVENTED. No real business has committed.
  ---------------------------------------------------------------------------*/
  sponsors: {
    eyebrow: "Our sponsors",
    heading: "The businesses behind Panther baseball",
    thanks:  "The school pays for a baseball program. These businesses pay for the rest of it: the bats, the uniforms, the clay on the mound, the meals after a doubleheader in Carrollton. Most of them have no connection to this team beyond living here. When you need what they sell, go see them, and mention where you found them.",
    // DEMONSTRATION DATA — these businesses are invented for the mock.
    // Replace with real sponsors before this page is shared publicly.
    note:    "",

    // What sponsor money actually bought. This is the single most
    // renewal-driving thing on the page: proof, not thanks.
    // !! SAMPLE — replace with real items the board can verify.
    impact: {
      heading: "Where the money went this year",
      items: [
        { thing: "Rebuilt both bullpen mounds", by: "Premier sponsors" },
        { thing: "18 new game jerseys",         by: "Gold sponsors" },
        { thing: "Fees for four players",       by: "The assistance fund" },
      ],
      note: "",
    },

    levels: [
      {
        name: "Premier Sponsors",
        blurb: "Banner behind home plate · logo on team gear · announced at every home game",
        items: [
          { name: "Chapel Hill Auto Group", logo: "assets/logos/sample-sponsor-1.svg",
            note: "Supporting Panther baseball since 2019", url: "#" },
          { name: "Ridgeway Contracting",   logo: "assets/logos/sample-sponsor-2.svg",
            note: "Built the new batting cages", url: "#" },
        ],
      },
      {
        name: "Gold Sponsors",
        blurb: "Outfield banner · logo on this page · name in the season program",
        items: [
          { name: "Bell Creek Dental",      logo: "assets/logos/sample-sponsor-3.svg" },
          { name: "Westmoreland Realty",    logo: "assets/logos/sample-sponsor-4.svg" },
          { name: "Sweetwater Orthopedics", logo: "assets/logos/sample-sponsor-5.svg" },
          { name: "Tanner Heating & Air",   logo: "assets/logos/sample-sponsor-6.svg" },
        ],
      },
      {
        name: "Community Partners",
        blurb: "Logo on this page · name in the season program",
        items: [
          { name: "Midway Tire & Lube",     logo: "assets/logos/sample-sponsor-7.svg" },
          { name: "Douglas County Insurance", logo: "assets/logos/sample-sponsor-8.svg" },
          { name: "Prowler Print Co.",      logo: "assets/logos/sample-sponsor-9.svg" },
          { name: "Arbor Physical Therapy", logo: "assets/logos/sample-sponsor-10.svg" },
          { name: "Fairhaven Financial",    logo: "assets/logos/sample-sponsor-11.svg" },
          { name: "The Dugout Diner",       logo: "assets/logos/sample-sponsor-12.svg" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------------
     10. WHY SPONSOR — the pitch to local businesses
         !! SAMPLE figures. Confirm real numbers before publishing.
  ---------------------------------------------------------------------------*/
  sponsorValue: {
    eyebrow: "Why sponsor Panther baseball",
    heading: "Put your name on the fence",
    intro:   "Your banner goes up before the first pitch and stays through the last out of the season. It hangs in front of the families in the stands, the teams we host, and everyone driving past the field. Nothing gets skimmed off the top.",
    stats: [
      { figure: "15",   label: "home dates a season" },
      { figure: "40+",  label: "Panther families" },
      { figure: "100%", label: "stays with this program" },
    ],
    points: [
      "A banner on the outfield fence. We design it, we hang it, we take it down.",
      "Your logo on this page, linked to your website",
      "Your name in the season program and over the PA at home games",
      "Forty families who notice who showed up for their kids",
    ],
    cta:    { label: "Become a sponsor", href: "sponsors.html#packages" },
    altCta: { label: "Start a conversation", href: "sponsors.html#start" },
    note:   "",
  },

  /* ------------------------------------------------------------------------
     11. QUICK LINKS FOR PARENTS
         Reorder by moving blocks. Remove by deleting a block.
         `external: true` adds an "Official" tag and opens in a new tab.
  ---------------------------------------------------------------------------*/
  quickLinks: {
    eyebrow: "For parents",
    heading: "Start here",
    intro:   "If you are new, start with the first two.",
    items: [
      { icon: "form",     title: "Physical & required forms", body: "The GHSA packet, what has to be signed, and where it goes.", href: "physical-forms.html" },
      { icon: "calendar", title: "Parent information",        body: "Meetings, dates, paperwork, and the questions we get every year.", href: "parents.html" },
      { icon: "field",    title: "Baseball schedule",         body: "Game dates and times, kept current by the athletics department.", href: "https://chhs.dcssga.org/o/chhs/events", external: true },
      { icon: "people",   title: "Booster Club",              body: "Who we are, what we pay for, and when we meet.", href: "booster-club.html" },
      { icon: "hand",     title: "Volunteer",                 body: "Concessions, field work, team meals, fundraising. Pick one.", href: "booster-club.html#volunteer" },
      { icon: "mail",     title: "Contact us",                body: "The board, the coaches, and who to ask about what.", href: "contact.html" },
    ],
  },

  /* ------------------------------------------------------------------------
     12. BOOSTER CLUB SUMMARY
  ---------------------------------------------------------------------------*/
  boosterClub: {
    eyebrow: "The Booster Club",
    heading: "Built by parents, for parents",
    body:    "We're parents. We buy the equipment, drag the field, feed the team, and put on the banquet, so the coaches can spend their time coaching. We don't pick the lineup and we have no say in who makes the roster. What we do is make sure a boy who wants to play gets to play.",
    points: [
      "If the fee is a problem, tell us. It stays between us.",
      "Every meeting is open to every baseball family",
    ],
    cta: { label: "About the Booster Club", href: "booster-club.html" },
  },

  /* ------------------------------------------------------------------------
     PROGRAM VALUES
     ------------------------------------------------------------------------
     What the program asks of a player. This is the culture statement, and
     it's what a parent is really evaluating when they ask whether their son
     should play here.

     !! Confirm this list with the coaching staff. These should be HIS values,
     not ours. The copy below is a starting point for that conversation.
  ---------------------------------------------------------------------------*/
  values: {
    eyebrow: "What we ask",
    heading: "What Panther baseball stands for",
    intro:   "Five things. They apply to a senior starter and a freshman who hasn't played an inning.",
    items: [
      { name: "Accountability", body: "Own the error. Own the strikeout. Own the missed workout. Nobody here is asked to be perfect, only honest about it." },
      { name: "Discipline",    body: "Be where you said you'd be, when you said you'd be there, ready to work." },
      { name: "Team first",    body: "Move the runner. Take the walk. The at-bat that helps the team is not always the one that helps your line." },
      { name: "Respect",       body: "Umpires, opponents, groundskeepers, and the parents in the stands. All of them, every time." },
      { name: "Work ethic",    body: "Nobody outworks us in February. That's the part we control." },
    ],
  },

  /* ------------------------------------------------------------------------
     PLAYER DEVELOPMENT
     ------------------------------------------------------------------------
     Answers the question a parent is actually asking: why should my son play
     here? Parents don't join baseball teams, they join player development.

     DEMONSTRATION DATA — replace with real alumni and real program details.
  ---------------------------------------------------------------------------*/
  development: {
    eyebrow: "Player development",
    heading: "Four years, and what comes after",
    intro:   "A handful of these boys will play college baseball. All of them will leave here having been coached hard by people who cared how they turned out.",
    points: [
      { head: "Year-round strength", body: "Offseason lifting three days a week, run by our staff, built around arm care and durability." },
      { head: "Real instruction",    body: "Small groups. Video. Individual plans. A kid gets coached here, not just rostered." },
      { head: "The classroom first", body: "Grades get checked. A player who can't stay eligible doesn't play, and we help long before it gets there." },
      { head: "The recruiting piece",body: "For the ones who want it, our staff helps with film, contacts, and the timeline. We don't promise anybody anything." },
    ],
    alumni: {
      heading: "Recent Panthers playing college ball",
      // DEMONSTRATION DATA — invented. Never publish a real player's name
      // without the family's permission.
      items: [
        { name: "Class of 2026", detail: "Three seniors signed" },
        { name: "Class of 2025", detail: "Two signed, one JUCO" },
        { name: "Class of 2024", detail: "Two signed" },
      ],
    },
    note: "Demonstration data.",
  },

  /* ------------------------------------------------------------------------
     13. VOLUNTEER SPOTLIGHT
         !! SAMPLE — invented. Never publish a real person's name without asking.
  ---------------------------------------------------------------------------*/
  spotlight: {
    eyebrow: "Volunteer spotlight",
    heading: "Eighteen families and a June Saturday",
    body:    "They spent it hauling infield mix, packing the mound, and painting both dugouts. It was ninety degrees by ten in the morning. The field has not looked this good in years. There will be another workday before the season, and we would be glad to see you there.",
    cta:     { label: "Find a volunteer role", href: "booster-club.html#volunteer" },
    note:    "",
  },

  /* ------------------------------------------------------------------------
     VOLUNTEER CALL TO ACTION
     ------------------------------------------------------------------------
     Not every family can sponsor. Almost every family can work a shift.
     This is the one obvious button for the rest of them.
  ---------------------------------------------------------------------------*/
  volunteerCta: {
    eyebrow: "Lend a hand",
    heading: "One shift. That's the whole ask.",
    body:    "The concession stand doesn't run itself and the infield doesn't drag itself. Take one shift this season and you've done your part.",
    roles:   ["Concessions", "Field work", "Team meals", "Fundraising", "Gate", "Scorebook"],
    cta:     { label: "Sign up to volunteer", href: "booster-club.html#volunteer" },
  },

  /* ------------------------------------------------------------------------
     14. CONTACT
         !! SAMPLE contacts. Replace with real names and addresses.
  ---------------------------------------------------------------------------*/
  contact: {
    eyebrow: "Get in touch",
    heading: "Who to ask",
    intro:   "The Booster Club handles fees, volunteering, and sponsorship. Tryouts, practice, and playing time are the coaches' call. If it's about a game, please wait until the next day.",
    items: [
      // DEMONSTRATION DATA — invented names and addresses. Replace with the
      // real board roster and issued addresses before publishing.
      { role: "Baseball Booster Club", desc: "Fees, assistance, volunteering, meetings, fundraising",
        name: "Dana Whitfield, President", email: "boosters@chapelhillbaseball.org" },
      { role: "Baseball program",      desc: "Tryouts, practice, roster, playing time",
        name: "Coaching Staff", email: "coach@chapelhillbaseball.org" },
      { role: "Sponsorship",           desc: "Banners, packets, program ads, in-kind support",
        name: "Marcus Reed, Sponsorship Chair", email: "sponsors@chapelhillbaseball.org" },
    ],
    note: "",
  },

  /* ------------------------------------------------------------------------
     PHYSICAL FORMS PAGE
     ------------------------------------------------------------------------
     !! READ THIS BEFORE EDITING ANY LINK BELOW.

     Every form URL points at ghsa.net. That is deliberate and it matters:

       - GHSA By-Law 1.41(d) requires member schools use the LATEST edition
         of the form, which lives on the GHSA site.
       - The form is copyrighted. GHSA's own signature page states that
         alterations (edits) to the document are not permitted.
       - A locally hosted copy goes stale silently. Nothing warns you. A
         parent downloads it, pays for the exam, turns it in, and it gets
         rejected. GHSA's notice specifically complains about schools serving
         old editions.

     DO NOT download these PDFs and re-host them. Link GHSA.

     Verified from ghsa.net on July 17, 2026. The rules quoted on this page
     are GHSA By-Law 1.41(a) through (d), paraphrased.
  ---------------------------------------------------------------------------*/
  physicalForms: {
    hero: {
      eyebrow:  "Parent resources",
      headline: "Athletic physical forms",
      intro:    "Every Chapel Hill baseball player needs a current GHSA physical on file before he can try out, practice, work out, or play. The official form is below, along with what has to be signed and how long it lasts.",
      primaryCta:   { label: "Get the GHSA physical form", href: "#form" },
      secondaryCta: { label: "Ask a question", href: "contact.html" },
    },

    // THE FORM. Verified live at ghsa.net July 17, 2026.
    form: {
      eyebrow: "The form",
      heading: "GHSA Preparticipation Physical Evaluation",
      kicker:  "2023 revision · fillable PDF · 4 pages",
      body:    "This is the only physical form GHSA accepts. A form from a doctor's office, a sports clinic, or an older edition will be turned away, so start with this one.",
      // Fillable 2023 revision — the current edition.
      cta:     { label: "Open the form (PDF)", href: "https://www.ghsa.net/sites/default/files/documents/forms/2023_GHSA_PPE_Fillable_-_Revised_3-9-23.pdf" },
      trust:   "Hosted by the Georgia High School Association. This link always opens GHSA's current edition, so it can't go out of date.",

      /* Preview of the form's four pages.
         These names are taken from the real 2023 document. This is a DRAWING
         of the structure, not a picture of the form: the PDF is GHSA's
         copyrighted property, and any image of it we ship goes stale the day
         they revise it. What a parent needs is recognition ("four pages, this
         order") and that doesn't change when the layout does.
         If GHSA restructures the form, update these four entries. */
      previewAlt: "The GHSA physical form is four pages: History Form, Physical Examination Form, Medical Eligibility Form, and Shared Emergency Information.",
      pages: [
        { short: "History Form",          who: "Athlete and parent fill this in before the appointment", lines: 7 },
        { short: "Physical Examination",  who: "The provider completes this at the exam",                lines: 6 },
        { short: "Medical Eligibility",   who: "The provider signs and marks eligibility",               lines: 4 },
        { short: "Emergency Information", who: "Allergies, medications, and contacts",                   lines: 5 },
      ],
      alts: [
        { label: "Spanish version",
          href: "https://www.ghsa.net/sites/default/files/documents/forms/2023_GHSA_PPE_Fillable_Spanish_-_Revised_3-9-23.pdf" },
        { label: "Supplement for athletes with disabilities",
          href: "https://www.ghsa.net/sites/default/files/documents/forms/Preparticipation_Physical_History_-_Athletes_with_Disabilities_-_2019_Fillable.pdf" },
      ],
      // !! If a parent or coach hands you a form that says "©2010", "Clearance
      //    Form", or asks a "FEMALES ONLY" question, it's the old edition and
      //    it will be rejected. The current one has the PHQ-4 mental health
      //    screen and a "Medical Eligibility Form".
      warn: {
        heading: "Using an old form is the most common mistake",
        body:    "Editions before 2019 are no longer accepted. If the pages you have say “Clearance Form” or carry a 2010 copyright line, they're the wrong ones. The current form has a short mental-health section and a page headed “Medical Eligibility Form”.",
      },
    },

    // GHSA By-Law 1.41. Paraphrased, not quoted.
    rules: {
      eyebrow: "What GHSA requires",
      heading: "The rules, in plain English",
      intro:   "These come from GHSA By-Law 1.41 and apply to every athlete at every member school in Georgia.",
      items: [
        { head: "It has to be on file before he does anything",
          body: "Tryouts, practice, voluntary workouts, games. All of it. A physical that's still on the kitchen counter doesn't count." },
        { head: "It's good for twelve months",
          body: "Twelve months from the date of the exam, not the date you turned it in." },
        { head: "The April 1 exception is worth knowing",
          body: "An exam done on or after April 1 covers the entire next school year. A spring physical may already cover next season, so check the date before you book another one." },
        { head: "Who can do the exam",
          body: "A licensed physician, a doctor of osteopathic medicine, a nurse practitioner, or a physician's assistant. Your family doctor is fine." },
        { head: "Who signs it",
          body: "An M.D., a D.O., a physician's assistant, or an advanced practice nurse working under an M.D. or D.O." },
        { head: "Don't alter the form",
          body: "It's a copyrighted document and edits aren't permitted. Print it or fill it in on screen, but leave the form itself alone." },
      ],
    },

    // What has to be signed. Taken from the form's own pages.
    checklist: {
      eyebrow: "Before you turn it in",
      heading: "Check these six things",
      intro:   "Every one of these is on the form itself. A missing signature is the second most common reason a packet comes back.",
      items: [
        "History form filled in, with a parent if the athlete is under 18",
        "Athlete's signature on the history form",
        "Parent or guardian's signature on the history form",
        "The exam actually completed by the provider",
        "Provider's signature, printed name, address, and phone",
        "Medical eligibility page signed and marked",
      ],
    },

    // Georgia law, not just GHSA policy. SB 60 and the concussion statute.
    also: {
      eyebrow: "Also required",
      heading: "Two forms that aren't the physical",
      intro:   "Georgia law requires these separately. Most families hit them at registration, so it's worth having them ready at the same time.",
      items: [
        { title: "Sudden cardiac arrest awareness",
          body:  "Required under SB 60, the Jeremy Nelson and Nick Blakely Sudden Cardiac Arrest Prevention Act. Schools hold an information meeting twice a year and give this sheet to parents.",
          href:  "https://www.ghsa.net/sites/default/files/documents/forms/Sudden_Cardiac_Arrest_Awareness_Form_-_2026-27.pdf",
          alt:   { label: "Spanish", href: "https://www.ghsa.net/sites/default/files/documents/forms/Sudden_Cardiac_Arrest_Form_-_Spanish_2026-27.pdf" } },
        { title: "Concussion awareness",
          body:  "Signed by the student and a parent. The 2026-27 version is the current one.",
          href:  "https://www.ghsa.net/sites/default/files/documents/forms/Concussion_Awareness_Form_-_2026-27.pdf",
          alt:   { label: "Spanish", href: "https://www.ghsa.net/sites/default/files/documents/forms/Concussion_Awareness_Form_-_Spanish_2026-27.pdf" } },
      ],
    },

    /* ----------------------------------------------------------------------
       FAQ
       ----------------------------------------------------------------------
       !! The answers below are GHSA rules, which are verified.

       WHAT IS NOT HERE, ON PURPOSE: a due date, and the name of the person
       who takes the packet. Neither has been confirmed. The homepage
       currently says packets are due August 1 — that date is demonstration
       data and has not been verified with the coaching staff. Do not repeat
       it here until somebody confirms it.
    ---------------------------------------------------------------------- */
    faq: {
      eyebrow: "Questions we get",
      heading: "Before you ask",
      items: [
        { q: "Does my son need one if he played last year?",
          a: "Yes. A physical is good for twelve months from the exam date, so last spring's has probably expired. Check the date on it. If the exam was on or after April 1, it may still cover this school year." },
        { q: "Can our family doctor do it?",
          a: "Yes. A licensed physician, D.O., nurse practitioner, or physician's assistant can perform the exam, and it has to be signed by an M.D., D.O., P.A., or an advanced practice nurse working under one." },
        { q: "The clinic gave us their own form. Is that okay?",
          a: "No. GHSA accepts its own form and nothing else. Bring the GHSA form to the appointment and ask them to use it." },
        { q: "When should we schedule it?",
          a: "As early as you can. A packet that isn't on file means he sits out, and appointments get scarce right before a season starts. [PLACEHOLDER] Confirm the program's cutoff date with the coaching staff." },
        { q: "Where does the finished packet go?",
          a: "[PLACEHOLDER] Confirm with the coaching staff or the athletic department where completed packets should be handed in." },
        { q: "What happens if it expires mid-season?",
          a: "He can't keep playing on an expired physical. GHSA requires a current one on file for participation, so get the new exam booked before the old date passes." },
      ],
      note: "Answers reflect GHSA By-Law 1.41. Program-specific details still need confirmation.",
    },

    help: {
      eyebrow: "Still stuck",
      heading: "Who to ask",
      intro:   "Paperwork questions go to the school. Anything about the baseball program, ask us.",
      items: [
        { role:  "Chapel Hill High School",
          desc:  "Front office. Where packets go and what's on file.",
          phone: "770.651.6200", phoneHref: "tel:7706516200", verified: true },
        { role:  "Baseball program",
          desc:  "Tryouts, practice, and whether your son is cleared to work out.",
          email: "coach@chapelhillbaseball.org" },
        { role:  "Baseball Booster Club",
          desc:  "Fees, assistance, volunteering, and everything else.",
          email: "boosters@chapelhillbaseball.org" },
      ],
      note: "",
    },

    related: {
      eyebrow: "While you're here",
      heading: "Other things parents need",
      items: [
        { icon: "calendar", title: "Parent information", body: "Meetings, dates, and the questions we get every year.", href: "parents.html" },
        { icon: "field",    title: "Baseball schedule",  body: "Kept current by the athletics department.", href: "https://chhs.dcssga.org/o/chhs/events", external: true },
        { icon: "people",   title: "Booster Club",       body: "Who we are, what we pay for, and when we meet.", href: "booster-club.html" },
        { icon: "mail",     title: "Contact us",         body: "The board, the coaches, and who to ask about what.", href: "contact.html" },
      ],
    },
  },

  /* ------------------------------------------------------------------------
     CONTACT PAGE
     ------------------------------------------------------------------------
     Built from the question the page exists to answer: "who do I talk to?"

     THE ROUTING. Ten kinds of visitor collapse into four routes:

       parent (current) · student-athlete   → split: paperwork/fees to the
                                              Booster Club, tryouts/playing
                                              time to the coaches
       parent (prospective)                 → coaches
       sponsor · local business             → sponsorship
       volunteer · alumni · community       → Booster Club
       media · opposing coach · school staff → the school, 770.651.6200

     So: three program routes and one school route. Not a directory.

     The most load-bearing sentence on this page is `intro` below — the one
     that says the Booster Club doesn't pick the lineup. That single line is
     what keeps playing-time complaints out of the treasurer's inbox. Don't
     cut it to save space.

     !! EVERY EMAIL BELOW IS INVENTED, and so is the domain. They are here so
        the board sees a complete page. Before this URL goes anywhere near a
        real sponsor, replace them or the page routes people into a hole.
        The school phone (770.651.6200) is the only verified contact here.
  ---------------------------------------------------------------------------*/
  contactPage: {
    hero: {
      eyebrow:  "Contact",
      headline: "Get in touch",
      intro:    "Three places to start, depending on what you need. If you're not sure, pick the closest one and we'll pass it along.",
    },

    // The routing table, as cards. Order is by how often each one gets used.
    routes: {
      eyebrow: "Start here",
      heading: "Who handles what",
      // This is the line that does the work. See the note above.
      intro:   "The Booster Club handles fees, volunteering, and sponsorship. Tryouts, practice, and playing time are the coaches' call. If it's about a game, please wait until the next day.",
      items: [
        { icon:  "people",
          role:  "Baseball Booster Club",
          anchor: "booster",
          for:   "Parents, volunteers, and anyone who wants to help",
          desc:  "Fees and the assistance fund, volunteering, meetings, fundraising, and the banquet.",
          email: "boosters@chapelhillbaseball.org",
          examples: [
            "The fee is a problem this year",
            "I can work a concession shift",
            "When is the next meeting?",
          ] },
        { icon:  "field",
          role:  "Baseball program",
          anchor: "program",
          for:   "Players and parents, current and prospective",
          desc:  "Tryouts, practice, the roster, and playing time. The coaches, not the Booster Club.",
          email: "coach@chapelhillbaseball.org",
          examples: [
            "We're moving into the district next year",
            "When do tryouts start?",
            "My son is hurt and will miss a week",
          ] },
        { icon:  "star",
          role:  "Sponsorship",
          anchor: "sponsorship",
          for:   "Local businesses",
          desc:  "Banners, packets, program ads, and in-kind support. Ask for the sponsor packet.",
          email: "sponsors@chapelhillbaseball.org",
          examples: [
            "Send me the sponsor packet",
            "We'd rather donate materials than money",
            "Is our banner going up this season?",
          ] },
      ],
      note: "",
    },

    // Sets expectations without promising a response time nobody has agreed to.
    guidance: {
      eyebrow: "Before you write",
      heading: "What to put in the message",
      intro:   "We're parents with day jobs. A message with these in it gets answered faster, because nobody has to write back asking.",
      items: [
        "Your son's name and grade",
        "What you're asking about, in the subject line",
        "A phone number if it's easier to call you back",
        "For sponsorships: the business name and who to reach",
      ],
      // !! Deliberately no response-time promise. Nobody has committed to one.
      after: "If it's urgent and it's about a player's safety or eligibility, call the school at 770.651.6200 instead of emailing.",
    },

    faq: {
      eyebrow: "Quick answers",
      heading: "Might save you an email",
      items: [
        { q: "Who decides who makes the team?",
          a: "The coaching staff, entirely. The Booster Club has no say in the roster or in playing time, and we don't pass those messages along." },
        { q: "We can't afford the fee. What now?",
          a: "Email the Booster Club. There's an assistance fund and the conversation stays between you and the board." },
        { q: "Can I email about a call the umpire made?",
          a: "Please wait until the next day. That goes for coaches and parents both." },
        { q: "How do I sponsor the team?",
          a: "Email the sponsorship address and ask for the packet. Three levels, and in-kind support counts." },
        { q: "Is this the school's website?",
          a: "No. This site is run by the Baseball Booster Club. For school policy, registration, attendance, or transportation, use the district's site." },
        { q: "Who do I call about grades or eligibility paperwork?",
          a: "The school front office at 770.651.6200. That's school business, not ours." },
      ],
    },

    // "If your question belongs elsewhere" — the school route.
    school: {
      eyebrow: "Not a baseball question?",
      heading: "The school handles the rest",
      intro:   "Registration, attendance, transportation, grades, and school policy all live with Chapel Hill High School and Douglas County. We link there rather than copy it, so what you read is current.",
    },
  },

  /* ------------------------------------------------------------------------
     PARENTS PAGE
     ------------------------------------------------------------------------
     What the homepage quick-link card promises: "Meetings, dates, paperwork,
     and the questions we get every year." That's this page's contract. Fees
     were added because they're the question that actually gets asked most.

     !! DATES ARE NOT DUPLICATED HERE. The four dates render from
        `SITE.seasonStrip` — the same array the homepage strip uses. Edit them
        once, both pages update. The `notes` object below adds page-only
        detail keyed to the same labels, so the DATES live in one place and
        only the extra prose lives here.

        Do not paste the dates into this section. Two lists drift, and a stale
        tryout date on the page built to be authoritative about dates is worse
        than no page at all.

     Game schedule is NOT here either. It links to the school athletics
     calendar, per the standing rule in README: link, don't copy, so it can't
     go stale.
  ---------------------------------------------------------------------------*/
  parentsPage: {
    hero: {
      eyebrow:  "For parents",
      headline: "Parent information",
      intro:    "Meetings, dates, paperwork, and the questions we get every August. If you're new, start with the physical form and the parent meeting.",
      primaryCta:   { label: "Physical forms", href: "physical-forms.html" },
      secondaryCta: { label: "Ask a question", href: "contact.html" },
    },

    // Page-only detail, keyed to seasonStrip labels. The DATE itself is never
    // written here — only what a parent should know about it.
    dates: {
      eyebrow: "The calendar",
      heading: "Four dates that matter",
      intro:   "Game schedules live on the school's athletics calendar, which the athletic department keeps current. These four are the program's.",
      notes: {
        "Physicals due":       "A current GHSA physical has to be on file before he can do anything, including voluntary workouts. Last spring's has probably expired.",
        "Next parent meeting": "One parent or guardian per family is plenty. We cover the calendar, fees, volunteer roles, and fundraising, then take questions.",
        "Tryouts begin":       "Bring the physical if it isn't already turned in. No physical on file, no tryout.",
        "Opening day":         "First pitch of the season at home.",
      },
      cta: { label: "Full athletics calendar", href: "https://chhs.dcssga.org/o/chhs/events", external: true },
    },

    paperwork: {
      eyebrow: "Paperwork",
      heading: "What has to be turned in",
      intro:   "Three of these are GHSA or state requirements and go through the school. The Booster Club doesn't handle any of them.",
      items: [
        { icon: "form", title: "GHSA physical",
          body: "The four-page preparticipation packet. Required before any tryout, practice, workout, or game.",
          href: "physical-forms.html", cta: "How it works" },
        { icon: "check", title: "Cardiac and concussion forms",
          body: "Required by Georgia law, signed by a student and a parent. Both are on the physical forms page.",
          href: "physical-forms.html#also", cta: "Get the forms" },
        { icon: "calendar", title: "School registration",
          body: "Enrollment, attendance, and transportation are district business, not ours.",
          href: "https://chhs.dcssga.org/o/dcss/page/registration", external: true, cta: "District site" },
        { icon: "hand", title: "Pay online",
          body: "The school's payment system for school fees and activities.",
          href: "https://chapelhillhs.revtrak.net", external: true, cta: "RevTrak" },
      ],
    },

    /* ----------------------------------------------------------------------
       FEES
       ----------------------------------------------------------------------
       !! NOTHING HERE IS CONFIRMED, AND NOTHING HERE SHOULD BE INVENTED.

       A fabricated dollar amount is not like a fabricated sponsor logo. A
       number on a screen gets repeated in a board meeting, quoted to a
       parent, and becomes real without anybody deciding it. Same category as
       the invented coach quote: the problem isn't that it's wrong, it's that
       nobody chose it.

       Fill these in and the "pending" chips disappear on their own:
         amount      — the figure
         due         — the deadline
         methods     — array of {label, detail}; empty array shows pending
         installments / assistance — set `available: true` when confirmed

       The school already uses RevTrak (verified). Confirm whether baseball
       dues go through it before building a parallel payment story.

       The assistance line is the one thing here that IS the program's own
       voice — it's lifted from SITE.boosterClub.points. Keep it.
    ---------------------------------------------------------------------- */
    fees: {
      eyebrow: "Fees",
      heading: "What it costs, and what it pays for",
      // Why before how much. The brief is right that this order matters.
      why:     "The school pays for a baseball program. Fees and sponsors pay for the rest of it: baseballs, the clay on the mound, uniforms, meals on the road, and the banquet. Every dollar stays with this program.",
      supports: [
        "Baseballs and practice equipment",
        "Field upkeep and improvements",
        "Team equipment and uniforms",
        "Meals on road trips",
        "Program operations",
        "End-of-season banquet",
      ],
      // !! Every value below is deliberately empty. See the note above.
      amount:  "",
      due:     "",
      methods: [],
      installments: { available: false },
      pendingLabel: "Pending confirmation",
      pendingNote:  "Fee amounts, deadlines, and payment methods are being confirmed by the Booster Club board. This page updates as soon as they're set.",
      // This one is real — it's the program's existing voice on money.
      assistance: {
        heading: "If the fee is a problem",
        body:    "Tell us. There's an assistance fund and the conversation stays between you and the board. A boy who wants to play gets to play.",
        cta:     { label: "Email the Booster Club", href: "mailto:boosters@chapelhillbaseball.org" },
      },
    },

    faq: {
      eyebrow: "Every August",
      heading: "The questions we get every year",
      items: [
        { q: "He played last year. Does he need a new physical?",
          a: "Almost certainly. A physical is good for twelve months from the exam date. Check the date on it: if the exam was on or after April 1, it may still cover this school year." },
        { q: "Do I have to go to the parent meeting?",
          a: "One parent or guardian per family. It's where the calendar, fees, and volunteer roles get explained, and it saves you a season of asking." },
        { q: "How much are fees and when are they due?",
          a: "Being confirmed by the board. The parent meeting is where the numbers get announced, and this page updates the same week." },
        { q: "What if we can't afford it?",
          a: "Email the Booster Club. There's an assistance fund and it stays between you and the board." },
        { q: "Who decides who makes the team?",
          a: "The coaching staff, entirely. The Booster Club has no say in the roster or in playing time." },
        { q: "Where do I find game times?",
          a: "The school's athletics calendar. We link to it rather than copying dates here, so what you see is always current." },
        { q: "How do I volunteer?",
          a: "One shift is the whole ask. Concessions, field work, team meals, gate, scorebook, or fundraising." },
      ],
    },

    announcements: {
      eyebrow: "The archive",
      heading: "Announcements",
      intro:   "Everything posted this season, newest first.",
    },

    school: {
      eyebrow: "Official school resources",
      heading: "Everything that isn't baseball",
      intro:   "Registration, attendance, transportation, and school policy live on the district's site. We link there instead of copying it, so what you read is always current.",
    },
  },

  /* ------------------------------------------------------------------------
     SPONSORS PAGE (Become a Sponsor)
     ------------------------------------------------------------------------
     The deep sponsorship page. The homepage keeps its sponsor STRIP and its
     recognition block as previews; this page carries the packages, the
     process, and the pitch. Don't duplicate the packages onto the homepage.

     !! ALL OF THIS IS DEMONSTRATION DATA. The tier amounts ($250-$2,500),
        the benefits, and the descriptions are sample content to show the
        experience. They are NOT approved by the board. The visible
        `disclosure` block near the packages says so on the page itself.

        Why amounts are OK here when fee amounts on the Parents page are not:
        a sponsorship tier is a pitch to a business, clearly marked demo, that
        nobody writes a check against off a mock. A parent fee is a bill a
        family acts on. Different risk.

     !! NO EMAIL ADDRESS APPEARS ON THIS PAGE. The action is a button to
        contact.html#sponsorship. The (demo) sponsorship email lives on the
        Contact page, marked there. We don't repeat an address that looks live.

     To make this real: replace amounts/benefits/descriptions below, confirm
     the board's actual tiers, then flip nothing else — the page renders from
     here.
  ---------------------------------------------------------------------------*/
  sponsorPage: {
    status: "demo",

    hero: {
      eyebrow:  "Community partnerships",
      headline: "Become a Panther baseball sponsor",
      intro:    "Partner with Chapel Hill baseball to support student-athletes, strengthen the program, and put your name in front of Panther families and the community.",
      kicker:   "Strong programs are built by committed players, families, coaches, alumni, and community partners.",
      primaryCta:   { label: "See sponsorship levels", href: "#packages" },
      secondaryCta: { label: "Start a conversation",   href: "#start" },
    },

    value: {
      eyebrow: "More than a logo",
      heading: "What a sponsorship really is",
      intro:   "Putting a business name on a banner is the smallest part. A sponsorship is a local partnership that builds something for the kids and gets your name in front of the people who notice who showed up.",
      items: [
        { icon: "people", title: "Support the players",
          body: "Help build the environment where these boys prepare, develop, and represent their school." },
        { icon: "grow", title: "Strengthen the program",
          body: "Back the resources it takes to run and improve a competitive baseball program." },
        { icon: "star", title: "Reach the community",
          body: "Build goodwill with local families, alumni, and everyone who comes through the gate." },
      ],
    },

    impact: {
      eyebrow: "Your partnership at work",
      heading: "Where support tends to go",
      intro:   "Sponsorship helps strengthen the program priorities the board sets each season. It isn't earmarked dollar-for-dollar, but it tends to land here:",
      items: [
        "Equipment and training resources",
        "Field and facility improvements",
        "Player-development opportunities",
        "Team travel and experiences",
        "Program operations",
        "Events and recognition",
        "Community engagement",
        "Future program initiatives",
      ],
      note: "Sponsorship support helps strengthen approved program priorities set by Chapel Hill baseball and Booster Club leadership.",
    },

    // The demonstration notice that sits right at the packages.
    disclosure: "Demonstration data: sponsorship levels, investment amounts, benefits, and contact information shown here are sample content for the proposed website experience. Final information must be reviewed and approved by Chapel Hill baseball and Booster Club leadership before launch.",

    packages: {
      eyebrow: "Sponsorship levels",
      heading: "Choose a partnership",
      items: [
        { id: "community", name: "Community Supporter", amount: "$250", featured: false,
          desc: "For individuals, families, and small businesses that want to back Panther baseball.",
          benefits: [
            "Recognition in the online sponsor directory",
            "Business or family name on the website",
            "Season appreciation recognition",
          ] },
        { id: "bronze", name: "Bronze Partner", amount: "$500", featured: false,
          desc: "A strong entry point for local businesses that want community visibility.",
          benefits: [
            "Online sponsor directory listing",
            "Business logo on the sponsor page",
            "Social-media thank-you",
            "Game-day acknowledgment",
          ] },
        { id: "silver", name: "Silver Partner", amount: "$1,000", featured: false,
          desc: "Expanded recognition for organizations committed to the program.",
          benefits: [
            "Featured directory placement",
            "Business logo and website link",
            "Social-media recognition",
            "Game-day announcements",
            "Field-banner opportunity",
          ] },
        { id: "gold", name: "Gold Partner", amount: "$2,500", featured: true, badge: "Featured",
          desc: "Premier season-long recognition for a business making a real investment in the program.",
          benefits: [
            "Prominent website recognition",
            "Featured sponsor spotlight",
            "Business logo and website link",
            "Social-media feature",
            "Field signage",
            "Recognition at selected events",
          ] },
        { id: "championship", name: "Championship Partner", amount: "Custom", featured: false,
          desc: "A tailored partnership for an organization that wants a prominent relationship with the program.",
          benefits: [
            "Custom recognition strategy",
            "Collaborative opportunities",
            "Prominent program recognition",
            "Tailored digital and event visibility",
            "Direct partnership planning",
          ] },
      ],
    },

    recognition: {
      eyebrow: "Recognition",
      heading: "How sponsors get seen",
      items: [
        "Website recognition", "Sponsor-directory placement", "Social-media features",
        "Game-day announcements", "Field signage", "Event recognition",
        "Digital program placement", "Community-partner features",
      ],
      note: "What's available depends on the level, timing, school requirements, and final program approval.",
    },

    process: {
      eyebrow: "How it works",
      heading: "A simple process",
      items: [
        { n: 1, title: "Pick a level", body: "Look over the levels and find the one that fits your organization." },
        { n: 2, title: "Reach out", body: "Send us your business details through the Contact page. No obligation." },
        { n: 3, title: "Confirm", body: "We confirm the level, benefits, payment, and what materials we need." },
        { n: 4, title: "Go up", body: "After approval and payment, send your logo and the recognition begins." },
      ],
    },

    // Replaces the fake form. Routes to Contact. No email shown here.
    start: {
      eyebrow: "Start a conversation",
      heading: "Talk to us about sponsoring",
      intro:   "Reaching out expresses interest. It doesn't commit you to anything. Tell us a little and we'll take it from there.",
      bring: [
        "Business or organization name",
        "A contact name and the best way to reach you",
        "The level you're considering, or that you're not sure yet",
        "Whether you'd rather give materials than money",
      ],
      cta: { label: "Start a sponsorship conversation", href: "contact.html#sponsorship" },
      // No mailto here on purpose. The (demo) address lives on Contact.
      note: "Do not send credit-card, banking, or tax information through email.",
    },

    faq: {
      eyebrow: "Questions",
      heading: "Before you reach out",
      items: [
        { q: "What does sponsorship support?",
          a: "It helps strengthen approved areas: equipment, facilities, player development, program operations, team experiences, and community engagement." },
        { q: "Can we give products or services instead of money?",
          a: "In-kind support may work when it fits a program need and gets approved. Ask." },
        { q: "Can a sponsorship be customized?",
          a: "Yes. The Championship level exists for organizations that want a more tailored relationship." },
        { q: "How long does recognition last?",
          a: "Generally the applicable baseball season, unless the final agreement says otherwise." },
        { q: "Is sponsorship tax deductible?",
          a: "That depends on your organization, the nature of the payment, and tax rules. Ask your own tax professional. We don't claim it's deductible unless the Booster Club confirms the legal and tax status." },
        { q: "When does recognition begin?",
          a: "After the sponsorship is approved, payment is complete, and we've received your materials." },
        { q: "What logo files do you need?",
          a: "Usually a high-quality PNG, JPG, or SVG. The program confirms the exact requirements." },
      ],
    },

    community: {
      eyebrow: "Community partners",
      heading: "How sponsors will appear",
      intro:   "A preview of the directory. These are placeholders, not real businesses.",
      items: [
        { name: "Community Partner",   level: "Community Supporter" },
        { name: "Local Business",      level: "Bronze Partner" },
        { name: "Panther Supporter",   level: "Silver Partner" },
        { name: "Featured Partner",    level: "Gold Partner" },
        { name: "Program Partner",     level: "Silver Partner" },
        { name: "Championship Partner", level: "Championship Partner" },
      ],
      note: "Verified sponsor logos and business information will replace these before launch.",
    },

    finalCta: {
      eyebrow: "Build what comes next",
      heading: "Help build what comes next",
      body:    "Strong programs are built on preparation, teamwork, family support, and community partners. Let's talk about how your organization can back Chapel Hill baseball.",
      primaryCta:   { label: "See the levels", href: "#packages" },
      secondaryCta: { label: "Start a conversation", href: "contact.html#sponsorship" },
    },
  },

  /* ------------------------------------------------------------------------
     15. OFFICIAL SCHOOL LINKS
         Verified from chhs.dcssga.org. All open in a new tab and are labeled
         "Official" so nobody mistakes this site for the district's.
  ---------------------------------------------------------------------------*/
  official: {
    eyebrow: "Official school resources",
    heading: "Everything else",
    intro:   "Registration, attendance, transportation, and school policy all live on the district's site. We link there instead of copying it, so what you read is always current.",
    schoolSite: "https://chhs.dcssga.org/o/chhs",
    links: [
      { label: "Chapel Hill High School", href: "https://chhs.dcssga.org/o/chhs" },
      { label: "School calendar",         href: "https://chhs.dcssga.org/o/chhs/events" },
      { label: "Registration",            href: "https://chhs.dcssga.org/o/dcss/page/registration" },
      { label: "Attendance",              href: "https://chhs.dcssga.org/o/chhs/page/attendance" },
      { label: "Transportation",          href: "https://chhs.dcssga.org/o/dcss/page/transportation" },
      { label: "Pay online",              href: "https://chapelhillhs.revtrak.net" },
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
     16. FOOTER DISCLAIMER — required. Do not remove.
  ---------------------------------------------------------------------------*/
  disclaimer: "This website supports the Chapel Hill High School Baseball program and Baseball Booster Club. Please visit the official Chapel Hill High School website for school policies, district information, official schedules, registration, transportation, and other schoolwide resources.",

  // Shown in the footer after the copyright line. Left empty for a clean
  // presentation. Put the draft notice back here before sharing publicly.
  draftNotice: "",

  /* ------------------------------------------------------------------------
     REVISION STAMP
     ------------------------------------------------------------------------
     Shows in the footer so you can confirm at a glance which version a browser
     actually served you. GitHub Pages and browser caches both hold old files
     longer than you expect; if you hard-refresh (Ctrl+F5) and this number
     hasn't changed, you're still looking at the old build.

     BUMP `rev` EVERY TIME YOU PUSH A CHANGE. It's deliberately manual — an
     automatic timestamp would update on every page load whether the file
     changed or not, which tells you nothing.

     Set `show: false` to hide it before real launch.
  ---------------------------------------------------------------------------*/
  revision: {
    show: true,
    rev:  "v1.2",
    date: "July 18, 2026",
    note: "Homepage draft",
  },

  /* ------------------------------------------------------------------------
     17. DRAFT BANNER
         Set `show: false` to hide it.
  ---------------------------------------------------------------------------*/
  mockBanner: {
    // Turned off for presentation. Set `show: true` to re-display the draft
    // bar — recommended any time this URL is shared beyond the board.
    show: false,
    text: "Draft mock-up · All names, dates, sponsors, and quotes are fictional samples",
  },
};
