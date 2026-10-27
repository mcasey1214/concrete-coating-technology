'use strict';

const { photoButton } = require('./project-photo.cjs');

// These describe what is visible, not which coating system produced a finish.
// Swap an image here when Melissa supplies a stronger photo for that section.
const supportingPhotos = {
  '/services/concrete-repair-maintenance/': {
    intro: {
      src: '/images/projects/basement-before.webp', full: '/images/projects/full/basement-before.jpg',
      alt: 'Uncoated concrete across an unfinished basement floor', caption: 'The existing surface',
      width: 1200, height: 1600, position: 'center 70%'
    },
    options: {
      src: '/images/projects/basement-grinding-poster.webp', full: '/images/projects/basement-grinding-poster.webp',
      alt: 'A worker grinding an existing basement concrete floor', caption: 'Surface preparation',
      width: 720, height: 1280, position: 'center 66%'
    }
  },
  '/services/protective-concrete-overlays/': {
    intro: {
      src: '/images/projects/garage-blue-floor.webp', full: '/images/projects/full/garage-blue-floor.jpg',
      alt: 'Blue-speckled finished concrete floor inside a garage', caption: 'Garage floor finish',
      width: 495, height: 716, position: 'center 72%'
    },
    options: {
      src: '/images/projects/commercial-warehouse-floor.jpg', full: '/images/projects/full/warehouse-floor.jpg',
      alt: 'Finished concrete floor between warehouse shelving', caption: 'Commercial floor finish',
      width: 768, height: 576, position: 'center 67%'
    },
    planning: {
      src: '/images/projects/floor-roller-application.webp', full: '/images/projects/full/floor-roller-application.jpg',
      alt: 'Roller beside newly applied material on a concrete floor', caption: 'Application detail',
      width: 800, height: 600, position: 'center 62%'
    }
  },
  '/services/concrete-overlay/': {
    intro: {
      src: '/images/projects/flagstone-clean.webp', full: '/images/projects/full/flagstone-clean.jpg',
      alt: 'Flagstone-pattern finish across a covered concrete patio', caption: 'A patterned finish',
      width: 800, height: 728, position: 'center 62%'
    },
    options: {
      src: '/images/projects/concrete-overlay-application.webp', full: '/images/projects/full/overlay-application.jpg',
      alt: 'A gloved worker smoothing material across a concrete edge', caption: 'Application detail',
      width: 495, height: 716, position: 'center 56%'
    }
  }
};

const overviewPhoto = {
  src: '/images/projects/garage-blue-floor.webp', full: '/images/projects/full/garage-blue-floor.jpg',
  alt: 'Blue-speckled concrete finish across a garage floor', caption: 'A finished garage floor',
  width: 495, height: 716, position: 'center 68%'
};

function renderPhoto(photo, group, slot) {
  if (!photo) return '';
  const button = photoButton({ ...photo, group, caption: photo.caption,
    className: 'service-page-supporting-trigger', imageClassName: 'service-page-supporting-image',
    sizes: '(max-width: 700px) calc(100vw - 44px), (max-width: 1200px) 42vw, 540px' });
  return `<figure class="service-page-supporting-photo service-page-supporting-photo--${slot}" style="--supporting-object-position:${photo.position}">${button}<figcaption>${photo.caption}</figcaption></figure>`;
}

function renderServiceVisual(route, slot) {
  const photos = supportingPhotos[route];
  if (!photos) throw new Error(`Missing supporting photos for ${route}`);
  return renderPhoto(photos[slot], `service-${route.replace(/[^a-z0-9]/gi, '-')}`, slot);
}

function renderOverviewVisual() {
  return renderPhoto(overviewPhoto, 'services-benefits', 'benefits');
}

module.exports = { supportingPhotos, overviewPhoto, renderServiceVisual, renderOverviewVisual };
