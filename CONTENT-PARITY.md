# CCT content parity and page inventory

Updated 2026-10-25. This report compares the recovered public CCT pages, Screaming Frog crawl exports, and official LinkNow WordPress export with the existing local CCT site. Original copy and export data remain archived under `source-content-archive/`. See `CONTENT-REWRITE-MAP.md` for the original-to-rewrite mapping and `MELISSA-REVIEW.md` for private factual and publication questions.

## Export and URL inventory

- The supplied WordPress ZIP is preserved byte-for-byte. Its `site.xml` and nested `uploads.zip` were safely inspected as data; no WordPress or PHP code was executed.
- The export contains 125 WordPress records, including 17 pages, one post, three policy records, three city landing pages, seven gallery records, and 75 media attachments. Original image files and contact sheets are archived.
- The crawl exports list 77 unique URLs, including LinkNow loader variants. Twenty canonical CCT routes are generated in the local site. The four existing redirects remain: `/home/` → `/`, `/contact-us` → `/contact-us/`, `/blog/` → `/about-us/blog/`, and `/concrete-overlay/` → `/services/concrete-overlay/`.
- The earlier public text capture returned cache misses for several city and category pages. The official WordPress export later supplied all three city page bodies; the category body and policy text remain unavailable.

## Twenty retained canonical routes

| Route | Content destination and status |
|---|---|
| `/` | Photo-led homepage, service choices, same-project basement story, Melissa introduction, consultation CTA. |
| `/services/` | Four direct linked service rows and customer benefits; deeper terms, applications, and native disclosures remain on the detail pages. |
| `/services/concrete-repair-maintenance/` | Existing concrete, repair, preparation, sealing, and related overlay choices. |
| `/services/protective-concrete-overlays/` | Epoxy, polyurea, polyaspartic, uses, and finish choices. |
| `/services/decorative-concrete-overlays/` | Named patterns, materials, settings, and preparation/finish sequence. |
| `/services/concrete-overlay/` | Preparation, application, and curing explained in plain language. |
| `/about-us/` | First-person Melissa introduction with supplied candid photo. |
| `/gallery/` | Eight curated project and application images; unrelated template imagery excluded. |
| `/contact-us/` | Phone, email, free consultation, and published business hours. |
| `/service-areas/` | Rhode Island location information and city links. |
| `/areas-of-service/west-warwick-concrete-overlay/` | Recovered applications and finishes; asks visitors to confirm availability. |
| `/areas-of-service/narragansett-concrete-overlay/` | Recovered applications and finishes; asks visitors to confirm availability. |
| `/areas-of-service/east-greenwich-concrete-overlay/` | Recovered applications and finishes; asks visitors to confirm availability. |
| `/about-us/reviews/` | Contact-focused page; no unverified testimonial is shown. |
| `/about-us/blog/` | Captured one-post archive. |
| `/welcome-to-our-blog/` | Captured post title/date and a concise path to current service information; substantive article text was not available. |
| `/category/epoxy-flooring/` | Preserved URL linking to protective coating information; source category body unavailable. |
| `/policy/privacy-policy/` | Preserved contact route; original Termageddon legal body unavailable. |
| `/policy/cookie-policy/` | Preserved contact route; original Termageddon legal body unavailable. |
| `/policy/terms-of-service/` | Preserved contact route; original Termageddon legal body unavailable. |

Every route has a canonical URL, title, description, Open Graph metadata, and one page H1. Review/blog/category, city, and policy pages carry `noindex,follow`; these routes are excluded from the local sitemap where appropriate. The legal links are omitted from the public footer until approved text is supplied. These preview safeguards must be reviewed before production migration.

## Content preservation and customer language

All meaningful retrieved service names, applications, patterns, materials, process stages, coating terms, and business details are mapped in `CONTENT-REWRITE-MAP.md`. Original wording remains in the source archive. Customer copy uses native HTML disclosures with static text; no service facts depend on JavaScript to appear in the page.

Unverified historical claims remain archived and private. The exact old $7/sq ft Basic/Premium statement is copied to `MELISSA-REVIEW.md` with its source URL and a direct approval question. The public site retains a free consultation CTA and does not publish that price, Basic/Premium names, unsupported performance guarantees, or testimonials.

No FAQ content was recovered. No FAQ answers, certifications, warranties, product specifications, or new performance claims were invented. The blog, review, category, and legal gaps are documented rather than represented as completed material.

## Images and project story

The official export's Gallery post references 15 images, a mix of concrete work, promotional graphics, and unrelated or third-party assets. Six photos referenced from CCT's own home, gallery, or service pages were selected and converted to optimized WebP copies. Unrelated LinkNow theme/gallery content, watermarked third-party images, promotional composites, and unsupported transformations were excluded. See `PHOTO-AUDIT.md` for file names, source locations, and current page use.

The user confirmed that the supplied basement before photo, finished photo, and grinding footage show the same job. The still images have different camera positions, so the slider compares overall views rather than exact alignment. This limitation is recorded here and in `MELISSA-REVIEW.md`; its visible homepage note was removed in the final presentation pass. The grinding clip appears first in the hero montage. The original video is preserved and the site uses an 8-second later segment. Public-use permissions for the supplied files and attribution for the LinkNow photos remain noted in `MELISSA-REVIEW.md` because the source README asks for confirmation.

## Local review boundary

The site and its local preview were not deployed. DNS and the Website Factory were not changed. The local sitemap and page metadata preserve the existing routes and aliases. Photo permissions, the historical price statement, current business hours/coverage, and missing legal text remain the documented production review items.
