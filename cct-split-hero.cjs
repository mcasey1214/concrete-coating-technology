'use strict';

const { photoButton } = require('./project-photo.cjs');

// Replace a hero photo here, then rebuild that page. Keep alt text descriptive of
// what the image shows; a visible finish does not establish a product or project.
const heroMedia = [
  {
    route: '/services/',
    src: '/images/projects/flagstone-clean.webp',
    full: '/images/projects/full/flagstone-clean.jpg',
    alt: 'Flagstone-pattern concrete across a covered patio',
    width: 800, height: 728,
    variant: 'text-left',
    objectPosition: 'center 58%',
    replacementNeeded: true
  },
  {
    route: '/services/concrete-repair-maintenance/',
    src: '/images/projects/basement-after-hero.webp',
    full: '/images/projects/full/basement-after.jpg',
    alt: 'Finished basement concrete floor with a gray flake coating',
    width: 900, height: 1200,
    variant: 'photo-left',
    objectPosition: 'center 71%',
    replacementNeeded: true
  },
  {
    route: '/services/protective-concrete-overlays/',
    src: '/images/projects/home-garage-floor.webp',
    full: '/images/projects/full/garage-floor.jpg',
    alt: 'Gray flake-finished concrete floor across a garage',
    width: 1440, height: 719,
    srcset: '/images/projects/garage-floor-768.jpg 768w, /images/projects/home-garage-floor.webp 1440w',
    variant: 'text-left',
    objectPosition: 'center 62%',
    replacementNeeded: true
  },
  {
    route: '/services/decorative-concrete-overlays/',
    src: '/images/projects/flake-room-hero.webp',
    full: '/images/projects/full/flake-room.jpg',
    alt: 'Gray decorative flake finish across an interior concrete floor',
    width: 1100, height: 597,
    variant: 'photo-left',
    objectPosition: 'center 65%',
    replacementNeeded: true
  },
  {
    route: '/services/concrete-overlay/',
    src: '/images/projects/wood-look-clean.webp',
    full: '/images/projects/full/wood-look-clean.jpg',
    alt: 'Wood-pattern decorative concrete across a covered patio',
    width: 800, height: 722,
    variant: 'text-left',
    objectPosition: 'center 55%',
    replacementNeeded: true
  },
  {
    route: '/gallery/',
    src: '/images/projects/basement-after-hero.webp',
    full: '/images/projects/full/basement-after.jpg',
    alt: 'Finished basement concrete floor with a gray flake coating',
    width: 900, height: 1200,
    variant: 'photo-left',
    objectPosition: 'center 70%',
    replacementNeeded: false
  }
];

const byRoute = new Map(heroMedia.map(item => [item.route, item]));

function renderSplitHero(route, { content, sectionClass, containerClass = '', copyClass = '', mediaClass = '', caption = '', labelledBy = '' }) {
  const media = byRoute.get(route);
  if (!media) throw new Error(`Missing split-hero media for ${route}`);
  const photo = photoButton({ ...media, group: `hero-${route.replace(/[^a-z0-9]/gi, '-')}`, caption: media.alt, className: 'cct-split-hero__photo', imageClassName: 'cct-split-hero__image', sizes: '(max-width: 880px) 100vw, 50vw', loading: 'eager', fetchPriority: 'high' });
  const aria = labelledBy ? ` aria-labelledby="${labelledBy}"` : '';
  return `<section class="${sectionClass} cct-split-hero cct-split-hero--${media.variant}"${aria}><div class="${containerClass} cct-split-hero__inner"><div class="${copyClass} cct-split-hero__copy">${content}</div><figure class="${mediaClass} cct-split-hero__media" style="--hero-object-position:${media.objectPosition}">${photo}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure></div></section>`;
}

module.exports = { heroMedia, renderSplitHero };
