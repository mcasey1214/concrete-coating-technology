# CCT SEO migration decisions — 2026-11-11

Implemented locally for the move from LinkNow to Netlify. Nothing has been committed, pushed, deployed, or changed in DNS.

**Sources used:** `MIGRATION-INVENTORY.md`, `migration-inventory.csv` (2026-10-23 crawl), the LinkNow WordPress export in `source-content-archive/`, the current site, and the approved service structure (Concrete Floor Coatings with decorative flake or grit options, plus Commercial Slip Prevention). Historical Google Search Console data was not available.

**Production domain:** `https://concretecoatingtechnology.com/`

## 1. Redirects (`cct-website/site/_redirects`)

Every redirect goes straight to its final URL, with no chains. Each rule is listed with and without the trailing slash.

The retired service URLs are **forced** (`301!`). Without force, Netlify serves an existing static file in place of the redirect rule. The old page files have also been moved out of the publish folder. The force flag keeps the redirect working if a file is ever restored there.

| Old URL | New destination | Status | Reason |
|---|---|---|---|
| `/services/concrete-repair-maintenance/` | `/services/` | 301 (forced) | Folded into Concrete Floor Coatings. Surface preparation is covered on `/services/`. |
| `/services/protective-concrete-overlays/` | `/services/` | 301 (forced) | Folded into Concrete Floor Coatings. |
| `/services/decorative-concrete-overlays/` | `/services/` | 301 (forced) | Decorative flake and texture options are covered on `/services/`. |
| `/services/concrete-overlay/` | `/services/` | 301 (forced) | Overlay systems are no longer offered as a separate service. |
| `/concrete-overlay/` | `/services/` | 301 (forced) | Previously went to `/services/concrete-overlay/`, now direct. No chain. |
| `/category/epoxy-flooring/` | `/services/` | 301 (forced) | Old blog category with no posts. Epoxy floor coatings are the consolidated service. |
| `/home/` | `/` | 301 | Kept: old duplicate of the homepage. |

**Removed rules:**

- **`/blog/ → /about-us/blog/`:** the target was an empty archive. `/blog/` now returns 404.
- **`/contact-us → /contact-us/`:** Netlify ignores trailing slashes when matching rules, so this rule matched its own destination. With it in place, `netlify dev` returned **403 for the Contact page**; with it removed, the page returned 200. Netlify's built-in trailing-slash handling covers `/contact-us`.

## 2. Pages kept, retired, or noindexed

| URL | Decision | Reason |
|---|---|---|
| `/`, `/services/`, `/services/commercial-slip-prevention/`, `/about-us/`, `/gallery/`, `/contact-us/`, `/service-areas/` | **Kept, indexable, in sitemap** | Current, relevant content. |
| `/areas-of-service/west-warwick-concrete-overlay/`, `/narragansett-…/`, `/east-greenwich-…/` | **Kept, noindex** | Thin city pages: keep noindex until location-specific content is approved. Their links to retired pages now point to Concrete Floor Coatings. |
| `/policy/privacy-policy/`, `/policy/cookie-policy/`, `/policy/terms-of-service/` | **Kept, noindex** | Approved legal text isn't available yet. Each now has its own accurate description. |
| `/about-us/reviews/` | **Kept, noindex (Melissa to decide)** | Currently a contact stub titled "Contact Melissa" with no reviews, and nothing links to it. Keep it as is until approved review content exists or Melissa chooses to retire it. |
| `/about-us/blog/` | **Retired: 404** | Empty archive with one placeholder post. No relevant replacement. |
| `/welcome-to-our-blog/` | **Retired: 404** | LinkNow "Welcome to our blog" placeholder with no content. |
| `/blog/` | **404** | No blog exists; redirecting would send visitors to an empty archive. |

The retired page files are kept, unchanged, in `backups/seo-retired-pages-2026-11-11/`, outside the publish folder.

**Not recreated** (no replacement or rule; they return 404):

- The 21 LinkNow `?dm=…&action=load` loader variants
- 22 obsolete WordPress CSS, JS and plugin URLs
- Five layout-part URLs (`/header/`, `/footer/`, etc.)
- 75 attachment permalinks and seven `/lnm_gallery/` records from the export, none of them shown to be indexed

Check Search Console's 404 report after launch.

## 3. Legacy images

The exact original files from the LinkNow export are restored, byte for byte, at their original paths under `cct-website/site/wp-content/uploads/sites/1644/`:

| Old URL | Result |
|---|---|
| `/wp-content/uploads/sites/1644/2025/09/slider1.jpg`, `slider2.jpg`, `slider3.jpg` | Restored (200). **Melissa to confirm:** these look like stock or vendor imagery, not documented CCT projects. Confirm the licence allows use after leaving LinkNow; otherwise delete the files and let them 404. |
| `/wp-content/uploads/sites/1644/2025/09/logo.png` | Restored (200): original CCT logo. |
| `/wp-content/uploads/sites/1644/2025/09/fca.png`, `wo.png`, `fo.png` | Restored (200): original Free Consultation, Women Owned and Family Owned badges. |
| `/wp-content/uploads/sites/1644/2025/12/leave-us-a-google-review-button.png` | Restored (200): original review button. |
| `/wp-content/themes/ui16/lnmblog/images/post-placeholder.jpg`, `featured-placeholder.jpg` | **404 by design.** Generic LinkNow theme placeholders with no archived originals and no meaningful equivalent. |

No image is redirected to an unrelated photo or to the homepage.

## 4. Sitemap and robots

`sitemap.xml` lists 7 URLs, all returning 200, indexable, and self-canonical on the production domain:

```
https://concretecoatingtechnology.com/
https://concretecoatingtechnology.com/services/
https://concretecoatingtechnology.com/services/commercial-slip-prevention/
https://concretecoatingtechnology.com/about-us/
https://concretecoatingtechnology.com/gallery/
https://concretecoatingtechnology.com/contact-us/
https://concretecoatingtechnology.com/service-areas/
```

`robots.txt` allows crawling and points to the production sitemap.

Preview protection stays separate. `netlify/preview-noindex.js` runs only for deploy previews and branch deploys. It builds a separate `site-preview` copy that adds `X-Robots-Tag: noindex`, and it refuses to run in the production context. The production `_headers` file contains no `X-Robots-Tag`.

## 5. Items needing Melissa's approval

1. **Contact page hours:** it shows "Monday to Friday 8:00 AM to 5:00 PM" and a Saturday note. Confirm, or remove them.
2. **Services page wording:** "suitable coating or resurfacing options". Confirm "resurfacing" is still accurate.
3. **City pages:** they still describe overlay work (for example "resurfacing tile or linoleum"). They need rewriting and confirmed city coverage before they're indexed.
4. **`/about-us/reviews/`:** add approved review content, or retire it.
5. **Privacy, cookie and terms pages:** approved legal text is needed before indexing.
6. **Slider images:** confirm the licence (see section 3).
7. **Existing items from earlier audits:** recheck the Google 5.0 / 9-review display, and confirm Ronald T.'s testimonial approval before launch.

## 6. Verify after deployment (cannot be confirmed locally)

- **Live redirects:** rerun every row in sections 1 and 3 against the deploy preview, then against production. Locally they were tested with Netlify's own redirect engine (`netlify dev`), not the hosted service.
- **Trailing slashes and canonical host:** confirm how production handles a missing trailing slash (`/contact-us` → `/contact-us/`) and how `www` and HTTP traffic are sent to the canonical `https://concretecoatingtechnology.com/`. Both are set in Netlify's domain settings.
- **Headers:** confirm the security headers on production, and that deploy previews return `X-Robots-Tag: noindex`.
- **Netlify Forms:** confirm the `cct-inquiry` form is detected after deployment.
- **Search Console:** submit the sitemap, then watch the Coverage and 404 reports, especially for old attachment, gallery and query-string URLs.
