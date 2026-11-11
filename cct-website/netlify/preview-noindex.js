#!/usr/bin/env node

/** Build an isolated noindex copy for Netlify branch and pull-request previews. */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

if (!['deploy-preview', 'branch-deploy'].includes(process.env.CONTEXT)) {
  console.error('preview-noindex: refusing to run outside a preview context');
  process.exit(1);
}

const source = path.resolve(process.argv[2] || '');
const output = path.resolve(process.argv[3] || '');
if (!process.argv[2] || !process.argv[3] || path.basename(source) !== 'site' ||
    path.basename(output) !== 'site-preview' || path.dirname(source) !== path.dirname(output)) {
  console.error('preview-noindex: expected sibling site and site-preview directories');
  process.exit(1);
}
if (!fs.existsSync(path.join(source, 'index.html')) || fs.existsSync(output)) {
  console.error('preview-noindex: source is missing or preview output already exists');
  process.exit(1);
}

const sourceHeaders = fs.readFileSync(path.join(source, '_headers'), 'utf8').replace(/\r\n/g, '\n');
const sourceRobots = fs.readFileSync(path.join(source, 'robots.txt'), 'utf8');
if (!sourceHeaders.startsWith('/*\n') || /^\s*X-Robots-Tag:/im.test(sourceHeaders) ||
    /^\s*Disallow:\s*\//im.test(sourceRobots)) {
  console.error('preview-noindex: production source headers or robots are unexpected');
  process.exit(1);
}

fs.cpSync(source, output, { recursive: true });
fs.writeFileSync(path.join(output, 'robots.txt'), '# Preview deploy: crawlers must be able to read the noindex response header.\nUser-agent: *\nAllow: /\n');
fs.writeFileSync(path.join(output, '_headers'), sourceHeaders.replace('/*\n', '/*\n  X-Robots-Tag: noindex\n'));

console.log('preview-noindex: isolated site-preview output created with noindex protection');
