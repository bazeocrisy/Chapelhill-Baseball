# Putting this on GitHub Pages

## First time

1. **New repo** on GitHub — name it `chapelhill-baseball`, set it **Public**,
   don't initialize with a README.

2. **Upload the files.** On the repo page: *Add file → Upload files*, then drag
   in the **contents** of this folder — `index.html`, `css/`, `js/`, `data/`,
   `assets/`, `robots.txt`.

   `index.html` must end up at the top level of the repo. If it lands inside a
   subfolder, Pages won't find it.

   Or from a terminal:
   ```bash
   git init
   git add .
   git commit -m "Chapel Hill Baseball homepage — first draft mock"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/chapelhill-baseball.git
   git push -u origin main
   ```

3. **Turn on Pages.** Settings → Pages → Source: *Deploy from a branch* →
   Branch: `main` → Folder: `/ (root)` → Save.

4. Wait 1–2 minutes. Live at:
   `https://YOUR-USERNAME.github.io/chapelhill-baseball/`

## Making changes after it's up

Click `data/content.js` on GitHub → pencil icon → edit → *Commit changes*.
Live in about a minute. No software to install.

If something breaks, the repo's commit history lets you see what changed and
undo it.

## Going live for real

When the board approves and the content is real:

1. **Delete `robots.txt`**
2. **Remove the noindex line** from `index.html` (it's commented, near the top)
3. **Turn off the draft banner** — `data/content.js` → `mockBanner: { show: false }`
4. **Remove the draft notice** — `data/content.js` → `draftNotice`
5. Custom domain (optional): Settings → Pages → Custom domain. Same repo, same
   files, new address. Nothing gets rebuilt.

## While it's still a draft

- `robots.txt` and the noindex tag keep it out of Google
- The DRAFT banner tells any human who lands on it what they're looking at
- Keep all three until the content is real

Anyone with the link can view it — GitHub Pages has no password protection on
free accounts. That's fine for a mock; just don't treat the URL as private.
