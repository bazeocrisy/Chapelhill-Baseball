/* ==========================================================================
   Chapel Hill Baseball — main.js

   Reads data/content.js and renders the homepage.
   You should not need to edit this file to change content — edit content.js.

   TO REORDER OR REMOVE HOMEPAGE SECTIONS:
   Scroll to SECTION_ORDER at the bottom of this file. Move a line up or
   down to reorder. Delete or comment out a line to remove that section.
   ========================================================================== */

(function () {
  "use strict";

  /* ---- Helpers ---------------------------------------------------------- */

  // Escape text before inserting, so content is never treated as markup.
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c];
    });
  }

  // Strip the [PLACEHOLDER] marker and flag the text as unfinished.
  // Used for body copy — one subtle style, no repeated badges.
  function ph(s) {
    var raw = String(s == null ? "" : s);
    if (raw.indexOf("[PLACEHOLDER]") === -1) { return esc(raw); }
    var cleaned = esc(raw.replace(/\[PLACEHOLDER\]\s*/g, ""));
    return '<span class="is-ph">' + cleaned + "</span>";
  }

  // Badge version — for short values where a visible marker helps (dates, etc).
  function phBadge(s) {
    var raw = String(s == null ? "" : s);
    if (raw.indexOf("[PLACEHOLDER]") === -1) { return esc(raw); }
    var cleaned = esc(raw.replace(/\[PLACEHOLDER\]\s*/g, ""));
    return '<span class="ph-badge">TBD</span><span class="is-ph">' + cleaned + "</span>";
  }

  function el(html) {
    var d = document.createElement("div");
    d.innerHTML = html.trim();
    return d.firstElementChild;
  }

  // Mark external links: new tab, safe rel, "Official" tag.
  function extAttrs(item) {
    return item.external ? ' target="_blank" rel="noopener noreferrer"' : "";
  }
  function extTag(item) {
    return item.external ? '<span class="tag-official">Official ↗</span>' : "";
  }

  /* ---- Apply editable brand colors --------------------------------------- */
  function applyColors() {
    var c = SITE.colors || {};
    var map = {
      "--purple":      c.purple,
      "--purple-deep": c.purpleDeep,
      "--purple-dark": c.purpleDark,
      "--purple-lift": c.purpleLift,
      "--purple-wash": c.purpleWash,
      "--accent":      c.accent,
      "--black":       c.black,
    };
    Object.keys(map).forEach(function (k) {
      if (map[k]) { document.documentElement.style.setProperty(k, map[k]); }
    });
  }

  /* ---- Brand mark (approved logo, or labeled text placeholder) ----------- */
  function brandMark(size) {
    var id = SITE.identity;
    if (id.logoSrc) {
      return '<img src="' + esc(id.logoSrc) + '" alt="' + esc(id.logoAlt) + '"' +
             (size === "hero" ? ' class="hero__logo"' : "") + ">";
    }
    // No approved logo supplied — never invent one.
    return '<span class="brand__mark" aria-hidden="true" title="Placeholder — awaiting approved school logo">CH</span>';
  }

  /* ======================================================================
     SECTION BUILDERS — one function per homepage section
     ====================================================================== */

  function buildHeader() {
    var id = SITE.identity;
    var nav = [
      { label: "Home",           href: "index.html", current: true },
      { label: "Parents",        href: "parents.html" },
      { label: "Physical Forms", href: "physical-forms.html" },
      { label: "Booster Club",   href: "booster-club.html" },
      { label: "Sponsors",       href: "sponsors.html" },
      { label: "Contact",        href: "contact.html" },
    ];
    return el(
      '<header class="header">' +
        '<div class="wrap header__inner">' +
          '<a class="brand" href="index.html">' + brandMark() +
            '<span class="brand__text"><strong>' + esc(id.programName) + '</strong>' +
            '<span>' + esc(id.orgName) + '</span></span>' +
          '</a>' +
          '<button class="nav__toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Menu">&#9776;</button>' +
          '<nav class="nav" id="site-nav" aria-label="Main"><ul class="nav__list">' +
            nav.map(function (n) {
              return '<li><a class="nav__link" href="' + esc(n.href) + '"' +
                     (n.current ? ' aria-current="page"' : "") + '>' + esc(n.label) + "</a></li>";
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
          (SITE.identity.logoSrc ? brandMark("hero") : "") +
          '<div class="hero__sub">' + esc(h.subhead) + "</div>" +
          "<h1>" + esc(h.headline) + "</h1>" +
          '<p class="hero__intro">' + esc(h.intro) + "</p>" +
          '<div class="hero__actions">' +
            '<a class="btn btn--primary" href="' + esc(h.primaryCta.href) + '">' + esc(h.primaryCta.label) + "</a>" +
            '<a class="btn btn--ghost" href="' + esc(h.secondaryCta.href) + '">' + esc(h.secondaryCta.label) + "</a>" +
          "</div>" +
        "</div>" +
        '<span class="hero__imgnote">Placeholder image — replace with a real photo</span>' +
      "</section>"
    );
    s.querySelector(".hero__media").style.backgroundImage = 'url("' + h.image + '")';
    return s;
  }

  function buildFeatured() {
    var f = SITE.featured;
    if (!f) { return null; }
    return el(
      '<section class="featured">' +
        '<div class="wrap featured__inner">' +
          '<div class="featured__body">' +
            '<div class="featured__tag">' + ph(f.tag) + "</div>" +
            "<h2>" + ph(f.title) + "</h2>" +
            "<p>" + ph(f.body) + "</p>" +
          "</div>" +
          '<div class="featured__date">' + phBadge(f.date) + "</div>" +
          '<a class="btn" href="' + esc(f.cta.href) + '">' + esc(f.cta.label) + "</a>" +
        "</div>" +
      "</section>"
    );
  }

  function buildStrip() {
    var items = SITE.seasonStrip || [];
    if (!items.length) { return null; }
    return el(
      '<section class="strip" aria-label="Season at a glance"><div class="wrap strip__inner">' +
        items.map(function (i) {
          return '<div class="strip__cell">' +
                   '<div class="strip__label">' + esc(i.label) + "</div>" +
                   '<div class="strip__value">' + phBadge(i.value) + "</div>" +
                 "</div>";
        }).join("") +
      "</div></section>"
    );
  }

  function buildSponsors() {
    var s = SITE.sponsors;
    var tiers = s.levels.map(function (lvl) {
      var slots = lvl.items.map(function (it) {
        if (!it.name && !it.logo) {
          return '<div class="sponsor sponsor--empty">Sponsor slot</div>';
        }
        var inner = it.logo
          ? '<img src="' + esc(it.logo) + '" alt="' + esc(it.name) + '">'
          : "<span>" + esc(it.name) + "</span>";
        return '<div class="sponsor">' + inner + "</div>";
      }).join("");

      return '<div class="tier">' +
               '<div class="tier__head"><h3>' + esc(lvl.name) + "</h3>" +
                 "<span>" + ph(lvl.blurb) + "</span></div>" +
               '<div class="sponsor-grid">' + slots + "</div>" +
             "</div>";
    }).join("");

    return el(
      '<section class="section section--wash" id="sponsors">' +
        '<div class="wrap">' +
          '<div class="section__head">' +
            '<span class="eyebrow">Our sponsors</span>' +
            "<h2>" + esc(s.heading) + "</h2>" +
            "<p>" + esc(s.intro) + "</p>" +
          "</div>" +
          tiers +
          '<p class="ph-note">' + ph(s.note) + "</p>" +
        "</div>" +
      "</section>"
    );
  }

  function buildSponsorCta() {
    var c = SITE.sponsors.cta;
    return el(
      '<section class="section section--purple">' +
        '<div class="wrap" style="max-width:720px;text-align:center">' +
          '<span class="eyebrow">Become a sponsor</span>' +
          "<h2>" + esc(c.heading) + "</h2>" +
          '<p style="margin-top:1rem">' + ph(c.body) + "</p>" +
          '<p style="margin-top:1.75rem"><a class="btn btn--primary" href="' + esc(c.href) + '">' +
            esc(c.label) + "</a></p>" +
        "</div>" +
      "</section>"
    );
  }

  function buildQuickLinks() {
    var q = SITE.quickLinks;
    return el(
      '<section class="section">' +
        '<div class="wrap">' +
          '<div class="section__head">' +
            '<span class="eyebrow">Start here</span><h2>' + esc(q.heading) + "</h2>" +
          "</div>" +
          '<div class="grid grid--3">' +
            q.items.map(function (i) {
              return '<a class="card" href="' + esc(i.href) + '"' + extAttrs(i) + ">" +
                       "<h3>" + esc(i.title) + extTag(i) + "</h3>" +
                       "<p>" + esc(i.body) + "</p>" +
                       '<span class="card__more">' + (i.external ? "Official site →" : "Go →") + "</span>" +
                     "</a>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildForms() {
    var f = SITE.forms;
    return el(
      '<section class="section section--wash">' +
        '<div class="wrap">' +
          '<div class="section__head">' +
            '<span class="eyebrow">Required paperwork</span>' +
            "<h2>" + esc(f.heading) + "</h2><p>" + esc(f.body) + "</p>" +
          "</div>" +
          '<div class="grid grid--2">' +
            f.items.map(function (i) {
              return '<a class="card" href="' + esc(i.href) + '"' + extAttrs(i) + ">" +
                       "<h3>" + esc(i.title) + extTag(i) + "</h3>" +
                       "<p>" + ph(i.body) + "</p>" +
                     "</a>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildBooster() {
    var b = SITE.boosterClub;
    return el(
      '<section class="section">' +
        '<div class="wrap" style="max-width:720px;text-align:center">' +
          '<span class="eyebrow">Booster Club</span>' +
          "<h2>" + esc(b.heading) + "</h2>" +
          '<p style="margin-top:1rem;color:var(--grey-500)">' + esc(b.body) + "</p>" +
          '<p class="ph-note">' + ph(b.note) + "</p>" +
          '<p style="margin-top:1.5rem"><a class="btn btn--outline" href="' + esc(b.cta.href) + '">' +
            esc(b.cta.label) + "</a></p>" +
        "</div>" +
      "</section>"
    );
  }

  function buildContact() {
    var c = SITE.contact;
    return el(
      '<section class="section section--wash" id="contact">' +
        '<div class="wrap">' +
          '<div class="section__head">' +
            '<span class="eyebrow">Get in touch</span>' +
            "<h2>" + esc(c.heading) + "</h2><p>" + esc(c.intro) + "</p>" +
          "</div>" +
          '<div class="grid grid--3">' +
            c.items.map(function (i) {
              return '<div class="contact-card"><h3>' + esc(i.role) + "</h3>" +
                       "<p>" + ph(i.name) + "</p>" +
                       "<p>" + ph(i.email) + "</p>" +
                     "</div>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildOfficial() {
    var o = SITE.official, s = o.school;
    return el(
      '<section class="section">' +
        '<div class="wrap">' +
          '<div class="section__head">' +
            '<span class="eyebrow">Official school resources</span>' +
            "<h2>" + esc(o.heading) + "</h2><p>" + esc(o.intro) + "</p>" +
          "</div>" +
          '<div class="official-links">' +
            o.links.map(function (l) {
              return '<a href="' + esc(l.href) + '" target="_blank" rel="noopener noreferrer">' +
                       esc(l.label) + '<span class="tag-official">Official ↗</span></a>';
            }).join("") +
          "</div>" +
          '<div class="findus" style="margin-top:2.5rem">' +
            "<h3>" + esc(s.name) + "</h3>" +
            '<address style="margin-top:.5rem">' + esc(s.address) + "<br>" + esc(s.city) + "<br>" +
              '<a href="' + esc(s.phoneHref) + '">' + esc(s.phone) + "</a></address>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
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
          "<div><h4>" + esc(id.programName) + "</h4>" +
            "<p>" + esc(SITE.boosterClub.body) + "</p></div>" +
          "<div><h4>Pages</h4><ul>" +
            pages.map(function (p) { return '<li><a href="' + esc(p.href) + '">' + esc(p.label) + "</a></li>"; }).join("") +
          "</ul></div>" +
          "<div><h4>Official school links</h4><ul>" +
            o.links.slice(0, 5).map(function (l) {
              return '<li><a href="' + esc(l.href) + '" target="_blank" rel="noopener noreferrer">' +
                     esc(l.label) + " ↗</a></li>";
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
        '<div class="footer__base"><p>&copy; ' + new Date().getFullYear() + " " +
          esc(id.orgName) + ". " + esc(SITE.draftNotice) + "</p></div>" +
      "</div></footer>"
    );
  }

  /* ======================================================================
     SECTION ORDER
     ----------------------------------------------------------------------
     Move a line to reorder that section on the page.
     Delete or comment out a line to remove it.
     ====================================================================== */
  var SECTION_ORDER = [
    buildHero,          // 1. Baseball hero
    buildFeatured,      // 2. Important announcement / upcoming event
    buildStrip,         //    Season dates at a glance
    buildSponsors,      // 3. Sponsor recognition — kept high, not buried
    buildQuickLinks,    // 4. Quick links for parents
    buildForms,         // 5. Physical & required forms
    buildBooster,       // 6. Booster Club info
    buildSponsorCta,    // 7. Become a sponsor
    buildContact,       // 8. Contact
    buildOfficial,      // 9. Official school links
  ];

  /* ---- Render ----------------------------------------------------------- */
  function render() {
    if (typeof SITE === "undefined") {
      document.body.innerHTML =
        '<p style="padding:2rem;font-family:sans-serif">' +
        "Content file didn't load. Make sure <code>data/content.js</code> sits " +
        "next to <code>index.html</code> and that you opened the page from " +
        "inside the project folder.</p>";
      return;
    }

    applyColors();

    document.body.prepend(buildHeader());

    var main = document.getElementById("main");
    SECTION_ORDER.forEach(function (fn) {
      var node = fn();
      if (node) { main.appendChild(node); }
    });

    document.body.appendChild(buildFooter());

    wireNav();
  }

  /* ---- Mobile navigation ------------------------------------------------ */
  function wireNav() {
    var toggle = document.querySelector(".nav__toggle");
    var nav = document.querySelector(".nav");
    if (!toggle || !nav) { return; }

    toggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.textContent = open ? "\u2630" : "\u2715";
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest(".nav__link") && window.innerWidth <= 920) {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "\u2630";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
