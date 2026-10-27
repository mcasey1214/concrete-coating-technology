# Concrete Coating Technology website

This repository contains the current 20-route static website for Concrete Coating Technology LLC. The complete reviewed output is committed in `cct-website/site/`, including HTML, CSS, JavaScript, fonts, photos, video, sitemap, robots file, and prepared Netlify redirects. Source modules and page-generation scripts are also included for future maintenance.

## Preview a fresh checkout

Install Node.js, then run from the repository root:

```powershell
node cct-website/serve.cjs
```

Open `http://localhost:4173/`. The preview server listens on `0.0.0.0` for local Wi-Fi testing. Stop it with Ctrl+C. No package install or build step is required to reproduce the committed website. Keep the preview server on a trusted network.

## Source and publishing boundary

- **Current website:** `cct-website/site/` is the deployable artifact and source of truth for the current approved pages. Verify all 20 route files before any future publishing step.
- **Maintained source:** `build-prototype.cjs` and its local modules, `cct-extra-pages.json`, and `source-content-archive/homepage-update-assets-2026-10/google_reviews_9.json` are included. The JSON holds the nine review transcriptions already displayed on the site. The builder writes into the site directory; use a separate checkout and review its diff before adopting regenerated output. It is not the production build command for this commit.
- **Future Netlify setup:** use base directory `cct-website`, publish directory `site` (equivalent to `cct-website/site` from the repository root), and **no build command** for the committed static site. `cct-website/netlify.toml` includes preview/branch noindex safeguards. Netlify and the production domain are not configured by this repository setup.
- **Legacy URLs:** `cct-website/site/_redirects` contains proposed 301 rules. See `MIGRATION-INVENTORY.md` for migration decisions that remain open before replacing the LinkNow site.

Raw WordPress exports, crawl data, client source media, local backups, review screenshots, and private client review notes are retained outside Git. The optimized media needed by the website is committed. `CONTENT-PARITY.md`, `CONTENT-REWRITE-MAP.md`, `PHOTO-AUDIT.md`, and `PHOTO-USE-MAP.md` document provenance and content decisions; their referenced raw evidence is stored separately in the local project archive.

## Preview branch and future Netlify connection

`main` holds the approved website. Work on `preview` and review changes there before deliberately merging them into `main`. No Netlify project or production domain is connected yet.

When Melissa is ready to connect her Netlify account, select this private GitHub repository, set `main` as the production branch, set base directory `cct-website`, and confirm publish directory `site` with no production build command. Enable branch deploys for `preview`. The branch-deploy and pull-request contexts run `node netlify/preview-noindex.js site site-preview`; this copies the committed site into an ignored `site-preview/` directory, adds preview-only robots and X-Robots-Tag protection there, and publishes that copy. The command does not regenerate pages or modify `site/`. Netlify/GitHub authorization may need to be granted again under Melissa's account after the repository transfer. Keep the production domain disconnected until launch is separately approved. Noindex prevents search indexing; it does not restrict who can open a preview URL, so use Netlify deploy protection if private viewing is required.
