# Chapel Hill Baseball — Homepage (First Draft)

Homepage only. Static HTML/CSS/JS, no build step, no dependencies.

**Open `index.html` from inside this folder.** The files need to stay together —
moving `index.html` out on its own will break the styling.

---

## The one file you edit

**`data/content.js`** holds everything on the page: text, dates, sponsors,
announcements, contacts, links, and colors. You do not need to touch the HTML
or CSS to change content.

Edit it, save, refresh the browser. That's the whole loop.

Every item still needing real information is marked `[PLACEHOLDER]`. Those show
on the page as dotted underlines or "TBD" chips. **Delete the `[PLACEHOLDER]`
text and the marker disappears on its own** — that's how you track what's left.

## Two things awaiting official approval

**1. Colors are not confirmed.**
`data/content.js` → `SITE.colors`. Chapel Hill is documented as purple and
black, but I have not verified the official hex values with the school or
district. The values in there now are *approximations*, labeled as such.

Once the athletic department or district communications office confirms the
official values, type them into `SITE.colors` and every element updates. The
CSS reads its colors from that object at runtime — you never edit the
stylesheet.

**2. There is no logo on the page.**
`SITE.identity.logoSrc` is intentionally empty, so a dashed "CH" placeholder
mark shows instead. When the athletic department supplies the approved Panther
logo, drop the file in `assets/logos/` and set the path:

```js
logoSrc: "assets/logos/panthers-approved.png",
```

It'll then appear in both the header and the hero. **No logo has been invented
or copied from anywhere.**

## Adding sponsors

`data/content.js` → `SITE.sponsors.levels`. Three levels exist as requested:
Premier Sponsors, Supporting Sponsors, Community Partners.

The tiles are empty slots reading "Sponsor slot" — **no sponsor names or logos
have been invented.** To add a real one:

```js
{ name: "Business Name", logo: "assets/logos/their-logo.png" },
```

Leave `logo: ""` and the business name shows as text instead. Add or remove
items freely; the grid re-flows.

## Reordering or removing sections

`js/main.js`, bottom of the file, `SECTION_ORDER`. Move a line to reorder,
delete a line to remove. Current order follows the brief:

1. Hero · 2. Featured announcement (+ season dates) · 3. **Sponsors** ·
4. Quick links · 5. Forms · 6. Booster Club · 7. Become a sponsor ·
8. Contact · 9. Official school links

Sponsors sit third, directly under the announcement — not buried.

## Relationship to the official school site

This site covers baseball only. Schoolwide information is **linked, not
copied**, so it can't go stale here:

- Every external link opens in a new tab and carries a visible "Official ↗" tag
- The baseball schedule links to the school athletics calendar rather than
  duplicating game dates
- The required footer disclaimer is present verbatim, with a live link to
  chhs.dcssga.org
- The header is deliberately styled differently from the district's chrome, so
  this doesn't read as an official DCSS page

Verified from chhs.dcssga.org: the address (4899 Chapel Hill Road,
Douglasville, GA 30135), the phone (770.651.6200), and the calendar,
registration, attendance, transportation, and RevTrak payment links.

## Still needed before launch

| What | Where |
|---|---|
| Official brand colors | `content.js` → `SITE.colors` |
| Approved Panther logo | `content.js` → `SITE.identity.logoSrc` |
| Real hero photo | `content.js` → `SITE.hero.image` |
| Sponsor names + logos | `content.js` → `SITE.sponsors.levels` |
| All dates | `SITE.featured`, `SITE.seasonStrip` |
| Contact names + emails | `SITE.contact` |
| Current GHSA form link | `SITE.forms.items[0].href` |
| Sponsorship level descriptions | `SITE.sponsors.levels[].blurb` |

## Notes

- **Nav links point to pages that don't exist yet** — homepage only, as
  requested. They'll 404 until the other pages are built.
- **The hero image is a drawn graphic**, labeled as a placeholder on the page
  itself. One real photo of the field or team would improve this page more than
  anything else on the list above.
- **Fonts** load from Google Fonts. If the district network blocks that, the
  fallback stack still renders cleanly.
- Accessibility floor is in place: keyboard focus, skip link, semantic headings,
  alt text, reduced-motion support. Worth a real screen-reader pass once actual
  content lands.

## When you review it

The most useful feedback is where you'd click as a parent, and whether the
section order matches what your families actually need. Section order is a
one-line change — if sponsors should sit higher or lower, say so.
