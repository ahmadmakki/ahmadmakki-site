# Ahmad Makki — site refresh: what changed & how to deploy

This is your existing Jekyll + Decap CMS site, redesigned (editorial direction),
privacy-scrubbed, and security-hardened. Nothing about how you edit content has
changed — you still edit everything from `/admin`.

---

## 1. How to deploy

Your repo is on GitHub and auto-deploys to Netlify, so:

1. Copy these files over your local clone (or drag them into the GitHub web UI),
   keeping the same folder structure.
2. Commit and push to the `main` branch.
3. Netlify rebuilds automatically. Watch the deploy log in the Netlify dashboard.

Files that changed or were added:
- `assets/css/style.css` .......... full editorial redesign
- `_layouts/default.html` ......... nav avatar, external identity script, footer
- `index.html` .................... editorial sections + testimonial block
- `_includes/contact.html` ........ external form script, data-email attribute
- `_data/content.yml` ............. client names anonymised, location removed, testimonials added
- `_config.yml` ................... location neutralised, `initials` + `avatar` added
- `admin/config.yml` .............. testimonials now editable in the CMS
- `admin/index.html` .............. Decap CMS version pinned (~3.15.1)
- `netlify.toml` .................. security headers added
- `assets/js/identity-redirect.js`  NEW — was inline
- `assets/js/contact.js` .......... NEW — was inline

---

## 2. IMPORTANT — one manual step only you can do

In the **Netlify dashboard → your site → Identity → Registration preference**,
make sure it is set to **Invite only**.

If registration is "Open", anyone on the internet can create an account and edit
your site through `/admin`. This is the single most important security setting and
it lives in the dashboard, not in the code.

---

## 3. Change your profile photo (recommended)

You can now change the avatar from the admin website:

1. Open `your-site-url/admin` and sign in.
2. Open **Homepage content → Homepage → Profile**.
3. Upload a square photo in **Profile photo**, then click **Publish**.

Decap CMS uploads the image to `assets/img`, updates the homepage data, and
Netlify rebuilds the site automatically. Clear the photo to show the fallback
initials instead.

---

## 4. Add a real testimonial (recommended)

Testimonials are the highest-impact trust element on a consultant page. The
section is hidden until you add one.

- From the CMS: **Homepage content → Client testimonials → Add**.
- Or edit `_data/content.yml` directly:

```yaml
testimonials:
  - quote: "Deadlines stopped slipping the month he joined."
    name: "Head of Digital"
    role: "National telecom operator"   # anonymised is fine
```

Even one anonymised quote works. Leave the list empty to keep the section hidden.

---

## 5. Security changes made (for your reference)

- **Content-Security-Policy** + HSTS, nosniff, frame-ancestors, referrer and
  permissions policies added in `netlify.toml`. The `/admin` path gets a looser
  policy (Decap needs it) but is gated behind Identity login and marked noindex.
- **Inline scripts removed** so the strict script policy can apply without
  `unsafe-inline` — they now live in `assets/js/`.
- **Decap CMS pinned** to `~3.15.1` (was `^3.0.0`). You still get security
  patches, but it won't silently jump to an arbitrary future major/minor.
  Check https://github.com/decaporg/decap-cms/releases before bumping it.
- **Web3Forms key**: this is a public-by-design key (it must sit in client-side
  form HTML), so it is safe in the repo. If you ever get form spam, rotate it in
  your Web3Forms dashboard and update `web3forms_key` in `_config.yml`.
  NOTE: your current key looks truncated — test the form after deploy; if it
  fails, paste the full key from web3forms.com into `_config.yml`.

---

## 6. Optional — scrub old client names from git history

Anonymising `content.yml` fixes the live site, but the previous commits on GitHub
still contain the old client names. For a portfolio this rarely matters, but if
you want them gone from history too, run this locally (it rewrites history and
force-pushes — make a backup first):

```bash
# Back up first
git clone https://github.com/ahmadmakki/ahmadmakki-site.git backup-copy

# In your working clone, install git-filter-repo (pip install git-filter-repo), then:
git filter-repo --replace-text <(cat <<'REPLACE'
MEA==>Aviation client
ISF==>Public-sector client
Sursock Museum==>Cultural institution
Touch==>Telecom client
Pilecubes==>Construction-tech SaaS
Digital Prestige==>Software delivery org
REPLACE
)

git push --force origin main
```

If a collaborator or Netlify has the old history cached, this can get fiddly —
tell me and I'll walk you through it. If in doubt, skipping this is fine.

---

## 7. Icons update (added after first version)

Simple inline line-icons were added to the Services and Process sections.

Files changed in this update — re-upload these three:
- `_includes/icon.html`  ...... NEW (the icon set)
- `index.html`  ............... services + process now show an icon each
- `assets/css/style.css`  ..... icon styling appended at the bottom

Notes:
- Icons are inline SVG (no external library) — fast and secure.
- They are mapped by position: 1st/2nd/3rd service and 1st–4th step. Your
  current content matches, so they line up. If you ADD a service/step in the
  CMS, the extra one shows a neutral circle until you assign it an icon.
- Available icon names: delivery, ai, rescue, call, plan, run, ship.

---

## 8. Hero graphic + motion (round 2)

Priorities addressed: striking hero (abstract, no face) + scroll/hover motion.

Files changed — re-upload these:
- `index.html` ................ two-column hero with abstract SVG graphic; reveal classes
- `assets/css/style.css` ...... hero layout, SVG animations, scroll-reveal, hover polish
- `_layouts/default.html` ..... links the new reveal script
- `assets/js/reveal.js` ....... NEW — fades sections in on scroll

Notes:
- The hero graphic is inline SVG (no image file) themed "idea -> shipped": a
  delivery path with milestone nodes and floating task cards, animated on load.
- Scroll-reveal and the animations respect `prefers-reduced-motion`.
- No new external requests, so the security headers are unaffected.

Still on the list for a future round (your ranking): depth (case-study pages /
FAQ / richer about) and trust (testimonials + client strip).

---

## 9. Navy rebrand + SEO / accessibility / best-practices (round 3)

### Colour + layout
- Replaced the green accent with **deep navy** (#1B3A6B) throughout.
- Hero headline reduced noticeably (max 46px, was 70px).
- Hero graphic re-aligned: centred in its column on desktop, centred on mobile.
- Section backgrounds now clearly distinct (white / cool-grey / a **dark navy band**
  on "How it works") so the page no longer reads as all-white.

### SEO
- Activated `jekyll-seo-tag` (title, meta description, canonical, Open Graph,
  Twitter cards) and added `jekyll-sitemap` (auto `/sitemap.xml`).
- Set `url` in `_config.yml` (needed for canonical + sitemap).
- Added `robots.txt` (allows site, disallows /admin, points to sitemap).
- Added a branded **Open Graph share image** at `/assets/img/og-cover.png`.
- Added `llms.txt` for AI-agent browsing.

### Accessibility
- Added a "Skip to content" link and a `<main>` landmark.
- Darkened secondary text for AA contrast.
- Hero SVG marked `aria-hidden` (decorative).

### Best practices / performance
- Added `Cross-Origin-Opener-Policy: same-origin`.
- Added long-cache headers for `/assets/*`.
- (Already in place from earlier: CSP, HSTS, X-Frame-Options, nosniff.)

### About the Lighthouse report
The report you shared showed "Error!" on every line — that means the run did not
complete, so there were no real scores to act on. The changes above cover the
categories it lists (SEO, Accessibility, Best Practices, Performance). Re-run
Lighthouse in an Incognito window against the deployed site for real numbers.

### New/changed files this round
- `assets/css/style.css`, `index.html`, `_layouts/default.html`, `_config.yml`,
  `Gemfile`, `netlify.toml`
- NEW: `robots.txt`, `llms.txt`, `assets/img/og-cover.png`

IMPORTANT: because `Gemfile` changed, delete any local `Gemfile.lock` before
pushing (or run `bundle update`) so Netlify installs the new gems cleanly.

---

## 10. Logo, favicon, navy buttons, content clarity (round 4)

- **Logo created**: `assets/img/logo.svg` (navy mark, rising "idea -> shipped"
  path) now sits in the nav next to your name.
- **Favicon added**: browser-tab icon via `favicon.ico` (root) + `favicon.svg`
  + `apple-touch-icon.png`, plus a `theme-color`. It'll show in tabs/bookmarks.
- **Buttons are now navy** (were black) to match the palette.
- **Service numbers (01/02/03) removed**; icon badges resized and re-padded.
- **New service added — "Product strategy & roadmap"** — makes clear that clients
  can consult you to shape a NEW product/platform (vision -> roadmap -> MVP), not
  only rescue existing ones. The hero and services intro now say this explicitly.
- Icons are now stored per-service in the content and editable in the CMS
  (dropdown), so they survive edits.

Note: the `a@b.com` you saw was only in the throwaway preview render — your real
files use `ahmadmakki01@outlook.com` from `_config.yml`.

New/changed files this round:
- `index.html`, `assets/css/style.css`, `_layouts/default.html`,
  `_data/content.yml`, `_includes/icon.html`, `admin/config.yml`
- NEW: `favicon.ico`, `assets/img/logo.svg`, `assets/img/favicon.svg`,
  `assets/img/apple-touch-icon.png`, `assets/img/favicon-32.png`,
  `assets/img/favicon-16.png`, `assets/img/logo-512.png`

---

## 11. Hotfix — doubled URLs (baseurl)

Symptom: canonical, og:image, logo, favicon and nav links were doubled
(`.../https://ahmadmakki.netlify.app/...`), breaking the logo/favicon/share image.

Cause: `baseurl` in `_config.yml` had been set to the full site URL. With
`relative_url`/`absolute_url` and `jekyll-seo-tag`, that prepends the domain twice.

Fix: `baseurl: ""` (root-domain site); `url` stays the full domain. Re-upload
`_config.yml`. This alone fixes the logo, favicon and social image not loading.
