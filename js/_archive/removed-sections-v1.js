/* ==========================================================================
   ARCHIVE — HOMEPAGE SECTIONS REMOVED IN v2.0
   ==========================================================================

   THIS FILE IS NOT LOADED BY ANY PAGE. It is a parking lot, nothing more.

   The Booster Club asked for a minimal homepage, so these builders were
   deleted out of js/main.js rather than hidden with CSS. Their content still
   lives in data/content.js, untouched.

   TO BRING ONE BACK:
     1. Copy its function into js/main.js, above the PAGES table.
     2. Add its name to the page's list in PAGES.
     3. Restore its CSS — the matching rules were removed from
        css/style.css in v2.0 and are listed in HANDOFF.md.

   What's in here:
     buildParentHub    Parent Hub (season dates + quick links)
     buildSnapshot     2026 Season - Where We Stand
     buildValues       What Panther baseball stands for
     buildDevelopment  Four years, and what comes after
     buildVolunteerCta Lend a Hand
     buildQuickLinks   Quick links grid
     buildNews         Latest News / Around the Program / All Announcements
     buildCoachWelcome From the Dugout
     buildSponsors     Our Sponsors (tiered recognition)
     buildSponsorValue Why Sponsor Chapel Hill Baseball
     buildSpotlight    Volunteer Spotlight
     buildBooster      Built by parents, for parents
     buildContact      Who to ask (three role cards)
   ========================================================================== */

  // PARENT HUB — season dates + quick links unified into one at-a-glance card,
  // so parents get real-time information from a single place instead of
  // hunting across the page. Reuses SITE.seasonStrip and SITE.quickLinks.
  function buildParentHub() {
    var dates = SITE.seasonStrip || [];
    var q = SITE.quickLinks;
    return el(
      '<section class="section section--wash">' +
        '<div class="wrap">' +
          '<div class="parenthub">' +
            '<div class="parenthub__head">' +
              '<div>' +
                '<span class="eyebrow">Parent Hub</span>' +
                '<h2>Everything you need, in one place</h2>' +
              '</div>' +
              '<span class="parenthub__badge"><span class="parenthub__dot"></span>Updated ' + esc(SITE.revision ? SITE.revision.date : "") + '</span>' +
            '</div>' +
            '<div class="parenthub__dates">' +
              dates.map(function (i) {
                return '<div class="parenthub__date">' +
                         '<div class="parenthub__date-label">' + esc(i.label) + '</div>' +
                         '<div class="parenthub__date-value">' + esc(i.value) + '</div>' +
                         (i.detail ? '<div class="parenthub__date-detail">' + esc(i.detail) + '</div>' : '') +
                       '</div>';
              }).join("") +
            '</div>' +
            '<div class="grid grid--3">' +
              q.items.map(function (i) {
                return '<a class="card" href="' + esc(i.href) + '"' + extAttrs(i) + '>' +
                         '<span class="card__icon">' + icon(i.icon) + '</span>' +
                         '<h3>' + esc(i.title) + extTag(i) + '</h3>' +
                         '<p>' + esc(i.body) + '</p>' +
                       '</a>';
              }).join("") +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }

  function buildSnapshot() {
    var s = SITE.snapshot;
    if (!s || !s.show) { return null; }
    return el(
      '<section class="snapshot" aria-label="Program snapshot">' +
        '<div class="wrap">' +
          '<div class="snapshot__head">' +
            '<span class="eyebrow">' + esc(s.eyebrow) + "</span>" +
            "<h2>" + esc(s.heading) + "</h2>" +
          "</div>" +
          '<div class="snapshot__grid">' +
            s.items.map(function (i) {
              return '<div class="snap">' +
                       '<span class="snap__value">' + esc(i.value) + "</span>" +
                       '<span class="snap__label">' + esc(i.label) + "</span>" +
                       '<span class="snap__detail">' + esc(i.detail) + "</span>" +
                     "</div>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildValues() {
    var v = SITE.values;
    if (!v) { return null; }
    return el(
      '<section class="section values" id="values">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(v.eyebrow) + "</span>" +
            "<h2>" + esc(v.heading) + "</h2><p>" + esc(v.intro) + "</p>" +
          "</div>" +
          '<ol class="valuelist">' +
            v.items.map(function (i, n) {
              return '<li class="value">' +
                       '<span class="value__num">' + ("0" + (n + 1)) + "</span>" +
                       '<span class="value__body"><strong>' + esc(i.name) + "</strong>" +
                       "<span>" + esc(i.body) + "</span></span>" +
                     "</li>";
            }).join("") +
          "</ol>" +
        "</div>" +
      "</section>"
    );
  }

  function buildDevelopment() {
    var d = SITE.development;
    if (!d) { return null; }
    return el(
      '<section class="section section--wash devwrap" id="development">' +
        '<div class="wrap devgrid">' +
          "<div>" +
            '<span class="eyebrow">' + esc(d.eyebrow) + "</span>" +
            "<h2>" + esc(d.heading) + "</h2>" +
            '<p class="devgrid__intro">' + esc(d.intro) + "</p>" +
            '<div class="devpoints">' +
              d.points.map(function (pt) {
                return '<div class="devpoint">' + icon("grow", "icon icon--dev") +
                         "<div><strong>" + esc(pt.head) + "</strong>" +
                         "<p>" + esc(pt.body) + "</p></div>" +
                       "</div>";
              }).join("") +
            "</div>" +
          "</div>" +
          '<aside class="alumni">' +
            '<span class="alumni__icon">' + icon("trophy") + "</span>" +
            "<h3>" + esc(d.alumni.heading) + "</h3>" +
            '<ul class="alumni__list">' +
              d.alumni.items.map(function (a) {
                return "<li><strong>" + esc(a.name) + "</strong><span>" +
                       esc(a.detail) + "</span></li>";
              }).join("") +
            "</ul>" +
          "</aside>" +
        "</div>" +
      "</section>"
    );
  }

  function buildVolunteerCta() {
    var v = SITE.volunteerCta;
    if (!v) { return null; }
    return el(
      '<section class="volcta" id="volunteer">' +
        '<div class="wrap volcta__inner">' +
          '<div class="volcta__body">' +
            '<span class="eyebrow">' + esc(v.eyebrow) + "</span>" +
            "<h2>" + esc(v.heading) + "</h2>" +
            "<p>" + esc(v.body) + "</p>" +
            '<ul class="volcta__roles">' +
              v.roles.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("") +
            "</ul>" +
          "</div>" +
          '<a class="btn btn--primary btn--lg" href="' + esc(v.cta.href) + '">' +
            esc(v.cta.label) + "</a>" +
        "</div>" +
      "</section>"
    );
  }

  function buildQuickLinks() {
    var q = SITE.quickLinks;
    return el(
      '<section class="section" id="start">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(q.eyebrow) + "</span>" +
            "<h2>" + esc(q.heading) + "</h2>" +
            "<p>" + esc(q.intro) + "</p>" +
          "</div>" +
          '<div class="grid grid--3">' +
            q.items.map(function (i) {
              return '<a class="card" href="' + esc(i.href) + '"' + extAttrs(i) + ">" +
                       '<span class="card__icon">' + icon(i.icon) + "</span>" +
                       "<h3>" + esc(i.title) + extTag(i) + "</h3>" +
                       "<p>" + esc(i.body) + "</p>" +
                       '<span class="card__more">' + (i.external ? "Official site" : "Go") + "</span>" +
                     "</a>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildNews() {
    var a = SITE.announcements;
    if (!a || !a.items || !a.items.length) { return null; }
    return el(
      '<section class="section section--wash" id="news">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(a.eyebrow) + "</span>" +
            "<h2>" + esc(a.heading) + "</h2><p>" + esc(a.intro) + "</p>" +
          "</div>" +
          '<div class="notices notices--grid">' +
            a.items.map(function (i) {
              return '<article class="notice' + (i.pin ? " notice--pin" : "") + '">' +
                       '<div class="notice__meta">' +
                         '<span class="notice__tag">' + esc(i.tag) + "</span>" +
                         '<time class="notice__date">' + esc(i.date) + "</time>" +
                       "</div>" +
                       "<h3>" + esc(i.title) + "</h3>" +
                       "<p>" + esc(i.body) + "</p>" +
                     "</article>";
            }).join("") +
          "</div>" +
          (a.cta ? '<p class="newscol__cta"><a class="btn btn--outline" href="' +
                   esc(a.cta.href) + '">' + esc(a.cta.label) + "</a></p>" : "") +
        "</div>" +
      "</section>"
    );
  }

  function buildCoachWelcome() {
    var c = SITE.coachWelcome;
    if (!c || !c.show) { return null; }   // off until the coach supplies words
    return el(
      '<section class="section coachwrap">' +
        '<div class="wrap">' +
          '<figure class="coach">' +
            '<span class="coach__eyebrow eyebrow">' + esc(c.eyebrow) + "</span>" +
            "<h2>" + esc(c.heading) + "</h2>" +
            "<blockquote><p>" + esc(c.quote) + "</p></blockquote>" +
            '<figcaption class="coach__by"><strong>' + esc(c.name) + "</strong>" +
              "<span>" + esc(c.role) + "</span></figcaption>" +
          "</figure>" +
        "</div>" +
      "</section>"
    );
  }

  /* ---- SPONSORS — the section the Booster President asked to lead ------- */
  function buildSponsors() {
    var s = SITE.sponsors;
    var sizeClass = ["tier--lg", "tier--md", "tier--sm"];

    var tiers = s.levels.map(function (lvl, idx) {
      var slots = lvl.items.map(function (it) {
        if (!it.name && !it.logo) {
          return '<div class="sponsor sponsor--empty"><span>Sponsor slot</span></div>';
        }
        var inner = it.logo
          ? '<img src="' + esc(it.logo) + '" alt="' + esc(it.name) + '">'
          : '<span class="sponsor__name">' + esc(it.name) + "</span>";
        // Premier sponsors get a line of their own and a link out — the
        // difference between being listed and being recognized.
        var note = it.note ? '<span class="sponsor__note">' + esc(it.note) + "</span>" : "";
        var body = '<span class="sponsor__mark">' + inner + "</span>" + note;
        return it.url
          ? '<a class="sponsor sponsor--link" href="' + esc(it.url) + '">' + body + "</a>"
          : '<div class="sponsor">' + body + "</div>";
      }).join("");

      return '<div class="tier ' + (sizeClass[idx] || "tier--sm") + '">' +
               '<div class="tier__head">' +
                 "<h3>" + esc(lvl.name) + "</h3>" +
                 '<p class="tier__blurb">' + esc(lvl.blurb) + "</p>" +
               "</div>" +
               '<div class="sponsor-grid">' + slots + "</div>" +
             "</div>";
    }).join("");

    return el(
      '<section class="section sponsors" id="sponsors">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(s.eyebrow) + "</span>" +
            "<h2>" + esc(s.heading) + "</h2>" +
          "</div>" +
          '<p class="sponsors__thanks">' + esc(s.thanks) + "</p>" +
          (s.impact ? '<div class="impact">' +
            '<h3 class="impact__head">' + esc(s.impact.heading) + "</h3>" +
            '<ul class="impact__list">' +
              s.impact.items.map(function (i) {
                return '<li class="impact__item">' + icon("check", "icon icon--tick") +
                       '<span><strong>' + esc(i.thing) + "</strong>" +
                       '<em>' + esc(i.by) + "</em></span></li>";
              }).join("") +
            "</ul>" + sampleNote(s.impact.note) + "</div>" : "") +
          tiers +
          '<div class="sponsors__foot">' +
            '<a class="btn btn--primary btn--lg" href="' + esc(SITE.sponsorValue.cta.href) + '">' +
              esc(SITE.sponsorValue.cta.label) + "</a>" +
            '<a class="btn btn--outline" href="' + esc(SITE.sponsorValue.altCta.href) + '">' +
              esc(SITE.sponsorValue.altCta.label) + "</a>" +
          "</div>" +
          sampleNote(s.note) +
        "</div>" +
      "</section>"
    );
  }

  function buildSponsorValue() {
    var v = SITE.sponsorValue;
    return el(
      '<section class="section section--purple" id="sponsor-value">' +
        '<div class="wrap sponsorvalue">' +
          '<div class="sponsorvalue__lede">' +
            '<span class="eyebrow">' + esc(v.eyebrow) + "</span>" +
            "<h2>" + esc(v.heading) + "</h2>" +
            "<p>" + esc(v.intro) + "</p>" +
            '<ul class="ticks">' +
              v.points.map(function (p) {
                return "<li>" + icon("check", "icon icon--tick") + "<span>" + esc(p) + "</span></li>";
              }).join("") +
            "</ul>" +
            '<p class="sponsorvalue__cta">' +
              '<a class="btn btn--primary btn--lg" href="' + esc(v.cta.href) + '">' +
                esc(v.cta.label) + "</a></p>" +
          "</div>" +
          '<div class="sponsorvalue__stats">' +
            v.stats.map(function (st) {
              return '<div class="stat"><span class="stat__figure">' + esc(st.figure) +
                     '</span><span class="stat__label">' + esc(st.label) + "</span></div>";
            }).join("") +
            sampleNote(v.note) +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildSpotlight() {
    var sp = SITE.spotlight;
    if (!sp) { return null; }
    return el(
      '<section class="section section--wash spotwrap">' +
        '<div class="wrap">' +
          '<figure class="spot">' +
            '<span class="spot__icon">' + icon("star") + "</span>" +
            '<span class="eyebrow">' + esc(sp.eyebrow) + "</span>" +
            "<h2>" + esc(sp.heading) + "</h2>" +
            "<p>" + esc(sp.body) + "</p>" +
          "</figure>" +
        "</div>" +
      "</section>"
    );
  }

  function buildBooster() {
    var b = SITE.boosterClub, sp = SITE.spotlight;
    return el(
      '<section class="section section--wash" id="booster">' +
        '<div class="wrap boostergrid">' +
          "<div>" +
            '<span class="eyebrow">' + esc(b.eyebrow) + "</span>" +
            "<h2>" + esc(b.heading) + "</h2>" +
            '<p class="boostergrid__body">' + esc(b.body) + "</p>" +
            '<ul class="ticks ticks--dark">' +
              b.points.map(function (p) {
                return "<li>" + icon("check", "icon icon--tick") + "<span>" + esc(p) + "</span></li>";
              }).join("") +
            "</ul>" +
            '<p style="margin-top:1.75rem"><a class="btn btn--outline" href="' +
              esc(b.cta.href) + '">' + esc(b.cta.label) + "</a></p>" +
          "</div>" +
          (sp ? '<aside class="spotlight">' +
                  '<span class="spotlight__icon">' + icon("star") + "</span>" +
                  '<span class="eyebrow">' + esc(sp.eyebrow) + "</span>" +
                  "<h3>" + esc(sp.heading) + "</h3>" +
                  "<p>" + esc(sp.body) + "</p>" +
                  '<a class="spotlight__cta" href="' + esc(sp.cta.href) + '">' +
                    esc(sp.cta.label) + "</a>" +
                  sampleNote(sp.note) +
                "</aside>" : "") +
        "</div>" +
      "</section>"
    );
  }

  function buildContact() {
    var c = SITE.contact;
    return el(
      '<section class="section" id="contact">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(c.eyebrow) + "</span>" +
            "<h2>" + esc(c.heading) + "</h2><p>" + esc(c.intro) + "</p>" +
          "</div>" +
          '<div class="grid grid--3">' +
            c.items.map(function (i) {
              var line = i.email
                ? '<a class="contact-card__email" href="mailto:' + esc(i.email) + '">' +
                    icon("mail") + esc(i.email) + "</a>"
                : '<span class="contact-card__pending">' + icon("mail") +
                    "Contact details coming soon</span>";
              return '<div class="contact-card">' +
                       "<h3>" + esc(i.role) + "</h3>" +
                       '<p class="contact-card__desc">' + esc(i.desc) + "</p>" +
                       line +
                     "</div>";
            }).join("") +
          "</div>" +
          sampleNote(c.note) +
        "</div>" +
      "</section>"
    );
  }
