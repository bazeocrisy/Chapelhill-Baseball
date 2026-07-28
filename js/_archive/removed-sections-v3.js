/* ==========================================================================
   ARCHIVE — CONTACT PAGE SECTIONS REMOVED IN v2.2
   ==========================================================================

   THIS FILE IS NOT LOADED BY ANY PAGE.

   The Contact page was reduced to a heading, one sentence, and two cards.
   The three role-routing cards came out because the email addresses in them
   were invented for the mock and were never issued — publishing them would
   have sent parents into a black hole. The "what to put in the message" and
   FAQ blocks came out because the Booster Club asked for an information
   page, not a service desk.

   buildOfficial and its two callers went with them. Nothing rendered them
   any more: the Contact page's copy was the last live use, and the Parents
   page version had already been commented out in v2.0.

   Their content still lives in data/content.js under SITE.contactPage and
   SITE.official. When real inboxes are issued, put the address in
   SITE.contactPage.info.booster.email and the live page picks it up — no
   need to restore any of this.
   ========================================================================== */

/* ---- contact page: hero, routes, guidance, faq ---- */

  function buildContactHero() {
    var h = SITE.contactPage.hero;
    return el(
      '<section class="hero hero--page">' +
        '<div class="hero__scrim" aria-hidden="true"></div>' +
        '<div class="wrap hero__inner">' +
          '<div class="hero__content">' +
            '<p class="hero__eyebrow">' + esc(h.eyebrow) + "</p>" +
            "<h1>" + esc(h.headline) + "</h1>" +
            '<p class="hero__intro">' + esc(h.intro) + "</p>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  // The routing table. This is the page.
  function buildContactRoutes() {
    var r = SITE.contactPage.routes;
    return el(
      '<section class="section" id="contact">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(r.eyebrow) + "</span>" +
            "<h2>" + esc(r.heading) + "</h2>" +
            '<p class="routes__intro">' + esc(r.intro) + "</p>" +
          "</div>" +
          '<div class="grid grid--3 routes">' +
            r.items.map(function (i) {
              return '<div class="route"' + (i.anchor ? ' id="' + esc(i.anchor) + '"' : "") + ">" +
                       '<span class="card__icon">' + icon(i.icon) + "</span>" +
                       "<h3>" + esc(i.role) + "</h3>" +
                       '<p class="route__for">' + esc(i.for) + "</p>" +
                       '<p class="route__desc">' + esc(i.desc) + "</p>" +
                       (i.examples && i.examples.length
                         ? '<ul class="route__eg">' +
                             i.examples.map(function (e) {
                               return "<li>" + esc(e) + "</li>";
                             }).join("") +
                           "</ul>"
                         : "") +
                       (i.email
                         ? '<a class="btn btn--outline route__cta" href="mailto:' + esc(i.email) + '">' +
                             icon("mail") + "Email " + esc(i.role.toLowerCase()) + "</a>" +
                           '<span class="route__addr">' + esc(i.email) + "</span>"
                         : '<span class="contact-card__pending">' + icon("mail") +
                             "Contact details coming soon</span>") +
                     "</div>";
            }).join("") +
          "</div>" +
          sampleNote(r.note) +
        "</div>" +
      "</section>"
    );
  }

  function buildContactGuidance() {
    var g = SITE.contactPage.guidance;
    return el(
      '<section class="section section--wash">' +
        '<div class="wrap wrap--narrow">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(g.eyebrow) + "</span>" +
            "<h2>" + esc(g.heading) + "</h2><p>" + esc(g.intro) + "</p>" +
          "</div>" +
          '<div class="impact">' +
            '<ul class="ticks ticks--dark ticks--2col">' +
              g.items.map(function (i) {
                return "<li>" + icon("check", "icon icon--tick") + "<span>" + esc(i) + "</span></li>";
              }).join("") +
            "</ul>" +
          "</div>" +
          (g.after ? '<p class="guidance__after">' + esc(g.after) + "</p>" : "") +
        "</div>" +
      "</section>"
    );
  }

  function buildContactFaq() {
    var f = SITE.contactPage.faq;
    return el(
      '<section class="section" id="faq">' +
        '<div class="wrap wrap--narrow">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(f.eyebrow) + "</span>" +
            "<h2>" + esc(f.heading) + "</h2>" +
          "</div>" +
          '<div class="faq">' +
            f.items.map(function (i) {
              return "<details class=\"faq__item\">" +
                       "<summary><span>" + esc(i.q) + "</span></summary>" +
                       '<div class="faq__a"><p>' + esc(i.a) + "</p></div>" +
                     "</details>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

/* ---- buildParentsSchool ---- */

  function buildParentsSchool() {
    return buildOfficial(SITE.parentsPage.school);
  }

/* ---- buildOfficial + buildContactSchool ---- */
  // Shared by any page that needs the district's links. `override` lets a page
  // supply its own eyebrow/heading/intro — the homepage framing ("Everything
  // else") makes no sense on a Contact page.
  function buildOfficial(override) {
    var o = SITE.official, s = o.school;
    var head = override || o;
    return el(
      '<section class="section section--wash" id="official">' +
        '<div class="wrap officialgrid">' +
          "<div>" +
            '<span class="eyebrow">' + esc(head.eyebrow) + "</span>" +
            "<h2>" + esc(head.heading) + "</h2><p>" + esc(head.intro) + "</p>" +
            '<div class="official-links">' +
              o.links.map(function (l) {
                return '<a href="' + esc(l.href) + '" target="_blank" rel="noopener noreferrer">' +
                       esc(l.label) + '<span class="tag-official">Official</span></a>';
              }).join("") +
            "</div>" +
          "</div>" +
          '<div class="findus">' +
            "<h3>" + esc(s.name) + "</h3>" +
            "<address>" + esc(s.address) + "<br>" + esc(s.city) + "<br>" +
              '<a href="' + esc(s.phoneHref) + '">' + esc(s.phone) + "</a></address>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  // Contact page's version: same links, framing that fits the page.
  function buildContactSchool() {
    return buildOfficial(SITE.contactPage.school);
  }