'use strict';

const fs = require('node:fs');
const path = require('node:path');

const legacyMenu = '<div class="nav-drop"><button class="nav-drop-toggle" aria-expanded="false" aria-controls="service-menu" aria-haspopup="true">Services <span aria-hidden="true">&darr;</span></button><div class="nav-drop-menu" id="service-menu" aria-label="Concrete coating services"><a href="/services/concrete-repair-maintenance/">Concrete Repair & Maintenance</a><a href="/services/protective-concrete-overlays/">Protective Concrete Overlays</a><a href="/services/decorative-concrete-overlays/">Decorative Concrete Overlays</a><a href="/services/concrete-overlay/">Concrete Overlay</a><a class="nav-all" href="/services/">All services <span aria-hidden="true">&rarr;</span></a></div></div>';

const previousMenu = '<div class="nav-drop"><a class="nav-service-link" href="/services/">Services</a><button type="button" class="nav-drop-toggle" aria-label="Services submenu" aria-expanded="false" aria-controls="service-menu" aria-haspopup="true"><span aria-hidden="true">&darr;</span></button><div class="nav-drop-menu" id="service-menu" aria-label="Concrete coating services"><a class="nav-all" href="/services/">Explore All Services</a><a href="/services/#residential">Residential Concrete Coatings</a><a href="/services/#commercial">Commercial Concrete Coatings</a><a href="/services/#finishes-coating-options">Finishes &amp; Coating Options</a></div></div>';

const priorServicesMenu = '<div class="nav-drop"><button type="button" class="nav-drop-toggle" aria-expanded="false" aria-controls="service-menu" aria-haspopup="true">Services <span aria-hidden="true">&darr;</span></button><div class="nav-drop-menu" id="service-menu" aria-label="Concrete coating services"><a class="nav-all" href="/services/">Explore All Services</a><a href="/services/#residential">Residential Concrete Coatings</a><a href="/services/#commercial">Commercial Concrete Coatings</a><a href="/services/#finishes-coating-options">Finishes &amp; Coating Options</a></div></div>';
const servicesMenu = priorServicesMenu.replace('href="/services/#finishes-coating-options">Finishes &amp; Coating Options', 'href="/services/#lets-break-it-down">Let&#39;s Break It Down');

function syncServicesMenu(root = path.join(__dirname, 'cct-website', 'site')) {
  const pages = [];
  function collect(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) collect(fullPath);
      else if (entry.name === 'index.html') pages.push(fullPath);
    }
  }
  collect(root);
  if (pages.length !== 20) throw new Error(`Expected 20 CCT routes; found ${pages.length}`);

  const changes = pages.map(file => {
    const original = fs.readFileSync(file, 'utf8');
    const matches = original.match(/<div class="nav-drop">[\s\S]*?<\/div><\/div>/g) || [];
    if (matches.length !== 1 || ![legacyMenu, previousMenu, priorServicesMenu, servicesMenu].includes(matches[0])) {
      throw new Error(`Unexpected Services menu in ${file}`);
    }
    return { file, original, updated: original.replace(matches[0], servicesMenu) };
  });
  for (const change of changes) {
    if (change.updated !== change.original) fs.writeFileSync(change.file, change.updated);
  }
  return changes.filter(change => change.updated !== change.original).length;
}

if (require.main === module) console.log(`Updated Services navigation on ${syncServicesMenu()} routes.`);

module.exports = { servicesMenu, syncServicesMenu };
