'use strict';
const { photoButton } = require('./project-photo.cjs');
const { renderSplitHero } = require('./cct-split-hero.cjs');

const galleryPhotos = [
  { src: '/images/projects/basement-before.webp', full: '/images/projects/full/basement-before.jpg', alt: 'Basement concrete floor before coating', width: 1200, height: 1600, label: 'BASEMENT PROJECT / BEFORE', title: 'Uncoated concrete', categories: ['residential'] },
  { src: '/images/projects/garage-blue-floor.webp', full: '/images/projects/full/garage-blue-floor.jpg', alt: 'Blue-speckled concrete floor inside a garage', width: 495, height: 716, label: 'GARAGE FLOOR', title: 'Blue-speckled finish', categories: ['residential', 'decorative'] },
  { src: '/images/projects/commercial-warehouse-floor.jpg', full: '/images/projects/full/warehouse-floor.jpg', alt: 'Finished concrete floor between warehouse shelving', width: 768, height: 576, label: 'INDUSTRIAL FLOOR', title: 'Warehouse floor finish', categories: ['commercial'] },
  { src: '/images/projects/flagstone-clean.webp', full: '/images/projects/full/flagstone-clean.jpg', alt: 'Flagstone-pattern concrete on a covered patio', width: 800, height: 728, label: 'DECORATIVE CONCRETE', title: 'Flagstone pattern', categories: ['residential', 'decorative'] },
  { src: '/images/projects/wood-look-clean.webp', full: '/images/projects/full/wood-look-clean.jpg', alt: 'Wood-pattern concrete across a covered patio', width: 800, height: 722, label: 'DECORATIVE CONCRETE', title: 'Wood-look patio pattern', categories: ['residential', 'decorative'] },
  { src: '/images/projects/indoor-flake-floor.webp', full: '/images/projects/full/indoor-flake-floor.jpg', alt: 'Gray flake-finished concrete floor below cabinets', width: 514, height: 613, label: 'FINISH DETAIL', title: 'Interior flake finish', categories: ['decorative'] },
  { src: '/images/projects/floor-roller-application.webp', full: '/images/projects/full/floor-roller-application.jpg', alt: 'A roller applies material across a concrete floor', width: 800, height: 600, label: 'APPLICATION DETAIL', title: 'Coating application', categories: [] }
];

function applyGalleryPage(pages, services, cta) {
  const page = pages.find(item => item.path === '/gallery/');
  if (!page) return;
  page.title = 'Project Gallery | Concrete Coating Technology LLC';
  page.description = 'Concrete coating and overlay photos from Concrete Coating Technology LLC.';
  const hero = renderSplitHero('/gallery/', {
    sectionClass: 'page-hero gallery-hero',
    copyClass: 'gallery-hero-copy',
    mediaClass: 'gallery-hero-feature',
    caption: '<span>BASEMENT PROJECT / AFTER</span><strong>Gray flake coating</strong>',
    content: '<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Gallery</span></nav><p class="eyebrow">OUR PROJECT PHOTOS</p><h1>Concrete, with<br><em>more character.</em></h1><p>Explore finished floors, decorative patterns, and application details from our project photos.</p>'
  });
  const figures = galleryPhotos.map(photo => `<figure data-gallery-categories="${photo.categories.join(' ')}">${photoButton({ ...photo, group: 'gallery', caption: photo.title })}<figcaption><span>${photo.label}</span><strong>${photo.title}</strong></figcaption></figure>`).join('');

  page.body = `${hero}<section class="project-gallery section"><div class="section-heading"><div><div class="section-kicker">ONE BASEMENT PROJECT</div><h2>Before, after,<br><em>and finish details.</em></h2></div><p>The basement views show the same job from different camera positions. The other photos show concrete finishes and application work.</p></div><div class="gallery-filters" role="group" aria-label="Browse photos by type"><button type="button" data-gallery-filter="all" aria-pressed="true">All</button><button type="button" data-gallery-filter="residential" aria-pressed="false">Residential</button><button type="button" data-gallery-filter="commercial" aria-pressed="false">Commercial</button><button type="button" data-gallery-filter="decorative" aria-pressed="false">Decorative Finishes</button><span class="gallery-filter-status" role="status" aria-live="polite"></span></div><div class="project-gallery-grid">${figures}</div></section><section class="gallery-service-links-section section section-dark"><div class="section-heading"><div><div class="section-kicker">KEEP EXPLORING</div><h2>Find the right<br><em>service.</em></h2></div><a class="under-link" href="/services/">All Services <span aria-hidden="true">&rarr;</span></a></div><div class="related-links">${services.map(service => `<a href="${service.path}"><span>${service.title}</span><b aria-hidden="true">&rarr;</b></a>`).join('')}</div></section><section class="final-cta"><div class="section-kicker">HAVE A PROJECT IN MIND?</div><h2>Talk through<br><em>your options.</em></h2><p>Book a free 30-minute consultation with Melissa.</p>${cta}</section>`;
}

module.exports = { applyGalleryPage };
