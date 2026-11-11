# CCT project photo use map

Updated 2026-10-27. This map records visible project photography in the current local site. Paths below are relative to `cct-website/site/images/projects/`. The recovered originals remain in `source-content-archive/`.

| Page | Visible images and purpose |
|---|---|
| Home | Grinding video poster; gray flake garage (`home-garage-floor.webp`); garage threshold (`graniflex-garage-floor.webp`); flagstone patio (`flagstone-concrete.webp`); wood-look patio (`wood-look-concrete-patio.webp`); basement before/after comparison. |
| Services | Clean flagstone patio in hero; blue-speckled garage floor beside customer benefits; gray flake garage for Residential; warehouse shelving and floor for Commercial; basement grinding for Prep & Repair; coating application for Coatings & Overlays; finished flake room for Finishes & Style. |
| Gallery | Finished basement in hero; unfinished basement, blue-speckled garage floor, warehouse floor, flagstone patio, wood-look patio, interior flake finish, and roller application in the filtered gallery. |
| Concrete Repair & Maintenance | Finished basement in hero; the same basement before finishing beside the explanation; grinding photograph beside repair and preparation options. The finished hero is the same source image as the Gallery hero, intentionally reused until another relevant repair photo is available. |
| Protective Concrete Overlays | Gray flake garage floor in hero; blue-speckled garage floor beside the explanation; warehouse floor beside coating options; roller application detail beside planning questions. None is labeled as a verified example of a specific epoxy, polyurea, or polyaspartic product. |
| Decorative Concrete Overlays | Finished flake room in hero; clean flagstone patio, clean wood-look patio, and flake finish detail in the visual showcase. |
| Concrete Overlay | Clean wood-look patio in hero; flagstone-pattern patio beside the explanation; material application detail beside the process options. |

## Intentional reuse and replacements

- Every updated page uses distinct source photos within that page. The basement Gallery hero and its before photo show different stages of the same project. The Repair page and Gallery temporarily share the finished-basement source image across pages.
- The gray garage floor remains on Home, Services, and the Protective hero because it is the strongest wide, clearly residential garage image. The warehouse photo remains on Services and Gallery because it is the only strong image that clearly shows an industrial setting. The finished basement remains in the Home comparison, Repair hero, and Gallery hero because the paired client photos have confirmed same-project context.
- Flagstone and wood-look patio photos remain on Home, Gallery, and Decorative because the archive has no equally clear, relevant alternative for those two finish types. Gallery and Decorative now use clean cropped copies of the same originals; this is documented reuse, not an attempt to present them as separate projects. Original labeled files were preserved.
- Gallery no longer repeats the Home gray garage floor, garage threshold, Services coating application, or concrete-overlay application. It now uses the blue-speckled garage floor, a finished interior flake floor, and a separate roller application photo. The basement after photo moved from the grid to the Gallery hero.
- The Gallery's blue-speckled garage assignment is based on the visible doorway, garage-style threshold, and floor context. No client, location, or project performance is claimed. The interior flake floor has no Residential or Commercial filter assignment because its use is not clear from the photo.
- The recovered ZIP contains many responsive variants, generic theme images, logos, and promotional graphics; file count does not equal the number of distinct suitable project photos. See the grouped [contact sheet](source-content-archive/linknow-wordpress-export/visual-inventory/cct-strong-candidates-2026-10-26.html) and its PNG copy.

## Remaining image gaps

- One clearly documented CCT commercial project beyond the warehouse image would strengthen the Commercial filter and reduce cross-page reuse.
- No convincing distinct stained or metallic CCT project photo is available. The staged examples in the archive are excluded from the public gallery.
- The current collection does not identify which pictured floor uses epoxy, polyurea, or polyaspartic. The protective service photos illustrate finished floors and application context without assigning them a product system.
- More unlabelled stone and wood-look project photos would reduce intentional reuse across Home, Gallery, and Decorative.

## Replacing one of the six split hero photos

Keep the original in the source archive. Add an optimized display copy under `cct-website/site/images/projects/` and a high-quality viewing copy under `cct-website/site/images/projects/full/`. Update the route's `src`, `full`, `alt`, dimensions, optional `srcset`, and crop position in [`cct-split-hero.cjs`](cct-split-hero.cjs). Set `replacementNeeded` to `false` after the new assignment is confirmed. Run `node rebuild-hero-pages.cjs` from the project root to update only the six affected page bodies, then check the resulting image crop at mobile and desktop widths. The regular site generator also imports this same hero configuration.

## Photo update — 2026-11-08

The two supplied photo sets are preserved unchanged as review-copy files under `source-media/received-review-copies/`; their supplied README files say these are resized copies, not original full-resolution photos, and that source names are not permission to publish client identities. Responsive WebP derivatives live in `cct-website/site/images/projects/client-work/`.

- Home hero keeps the existing surface-preparation video, then uses the finished garage, finished patio, and large interior floor photos. The basement comparison remains the existing confirmed same-project pair.
- Gallery now contains finished basement stages, two finished garage views, a finished patio, a separate decorative patio, and a large interior flake floor. Captions stay generic and do not claim client names or mix before/after candidates.
- Services overview and protective/decorative/overlay pages use relevant supplied garage, patio, and interior photos. The commercial kitchen and garage application photos are labeled as in progress; neither appears as a completed gallery project.
- Excluded from use: the unverified garage-before and kitchen-before candidates, patio images showing a pool/hot tub, and source-labeled client-named images where photo identity or public naming permission is not established. The cluttered garage candidate was not selected.
- Remaining legacy image needing a better verified replacement: `concrete-overlay-application.webp` on `/services/concrete-overlay/` is an archive application illustration whose worker/project attribution is unverified. No suitable matching client overlay-application photo was supplied. No verified finished commercial-floor photo was supplied; the kitchen photo is explicitly in progress.
- The other 13 routes do not display project stock photography. They use site branding, page text, and (on About) Melissa's existing portrait.
