# Chapel Hill Baseball — Project Handoff

End of session 4. Written for whoever picks this up next, including a future me
with no memory of any of it.

**Current build: v1.1 · July 17, 2026 · home (11) · parents (7) · physical-forms (7) · contact (5) · sponsors (10)**

---

## What this is

Homepage for the Chapel Hill High School Baseball Booster Club, Douglasville,
Georgia. Static HTML/CSS/JS, no build step, no dependencies. Being prepared for
presentation to the Head Coach (Mr. Johnson) and the Booster Club President.

**Client:** Christopher Bazemore. Not a web designer — relies on this being
technically correct without having to check it. Direct, gives sharp feedback,
and has been right every time he's pushed back. Treat his instincts as data.

**Status:** homepage done and presentable. No other pages exist yet.

---

## Every time you finish a change, deliver these three things

Don't wait to be asked. This is the routine.

**1. The zip** — `/mnt/user-data/outputs/chapelhill-baseball-home.zip`
The editable project. This is what he unzips into `C:\Chapel Hill Baseball` and
pushes.

**2. The standalone HTML** — `/mnt/user-data/outputs/CHAPEL-HILL-BASEBALL-homepage.html`
Single file, ~299KB, all assets base64-inlined. Double-click, can't break. This
is what gets emailed or opened for a quick look without touching git.

Rebuild both after any change. **Stale deliverables have been shipped more than
once in this project.**

**3. The PowerShell commands** — give them as ONE code block, one command per
line (NOT semicolon-chained). He asked for this format explicitly: it's easier
to read and he can watch each step. Fill in the real commit message:

```powershell
Expand-Archive -Path "$HOME\Downloads\chapelhill-baseball-home.zip" -DestinationPath "$HOME\Downloads\chb-new" -Force
Copy-Item -Path "$HOME\Downloads\chb-new\chapelhill-baseball-home\*" -Destination "C:\Chapel Hill Baseball\" -Recurse -Force
cd "C:\Chapel Hill Baseball"
git add .
git commit -m "DESCRIBE THE CHANGE"
git push
```

He's new to git. One block, plain lines, no `&&` or `;` chaining.

Also tell him to bump the revision stamp (`SITE.revision.rev` in `content.js`)
before pushing — actually, bump it yourself as part of the build — and to
**Ctrl+F5** after. The footer should show the new number. If it doesn't, he's
on cache.

### Note on the copy-over step

The unzip + copy lines are already in the block above. **Never `Remove-Item`
the folder with `-Exclude ".git"`** — it silently breaks the repo (`-Exclude`
doesn't protect against `-Recurse`), and that already cost a session. The
copy-over-the-top approach above is safe.

---

## Read this first: the four things I got wrong

These cost real time, and the decisions that came out of them look arbitrary
from outside. Without the reasoning, someone "fixes" them back.

**1. I invented the school colors.**
Guessed navy and Columbia blue from nothing. Chapel Hill is **purple and black**
(Panthers). Then I over-corrected and eyedropped `#481F6D` off the logo, which
the client's own spec had explicitly forbidden. Colors are now editable
variables in `SITE.colors`, approximated, awaiting the athletic department.
**Never guess a color.**

**2. I invented a coach's quote and attributed it to "Head Coach."**
It was the emotional centerpiece of the page. He would have read his own
fabricated words on a public website. Worst thing I did on this project. The
welcome now runs in Booster Club voice, attributed to "Chapel Hill Baseball /
Panther Baseball Booster Club." **Never attribute invented words to a real
person or their job title.** Everything else here is invented demo data and
that's fine — this category isn't.

**3. I buried the sponsors at 7.6 phone screens.**
The Booster President's *one* request was sponsor visibility. I built a
beautiful sponsor section and put it where nobody scrolls. Only caught it
because a brief forced me to measure. They now sit at 3.1 screens.
**Measure. Don't have opinions about layout — take numbers.**

**4. My writing had a tell.**
Every sentence was setup → em-dash → wry reversal. Twenty sentences, one
rhythm. Plus anaphora everywhere ("Every bat, every uniform, every bag..."). It
read as performed, not meant. All rewritten. **Em-dash count on the rendered
page is 0 and should stay there.** Read new copy aloud before shipping it.

---

## Client's principle (his words — keep it)

> Every new section must earn its place. If it costs significant scroll,
> identify an existing section to condense or move. The homepage should gain
> value, not length.

This forced four sections off the homepage. Apply it to anything new.

---

## Current state

**Live:** https://bazeocrisy.github.io/Chapelhill-Baseball/
**Repo:** github.com/bazeocrisy/Chapelhill-Baseball (public, `main`, root)
**Local:** `C:\Chapel Hill Baseball` (has `.git`)

| | |
|---|---|
| Desktop | was 7,420px (8.2 screens) at v0.5 — shorter now, not re-measured |
| Mobile | was 9,218px (10.9 screens) at v0.5 — shorter now, not re-measured |
| Sponsors on mobile | 3.1 screens down |
| Horizontal overflow | 0 at 320/360/390/414/768/1024/1440 |
| h1 count | 1 |
| Heading order | clean, no skips |
| Missing alt / unsafe ext links | 0 / 0 |
| Em-dashes rendered | 0 |
| Draft language rendered | none |

---

## Architecture

```
chapelhill-baseball-home/
├── index.html          33 lines — thin shell, <main id="main"> filled by JS
├── css/style.css      948 lines — all styling; colors injected at runtime
├── js/main.js         728 lines — renders everything from content.js
├── data/content.js    482 lines — THE FILE THE CLIENT EDITS
├── assets/logos/      panthers-logo.png + 12 sponsor SVGs
├── assets/img/        hero-field.svg (illustrated placeholder)
├── robots.txt         Disallow: / — draft protection
├── README.md          client-facing
└── DEPLOY.md          GitHub Pages steps
```

**Data-driven, and that's the point.** The client changes text, dates, sponsors,
contacts, and colors in `content.js` without touching HTML or CSS. Don't break
this. Don't hardcode content into `main.js`.

- **Section order/inclusion:** `PAGES`, bottom of `main.js`. Keyed by the
  `data-page` attribute on `<body>`. `index.html` is `home`,
  `physical-forms.html` is `physical-forms`. New page = copy a shell, change
  `data-page`, add a key. One JS file serves every page.
- **Colors:** `SITE.colors` — CSS `:root` values are fallbacks only
- **Draft banner:** `SITE.mockBanner.show` (currently `false`)
- **Revision stamp:** `SITE.revision` — see below
- **Builders are decoupled from the order array.** A removed section's builder
  and content both survive; re-adding one line restores it.

### Revision stamp
Footer, right of the copyright: `Homepage draft v1.1 · July 17, 2026`.
**Manual on purpose.** An auto-timestamp updates on every page load whether the
file changed or not, which tells you nothing. Bump `SITE.revision.rev` on every
push — if the client hard-refreshes and the number hasn't moved, he's on a
cached build. `show: false` hides it at launch.

---

## Homepage section order (11)

1. Hero — identity + urgent alert in-hero
2. Sponsor strip — top 2 tiers, above the fold, every visit
3. Season strip — 4 dates
4. Quick links — 6 cards (the parent's main navigation; don't cut these)
5. Program snapshot — record/standing band
6. Sponsors — 3 tiers + impact block
7. Why sponsor — the business pitch
8. News — 3 items
9. Welcome — program voice, NOT a named coach
10. Volunteer spotlight — the story
11. Volunteer CTA — purple band, the ask

Footer follows.

**Moved off the homepage.** Builders still in `main.js`, content still in
`content.js`, all four commented in `SECTION_ORDER` with reasoning:

| Section | Destination | Why |
|---|---|---|
| `buildOfficial` | parents.html | District links, not the program's. Belong where a parent lands for paperwork. Footer already carries 5 of 6 links + address + phone, so the homepage loses nothing |
| `buildBooster` | booster-club.html | Duplicated what Values/Development/Spotlight/CTA said better |
| `buildContact` | contact.html | **Done — contact.html shipped v0.9.** The old 3-card block was superseded by `contactPage` + the `build Contact*` builders. `buildContact` and `SITE.contact` still exist but nothing calls them; safe to delete once you're sure |
| `buildValues` | about/program | No parent task, no sponsor decision. Values were invented — should be the coach's own |
| `buildDevelopment` | about/program | Same. Alumni figures invented; invented player outcomes are the riskiest data to put in front of an AD |

---

## The GHSA form: read before touching physical-forms.html

**Never host a local copy of the PDF.** Every form link points at ghsa.net and
must stay that way:

- By-Law 1.41(d) requires the **latest** edition, which lives on GHSA's site.
- The form is copyrighted; GHSA states alterations are not permitted.
- A local copy goes stale **silently**. A parent downloads it, pays for the
  exam, turns it in, and it's rejected. GHSA's own notice complains about
  schools serving old editions.

**This already happened here.** A `GHSA-PPE-4_2018rev1.pdf` surfaced during
session 5 and was the wrong edition (©2010 content, superseded January 1 2020).
Tells: a "Clearance Form" page, "FEMALES ONLY" questions, a 2010 copyright
line. The current form has the PHQ-4 mental-health screen and a "Medical
Eligibility Form" page. If that old file came off the school or district site,
**the athletic department should be told** — it affects every sport.

Verified live from ghsa.net July 17, 2026:

| Form | URL |
|---|---|
| PPE (current, fillable) | `.../forms/2023_GHSA_PPE_Fillable_-_Revised_3-9-23.pdf` |
| PPE Spanish | `.../forms/2023_GHSA_PPE_Fillable_Spanish_-_Revised_3-9-23.pdf` |
| Athletes with disabilities | `.../forms/Preparticipation_Physical_History_-_Athletes_with_Disabilities_-_2019_Fillable.pdf` |
| Sudden cardiac arrest (SB 60) | `.../forms/Sudden_Cardiac_Arrest_Awareness_Form_-_2026-27.pdf` |
| Concussion awareness | `.../forms/Concussion_Awareness_Form_-_2026-27.pdf` |

All under `https://www.ghsa.net/sites/default/files/documents/`. Spanish
versions exist for the cardiac and concussion forms too.

**By-Law 1.41, paraphrased on the page:** physical on file before any tryout,
practice, voluntary workout, or game; good 12 months from exam date; **an exam
on/after April 1 covers the entire next school year**; exam by physician, D.O.,
NP, or PA; signed by M.D., D.O., PA, or delegated APRN.

GHSA: 151 South Bethel Street, Thomaston, GA 30286 · 706-647-7473

---

## Verified facts (don't re-research)

From chhs.dcssga.org:
- Purple and black. Panthers. GHSA Class 6A, Region 2.
- 4899 Chapel Hill Road, Douglasville, GA 30135 · 770.651.6200
- School site: https://chhs.dcssga.org/o/chhs (Apptegy CMS)
- Calendar `/o/chhs/events` · Registration `/o/dcss/page/registration`
- Attendance `/o/chhs/page/attendance` · Transportation `/o/dcss/page/transportation`
- Payments: https://chapelhillhs.revtrak.net
- **No Booster Club logo exists.** Checked the whole page. Uses the school
  Panther mark, which still needs athletic department permission.

---

## Everything on the page that is INVENTED

The client asked for full demo data so stakeholders see a complete product.
Right call. But **every item below is fabricated.** Don't let any of it reach
the Athletic Director as fact.

**Sponsors (all 12):** Chapel Hill Auto Group, Ridgeway Contracting, Bell Creek
Dental, Westmoreland Realty, Sweetwater Orthopedics, Tanner Heating & Air,
Midway Tire & Lube, Douglas County Insurance, Prowler Print Co., Arbor Physical
Therapy, Fairhaven Financial, The Dugout Diner. Logos are hand-drawn SVGs made
to match the invented names.

**Program snapshot:** 18-11 overall, 3rd in Region 2, 9-5 region, Round 2 exit.

**Sponsor impact:** rebuilt bullpen mounds, 18 jerseys, fees for four players.

**Why-sponsor stats:** 15 home dates, 40+ families, 100% stays with program.

**Contacts:** Dana Whitfield (President), Marcus Reed (Sponsorship Chair),
`@chapelhillbaseball.org` addresses. Domain may not exist.

**All dates:** Aug 1 physicals, Aug 12 meeting, Jan 20 tryouts, Feb 17 opener
vs. Alexander. **The Aug 1 physicals deadline is invented** and it's stated as
fact in the homepage hero alert. physical-forms.html deliberately does NOT
repeat it — that page gives the GHSA rule and marks the date `[PLACEHOLDER]`.
Confirm the real cutoff, or the two pages disagree.

**News:** all three items, including "three Panthers headed to college ball."

Also invented but currently off the homepage: the five program values, the four
development pillars, the alumni card (2026 three signed / 2025 two + JUCO /
2024 two).

---

## Before this goes live

1. `SITE.mockBanner.show: true` if sharing beyond the board
2. Restore `SITE.draftNotice` text
3. `SITE.revision.show: false`
4. Delete `robots.txt` and the `noindex` meta only at real launch
5. Replace every invented item above
6. Confirm official hex colors with the athletic department
7. Get written OK to use the Panther logo
8. **Get a real photo.** The hero is a drawn field. Everything else now reads
   authentic, which makes the illustration the one thing that doesn't. Highest-
   impact change available; top recommendation for three sessions running.

---

## Deployment (Windows/PowerShell)

Client is new to git. **Drag-and-drop upload to GitHub flattens the folder
structure and breaks the site** — this happened once and cost a session. Git
preserves folders. Always git.

```powershell
cd "C:\Chapel Hill Baseball"
git add .
git commit -m "message"
git push
```

Then **Ctrl+F5** — regular refresh serves cached CSS and he'll think nothing
changed. PowerShell paints git's normal output in red `CategoryInfo` blocks;
cosmetic, not an error. LF/CRLF warnings are noise.

---

## Working notes

- He asks for things that sometimes conflict with his own earlier specs. Flag
  the conflict, recommend, then do it his way — unless it's the
  fabricated-quote category.
- He pushed back on trimming the Volunteer Spotlight and he was right. It's the
  most human thing on the page. Leave it.
- He asked for an auto-scrolling sponsor marquee. I argued against it (motion
  gets tuned out, off-screen sponsors are invisible, reads cheap) and he
  dropped it. Don't quietly build it later.
- I once said I'd remove the contact section, inspected it, then wrote a
  handoff without actually removing it. He caught it. **Finish the task before
  writing about the task.**
- Verify with Playwright before claiming anything works. The 215px mobile
  overflow bug and the 7.6-screen sponsor burial were both invisible without
  measurement.
- Standalone single-file build for emailing:
  `/mnt/user-data/outputs/CHAPEL-HILL-BASEBALL-homepage.html` (~299KB, assets
  base64-inlined, can't break).

---

## Contact page (v0.9)

Built from the routing question, not from "what goes on a contact page." Ten
visitor types collapse to four routes:

| Visitor | Routes to |
|---|---|
| Parent (current), student-athlete | Booster for fees/paperwork, coaches for tryouts/playing time |
| Parent (prospective) | Coaches |
| Sponsor, local business | Sponsorship |
| Volunteer, alumni, community | Booster |
| Media, opposing coach, school staff | School, 770.651.6200 |

So: three program routes plus one school route. Not a directory.

**The load-bearing line** is `contactPage.routes.intro` — the one saying the
Booster Club doesn't pick the lineup. That sentence is what keeps playing-time
complaints out of the treasurer's inbox. Don't cut it for space.

**No response-time promise anywhere on the page.** Nobody has agreed to one.
Don't add "we reply within 48 hours" until somebody commits to it.

`buildOfficial` now takes an optional override so the district links can carry
page-appropriate framing. Called bare it behaves exactly as before.

**Still 404:** `booster-club.html` — the last page.

---

## Parents page (v1.0)

Delivers what the homepage quick-link card promises: meetings, dates,
paperwork, and the questions we get every year. Fees added, because that's the
question that actually gets asked.

**Dates are NOT duplicated.** `buildParentsDates` renders from
`SITE.seasonStrip` — the same array the homepage strip uses — and joins
page-only prose from `parentsPage.dates.notes`, keyed by label. Edit a date in
`seasonStrip` and both pages update. **Never paste dates into `parentsPage`.**
Two lists drift, and a stale tryout date on the page built to be authoritative
about dates is worse than no page.

Game schedules link to the school calendar. Same standing rule as README:
link, don't copy.

**Fees are deliberately empty** (`amount`, `due`, `methods`, `installments`).
The page renders "Pending confirmation" chips and still looks finished. Fill
the values in and the chips disappear on their own.

**Why no invented fee numbers**, when sponsors and dates are invented
everywhere else: a dollar amount on screen gets repeated in a board meeting and
quoted to a parent, and becomes real without anyone deciding it. Same category
as the invented coach quote. The school already uses RevTrak (verified) —
confirm whether baseball dues go through it before building a parallel payment
story.

The assistance block IS the program's real voice, lifted from
`SITE.boosterClub.points`. Keep it.

`parents.html#announcements` now resolves — the homepage News CTA has pointed
there since v0.5.

---

## Sponsors page (v1.1)

`sponsors.html` — the deep "Become a Sponsor" page. Homepage keeps its sponsor
strip and recognition block as PREVIEWS; the packages live only here (don't
duplicate them onto the homepage).

**Tier amounts are marked demo** ($250 / $500 / $1,000 / $2,500 / Custom). A
`.pkgnote` disclosure sits with the packages. Amounts are OK here where fee
amounts on Parents were not: a sponsorship tier is a marked-demo pitch to a
business nobody writes a check against off a mock; a parent fee is a bill a
family acts on.

**No fake form** (client agreed). The "Start a conversation" section routes to
`contact.html#sponsorship` — an anchor added to `buildContactRoutes` this
session (routes now carry `anchor:` keys: booster, program, sponsorship).

**No email on the sponsors page.** The action is the button to Contact. The
(demo) sponsorship address lives on Contact, marked there. We don't repeat an
address that looks live on a second public page.

**Homepage CTAs rewired:** `sponsorValue.cta` → `sponsors.html#packages`,
`sponsorValue.altCta` → `sponsors.html#start`. The strip's "See all sponsors"
stays as an in-page `#sponsors` anchor (it's a preview of the on-page block).

**Deep-link anchors on sponsors.html:** `#packages`, `#how-it-works`, `#start`,
`#community-partners`, `#faq`.

Also fixed this session: parents linked `physical-forms.html#also` but that
section had no id. Added `id="also"`. Full link audit passes except
booster-club (unbuilt).

---

## Likely next task

He works one page at a time. Homepage is done. Next is probably **Parents**,
**Contact**, **Booster Club**, or an **About/Program** page.

Three of those have a head start — content already written and sitting in
`content.js`, builders intact in `main.js`, just commented out of
`SECTION_ORDER`:

- **contact.html** → `SITE.contact` + `buildContact`
- **booster-club.html** → `SITE.boosterClub` + `buildBooster`
- **about/program** → `SITE.values` + `buildValues`, `SITE.development` +
  `buildDevelopment`

That content was written for the homepage and moved. It's ready to use.
