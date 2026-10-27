# CCT photo and media audit

Updated 2026-10-25. The WordPress export was inspected as data; no WordPress or PHP code was executed.

## LinkNow export and selection

- The supplied `client-assets/concretecoatingtechnology.com.zip` is preserved byte-for-byte. `site.xml` and its nested `uploads.zip` are archived under `source-content-archive/linknow-wordpress-export/`.
- The WordPress XML was parsed with DTD processing disabled and its resolver turned off. The nested ZIP was checked for unsafe paths. Only image files were extracted. Original images, hashes, dimensions, and contact sheets remain in the source archive.
- Six selected photos are visibly concrete/coating work and referenced in CCT's exported homepage, gallery, or service-page media. Their optimized WebP copies are in `cct-website/site/images/projects/`; the originals remain in `uploads-originals/`. The four service detail pages now use text-first heroes while attribution and rights are reviewed.

| Website file | Original export file | Evidence and current use |
|---|---|---|
| `home-garage-floor.webp` | `2026/02/home5.jpg` | Exported homepage CSS maps this to `.home-bg5`; gray flake garage floor. Home carousel and Gallery. |
| `flagstone-concrete.webp` | `2025/10/gallery1.jpg` | Gallery post 340; stone pattern. Home carousel and Gallery; removed from the Decorative service hero. |
| `graniflex-garage-floor.webp` | `2025/10/gallery2.jpg` | Gallery post 340; flake-finished floor. Home carousel and Gallery; removed from the Protective service hero. |
| `wood-look-concrete-patio.webp` | `2025/10/gallery5.jpg` | Gallery post 340; wood-look concrete patio. Home carousel and Gallery. |
| `floor-coating-application.webp` | `2025/09/gallery2.jpg` | Gallery post 340; worker smoothing material over concrete. Gallery; removed from the Repair service hero. |
| `concrete-overlay-application.webp` | `2025/09/concrete-overlay1.jpg` | Exported service CSS maps this to the original concrete-overlay page. Gallery; removed from the rebuilt Overlay service hero. |

Captions use visual descriptions. The source's finish names are retained in the archive and private review list, not assumed from the image alone.

## Client-supplied basement photos and video

The source ZIP and original files are preserved under `client-assets/` and `source-content-archive/client-media-2026-10/`. The original bytes have not been edited.

| Original | Website copy | Current placement |
|---|---|---|
| `basement_BEFORE_original.jpg` (1536 Ã— 2048) | `basement-before.webp` | Homepage comparison slider and Gallery. |
| `basement_AFTER_original.jpg` (1536 Ã— 2048) | `basement-after.webp` | Homepage comparison slider and Gallery; not used in the hero sequence. |
| `basement_floor_grinding_original.mp4` (85 seconds) | `basement-surface-preparation.mp4` (8 seconds, 720 x 1280, H.264, no audio, 1.18 MB); `basement-grinding-poster.webp` (720 x 1280, 38 KB) | Homepage hero montage, opening slide. The cut begins at 22 seconds after the unstable opening. The muted, silent clip plays automatically as the first slide; still photos load only as later slides become active. |
| `melissa_candid_original.jpg` (1152 x 1536) | `melissa-candid.webp` | Preserved older About-page copy; no longer used by the current page. |
| `melissa_upscaled_photo.png` (1086 x 1448; 3.18 MB) in `CCT_homepage_update_assets.zip` | `melissa-upscaled.webp` (1086 x 1448; 149 KB) | About page. Optimized WebP retains the full source frame; the page uses its existing natural 4:5 image crop. The source PNG remains unchanged in the source archive. |

Ruth confirmed that the basement before photo, finished photo, and grinding footage show the same project. The still images were taken from different camera positions. The homepage now uses a keyboard, touch, and pointer-operable comparison slider and explicitly tells visitors that the viewpoints differ, so the divider does not imply exact spatial alignment. The grinding clip opens the homepage hero montage, followed by four finished-floor photos.

## Excluded imagery

- LinkNow default gallery sets include bakery, pottery, and unrelated people; these are not CCT concrete work.
- The watermarked third-party image, promotional graphics, staged lifestyle collage, and pre-made before/after composites were excluded.
- Other showroom and architectural photos without project attribution were not used.

## Public reuse review

The client-media README asks for confirmation of public-use permission for the client-supplied basement photos and grinding clip. The official CCT export establishes where the selected LinkNow files were used, but attachment alt text and captions are blank; Melissa should confirm project attribution and reuse rights before publication. The same-project relationship of the basement images and footage is confirmed; rights review remains separate. See `MELISSA-REVIEW.md`.

The supplied upscaled Melissa image and review transcription are preserved in `source-content-archive/homepage-update-assets-2026-10/`. The WebP is used on About. The sign in the portrait states “Registered & Insured”; verify that wording is current before publication.

## Services page placement review — 2026-10-26

The recovered contact sheets, optimized copies, client-media README, Gallery, and original service media references were reviewed for the Services overview. No additional photo was placed on that page: the relevant files have useful subjects, but none has both confirmed public reuse rights and verified CCT project attribution. Existing placements elsewhere on the local site remain subject to the same production review.

| Possible use | Exact local candidate and original | Visible subject and presentation issue | Attribution / rights | Services decision |
|---|---|---|---|---|
| Residential / garage | `cct-website/site/images/projects/home-garage-floor.webp`; original `source-content-archive/linknow-wordpress-export/uploads-originals/2026/02/home5.jpg` | Wide gray flake garage floor; no embedded label; good crop for a horizontal feature. | Official CCT homepage reference verified; project attribution uncertain; reuse rights unconfirmed. | Hold pending Melissa's attribution and rights confirmation. |
| Garage finish detail | `cct-website/site/images/projects/graniflex-garage-floor.webp`; original `source-content-archive/linknow-wordpress-export/uploads-originals/2025/10/gallery2.jpg` | Flake floor at garage threshold; embedded “Graniflex” label and seasonal display; square, less flexible crop. | Gallery reference verified; CCT project attribution and rights unconfirmed. | Do not add; product-name implication and embedded text need review. |
| Basement / finished floor | `cct-website/site/images/projects/basement-after.webp`; client original `source-content-archive/client-media-2026-10/basement_AFTER_original.jpg` | Real finished basement floor; portrait orientation suits a contextual image, not a wide banner; no added overlay. | Same-project relationship confirmed by Ruth; Melissa's public-use permission remains unconfirmed in the supplied README. | Hold pending permission; no new basement photo needed if approved. |
| Patio / outdoor | `cct-website/site/images/projects/flagstone-concrete.webp` and `wood-look-concrete-patio.webp`; originals `source-content-archive/linknow-wordpress-export/uploads-originals/2025/10/gallery1.jpg` and `gallery5.jpg` | Covered patio finishes; both have large embedded finish labels, and neither is a clean wide composition. | Gallery reference verified; project attribution and reuse rights unconfirmed. | Hold; request clean originals only if Melissa cannot approve or supply these without labels. |
| Surface grinding / preparation | `cct-website/site/images/projects/basement-grinding-poster.webp`; client video original `source-content-archive/client-media-2026-10/basement_floor_grinding_original.mp4` | Worker grinding the confirmed basement floor; portrait frame; no added caption. | Same-project relationship confirmed by Ruth; public-use permission remains unconfirmed. | Best Prep & Repair candidate after permission; no replacement needed if approved. |
| Coating application | `cct-website/site/images/projects/floor-coating-application.webp`; original `source-content-archive/linknow-wordpress-export/uploads-originals/2025/09/gallery2.jpg` | Worker smoothing material across a floor; clean horizontal crop, no visible logo or text. | Gallery reference verified; worker/project attribution and reuse rights unconfirmed; may be illustrative source imagery. | Hold; do not present as CCT application work without confirmation. |
| Overlay application | `cct-website/site/images/projects/concrete-overlay-application.webp`; original `source-content-archive/linknow-wordpress-export/uploads-originals/2025/09/concrete-overlay1.jpg` | Close-up of a gloved hand and trowel at a brick-edged surface; portrait crop, weak match for a floor-coating explanation. | Original service-page reference verified; worker/project attribution and rights unconfirmed. | Do not add to the educational topic. |
| Decorative finished concrete | `home-garage-floor.webp`, `flagstone-concrete.webp`, and `wood-look-concrete-patio.webp` above | Garage image has a clean finish view; patio images include embedded labels. | Same unresolved attribution and rights as above. | Hold all new Services placements. |
| Commercial | `source-content-archive/linknow-wordpress-export/uploads-originals/2025/09/about2-bg.jpg`, `gallery6.jpg`, and `services1-bg.jpg` | Warehouse/rack and glossy interior views; project location and CCT involvement cannot be established visually; stock-like presentation. | Files occurred in the export, but CCT project attribution and reuse rights are unknown. | Do not use as CCT commercial work. |

**Priority for Melissa:** (1) Confirm public-use rights for the supplied basement photos and grinding footage; (2) confirm whether `home5.jpg` and the two patio photos are CCT projects and may be reused, supplying clean unlabelled originals if available; (3) provide one permission-cleared CCT commercial project photograph, since no verified commercial project image was found; (4) confirm the application image's origin or supply an actual CCT coating/repair progress photograph. These are approval or replacement requests, not assumptions that more photos are necessary for already represented spaces.

## Services photo placement update — 2026-10-26

Melissa's approval to reuse photography from CCT's existing LinkNow website supersedes the LinkNow reuse hold in the historical review above. The Services page now shows `home-garage-floor.webp` for Residential, `commercial-warehouse-floor.jpg` (from exported `2025/09/gallery6-768x576.jpg`) for Commercial, `floor-coating-application.webp` for Coatings & Overlays, and `flake-finish-room.jpg` (from exported `2025/09/services2-bg-768x417.jpg`) for Finishes & Style. The Prep & Repair topic reuses the `basement-grinding-poster.webp` already present in the local homepage. Images and alt text describe visible subjects without claiming a specific CCT project attribution. Original archive files remain untouched.

## Decorative service finish showcase — 2026-10-26

The decorative detail page shows three finish examples from the original LinkNow export: `flagstone-concrete.webp` (`2025/10/gallery1.jpg`) for flagstone-inspired texture, `wood-look-concrete-patio.webp` (`2025/10/gallery5.jpg`) for wood-look concrete, and `decorative-flake-detail.jpg` (`2025/10/gallery3.jpg`) for a decorative flake finish. The first two also appear in the Gallery because no equally clear alternative for those looks was found; the page crop excludes their original title bands. The flake detail is distinct from the image on the Services overview. Stain and metallic imagery was omitted from the visual showcase because the available candidates did not reliably show those finish results; the documented terms remain in expandable page copy. The copied original for `decorative-flake-detail.jpg` is preserved in the archive.

## Current photo placement update - 2026-10-26

The historical placement tables above record earlier site states. The current page-by-page placements and intentional cross-page reuse are recorded in `PHOTO-USE-MAP.md`. A grouped visual contact sheet is saved at `source-content-archive/linknow-wordpress-export/visual-inventory/cct-strong-candidates-2026-10-26.html` with a PNG copy beside it.

The Gallery now uses a finished basement floor in its hero and separates Residential, Commercial, and Decorative Finishes through photo filters. New Gallery selections include the blue-speckled garage floor (`2025/09/contact1-bg.jpg`), an interior flake finish (`2025/09/gallery12.jpg`), and a distinct roller application (`2025/09/gallery4.jpg`). The warehouse image (`2025/09/gallery6.jpg`) is the Commercial filter's only unambiguous industrial setting. The interior flake image is not assigned to Residential or Commercial because its use is unclear.

Clean site copies `flagstone-clean.webp` and `wood-look-clean.webp` and matching full JPEGs remove the title strips from `2025/10/gallery1.jpg` and `2025/10/gallery5.jpg` for Gallery and Decorative. The source originals remain unchanged. No convincing separate stained or metallic project image was selected; staged examples remain internal only.
