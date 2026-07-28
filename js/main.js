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
    // NAV — v2.0 trimmed to four items at the Booster Club's request.
    // Physical Forms and Booster Club were removed from the nav. Both pages
    // still exist in the repo; add a line back here to re-link either one.
    //   { label: "Physical Forms", href: "physical-forms.html", page: "physical-forms" },
    //   { label: "Booster Club",   href: "booster-club.html",   page: "booster-club" },
    var nav = [
      { label: "Home", href: "index.html", page: "home" },
      { label: "Parents", href: "parents.html", page: "parents" },
      { label: "Sponsors", href: "sponsors.html", page: "sponsors" },
      { label: "Contact", href: "contact.html", page: "contact" },
    ];
    return el(
      '<header class="header">' +
        '<div class="wrap header__inner">' +
          // Brand is the program name only. The "Baseball Booster Club" line
          // was removed in v2.0; SITE.identity.orgName still drives the
          // copyright line in the footer.
          '<a class="brand" href="index.html">' + brandMark() +
            '<span class="brand__text"><strong>' + esc(id.programName) + "</strong>" +
            "</span></a>" +
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

  /* HOMEPAGE HERO — v2.0
     ----------------------------------------------------------------------
     Photo, eyebrow, headline, tagline. Nothing else. The paragraph, the two
     buttons, the deadline banner, and the sponsor-impact panel were all
     removed at the Booster Club's request.

     UPDATING THE TEXT: all three lines come from SITE.hero in
     data/content.js — eyebrow, headline, tagline. Change them there and
     refresh. Any of the three can be set to "" and its element disappears
     rather than leaving an empty gap, so new messaging can be dropped in
     without touching this file. */
  function buildHero() {
    var h = SITE.hero;
    return el(
      '<section class="hero">' +
        '<div class="hero__media" role="img" aria-label="' + esc(h.imageAlt) + '"></div>' +
        '<div class="hero__scrim" aria-hidden="true"></div>' +
        '<div class="wrap hero__inner">' +
          '<div class="hero__content">' +
            (h.eyebrow ? '<p class="hero__eyebrow">' + esc(h.eyebrow) + "</p>" : "") +
            (h.headline ? "<h1>" + esc(h.headline) + "</h1>" : "") +
            (h.tagline ? '<p class="hero__tagline">' + esc(h.tagline) + "</p>" : "") +
          "</div>" +
        "</div>" +
        (h.imageNote ? '<span class="hero__imgnote">' + esc(h.imageNote) + "</span>" : "") +
      "</section>"
    );
    // Hero image is owned entirely by CSS (.hero__media) so it is full-bleed
    // and independent of JS. Nothing to set here.
  }

  /* SPONSOR LOGO ROW — v2.0
     ----------------------------------------------------------------------
     One horizontal row of logos, sitting just above the footer. No heading,
     no tagline, no links, no marketing copy — that was the whole point of
     the request.

     WHICH LOGOS APPEAR: the first STRIP_TIERS tiers of SITE.sponsors.levels.
     At 2 that's Premier + Gold, six logos, which fits one row comfortably.
     Raise it to 3 to include Community Partners — but twelve logos in a
     single row get small fast. The row scrolls sideways on narrow screens
     rather than wrapping, so it stays one row at every width. */
  var STRIP_TIERS = 2;
  function buildSponsorRow() {
    var all = [];
    (SITE.sponsors.levels || []).slice(0, STRIP_TIERS).forEach(function (lvl) {
      lvl.items.forEach(function (it) { if (it.logo) { all.push(it); } });
    });
    if (!all.length) { return null; }
    return el(
      '<section class="sponsorrow" aria-label="Sponsors">' +
        '<div class="wrap">' +
          '<div class="sponsorrow__track">' +
            all.map(function (it) {
              return '<div class="sponsorrow__item">' +
                     '<img src="' + esc(it.logo) + '" alt="' + esc(it.name) + '" loading="lazy"></div>';
            }).join("") +
          "</div>" +
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

  /* FOOTER — v2.0
     ----------------------------------------------------------------------
     Program name, copyright, revision stamp. That's it. The four-column
     grid (Pages / Official school links / school address block) and the
     "please visit the official school website" disclaimer paragraph were
     all removed at the Booster Club's request.

     This footer is shared by every page, so the change applies site-wide.
     SITE.footerBlurb and SITE.disclaimer are still in data/content.js and
     are simply no longer rendered anywhere. */
  function buildFooter() {
    var id = SITE.identity;
    return el(
      '<footer class="footer"><div class="wrap">' +
        '<div class="footer__base">' +
          '<div class="footer__brand">' + brandMark() +
            "<span>" + esc(id.programName) + "</span></div>" +
          '<div class="footer__legal">' +
            "<p>&copy; " + new Date().getFullYear() + " " + esc(id.orgName) + "." +
              (SITE.draftNotice ? " " + esc(SITE.draftNotice) : "") + "</p>" +
            (SITE.revision && SITE.revision.show
              ? '<p class="footer__rev">' + esc(SITE.revision.note) + " " +
                esc(SITE.revision.rev) + " · " + esc(SITE.revision.date) + "</p>"
              : "") +
          "</div>" +
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
     BOOSTER CLUB PAGE BUILDERS
     ====================================================================== */

  function buildBoosterHero() {
    var h = SITE.boosterPage.hero;
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

  function buildBoosterMission() {
    var m = SITE.boosterPage.mission;
    return el(
      '<section class="section">' +
        '<div class="wrap wrap--narrow">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(m.eyebrow) + "</span>" +
            "<h2>" + esc(m.heading) + "</h2>" +
          "</div>" +
          '<p class="mission__body">' + esc(m.body) + "</p>" +
          '<ul class="ticks ticks--dark">' +
            m.points.map(function (p) {
              return "<li>" + icon("check", "icon icon--tick") + "<span>" + esc(p) + "</span></li>";
            }).join("") +
          "</ul>" +
        "</div>" +
      "</section>"
    );
  }

  // Membership tiers — reuses the .pkg component from the sponsors page.
  function buildBoosterMembership() {
    var mb = SITE.boosterPage.membership;
    return el(
      '<section class="section section--wash" id="membership">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(mb.eyebrow) + "</span>" +
            "<h2>" + esc(mb.heading) + "</h2><p>" + esc(mb.intro) + "</p>" +
          "</div>" +
          '<div class="pkgnote">' + esc(mb.demoNote) + "</div>" +
          '<div class="pkgs pkgs--3">' +
            mb.tiers.map(function (t) {
              return '<div class="pkg' + (t.featured ? " pkg--featured" : "") + '">' +
                       (t.badge ? '<span class="pkg__badge">' + esc(t.badge) + "</span>" : "") +
                       '<div class="pkg__head">' +
                         "<h3>" + esc(t.name) + "</h3>" +
                         '<span class="pkg__amount">' + esc(t.amount) + "</span>" +
                       "</div>" +
                       '<ul class="pkg__benefits">' +
                         t.perks.map(function (p) {
                           return "<li>" + icon("check", "icon icon--tick") + "<span>" + esc(p) + "</span></li>";
                         }).join("") +
                       "</ul>" +
                       '<a class="btn ' + (t.featured ? "btn--primary" : "btn--outline") +
                         ' pkg__cta" href="' + esc(mb.cta.href) + '">' + esc(mb.cta.label) + "</a>" +
                     "</div>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildBoosterFund() {
    var f = SITE.boosterPage.fund;
    return el(
      '<section class="section">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(f.eyebrow) + "</span>" +
            "<h2>" + esc(f.heading) + "</h2>" +
          "</div>" +
          '<div class="boostcols">' +
            "<div>" +
              '<h3 class="boostcols__h">' + esc(f.fundsHeading) + "</h3>" +
              '<ul class="ticks ticks--dark">' +
                f.funds.map(function (i) {
                  return "<li>" + icon("check", "icon icon--tick") + "<span>" + esc(i) + "</span></li>";
                }).join("") +
              "</ul>" +
            "</div>" +
            "<div>" +
              '<h3 class="boostcols__h">' + esc(f.boardHeading) + "</h3>" +
              '<p class="boardnote">' + esc(f.boardNote) + "</p>" +
              '<ul class="board">' +
                f.roles.map(function (r) {
                  return '<li class="boardrole">' +
                           "<strong>" + esc(r.role) + "</strong>" +
                           "<span>" + esc(r.desc) + "</span>" +
                         "</li>";
                }).join("") +
              "</ul>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildBoosterVolunteer() {
    var v = SITE.boosterPage.volunteer;
    return el(
      '<section class="section section--wash" id="volunteer">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            '<span class="eyebrow">' + esc(v.eyebrow) + "</span>" +
            "<h2>" + esc(v.heading) + "</h2><p>" + esc(v.body) + "</p>" +
          "</div>" +
          '<ul class="volcta__roles volcta__roles--center">' +
            v.roles.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("") +
          "</ul>" +
          '<figure class="spot spot--card">' +
            '<span class="spot__icon">' + icon("star") + "</span>" +
            "<h3>" + esc(v.spotlight.heading) + "</h3>" +
            "<p>" + esc(v.spotlight.body) + "</p>" +
          "</figure>" +
          (v.note ? '<p class="boostnote">' + esc(v.note) + "</p>" : "") +
          '<p class="start__cta"><a class="btn btn--primary btn--lg" href="' + esc(v.cta.href) + '">' +
            esc(v.cta.label) + "</a></p>" +
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

  /* Each line renders only if data/content.js supplies it, so the intro and
     the two buttons can come back later by adding `intro`, `primaryCta`, and
     `secondaryCta` to SITE.parentsPage.hero — no change needed here. */
  function buildParentsHero() {
    var h = SITE.parentsPage.hero;
    return el(
      '<section class="hero hero--page">' +
        '<div class="hero__scrim" aria-hidden="true"></div>' +
        '<div class="wrap hero__inner">' +
          '<div class="hero__content">' +
            (h.eyebrow ? '<p class="hero__eyebrow">' + esc(h.eyebrow) + "</p>" : "") +
            (h.headline ? "<h1>" + esc(h.headline) + "</h1>" : "") +
            (h.intro ? '<p class="hero__intro">' + esc(h.intro) + "</p>" : "") +
            (h.primaryCta || h.secondaryCta
              ? '<div class="hero__actions">' +
                  (h.primaryCta
                    ? '<a class="btn btn--primary btn--lg" href="' + esc(h.primaryCta.href) + '">' +
                      esc(h.primaryCta.label) + "</a>" : "") +
                  (h.secondaryCta
                    ? '<a class="btn btn--ghost btn--lg" href="' + esc(h.secondaryCta.href) + '">' +
                      esc(h.secondaryCta.label) + "</a>" : "") +
                "</div>"
              : "") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  /* SCHEDULE — v2.0
     ----------------------------------------------------------------------
     Two buttons, both opening MaxPreps in a new tab. The links are the
     season-agnostic MaxPreps URLs, so they roll forward on their own each
     spring — there is nothing here to update between seasons.

     Edit the labels or URLs in SITE.parentsPage.schedule. Adding a third
     button (freshman, summer ball) is a matter of copying a block in
     data/content.js; this builder loops over whatever is there. */
  function buildParentsSchedule() {
    var s = SITE.parentsPage.schedule;
    if (!s || !s.buttons || !s.buttons.length) { return null; }
    return el(
      '<section class="section" id="schedule">' +
        '<div class="wrap">' +
          '<div class="section__head section__head--center">' +
            (s.eyebrow ? '<span class="eyebrow">' + esc(s.eyebrow) + "</span>" : "") +
            (s.heading ? "<h2>" + esc(s.heading) + "</h2>" : "") +
            (s.intro ? "<p>" + esc(s.intro) + "</p>" : "") +
          "</div>" +
          '<div class="schedulebtns">' +
            s.buttons.map(function (b) {
              return '<a class="btn btn--primary btn--lg" href="' + esc(b.href) + '" ' +
                     'target="_blank" rel="noopener noreferrer">' + esc(b.label) +
                     '<span class="u-sr"> (opens in a new tab)</span></a>';
            }).join("") +
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

    /* HOME — v2.0
       --------------------------------------------------------------------
       Deliberately two sections. The Booster Club asked for an informational
       landing page they can actually maintain, not a brochure.

       ADDING A SECTION LATER: write the builder above, then add its name to
       this list in the position you want it. News, schedules, galleries,
       announcements, and sponsorship blocks all drop in the same way — the
       renderer just walks this array in order and appends what it gets, so
       nothing else has to change.

       Thirteen v1 builders were removed rather than hidden. They're parked
       in js/_archive/removed-sections-v1.js if any of them is wanted back. */
    home: [
      buildHero,       // 1. Photo, program name, classification
      buildSponsorRow, // 2. One row of sponsor logos, just above the footer
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

    // Modeled on real booster pages: mission → membership → fund/board →
    // volunteer. Player-development content lives on an about page, not here.
    "booster-club": [
      buildBoosterHero,       // 1. Built by parents, for parents
      buildBoosterMission,    // 2. What the Booster Club does
      buildBoosterMembership, // 3. Membership tiers (marked demo)
      buildBoosterFund,       // 4. What we fund + the board (roles only)
      buildBoosterVolunteer,  // 5. Volunteer — #volunteer anchor lives here
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

    /* PARENTS — v2.0
       --------------------------------------------------------------------
       Reduced to the page title and the two MaxPreps schedule buttons.

       !! READ THIS BEFORE THE CLIENT DOES. The brief said two different
       things: "Keep the Parent page … no additional content is needed at
       this time," and then, in the final checklist, that the page should
       contain "only the two MaxPreps schedule buttons." The stricter
       reading won, because it's easier to put a section back than to
       explain why one is still there.

       The five removed sections are commented out below, NOT deleted —
       their builders, their content, and their CSS are all still intact.
       Uncomment a line and it returns exactly as it was. */
    parents: [
      buildParentsHero,          // 1. Page title
      buildParentsSchedule,      // 2. Varsity + JV, both to MaxPreps

      // buildParentsDates,         Dates — reads SITE.seasonStrip
      // buildParentsPaperwork,     What has to be turned in
      // buildParentsFees,          Fees — pending state until confirmed
      // buildParentsFaq,           The questions we get every August
      // buildParentsAnnouncements, #announcements
      // buildParentsSchool,        Everything that isn't baseball
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
