/* ==========================================================================
   Chapel Hill Baseball — main.js

   Reads data/content.js and renders the homepage.
   You should not need to edit this file to change content — edit content.js.

   TO REORDER OR REMOVE HOMEPAGE SECTIONS:
   Scroll to SECTION_ORDER near the bottom. Move a line to reorder. Delete or
   comment out a line to remove that section.
   ========================================================================== */

(function () {
  "use strict";

  /* ---- Helpers ---------------------------------------------------------- */

  // Escape text before inserting, so content is never treated as markup.
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function el(html) {
    var d = document.createElement("div");
    d.innerHTML = html.trim();
    return d.firstElementChild;
  }

  // Small note marking a block as sample content. Quiet by design — the draft
  // bar at the top carries the main message.
  function sampleNote(text) {
    return text ? '<p class="samplenote">' + esc(text) + "</p>" : "";
  }

  function extAttrs(item) {
    return item && item.external ? ' target="_blank" rel="noopener noreferrer"' : "";
  }
  function extTag(item) {
    return item && item.external ? '<span class="tag-official">Official</span>' : "";
  }

  /* ---- Inline icons ------------------------------------------------------
     Simple line icons, drawn to match the type weight. Kept inline so there's
     no icon-font dependency and they inherit color automatically.
  ------------------------------------------------------------------------- */
  var ICONS = {
    form:     '<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    field:    '<path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/><path d="M12 21V12M12 12l7-5M12 12L5 7"/>',
    people:   '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.5a5 5 0 0 1 5 5.5"/>',
    hand:     '<path d="M9 11V5.5a1.5 1.5 0 1 1 3 0V11"/><path d="M12 11V4.5a1.5 1.5 0 1 1 3 0V11"/><path d="M15 11V6.5a1.5 1.5 0 1 1 3 0V13"/><path d="M9 11V9a1.5 1.5 0 1 0-3 0v6a7 7 0 0 0 12 4.9"/>',
    mail:     '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    check:    '<path d="M20 6 9 17l-5-5"/>',
    star:     '<path d="m12 3 2.6 5.6 6.1.8-4.5 4.2 1.2 6L12 16.8 6.6 19.6l1.2-6L3.3 9.4l6.1-.8L12 3z"/>',
    trophy:   '<path d="M8 4h8v6a4 4 0 0 1-8 0V4z"/><path d="M8 6H5.5a2.5 2.5 0 0 0 2.5 4M16 6h2.5a2.5 2.5 0 0 1-2.5 4"/><path d="M12 14v3M9 20h6M10 17h4"/>',
    grow:     '<path d="M3 21h18"/><path d="M7 21v-6M12 21V9M17 21v-9"/><path d="m4 12 4-4 4 3 5-6"/>',
  };
  function icon(name, cls) {
    var d = ICONS[name];
    if (!d) { return ""; }
    return '<svg class="' + (cls || "icon") + '" viewBox="0 0 24 24" fill="none" ' +
           'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" ' +
           'stroke-linejoin="round" aria-hidden="true" focusable="false">' + d + "</svg>";
  }

  /* ---- Apply editable brand colors --------------------------------------- */
  function applyColors() {
    var c = SITE.colors || {};
    var map = {
      "--purple": c.purple, "--purple-deep": c.purpleDeep,
      "--purple-dark": c.purpleDark, "--purple-lift": c.purpleLift,
      "--purple-wash": c.purpleWash, "--accent": c.accent, "--black": c.black,
    };
    Object.keys(map).forEach(function (k) {
      if (map[k]) { document.documentElement.style.setProperty(k, map[k]); }
    });
  }

  function brandMark(size) {
    var id = SITE.identity;
    if (id.logoSrc) {
      return '<img src="' + esc(id.logoSrc) + '" alt="' + esc(id.logoAlt) + '"' +
             (size === "hero" ? ' class="hero__logo"' : "") + ">";
    }
    return '<span class="brand__mark" aria-hidden="true">CH</span>';
  }

  /* ======================================================================
     SECTION BUILDERS
     ====================================================================== */

  function buildDraftBanner() {
    var m = SITE.mockBanner;
    if (!m || !m.show) { return null; }
    return el('<div class="draftbar"><div class="wrap">' + esc(m.text) + "</div></div>");
  }

  function buildHeader() {
    var id = SITE.identity;
    var here = document.body.getAttribute("data-page") || "home";
    var nav = [
      { label: "Home", href: "index.html", page: "home" },
      { label: "Parents", href: "parents.html", page: "parents" },
      { label: "Physical Forms", href: "physical-forms.html", page: "physical-forms" },
      { label: "Booster Club", href: "booster-club.html", page: "booster-club" },
      { label: "Sponsors", href: "sponsors.html", page: "sponsors" },
      { label: "Contact", href: "contact.html", page: "contact" },
    ];
    return el(
      '<header class="header">' +
        '<div class="wrap header__inner">' +
          '<a class="brand" href="index.html">' + brandMark() +
            '<span class="brand__text"><strong>' + esc(id.programName) + "</strong>" +
            "<span>" + esc(id.orgName) + "</span></span></a>" +
          '<button class="nav__toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">' +
            '<span class="nav__bars" aria-hidden="true"></span></button>' +
          '<nav class="nav" id="site-nav" aria-label="Main"><ul class="nav__list">' +
            nav.map(function (n) {
              return '<li><a class="nav__link" href="' + esc(n.href) + '"' +
                     (n.page === here ? ' aria-current="page"' : "") + ">" + esc(n.label) + "</a></li>";
            }).join("") +
          "</ul></nav>" +
        "</div>" +
      "</header>"
    );
  }

  function buildHero() {
    var h = SITE.hero;
    var s = el(
      '<section class="hero">' +
        '<div class="hero__media" role="img" aria-label="' + esc(h.imageAlt) + '"></div>' +
        '<div class="hero__scrim" aria-hidden="true"></div>' +
        '<div class="wrap hero__inner">' +
          '<div class="hero__content">' +
            (SITE.identity.logoSrc ? brandMark("hero") : "") +
            '<p class="hero__eyebrow">' + esc(h.eyebrow) + "</p>" +
            "<h1>" + esc(h.headline) + "</h1>" +
            '<p class="hero__tagline">' + esc(h.tagline) + "</p>" +
            '<p class="hero__intro">' + esc(h.intro) + "</p>" +
            '<div class="hero__actions">' +
              '<a class="btn btn--primary btn--lg" href="' + esc(h.primaryCta.href) + '">' +
                esc(h.primaryCta.label) + "</a>" +
              '<a class="btn btn--ghost btn--lg" href="' + esc(h.secondaryCta.href) + '">' +
                esc(h.secondaryCta.label) + "</a>" +
            "</div>" +
            // The urgent item lives IN the hero — a parent shouldn't have to
            // scroll to learn a deadline is coming.
            (h.alert && h.alert.show
              ? '<p class="hero__alert"><span class="hero__alert-label">' +
                esc(h.alert.label) + "</span>" + esc(h.alert.text) + "</p>"
              : "") +
          "</div>" +
        "</div>" +
        (h.imageNote ? '<span class="hero__imgnote">' + esc(h.imageNote) + "</span>" : "") +
      "</section>"
    );
    s.querySelector(".hero__media").style.backgroundImage = 'url("' + h.image + '")';
    return s;
  }

  function buildStrip() {
    var items = SITE.seasonStrip || [];
    if (!items.length) { return null; }
    return el(
      '<section class="strip" aria-label="Season at a glance"><div class="wrap strip__inner">' +
        items.map(function (i) {
          return '<div class="strip__cell">' +
                   '<div class="strip__label">' + esc(i.label) + "</div>" +
                   '<div class="strip__value">' + esc(i.value) + "</div>" +
                   (i.detail ? '<div class="strip__detail">' + esc(i.detail) + "</div>" : "") +
                 "</div>";
        }).join("") +
      "</div></section>"
    );
  }

  // Sponsor logo strip under the hero. Only the top two tiers appear —
  // cramming every sponsor in shrinks them all to illegibility.
  var STRIP_TIERS = 2;
  function buildSponsorStrip() {
    var all = [];
    SITE.sponsors.levels.slice(0, STRIP_TIERS).forEach(function (lvl) {
      lvl.items.forEach(function (it) { if (it.logo) { all.push(it); } });
    });
    if (!all.length) { return null; }
    return el(
      '<section class="sponsorstrip" aria-label="Our sponsors">' +
        '<div class="wrap sponsorstrip__inner">' +
          '<span class="sponsorstrip__label">Proudly supported by</span>' +
          '<div class="sponsorstrip__logos">' +
            all.map(function (it) {
              return '<a href="#sponsors" title="' + esc(it.name) + '">' +
                     '<img src="' + esc(it.logo) + '" alt="' + esc(it.name) + '"></a>';
            }).join("") +
          "</div>" +
          '<a class="sponsorstrip__all" href="#sponsors">See all sponsors</a>' +
        "</div>" +
      "</section>"
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

  function buildFooter() {
    var o = SITE.official, id = SITE.identity;
    var pages = [
      { label: "Home", href: "index.html" },
      { label: "Parents", href: "parents.html" },
      { label: "Physical Forms", href: "physical-forms.html" },
      { label: "Booster Club", href: "booster-club.html" },
      { label: "Sponsors", href: "sponsors.html" },
      { label: "Contact", href: "contact.html" },
    ];
    return el(
      '<footer class="footer"><div class="wrap">' +
        '<div class="footer__grid">' +
          '<div class="footer__brand">' + brandMark() +
            "<h4>" + esc(id.programName) + "</h4>" +
            "<p>" + esc(SITE.boosterClub.body).slice(0, 150) + "…</p></div>" +
          "<div><h4>Pages</h4><ul>" +
            pages.map(function (p) {
              return '<li><a href="' + esc(p.href) + '">' + esc(p.label) + "</a></li>";
            }).join("") +
          "</ul></div>" +
          "<div><h4>Official school links</h4><ul>" +
            o.links.slice(0, 5).map(function (l) {
              return '<li><a href="' + esc(l.href) + '" target="_blank" rel="noopener noreferrer">' +
                     esc(l.label) + "</a></li>";
            }).join("") +
          "</ul></div>" +
          "<div><h4>" + esc(o.school.name) + "</h4><ul>" +
            "<li>" + esc(o.school.address) + "</li>" +
            "<li>" + esc(o.school.city) + "</li>" +
            '<li><a href="' + esc(o.school.phoneHref) + '">' + esc(o.school.phone) + "</a></li>" +
          "</ul></div>" +
        "</div>" +
        '<div class="footer__disclaimer">' + esc(SITE.disclaimer).replace(
            "official Chapel Hill High School website",
            '<a href="' + esc(o.schoolSite) + '" target="_blank" rel="noopener noreferrer">official Chapel Hill High School website</a>'
          ) + "</div>" +
        '<div class="footer__base">' +
          "<p>&copy; " + new Date().getFullYear() + " " + esc(id.orgName) + "." +
            (SITE.draftNotice ? " " + esc(SITE.draftNotice) : "") + "</p>" +
          (SITE.revision && SITE.revision.show
            ? '<p class="footer__rev">' + esc(SITE.revision.note) + " " +
              esc(SITE.revision.rev) + " · " + esc(SITE.revision.date) + "</p>"
            : "") +
        "</div>" +
      "</div></footer>"
    );
  }

  /* ======================================================================
     PHYSICAL FORMS PAGE BUILDERS
     ----------------------------------------------------------------------
     These reuse the homepage's components — .card, .ticks, .impact, .notice,
     .hero — rather than introducing new ones. If you're restyling, style the
     shared class and both pages follow.
     ====================================================================== */

  function buildFormsHero() {
    var h = SITE.physicalForms.hero;
    return el(
      '<section class="hero hero--page">' +
        '<div class="hero__scrim" aria-hidden="true"></div>' +
        '<div class="wrap hero__inner">' +
          '<div class="hero__content">' +
            '<p class="hero__eyebrow">' + esc(h.eyebrow) + "</p>" +
            "<h1>" + esc(h.headline) + "</h1>" +
            '<p class="hero__intro">' + esc(h.intro) + "</p>" +
            '<div class="hero__actions">' +
              '<a class="btn btn--primary btn--lg" href="' + esc(h.primaryCta.href) + '">' +
                esc(h.primaryCta.label) + "</a>" +
              '<a class="btn btn--ghost btn--lg" href="' + esc(h.secondaryCta.href) + '">' +
                esc(h.secondaryCta.label) + "</a>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  /* A drawn representation of the form's four pages, not a screenshot of it.
     Two reasons: the PDF is GHSA's copyrighted document, and any image we
     render here is a copy that goes stale the moment GHSA revises the form.
     Structure is what a parent actually needs to recognize — "four pages,
     history first, eligibility last" — and structure is stable. */
  function formPreview() {
    var pages = SITE.physicalForms.form.pages || [];
    return (
      '<div class="preview" role="img" aria-label="' +
        esc(SITE.physicalForms.form.previewAlt) + '">' +
        '<div class="preview__stack" aria-hidden="true">' +
          pages.map(function (p, i) {
            return '<div class="preview__page preview__page--' + (i + 1) + '">' +
                     '<span class="preview__num">' + (i + 1) + "</span>" +
                     '<span class="preview__title">' + esc(p.short) + "</span>" +
                     '<span class="preview__rules">' +
                       new Array(p.lines + 1).join('<i></i>') +
                     "</span>" +
                   "</div>";
          }).join("") +
        "</div>" +
        '<ol class="preview__key">' +
          pages.map(function (p) {
            return "<li><strong>" + esc(p.short) + "</strong><span>" + esc(p.who) + "</span></li>";
          }).join("") +
        "</ol>" +
      "</div>"
    );
  }

  // The document card. This is the reason the page exists, so it gets the
  // page's one piece of visual weight.
  function buildFormCard() {
    var f = SITE.physicalForms.form;
    return el(
      '<section class="section" id="form">' +
        '<div class="wrap">' +
          '<div class="formcard">' +
            '<div class="formcard__doc">' +
              formPreview() +
              '<span class="formcard__ext" aria-hidden="true">PDF</span>' +
            "</div>" +
            '<div class="formcard__body">' +
              '<span class="eyebrow">' + esc(f.eyebrow) + "</span>" +
              "<h2>" + esc(f.heading) + "</h2>" +
              '<p class="formcard__kicker">' + esc(f.kicker) + "</p>" +
              "<p>" + esc(f.body) + "</p>" +
              '<a class="btn btn--primary btn--lg formcard__cta" href="' + esc(f.cta.href) + '"' +
                ' target="_blank" rel="noopener noreferrer">' + esc(f.cta.label) +
                '<span class="u-sr">, opens the GHSA website in a new tab</span></a>' +
              '<p class="formcard__trust">' + icon("check", "icon icon--tick") +
                "<span>" + esc(f.trust) + "</span></p>" +
              '<ul class="formcard__alts">' +
                f.alts.map(function (a) {
                  return '<li><a href="' + esc(a.href) + '" target="_blank" rel="noopener noreferrer">' +
                         esc(a.label) + '<span class="tag-official">Official</span></a></li>';
                }).join("") +
              "</ul>" +
            "</div>" +
          "</div>" +
          (f.warn ? '<div class="warncard">' +
            "<h3>" + esc(f.warn.heading) + "</h3>" +
            "<p>" + esc(f.warn.body) + "</p>" +
          "</div>" : "") +
        "</div>" +
      "</section>"
    );
  }

  function buildFormsRules() {
    var r = SITE.physicalForms.rules;
    return el(
      '<section class="section section--wash">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(r.eyebrow) + "</span>" +
            "<h2>" + esc(r.heading) + "</h2><p>" + esc(r.intro) + "</p>" +
          "</div>" +
          '<div class="devpoints devpoints--2col">' +
            r.items.map(function (i) {
              return '<div class="devpoint">' + icon("check", "icon icon--dev") +
                       "<div><strong>" + esc(i.head) + "</strong>" +
                       "<p>" + esc(i.body) + "</p></div>" +
                     "</div>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildFormsChecklist() {
    var c = SITE.physicalForms.checklist;
    return el(
      '<section class="section">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(c.eyebrow) + "</span>" +
            "<h2>" + esc(c.heading) + "</h2><p>" + esc(c.intro) + "</p>" +
          "</div>" +
          '<div class="impact">' +
            '<ul class="ticks ticks--dark ticks--2col">' +
              c.items.map(function (i) {
                return "<li>" + icon("check", "icon icon--tick") + "<span>" + esc(i) + "</span></li>";
              }).join("") +
            "</ul>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildFormsAlso() {
    var a = SITE.physicalForms.also;
    return el(
      '<section class="section section--wash" id="also">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(a.eyebrow) + "</span>" +
            "<h2>" + esc(a.heading) + "</h2><p>" + esc(a.intro) + "</p>" +
          "</div>" +
          '<div class="grid grid--2">' +
            a.items.map(function (i) {
              return '<div class="card card--static">' +
                       '<span class="card__icon">' + icon("form") + "</span>" +
                       "<h3>" + esc(i.title) + "</h3>" +
                       "<p>" + esc(i.body) + "</p>" +
                       '<p class="card__links">' +
                         '<a class="btn btn--outline" href="' + esc(i.href) + '" target="_blank" rel="noopener noreferrer">' +
                           "Open the form</a>" +
                         (i.alt ? ' <a class="card__alt" href="' + esc(i.alt.href) + '" target="_blank" rel="noopener noreferrer">' +
                                  esc(i.alt.label) + "</a>" : "") +
                       "</p>" +
                     "</div>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  // <details> gives us accessible progressive disclosure with no JS.
  function buildFormsFaq() {
    var f = SITE.physicalForms.faq;
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
          sampleNote(f.note) +
        "</div>" +
      "</section>"
    );
  }

  function buildFormsHelp() {
    var h = SITE.physicalForms.help;
    return el(
      '<section class="section section--wash" id="help">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(h.eyebrow) + "</span>" +
            "<h2>" + esc(h.heading) + "</h2><p>" + esc(h.intro) + "</p>" +
          "</div>" +
          '<div class="grid grid--3">' +
            h.items.map(function (i) {
              var line = i.phone
                ? '<a class="contact-card__email" href="' + esc(i.phoneHref) + '">' +
                    icon("mail") + esc(i.phone) + "</a>"
                : (i.email
                    ? '<a class="contact-card__email" href="mailto:' + esc(i.email) + '">' +
                        icon("mail") + esc(i.email) + "</a>"
                    : '<span class="contact-card__pending">' + icon("mail") +
                        "Contact details coming soon</span>");
              return '<div class="contact-card">' +
                       "<h3>" + esc(i.role) + "</h3>" +
                       '<p class="contact-card__desc">' + esc(i.desc) + "</p>" +
                       line +
                     "</div>";
            }).join("") +
          "</div>" +
          sampleNote(h.note) +
        "</div>" +
      "</section>"
    );
  }

  function buildFormsRelated() {
    var r = SITE.physicalForms.related;
    return el(
      '<section class="section">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(r.eyebrow) + "</span>" +
            "<h2>" + esc(r.heading) + "</h2>" +
          "</div>" +
          '<div class="grid grid--3">' +
            r.items.map(function (i) {
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

  /* ======================================================================
     SPONSORS PAGE BUILDERS (Become a Sponsor)
     ====================================================================== */

  function buildSponsorsHero() {
    var h = SITE.sponsorPage.hero;
    return el(
      '<section class="hero hero--page">' +
        '<div class="hero__scrim" aria-hidden="true"></div>' +
        '<div class="wrap hero__inner">' +
          '<div class="hero__content">' +
            '<p class="hero__eyebrow">' + esc(h.eyebrow) + "</p>" +
            "<h1>" + esc(h.headline) + "</h1>" +
            '<p class="hero__intro">' + esc(h.intro) + "</p>" +
            '<div class="hero__actions">' +
              '<a class="btn btn--primary btn--lg" href="' + esc(h.primaryCta.href) + '">' +
                esc(h.primaryCta.label) + "</a>" +
              '<a class="btn btn--ghost btn--lg" href="' + esc(h.secondaryCta.href) + '">' +
                esc(h.secondaryCta.label) + "</a>" +
            "</div>" +
            (h.kicker ? '<p class="hero__kicker">' + esc(h.kicker) + "</p>" : "") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildSponsorsValue() {
    var v = SITE.sponsorPage.value;
    return el(
      '<section class="section">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(v.eyebrow) + "</span>" +
            "<h2>" + esc(v.heading) + "</h2><p>" + esc(v.intro) + "</p>" +
          "</div>" +
          '<div class="grid grid--3">' +
            v.items.map(function (i) {
              return '<div class="card card--static">' +
                       '<span class="card__icon">' + icon(i.icon) + "</span>" +
                       "<h3>" + esc(i.title) + "</h3>" +
                       "<p>" + esc(i.body) + "</p>" +
                     "</div>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildSponsorsImpact() {
    var m = SITE.sponsorPage.impact;
    return el(
      '<section class="section section--wash">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(m.eyebrow) + "</span>" +
            "<h2>" + esc(m.heading) + "</h2><p>" + esc(m.intro) + "</p>" +
          "</div>" +
          '<div class="impact">' +
            '<ul class="ticks ticks--dark ticks--2col">' +
              m.items.map(function (i) {
                return "<li>" + icon("check", "icon icon--tick") + "<span>" + esc(i) + "</span></li>";
              }).join("") +
            "</ul>" +
            sampleNote(m.note) +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  // Packages + the demonstration disclosure, together so the notice can't be
  // scrolled past without seeing the prices it applies to.
  function buildSponsorsPackages() {
    var p = SITE.sponsorPage.packages;
    return el(
      '<section class="section" id="packages">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(p.eyebrow) + "</span>" +
            "<h2>" + esc(p.heading) + "</h2>" +
          "</div>" +
          '<div class="pkgnote">' + esc(SITE.sponsorPage.disclosure) + "</div>" +
          '<div class="pkgs">' +
            p.items.map(function (i) {
              return '<div class="pkg' + (i.featured ? " pkg--featured" : "") + '">' +
                       (i.badge ? '<span class="pkg__badge">' + esc(i.badge) + "</span>" : "") +
                       '<div class="pkg__head">' +
                         "<h3>" + esc(i.name) + "</h3>" +
                         '<span class="pkg__amount">' + esc(i.amount) + "</span>" +
                       "</div>" +
                       '<p class="pkg__desc">' + esc(i.desc) + "</p>" +
                       '<ul class="pkg__benefits">' +
                         i.benefits.map(function (b) {
                           return "<li>" + icon("check", "icon icon--tick") + "<span>" + esc(b) + "</span></li>";
                         }).join("") +
                       "</ul>" +
                       '<a class="btn ' + (i.featured ? "btn--primary" : "btn--outline") +
                         ' pkg__cta" href="contact.html#sponsorship">Start with ' + esc(i.name) + "</a>" +
                     "</div>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildSponsorsRecognition() {
    var r = SITE.sponsorPage.recognition;
    return el(
      '<section class="section section--wash">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(r.eyebrow) + "</span>" +
            "<h2>" + esc(r.heading) + "</h2>" +
          "</div>" +
          '<ul class="recgrid">' +
            r.items.map(function (i) {
              return '<li class="recitem">' + icon("check", "icon icon--tick") + "<span>" + esc(i) + "</span></li>";
            }).join("") +
          "</ul>" +
          sampleNote(r.note) +
        "</div>" +
      "</section>"
    );
  }

  function buildSponsorsProcess() {
    var p = SITE.sponsorPage.process;
    return el(
      '<section class="section" id="how-it-works">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(p.eyebrow) + "</span>" +
            "<h2>" + esc(p.heading) + "</h2>" +
          "</div>" +
          '<ol class="steps">' +
            p.items.map(function (s) {
              return '<li class="step">' +
                       '<span class="step__n">' + esc(String(s.n)) + "</span>" +
                       '<div class="step__body"><h3>' + esc(s.title) + "</h3>" +
                       "<p>" + esc(s.body) + "</p></div>" +
                     "</li>";
            }).join("") +
          "</ol>" +
        "</div>" +
      "</section>"
    );
  }

  // Replaces the fake form. Routes to Contact. No email shown.
  function buildSponsorsStart() {
    var s = SITE.sponsorPage.start;
    return el(
      '<section class="section section--purple" id="start">' +
        '<div class="wrap wrap--narrow">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(s.eyebrow) + "</span>" +
            "<h2>" + esc(s.heading) + "</h2><p>" + esc(s.intro) + "</p>" +
          "</div>" +
          '<ul class="ticks">' +
            s.bring.map(function (b) {
              return "<li>" + icon("check", "icon icon--tick") + "<span>" + esc(b) + "</span></li>";
            }).join("") +
          "</ul>" +
          '<p class="start__cta"><a class="btn btn--primary btn--lg" href="' + esc(s.cta.href) + '">' +
            esc(s.cta.label) + "</a></p>" +
          sampleNote(s.note) +
        "</div>" +
      "</section>"
    );
  }

  function buildSponsorsFaq() {
    var f = SITE.sponsorPage.faq;
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

  function buildSponsorsCommunity() {
    var c = SITE.sponsorPage.community;
    return el(
      '<section class="section section--wash" id="community-partners">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(c.eyebrow) + "</span>" +
            "<h2>" + esc(c.heading) + "</h2><p>" + esc(c.intro) + "</p>" +
          "</div>" +
          '<div class="cpgrid">' +
            c.items.map(function (i) {
              return '<div class="cp">' +
                       '<span class="cp__mark" aria-hidden="true">' +
                         esc(i.name.split(" ").map(function (w) { return w.charAt(0); }).join("").slice(0, 2)) +
                       "</span>" +
                       '<span class="cp__name">' + esc(i.name) + "</span>" +
                       '<span class="cp__level">' + esc(i.level) + "</span>" +
                     "</div>";
            }).join("") +
          "</div>" +
          sampleNote(c.note) +
        "</div>" +
      "</section>"
    );
  }

  function buildSponsorsFinalCta() {
    var c = SITE.sponsorPage.finalCta;
    return el(
      '<section class="volcta">' +
        '<div class="wrap volcta__inner">' +
          '<div class="volcta__body">' +
            '<span class="eyebrow">' + esc(c.eyebrow) + "</span>" +
            "<h2>" + esc(c.heading) + "</h2>" +
            "<p>" + esc(c.body) + "</p>" +
          "</div>" +
          '<div class="volcta__actions">' +
            '<a class="btn btn--primary btn--lg" href="' + esc(c.primaryCta.href) + '">' +
              esc(c.primaryCta.label) + "</a>" +
            '<a class="btn btn--ghost btn--lg" href="' + esc(c.secondaryCta.href) + '">' +
              esc(c.secondaryCta.label) + "</a>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  /* ======================================================================
     PARENTS PAGE BUILDERS
     ====================================================================== */

  function buildParentsHero() {
    var h = SITE.parentsPage.hero;
    return el(
      '<section class="hero hero--page">' +
        '<div class="hero__scrim" aria-hidden="true"></div>' +
        '<div class="wrap hero__inner">' +
          '<div class="hero__content">' +
            '<p class="hero__eyebrow">' + esc(h.eyebrow) + "</p>" +
            "<h1>" + esc(h.headline) + "</h1>" +
            '<p class="hero__intro">' + esc(h.intro) + "</p>" +
            '<div class="hero__actions">' +
              '<a class="btn btn--primary btn--lg" href="' + esc(h.primaryCta.href) + '">' +
                esc(h.primaryCta.label) + "</a>" +
              '<a class="btn btn--ghost btn--lg" href="' + esc(h.secondaryCta.href) + '">' +
                esc(h.secondaryCta.label) + "</a>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  /* Dates render from SITE.seasonStrip — the SAME array the homepage strip
     uses. This page only adds prose, keyed by label. Never paste the dates in
     here: one source, no drift. */
  function buildParentsDates() {
    var d = SITE.parentsPage.dates;
    var strip = SITE.seasonStrip || [];
    if (!strip.length) { return null; }
    return el(
      '<section class="section" id="dates">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(d.eyebrow) + "</span>" +
            "<h2>" + esc(d.heading) + "</h2><p>" + esc(d.intro) + "</p>" +
          "</div>" +
          '<ol class="datelist">' +
            strip.map(function (i) {
              var note = (d.notes || {})[i.label] || "";
              return '<li class="dateitem">' +
                       '<div class="dateitem__when">' +
                         '<span class="dateitem__value">' + esc(i.value) + "</span>" +
                         (i.detail ? '<span class="dateitem__detail">' + esc(i.detail) + "</span>" : "") +
                       "</div>" +
                       '<div class="dateitem__what">' +
                         "<h3>" + esc(i.label) + "</h3>" +
                         (note ? "<p>" + esc(note) + "</p>" : "") +
                       "</div>" +
                     "</li>";
            }).join("") +
          "</ol>" +
          (d.cta ? '<p class="datelist__cta"><a class="btn btn--outline" href="' + esc(d.cta.href) + '"' +
                   extAttrs(d.cta) + ">" + esc(d.cta.label) + extTag(d.cta) + "</a></p>" : "") +
        "</div>" +
      "</section>"
    );
  }

  function buildParentsPaperwork() {
    var p = SITE.parentsPage.paperwork;
    return el(
      '<section class="section section--wash" id="paperwork">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(p.eyebrow) + "</span>" +
            "<h2>" + esc(p.heading) + "</h2><p>" + esc(p.intro) + "</p>" +
          "</div>" +
          '<div class="grid grid--2">' +
            p.items.map(function (i) {
              return '<a class="card" href="' + esc(i.href) + '"' + extAttrs(i) + ">" +
                       '<span class="card__icon">' + icon(i.icon) + "</span>" +
                       "<h3>" + esc(i.title) + extTag(i) + "</h3>" +
                       "<p>" + esc(i.body) + "</p>" +
                       '<span class="card__more">' + esc(i.cta) + "</span>" +
                     "</a>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  /* Fees. Renders a "pending" state until content.js has real values — the
     page looks finished either way, which is the point. Fill in
     parentsPage.fees.amount / .due / .methods and the chips disappear. */
  function buildParentsFees() {
    var f = SITE.parentsPage.fees;
    var hasAmount  = !!f.amount;
    var hasDue     = !!f.due;
    var hasMethods = f.methods && f.methods.length;

    function cell(label, value) {
      return '<div class="feecell">' +
               '<span class="feecell__label">' + esc(label) + "</span>" +
               (value
                 ? '<span class="feecell__value">' + esc(value) + "</span>"
                 : '<span class="chip chip--pending">' + esc(f.pendingLabel) + "</span>") +
             "</div>";
    }

    return el(
      '<section class="section" id="fees">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(f.eyebrow) + "</span>" +
            "<h2>" + esc(f.heading) + "</h2>" +
          "</div>" +
          '<p class="sponsors__thanks">' + esc(f.why) + "</p>" +
          '<div class="impact">' +
            '<h3 class="impact__head">What fees pay for</h3>' +
            '<ul class="ticks ticks--dark ticks--2col">' +
              f.supports.map(function (s) {
                return "<li>" + icon("check", "icon icon--tick") + "<span>" + esc(s) + "</span></li>";
              }).join("") +
            "</ul>" +
          "</div>" +
          '<div class="feegrid">' +
            cell("Amount", f.amount) +
            cell("Due", f.due) +
            '<div class="feecell">' +
              '<span class="feecell__label">How to pay</span>' +
              (hasMethods
                ? '<span class="feecell__value">' +
                    f.methods.map(function (m) { return esc(m.label); }).join(", ") + "</span>"
                : '<span class="chip chip--pending">' + esc(f.pendingLabel) + "</span>") +
            "</div>" +
            '<div class="feecell">' +
              '<span class="feecell__label">Payment plan</span>' +
              (f.installments && f.installments.available
                ? '<span class="feecell__value">Available</span>'
                : '<span class="chip chip--pending">' + esc(f.pendingLabel) + "</span>") +
            "</div>" +
          "</div>" +
          (!(hasAmount && hasDue && hasMethods)
            ? '<p class="feenote">' + esc(f.pendingNote) + "</p>"
            : "") +
          '<div class="assist">' +
            "<h3>" + esc(f.assistance.heading) + "</h3>" +
            "<p>" + esc(f.assistance.body) + "</p>" +
            '<a class="btn btn--outline" href="' + esc(f.assistance.cta.href) + '">' +
              esc(f.assistance.cta.label) + "</a>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildParentsFaq() {
    var f = SITE.parentsPage.faq;
    return el(
      '<section class="section section--wash" id="faq">' +
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

  /* The archive. #announcements is linked from the homepage News CTA — if you
     remove this section, fix that link too. Renders from SITE.announcements,
     the same array the homepage uses. */
  function buildParentsAnnouncements() {
    var p = SITE.parentsPage.announcements;
    var a = SITE.announcements;
    if (!a || !a.items || !a.items.length) { return null; }
    return el(
      '<section class="section" id="announcements">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(p.eyebrow) + "</span>" +
            "<h2>" + esc(p.heading) + "</h2><p>" + esc(p.intro) + "</p>" +
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
        "</div>" +
      "</section>"
    );
  }

  function buildParentsSchool() {
    return buildOfficial(SITE.parentsPage.school);
  }

  /* ======================================================================
     CONTACT PAGE BUILDERS
     ----------------------------------------------------------------------
     Reuses .card, .ticks, .faq, .contact-card and the shared hero. The one
     addition is .route — a contact card that shows what each route is FOR,
     because "Booster Club" means nothing to a parent who just wants to know
     where the fee question goes.
     ====================================================================== */

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

  /* ======================================================================
     SECTION ORDER — PER PAGE
     ----------------------------------------------------------------------
     Each page's shell carries a data-page attribute on <body>:

         <body data-page="home">            → index.html
         <body data-page="physical-forms">  → physical-forms.html

     The key below must match. Move a line to reorder. Delete or comment out
     a line to remove a section from that page. To add a new page: copy an
     index.html shell, change data-page, add a key here.

     Ordering logic for home: this site's job is communicating with families,
     so the urgent item and the news come first. Sponsors are seen on every
     visit via the strip under the hero, then get the largest, most designed
     block on the page once parents have what they came for.
     ====================================================================== */
  var PAGES = {

    home: [
      buildHero,          //  1. Identity + the one urgent thing, above the fold
      buildSponsorStrip,  //  2. Sponsor logos — seen on every visit
      buildStrip,         //  3. The four dates that matter
      buildQuickLinks,    //  4. Start here
      buildSnapshot,      //  5. Where the program stands right now
      buildSponsors,      //  6. Sponsor recognition, by tier
      buildSponsorValue,  //  7. Why sponsor — the pitch to businesses
      buildNews,          //  8. Around the program
      buildCoachWelcome,  //  9. Welcome
      buildSpotlight,     // 10. Volunteer spotlight — the story
      buildVolunteerCta,  // 11. One shift — the ask, right after the story

      // MOVED OFF THE HOMEPAGE — the builders still exist above and the content
      // still lives in content.js, so re-adding a line here restores any of them.
      //
      //   buildOfficial — "Everything else" (six official links + address block).
      //   → parents.html. These are the district's links, not the program's, and
      //   they belong on the page a parent lands on for paperwork. Nothing is
      //   lost from the homepage: the footer already carries five of the six
      //   links, the school name, the address, and the phone.
      //
      //   buildBooster — "Built by parents, for parents" prose block.
      //   → booster-club.html. Values, Development, the Spotlight, and the
      //   Volunteer CTA said what it said, with more specificity.
      //
      //   buildContact — "Who to ask" (three role cards).
      //   → contact.html. It's what a Contact page is for. Nav, quick-link card,
      //   and footer all still route there. Cost ~833px on mobile.
      //
      //   buildValues — "What Panther baseball stands for" (five values).
      //   → about/program page. Good content, wrong room: it serves no parent
      //   task and no sponsor decision, and the five values were invented. They
      //   should be the coach's own, stated next to his real welcome.
      //
      //   buildDevelopment — "Four years, and what comes after" + alumni card.
      //   → about/program page. Same reasoning. The alumni figures were also
      //   invented, and invented player outcomes are the riskiest data on the
      //   page to have in front of an Athletic Director.
    ],

    // Order here is the order a parent needs it: what the form is, then the
    // rules, then what to check, then the extras, then questions, then help.
    "physical-forms": [
      buildFormsHero,      // 1. What this page is
      buildFormCard,       // 2. THE FORM — the reason for the page
      buildFormsRules,     // 3. GHSA By-Law 1.41 in plain English
      buildFormsChecklist, // 4. What has to be signed
      buildFormsAlso,      // 5. Cardiac + concussion — required by Georgia law
      buildFormsFaq,       // 6. The questions that come in anyway
      buildFormsHelp,      // 7. Who to ask

      // REMOVED FROM THIS PAGE — builder and content both survive; re-add the
      // line to restore.
      //
      //   buildFormsRelated — "While you're here" (four cross-link cards).
      //   Three of the four pointed at pages that don't exist yet, and the
      //   header nav already routes to all of them. A parent who came here
      //   came for one document.
    ],

    // Brief's order, minus the fake form (routed to Contact instead).
    sponsors: [
      buildSponsorsHero,        //  1. Interior hero
      buildSponsorsValue,       //  2. More than a logo
      buildSponsorsImpact,      //  3. Your partnership at work
      buildSponsorsPackages,    //  4. Packages + demo disclosure
      buildSponsorsRecognition, //  5. How sponsors get seen
      buildSponsorsProcess,     //  6. How it works
      buildSponsorsStart,       //  7. Start a conversation (routes to Contact)
      buildSponsorsFaq,         //  8. FAQ
      buildSponsorsCommunity,   //  9. Community partners preview
      buildSponsorsFinalCta,    // 10. Final CTA
    ],

    // What the homepage quick-link card promises, in the order a parent needs
    // it: when → what to turn in → what it costs → answers → archive → school.
    parents: [
      buildParentsHero,          // 1. The contract
      buildParentsDates,         // 2. Dates — reads SITE.seasonStrip, not a copy
      buildParentsPaperwork,     // 3. What has to be turned in
      buildParentsFees,          // 4. Fees — pending state until confirmed
      buildParentsFaq,           // 5. The questions we get every August
      buildParentsAnnouncements, // 6. #announcements — homepage News links here
      buildParentsSchool,        // 7. Everything that isn't baseball
    ],

    // IA: route first, then how to write a message, then answers that save an
    // email, then the school for everything that isn't baseball.
    contact: [
      buildContactHero,     // 1. Who can we help
      buildContactRoutes,   // 2. THE ROUTING — the reason for the page
      buildContactGuidance, // 3. What to put in the message
      buildContactFaq,      // 4. Might save you an email
      buildContactSchool,   // 5. If it isn't a baseball question
    ],
  };

  /* ---- Render ----------------------------------------------------------- */

  // Which page are we on? Reads <body data-page="...">. Defaults to home so an
  // older shell without the attribute still renders the homepage.
  function currentPage() {
    return document.body.getAttribute("data-page") || "home";
  }

  function render() {
    if (typeof SITE === "undefined") {
      document.body.innerHTML =
        '<p style="padding:2rem;font-family:sans-serif">Content file didn\'t load. ' +
        "Make sure <code>data/content.js</code> sits next to <code>index.html</code> " +
        "and that you opened the page from inside the project folder.</p>";
      return;
    }

    applyColors();

    var page = currentPage();
    var order = PAGES[page];
    if (!order) {
      // A shell asked for a page we don't have an order for. Say so plainly
      // rather than rendering a blank white screen.
      document.body.innerHTML =
        '<p style="padding:2rem;font-family:sans-serif">No section order for ' +
        "page <code>" + esc(page) + "</code>. Add a key to <code>PAGES</code> " +
        "near the bottom of <code>js/main.js</code>.</p>";
      return;
    }

    var main = document.getElementById("main");
    order.forEach(function (fn) {
      var node = fn();
      if (node) { main.appendChild(node); }
    });

    document.body.appendChild(buildFooter());
    document.body.prepend(buildHeader());

    var banner = buildDraftBanner();
    if (banner) { document.body.prepend(banner); }

    wireNav();
  }

  /* ---- Mobile navigation ------------------------------------------------ */
  function wireNav() {
    var toggle = document.querySelector(".nav__toggle");
    var nav = document.querySelector(".nav");
    if (!toggle || !nav) { return; }

    function setOpen(open) {
      nav.setAttribute("data-open", String(open));
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(nav.getAttribute("data-open") !== "true");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest(".nav__link") && window.innerWidth <= 920) { setOpen(false); }
    });

    // Escape closes the menu — keyboard users shouldn't be trapped.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.getAttribute("data-open") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
