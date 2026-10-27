'use strict';

// Rebuild only the six page bodies that use the shared split hero. The regular
// site generator uses the same sources, but this keeps unrelated routes intact.
const fs = require('node:fs');
const path = require('node:path');
const content = require('./prototype-content-update.cjs');
const { applyGalleryPage } = require('./cct-gallery-page.cjs');

const site = path.join(__dirname, 'cct-website', 'site');
const services = [
  { title: 'Concrete Repair & Maintenance', path: '/services/concrete-repair-maintenance/' },
  { title: 'Protective Concrete Overlays', path: '/services/protective-concrete-overlays/' },
  { title: 'Decorative Concrete Overlays', path: '/services/decorative-concrete-overlays/' },
  { title: 'Concrete Overlay', path: '/services/concrete-overlay/' }
];
const pages = [
  { path: '/services/', body: content.renderServices(services) },
  ...services.map(service => ({ path: service.path, body: content.serviceBody(service, services) })),
  { path: '/gallery/' }
];
applyGalleryPage(pages, services, content.cta);

for (const page of pages) {
  const file = path.join(site, page.path.slice(1), 'index.html');
  const previous = fs.readFileSync(file, 'utf8');
  const main = /<main id="main">[\s\S]*?<\/main>/;
  if (!main.test(previous)) throw new Error(`Missing main element: ${file}`);
  const next = previous.replace(main, `<main id="main">${page.body}</main>`);
  if (next !== previous) fs.writeFileSync(file, next);
  console.log(page.path);
}
