'use strict';

const attr = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function photoButton({ src, full, alt, width, height, group, caption, className = '', imageClassName = '', sizes = '', srcset = '', loading = 'lazy', fetchPriority = '' }) {
  return `<button type="button" class="project-photo-trigger ${attr(className)}" data-lightbox data-lightbox-group="${attr(group)}" data-lightbox-full="${attr(full)}" data-lightbox-caption="${attr(caption || alt)}" aria-label="Enlarge photo: ${attr(alt)}" aria-haspopup="dialog"><img class="${attr(imageClassName)}" src="${attr(src)}" alt="${attr(alt)}" width="${width}" height="${height}" loading="${attr(loading)}" decoding="async"${fetchPriority ? ` fetchpriority="${attr(fetchPriority)}"` : ''}${sizes ? ` sizes="${attr(sizes)}"` : ''}${srcset ? ` srcset="${attr(srcset)}"` : ''}></button>`;
}

module.exports = { photoButton };
