/* ==========================================================================
   ARCHIVE — SPONSORS PAGE SECTIONS REMOVED IN v2.1
   ==========================================================================

   THIS FILE IS NOT LOADED BY ANY PAGE.

   The Booster Club asked for the Sponsors page to stop publishing anything
   they hadn't approved — prices, package tiers, benefit promises, reach
   figures, deadlines, and the interest form all came out. The page is now
   a title, the logos, and a "more information soon" line.

   Their content still lives in data/content.js under SITE.sponsorPage, so
   nothing is lost. When the board approves real packages and pricing, the
   fastest path is usually to rewrite from the approved numbers rather than
   restore these builders — the old copy was written around demo figures.

   What's in here:
     buildSponsorsHero        Full marketing hero with two CTAs and a kicker
     buildSponsorsValue       "More than a logo"
     buildSponsorsImpact      "Your partnership at work"
     buildSponsorsPackages    Package tiers, prices, benefit lists
     buildSponsorsRecognition "How sponsors get seen"
     buildSponsorsProcess     "How it works" steps
     buildSponsorsStart       "Start a conversation"
     buildSponsorsFaq         Sponsorship FAQ
     buildSponsorsCommunity   Community partners preview
     buildSponsorsFinalCta    Closing call to action
   ========================================================================== */

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