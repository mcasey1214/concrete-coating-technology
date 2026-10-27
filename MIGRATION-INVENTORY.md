# CCT migration readiness — 2026-10-27

Local verification only. Evidence: the 2026-10-23 Screaming Frog exports in crawl-exports/, migration-inventory.csv, the official LinkNow export and archived pages in source-content-archive/, CONTENT-PARITY.md, CONTENT-REWRITE-MAP.md, relevant PHOTO-AUDIT.md findings, and the current generated site and build-prototype.cjs. The CSV is a historical crawl register; its older proposed-action cells are not final decisions. No live crawl, deployment, DNS change, or Search Console export was used.

## Priority decisions

| Priority | Finding and action |
|---|---|
| **BLOCKER for SEO sign-off** | Ten clean legacy URLs were indexable in the crawl but now serve noindex,follow: three city pages, reviews, blog archive/post, epoxy category, and three policy pages. City pages contain recovered local content but city-level availability needs Melissa's confirmation. The others lack substantive recovered content or approved policy copy. Decide indexing separately for each group before cutover; do not remove noindex globally or redirect these URLs to the homepage. |
| **BLOCKER for complete legacy-URL sign-off** | All ten crawled old image URLs are absent at their old paths in the new site. Eight are WordPress uploads; three original slider JPEGs are preserved in the export. Check indexed/image-linked URLs in Search Console, then restore exact approved files at the same paths or prepare image-specific equivalent mappings. Do not redirect images to the homepage. |
| **IMPORTANT** | The WordPress export lists 75 attachment permalinks and seven /lnm_gallery/ records not established by the supplied crawl as public/indexed pages. Search Console must determine whether particular URLs need an equivalent-image or gallery redirect. Five export-only layout parts (/header/, /header-home/, /footer/, /footer-contact-us/, /css/) should not receive speculative redirects. |
| **IMPORTANT** | Confirm current hours, city-level coverage, offered systems/finishes, and the “Registered & Insured” wording visible in Melissa's photograph. The broad “Serving Rhode Island & Southern Massachusetts” wording is supported by the original site and the owner's later direction; do not expand it to all Massachusetts or Connecticut. Recheck the static Google 5.0 / 9-review display just before publication. |
| **IMPORTANT** | Privacy, cookie, and terms routes are noindex contact stubs because approved legal bodies are unavailable. Decide whether approved policy content is required for the production site; do not invent it. |
| **OPTIONAL** | The old service pages used max-image-preview:large; the local pages omit this optional directive. Review after URL and indexing decisions. |

## Every crawled URL category

The crawl has **77 unique URLs**: 45 HTML responses (24 clean paths and 21 LinkNow ?dm=...&action=load query variants), ten images, and 22 WordPress/theme CSS, JS, or blocked resources. All 24 clean paths are accounted for: **20 retained at the same URL**, **four prepared 301 aliases**.

| Legacy path(s) | Current classification |
|---|---|
| / | Same URL, indexable. |
| /services/ and all four /services/{service}/ detail URLs | Same URLs, indexable: concrete-repair-maintenance, protective-concrete-overlays, decorative-concrete-overlays, concrete-overlay. |
| /about-us/, /gallery/, /contact-us/, /service-areas/ | Same URLs, indexable. |
| /areas-of-service/west-warwick-concrete-overlay/, /areas-of-service/narragansett-concrete-overlay/, /areas-of-service/east-greenwich-concrete-overlay/ | Same URLs, now noindex,follow; indexing decision above. |
| /about-us/reviews/, /about-us/blog/, /welcome-to-our-blog/, /category/epoxy-flooring/ | Same URLs, now noindex,follow because source content is limited. |
| /policy/privacy-policy/, /policy/cookie-policy/, /policy/terms-of-service/ | Same URLs, now noindex,follow pending approved legal content. |
| /home/ | Prepared 301 to /; old non-indexable home duplicate. |
| /contact-us | Prepared 301 to /contact-us/. |
| /blog/ | Prepared 301 to /about-us/blog/, matching the old redirect; target is currently noindex. |
| /concrete-overlay/ | Prepared 301 to /services/concrete-overlay/, matching the old redirect. |

The four rules are in cct-website/site/_redirects; they are **prepared locally, not live**. The development server does not implement Netlify rules, so aliases return 404 locally. Test response codes and targets on the chosen production host before migration. An unknown path correctly returns HTTP 404 in the local preview.

The 21 LinkNow action=load query URLs are loader responses, not distinct content pages; they are intentionally not recreated. Check Search Console before deciding if indexed variants need query handling. The 22 obsolete WordPress CSS/JS/plugin URLs have no equivalent content and should normally retire as 404s; do not redirect them to the homepage.

**Ten crawled image URLs requiring a decision:** /wp-content/uploads/sites/1644/2025/09/slider1.jpg, slider2.jpg, slider3.jpg, fca.png, logo.png, wo.png, fo.png; /wp-content/uploads/sites/1644/2025/12/leave-us-a-google-review-button.png; and the two LinkNow blog placeholders under /wp-content/themes/ui16/lnmblog/images/. None currently has a same-path file or redirect. The three slider originals are preserved under source-content-archive/linknow-wordpress-export/uploads-originals/2025/09/. The 75 attachment URLs are listed in source-content-archive/linknow-wordpress-export/content-inventory.csv; this crawl does not prove they were indexed or had backlinks. The seven gallery records also appear in that inventory.

## Content and business accuracy

**Verified preserved in current HTML and source material:** the four service names and routes; repair, grinding, sealing, resurfacing, and preparation; epoxy, polyurea, polyaspartic, overlays, and curing; residential/commercial applications; decorative flake/quartz, wood/stone/brick/slate patterns, stains, water-based color, and metallic epoxy. Deeper details remain in HTML disclosures, so they are not dependent on JavaScript. Home, About, Contact, and footer use Concrete Coating Technology LLC, West Warwick, (401) 677-1000, melissa@concretecoatingtechnology.com, and Rhode Island & Southern Massachusetts. The contact and booking destinations match archived information.

**Missing or intentionally excluded:** the old epoxy category body, substantive blog article, and Termageddon legal text were unavailable. Historical Basic/Premium naming and $7/sq ft, 1–2-day curing, chemical/slip/safety/lifespan guarantees, ROI, exact equipment/product specifications, and unsupported qualifications remain archived rather than published. Melissa's current service, hours, and photo-text questions are in MELISSA-REVIEW.md. Some photo-permission notes there predate her later approval to reuse photos from her LinkNow site; PHOTO-AUDIT.md and PHOTO-USE-MAP.md carry newer media findings.

**Search-intent tradeoff:** old home and Services titles emphasized West Warwick, Narragansett, East Greenwich, epoxy flooring, crack repair, and decorative flooring. New titles are shorter and broader. The detail and city URLs retain the topics, but the three city URLs are noindex. Check Search Console queries and landing-page traffic before altering titles or city indexing; ranking transfer cannot be assumed.

## SEO, links, and remaining evidence

- All 20 generated routes have one H1, a nonempty title/description, a self-referencing canonical on https://concretecoatingtechnology.com/, and parseable HomeAndConstructionBusiness JSON-LD with the documented name, phone, email, West Warwick locality, and service area. Nineteen non-home routes show breadcrumbs. Original structured-data parity cannot be proved from the supplied crawl/export.
- Ten intended indexable routes are in sitemap.xml and have no noindex. The ten noindex,follow routes are excluded. robots.txt allows crawling and names the production-domain sitemap. No global staging noindex or X-Robots-Tag rule was found locally; recheck hosting headers at launch.
- Static checks found **zero broken local links, zero broken fragment targets, and zero missing local image files** referenced by img elements. All 65 empty alt values are decorative review diamonds (45) or linked Sweet Creatives logos (20) with accessible link names; other img elements have alt text. This does not validate every photo's attribution.
- Rendered business destinations match the archived or owner-confirmed records: tel:+14016771000, mailto:melissa@concretecoatingtechnology.com, https://calendly.com/scheduleconcretecoating/30min, the archived Instagram/Facebook profiles, https://g.page/r/CWYZGJrN6Q6wEAE/review, and the Google Maps profile recorded in MELISSA-REVIEW.md. All 20 credits link to **https://sweet-creatives.com/**; no incorrect sweetcreatives.com text remains. No other rendered external destination lacked a project source in this focused check.

**Access required:** Google Search Console indexed pages/images, external links, top queries, and landing-page performance; Analytics landing-page data is also useful. Screaming Frog inlink counts are **internal links, not external backlinks**; its external-3xx export records outgoing links. Without owner-account data, the relative priority of attachment, gallery, loader, and media URLs remains unresolved. After Melissa resolves the content/indexing questions, prepare only URL-to-equivalent 301s or same-path assets, then check redirects, canonicals, sitemap, and staging headers on the production host before DNS migration. **No website files, redirect rules, indexing settings, or page copy were changed in this pass.**
