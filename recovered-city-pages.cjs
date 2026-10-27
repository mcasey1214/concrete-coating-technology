'use strict';

function applyRecoveredCityPages(pages, services, cta) {
  const routes = [
    {
      path: '/areas-of-service/west-warwick-concrete-overlay/',
      city: 'West Warwick',
      title: 'Concrete Overlay in West Warwick | Concrete Coating Technology LLC',
      description: 'Concrete overlay applications and service details from Concrete Coating Technology LLC in West Warwick, Rhode Island.',
      intro: 'If you have an overlay project in West Warwick, talk with us about the surface and finish you have in mind.',
      heading: 'A new layer over<br><em>existing concrete.</em>',
      content: `<p>A concrete overlay adds a finishing layer over an existing surface. Options described for this service include changing texture, color, or pattern and resurfacing tile or linoleum.</p><p>Possible applications include sidewalks, walkways, driveways, patios, commercial floors, and exterior pavement.</p><p>Preparation depends on the surface and the work planned. Contact us to discuss your project.</p>`
    },
    {
      path: '/areas-of-service/narragansett-concrete-overlay/',
      city: 'Narragansett',
      title: 'Concrete Overlay in Narragansett | Concrete Coating Technology LLC',
      description: 'Concrete overlay applications and service details from Concrete Coating Technology LLC for Narragansett projects.',
      intro: 'Considering an overlay for a Narragansett project? Contact us to discuss the surface and current availability.',
      heading: 'Interior and<br><em>exterior surfaces.</em>',
      content: `<p>Overlay applications listed for homes and businesses include:</p><ul class="city-application-list"><li>Driveways, patios, and walkways</li><li>Pool decks and exterior surfaces</li><li>Basements</li><li>Countertops, walls, and fireplaces</li><li>Showrooms, entries, and storefronts</li></ul><p>We can talk through color and pattern choices for an existing surface.</p>`
    },
    {
      path: '/areas-of-service/east-greenwich-concrete-overlay/',
      city: 'East Greenwich',
      title: 'Concrete Overlay in East Greenwich | Concrete Coating Technology LLC',
      description: 'Concrete overlay applications and finish details from Concrete Coating Technology LLC for East Greenwich projects.',
      intro: 'For an East Greenwich overlay project, talk with us about the surface, setting, and finish you have in mind.',
      heading: 'Prepare the surface.<br><em>Choose a pattern.</em>',
      content: `<p>Preparing concrete can include cleaning, repair, and applying an overlay. The work depends on the existing surface.</p><p>Finish choices include patterns inspired by stone, wood, and brick, with color, texture, and pattern options for residential and commercial spaces.</p>`
    }
  ];

  for (const record of routes) {
    const page = pages.find(item => item.path === record.path);
    if (!page) continue;
    page.title = record.title;
    page.description = record.description;
    page.body = `<section class="page-hero city-service-hero"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/service-areas/">Service Areas</a><span aria-hidden="true">/</span><span aria-current="page">${record.city}</span></nav><p class="eyebrow">CONCRETE OVERLAY &middot; ${record.city.toUpperCase()}</p><h1>${record.city === 'West Warwick' ? 'Concrete overlays<br><em>in West Warwick.</em>' : record.city === 'Narragansett' ? 'Concrete overlays<br><em>in Narragansett.</em>' : 'Concrete overlays<br><em>in East Greenwich.</em>'}</h1><p>${record.intro}</p><div class="hero-actions">${cta}<a class="under-link" href="/services/">All Services <span aria-hidden="true">&rarr;</span></a></div></section><section class="city-service-content section"><div><div class="section-kicker">${record.city.toUpperCase()}</div><h2>${record.heading}</h2></div><div>${record.content}</div></section><section class="related section section-dark"><div class="section-heading"><div><div class="section-kicker">RELATED SERVICES</div><h2>Keep <em>exploring.</em></h2></div><a class="under-link" href="/services/">All Services <span aria-hidden="true">&rarr;</span></a></div><div class="related-links">${services.map(service => `<a href="${service.path}"><span>${service.title}</span><b aria-hidden="true">&rarr;</b></a>`).join('')}</div></section><section class="final-cta"><div class="section-kicker">START WITH A CONVERSATION</div><h2>Talk about your<br><em>concrete project.</em></h2>${cta}<a class="cta-phone" href="tel:+14016771000">Call or text (401) 677-1000</a></section>`;
  }
}

module.exports = { applyRecoveredCityPages };
