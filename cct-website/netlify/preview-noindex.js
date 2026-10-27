#!/usr/bin/env node

/**
 * Preview indexing safeguard (copied into each client project by the Website Factory).
 *
 * netlify.toml runs this ONLY for deploy previews and branch deploys:
 *   [context.deploy-preview]  command = "node netlify/preview-noindex.js site"
 *   [context.branch-deploy]   command = "node netlify/preview-noindex.js site"
 * Production deploys never run it, so the production robots.txt and sitemap are untouched.
 *
 * It makes the preview un-indexable two ways:
 *   - robots.txt disallows all crawling
 *   - every response gets "X-Robots-Tag: noindex" (via the site's _headers file)
 * No dependencies, no network access.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// Fail closed before reading or writing publish output. Never infer context from URLs.
if (!['deploy-preview', 'branch-deploy'].includes(process.env.CONTEXT)) {
  console.error('preview-noindex: refusing to modify output outside deploy-preview or branch-deploy');
  process.exit(1);
}

const site = path.resolve(process.argv[2] || 'site');
if (!fs.existsSync(path.join(site, 'index.html'))) {
  console.error(`preview-noindex: ${site} has no index.html; refusing to run`);
  process.exit(1);
}

fs.writeFileSync(path.join(site, 'robots.txt'), '# Preview deploy: not for search engines\nUser-agent: *\nDisallow: /\n');

const headersFile = path.join(site, '_headers');
const existing = fs.existsSync(headersFile) ? fs.readFileSync(headersFile, 'utf8') : '';
// A utility-page-only noindex rule must not suppress the preview-wide rule.
if (!('\n' + existing.replace(/\r\n/g, '\n')).includes('\n/*\n  X-Robots-Tag: noindex\n')) {
  const separator = existing && !existing.endsWith('\n') ? '\n' : '';
  fs.writeFileSync(headersFile, `${existing}${separator}/*\n  X-Robots-Tag: noindex\n`);
}

console.log('preview-noindex: indexing disabled for this preview (robots.txt Disallow: /, X-Robots-Tag: noindex)');
