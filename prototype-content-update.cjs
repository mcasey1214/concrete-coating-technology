'use strict';
const { photoButton } = require('./project-photo.cjs');
const { renderSplitHero } = require('./cct-split-hero.cjs');
const { renderServiceVisual, renderOverviewVisual } = require('./cct-service-visuals.cjs');

const phone = '+14016771000';
const email = 'melissa@concretecoatingtechnology.com';
const calendly = 'https://calendly.com/scheduleconcretecoating/30min';
const cta = `<a class="button button-gold" href="${calendly}" target="_blank" rel="noopener noreferrer">Book a free consultation <span aria-hidden="true">&rarr;</span></a>`;

const customerContent = {
  '/services/concrete-repair-maintenance/': {
    h1: 'Repair and care for existing concrete',
    intro: 'We work with existing concrete through grinding, repair, sealing, and resurfacing.',
    applications: 'For concrete that needs attention before a new finish, start with a conversation about the surface and how you use it.',
    photo: { src: '/images/projects/floor-coating-application.webp', alt: 'A worker applies material across a concrete floor.', width: 800, height: 600 },
    details: [
      { heading: 'Repair and maintenance', text: 'Our repair and maintenance services include grinding, repairing, and sealing existing concrete. The work to consider depends on the condition and use of the surface.' },
      { heading: 'Surface preparation', text: 'Preparation gets existing concrete ready for the next step. It can include grinding and addressing surface imperfections before a coating or overlay is applied.' },
      { heading: 'When an overlay may fit', text: 'An overlay adds a new finishing layer over existing concrete. If you are considering a different texture, pattern, or color, explore our <a href="/services/concrete-overlay/">concrete overlay</a> and <a href="/services/decorative-concrete-overlays/">decorative overlay</a> services.' }
    ]
  },
  '/services/protective-concrete-overlays/': {
    h1: 'Protective coating options for concrete',
    intro: 'We offer epoxy, polyurea, and polyaspartic coating options for residential and commercial concrete.',
    applications: 'We have coating options for commercial floors, patios, walkways, pool decks, warehouses, and healthcare settings, as well as other indoor and outdoor spaces.',
    photo: { src: '/images/projects/graniflex-garage-floor.webp', alt: 'A flake-finished concrete floor at a garage threshold.', width: 800, height: 800 },
    details: [
      { heading: 'Epoxy', text: 'Epoxy floor coating is made by combining epoxy resin with a hardener. The mixture forms a layer on the concrete. Color, tone, and finish effects can vary.' },
      { heading: 'Polyurea', text: 'Polyurea forms when two ingredients mix and react to make the coating. One is an isocyanate; the other is an amine-based resin. Formulas vary by product.' },
      { heading: 'Polyaspartic', text: 'Polyaspartic is a type of polyurea coating used on concrete floors. Ask us which coating options suit the surface and project.' },
      { heading: 'Places to consider a coating', text: 'We can discuss coatings for commercial and industrial floors, patios, walkways, pool decks, warehouses, and healthcare settings. For an outdoor project, ask which coating or <a href="/services/decorative-concrete-overlays/">decorative finish</a>, if any, suits the surface.' }
    ]
  },
  '/services/decorative-concrete-overlays/': {
    h1: 'Decorative finishes for existing concrete',
    intro: 'We create decorative concrete looks inspired by wood, stone, brick, slate, flakes, and metallic effects.',
    applications: 'Decorative finishes are listed for driveways, patios, garages, basements, pool decks, walkways, lunchrooms, salons, and car dealerships.',
    photo: { src: '/images/projects/flagstone-concrete.webp', alt: 'Flagstone-pattern concrete on a covered patio.', width: 800, height: 800 },
    details: [
      { heading: 'Patterns and texture', text: 'A stamped or textured cement-based overlay can create wood-, stone-, brick-, or slate-inspired patterns. Listed wood tones include walnut, oak, driftwood, and gray barnwood. Other pattern choices include flagstone, Ashlar slate, herringbone brick, random stone, and European fan.' },
      { heading: 'Color and coating options', text: 'Epoxy flake and quartz finishes use a different approach from stamping an overlay. CCT also lists acid stains, water-based colors, and metallic epoxy for indoor floors among its decorative options. The existing concrete and selected method affect the appearance.' },
      { heading: 'Preparation and application', text: 'A stamped or textured overlay may involve repairing and diamond-grinding existing concrete, adding a cement-based layer, then pattern, color, and sealer. Stains and decorative coatings follow different steps. For surface questions, explore <a href="/services/concrete-repair-maintenance/">Concrete Repair &amp; Maintenance</a>.' },
      { heading: 'Where a decorative finish may fit', text: 'CCT lists residential and commercial spaces including driveways, patios, garages, basements, pool decks, walkways, lunchrooms, salons, and car dealerships. The concrete condition, indoor or outdoor setting, and how the space is used help determine which finish to discuss.' }
    ]
  },
  '/services/concrete-overlay/': {
    h1: 'A new finish over existing concrete',
    intro: 'A concrete overlay adds a new surface layer over existing concrete. We describe the work in three stages: preparation, application, and curing.',
    applications: 'An overlay can change the look and texture of an existing concrete surface. Ask us about the options for your floor and the condition it is in.',
    photo: { src: '/images/projects/concrete-overlay-application.webp', alt: 'A gloved worker applies material along a concrete edge.', width: 495, height: 716 },
    details: [
      { heading: '1. Prepare the concrete', text: 'The surface is cleaned and old coatings may be removed. Preparation can also include repairing imperfections and diamond grinding. Diamond grinding uses a machine with rotating abrasive segments to prepare the concrete for another layer.' },
      { heading: '2. Apply the selected material', text: 'After preparation, the selected overlay or coating is applied. We can discuss epoxy and polyaspartic options, with choices in color, texture, or decorative finish.' },
      { heading: '3. Allow the surface to cure', text: 'Curing is the time an applied material needs to set and harden. Timing depends on the material and project, so we discuss the schedule for your surface before work begins.' },
      { heading: 'Explore decorative applications', text: 'Decorative looks include patterns inspired by wood, stone, brick, or slate. See our <a href="/services/decorative-concrete-overlays/">decorative concrete overlays</a> for more finish choices.' }
    ]
  }
};

// Service-page copy is kept separate from metadata and archived media references.
// The older images remain available for attribution and rights review.
const servicePageCopy = {
  '/services/concrete-repair-maintenance/': {
    statement: 'Your concrete needs a refresh.<br><em>Not necessarily a replacement.</em>',
    hero: "Cracks, wear, or a surface that's seen better days? Before you start planning a complete replacement, let's see what options might work for your existing concrete.",
    whatHeading: 'Start with the slab you have.',
    what: [
      'Concrete Repair &amp; Maintenance starts with understanding the condition of your existing concrete. Grinding, repair, sealing, or resurfacing may be worth discussing, depending on the surface and how you use it.',
      'A worn floor does not automatically call for a new slab. Some surfaces can be prepared for a different finish; others need a different plan after we look at them.'
    ],
    whenHeading: 'When should we take a look?',
    when: [
      'A garage floor or other concrete showing wear, cracks, or surface imperfections.',
      'A surface that may need attention before a coating or overlay.',
      'A project where you want to understand alternatives to full replacement.'
    ],
    optionsHeading: 'Ways to work with what is there.',
    optionsIntro: 'The right scope depends on the slab. We can talk through practical choices without assuming one finish fits every surface or budget.',
    options: [
      { name: 'Repair and preparation', text: 'Grinding and addressing surface imperfections can prepare existing concrete for the next step. The extent of repair depends on what we find.' },
      { name: 'Sealing and maintenance', text: 'Sealing is one option described for existing concrete. We can discuss whether it makes sense for the surface and your goals.' },
      { name: 'Resurfacing and overlays', text: 'A new finishing layer may be an option when the concrete can support it. See how our <a href="/services/concrete-overlay/">Concrete Overlay</a> service approaches preparation, application, and curing.' }
    ],
    planningHeading: 'A practical first step.',
    planning: 'Tell us what is worn, where the concrete is, and the finish you have in mind. We can explore approaches for different budgets before you decide whether replacement belongs in the conversation.',
    planningPoints: ['Condition of the existing surface', 'How the space is used', 'Your finish goals and budget'],
    detailsHeading: 'A closer look at repair and preparation.',
    closeHeading: "Before you replace it, <em>let's talk about it.</em>",
    closeText: 'Tell Melissa what is happening with your concrete. We can start with the surface you have and the change you want to make.'
  },
  '/services/protective-concrete-overlays/': {
    statement: 'Protection <em>with purpose.</em>',
    hero: 'Thinking about a coating for a home or business floor? Epoxy, polyurea, and polyaspartic are different options. The conversation starts with your concrete and how the space is used.',
    whatHeading: 'A coating chosen for the space.',
    what: [
      'Protective coating systems add a layer over prepared concrete. An appropriate system can help protect a surface from everyday wear while giving it a different color, tone, or finish.',
      'We discuss epoxy, polyurea, and polyaspartic options for residential and commercial concrete. The surface condition, setting, and use matter more than a product name alone.'
    ],
    whenHeading: 'Where might a coating fit?',
    when: [
      'A residential floor where a coating and finish are being considered.',
      'A business or industrial floor, including a warehouse or healthcare setting, subject to surface and product review.',
      'A patio, walkway, or pool deck where the outdoor setting needs a product-specific discussion.'
    ],
    optionsHeading: 'Epoxy, polyurea, or polyaspartic?',
    optionsIntro: 'These are coating types, not interchangeable promises. Melissa can help you compare them in the context of your surface and project.',
    options: [
      { name: 'Epoxy', text: 'Epoxy resin is mixed with a hardener to form a coating layer. Color, tone, and finish effects can vary. Ask which epoxy option, if any, suits your floor and its use.' },
      { name: 'Polyurea', text: 'Polyurea forms when two ingredients mix and react. Formulas differ, so the specific product and the condition of your concrete both matter.' },
      { name: 'Polyaspartic', text: 'Polyaspartic is a type of polyurea coating used on concrete floors. Ask how the available option fits an indoor or outdoor setting and the way the space is used.' }
    ],
    planningHeading: 'Start with the right questions.',
    planning: 'We will talk about the concrete, the setting, and what the floor sees day to day. Surface preparation may involve cleaning, repairs, or grinding before a coating is applied. The specific system and schedule need a project conversation.',
    planningPoints: ['Surface condition and preparation', 'Indoor or outdoor setting', 'Residential, commercial, or industrial use'],
    detailsHeading: 'Coating terms in plain language.',
    closeHeading: 'The right coating starts <em>with a conversation.</em>',
    closeText: 'Tell Melissa about your floor and how you use the space. We can explore coating options together.'
  },
  '/services/decorative-concrete-overlays/': {
    statement: 'Concrete with <em>a little personality.</em>',
    hero: "Looking beyond plain gray? Let's explore decorative looks for suitable existing concrete, from stone- and wood-inspired textures to flakes, stains, and metallic effects.",
    showcaseHeading: 'See the possibilities.',
    showcaseIntro: 'Three different directions for a concrete finish. We can talk through what fits your surface and space.',
    finishes: [
      { label: 'Flagstone-inspired texture', src: '/images/projects/flagstone-clean.webp', full: '/images/projects/full/flagstone-clean.jpg', alt: 'Flagstone pattern in a finished concrete patio', width: 800, height: 728, className: 'finish-flagstone' },
      { label: 'Wood-look concrete', src: '/images/projects/wood-look-clean.webp', full: '/images/projects/full/wood-look-clean.jpg', alt: 'Wood plank pattern across a finished concrete patio', width: 800, height: 722, className: 'finish-wood' },
      { label: 'Decorative flake finish', src: '/images/projects/decorative-flake-detail.jpg', full: '/images/projects/full/flake-detail.jpg', alt: 'Close view of gray, black, and white decorative flakes on a concrete floor', width: 800, height: 800, className: 'finish-flake' }
    ],
    detailsHeading: 'More about the finishes.',
    closeHeading: "Let's make concrete <em>worth looking at.</em>",
    closeText: 'Tell Melissa about the space and the look you are drawn to. We can explore finishes that make sense for your concrete.'
  },
  '/services/concrete-overlay/': {
    statement: 'A fresh surface. <em>A whole new possibility.</em>',
    hero: 'A concrete overlay adds a new finishing layer over suitable existing concrete. Before choosing a look, we need to understand the surface beneath it.',
    whatHeading: 'A new layer over existing concrete.',
    what: [
      'Concrete Overlay is the process-focused service for updating an existing concrete surface. It covers the questions of preparation, application, and curing before a finish is selected.',
      'An overlay may change the look or texture of a residential or commercial surface, but not every slab is suitable for a new layer. For wood-, stone-, brick-, or slate-inspired looks, explore our <a href="/services/decorative-concrete-overlays/">Decorative Concrete Overlays</a>.'
    ],
    whenHeading: 'When is an overlay worth discussing?',
    when: [
      'An existing home or business surface you want to update.',
      'Concrete that may support a new finishing layer after its condition is reviewed.',
      'A project where the finish, texture, and preparation need to be considered together.'
    ],
    optionsHeading: 'Prepare. Apply. Cure.',
    optionsIntro: 'We think about an overlay in three stages. The details depend on the material and the concrete in front of us.',
    options: [
      { name: 'Prepare the surface', text: 'Cleaning, removing old coatings, repairing imperfections, or diamond grinding may be needed before a new layer. The existing concrete determines the preparation.' },
      { name: 'Apply the selected material', text: 'The chosen overlay or coating is applied after preparation. Options we can discuss include epoxy and polyaspartic, with choices in color, texture, and decorative finish.' },
      { name: 'Allow it to cure', text: 'Curing is the period when applied material sets and hardens. Timing depends on the material and project, so we discuss the schedule for your surface.' }
    ],
    planningHeading: 'First, see what the slab can support.',
    planning: 'An overlay will not fit every concrete surface. Its condition, any old coating, the space’s use, and the finish you want all affect the next step. We can discuss options for homes and businesses without assuming a method or timeline in advance.',
    planningPoints: ['Existing concrete and coatings', 'Preparation or repairs needed', 'Finish choice and curing schedule'],
    detailsHeading: 'More about the overlay process.',
    closeHeading: "Let's see what your concrete <em>can become.</em>",
    closeText: 'Tell Melissa about the concrete you have and what you would like to change. We can start with whether an overlay is worth exploring.'
  }
};

function disclosure(section) {
  return `<details class="service-accordion"><summary><span>${section.heading}</span><span class="accordion-mark" aria-hidden="true">+</span></summary><div class="accordion-body"><p>${section.text}</p></div></details>`;
}

function renderServiceHero(service, copy) {
  return renderSplitHero(service.path, {
    sectionClass: 'service-page-hero',
    containerClass: 'service-page-container',
    copyClass: 'service-page-hero-copy',
    labelledBy: 'service-page-title',
    content: `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/services/">Services</a><span aria-hidden="true">/</span><span aria-current="page">${service.title}</span></nav><h1 id="service-page-title">${service.title}</h1><h2>${copy.statement}</h2><p class="service-page-hero-lede">${copy.hero}</p><div class="service-page-hero-actions">${cta}<a class="under-link all-services-link" href="/services/">All Services <span aria-hidden="true">&rarr;</span></a></div><p class="service-page-coverage">Serving Rhode Island &amp; Southern Massachusetts</p>`
  });
}

function decorativeServiceBody(service, services) {
  const copy = servicePageCopy[service.path];
  const details = customerContent[service.path].details;
  const related = services.filter(item => item.path !== service.path);
  const finishes = copy.finishes.map((finish, index) => `<figure class="decorative-finish ${finish.className}">${photoButton({ ...finish, group: 'decorative', caption: finish.label, sizes: '(max-width: 700px) calc(100vw - 44px), (max-width: 1320px) 30vw, 400px' })}<figcaption><span aria-hidden="true">0${index + 1}</span><h3>${finish.label}</h3></figcaption></figure>`).join('');

  return `<div class="service-page-detail service-page-decorative-concrete-overlays">${renderServiceHero(service, copy)}<section class="service-page-section decorative-finish-showcase" aria-labelledby="decorative-finishes-title"><div class="service-page-container"><div class="decorative-finish-heading"><div class="section-kicker">FINISH IDEAS</div><h2 id="decorative-finishes-title">${copy.showcaseHeading}</h2><p>${copy.showcaseIntro}</p></div><div class="decorative-finish-grid">${finishes}</div></div></section><section class="service-page-section decorative-more" aria-labelledby="decorative-more-title"><div class="service-page-container decorative-more-grid"><div class="decorative-more-intro"><div class="section-kicker">WANT TO LEARN MORE?</div><h2 id="decorative-more-title">${copy.detailsHeading}</h2><p>Open a topic to explore patterns, color, preparation, and where these finishes may fit.</p><a class="under-link service-page-contact-link" href="/contact-us/">Talk through your project <span aria-hidden="true">&rarr;</span></a></div><div class="service-page-disclosures">${details.map(disclosure).join('')}</div></div></section><section class="related section section-dark service-cross-nav" aria-labelledby="other-services-title"><div class="section-heading"><div><div class="section-kicker">SERVICE NAVIGATION</div><h2 id="other-services-title">Explore Other <em>Services</em></h2></div><a class="under-link all-services-link" href="/services/">All Services <span aria-hidden="true">&rarr;</span></a></div><div class="related-links">${related.map(item => `<a href="${item.path}"><span>${item.title}</span><b aria-hidden="true">&rarr;</b></a>`).join('')}</div></section><section class="final-cta"><div class="section-kicker">READY TO TALK?</div><h2>${copy.closeHeading}</h2><p>${copy.closeText}</p>${cta}<a class="cta-phone" href="tel:${phone}">Or call (401) 677-1000</a></section></div>`;
}

function renderServices(services) {
  const serviceByPath = new Map(services.map(service => [service.path, service]));
  const paths = {
    repair: '/services/concrete-repair-maintenance/',
    protective: '/services/protective-concrete-overlays/',
    decorative: '/services/decorative-concrete-overlays/',
    overlay: '/services/concrete-overlay/'
  };
  Object.values(paths).forEach(path => {
    if (!serviceByPath.has(path)) throw new Error(`Missing service destination: ${path}`);
  });
  const audiences = [
    {
      name: 'Residential',
      image: { src: '/images/projects/home-garage-floor.webp', full: '/images/projects/full/garage-floor.jpg', alt: 'Gray flake-finished concrete across a garage floor', width: 1440, height: 719, srcset: '/images/projects/garage-floor-768.jpg 768w, /images/projects/home-garage-floor.webp 1440w' },
      spaces: [
        { name: 'Garage', need: 'Is the floor worn, cracked, or ready for a different look?', possibilities: 'Explore protective coating systems, decorative flakes or quartz, and other finish choices for suitable concrete.', preparation: 'Cracks, existing coatings, and grinding or repair may affect the next step.', links: [paths.protective, paths.decorative, paths.repair] },
        { name: 'Basement', need: 'Want to refresh an existing basement floor?', possibilities: 'Decorative overlays, stains, flake effects, and protective coatings are options to discuss for an appropriate surface.', preparation: 'The condition of the concrete and any old finish should be reviewed before choosing an approach.', links: [paths.decorative, paths.protective, paths.repair] },
        { name: 'Patio / Pool Area', need: 'Looking for a new look or help with worn outdoor concrete?', possibilities: 'CCT documents textured overlays, decorative finishes, and coating options for patios and pool areas. The outdoor setting matters to the choice.', preparation: 'Surface condition, existing coatings, cleaning, and repairs help determine what can be considered.', links: [paths.decorative, paths.overlay, paths.protective] },
        { name: 'Other residential space', need: 'Have a walkway, driveway, or another concrete space in mind?', possibilities: 'Repair, resurfacing, decorative overlays, and coatings may be worth exploring depending on the surface and how it is used.', preparation: 'Start with the condition of the existing concrete; Melissa can help narrow the options.', links: [paths.repair, paths.overlay, paths.decorative] }
      ]
    },
    {
      name: 'Commercial',
      image: { src: '/images/projects/commercial-warehouse-floor.jpg', full: '/images/projects/full/warehouse-floor.jpg', alt: 'Finished concrete floor between warehouse shelving', width: 768, height: 576 },
      spaces: [
        { name: 'Workspace', need: 'Does a business floor need repair, protection, or a different finish?', possibilities: 'Explore protective coating systems, concrete overlays, and decorative choices for appropriate commercial floors.', preparation: 'Existing wear, old coatings, and daily use are part of the surface evaluation.', links: [paths.protective, paths.repair, paths.overlay] },
        { name: 'Shop / Garage', need: 'Want to improve an existing shop or garage floor?', possibilities: 'Protective coatings, decorative flake or quartz effects, and repair are documented starting points.', preparation: 'Surface preparation, cracks, and the way the floor is used help guide the discussion.', links: [paths.protective, paths.decorative, paths.repair] },
        { name: 'Commercial Interior', need: 'Looking at a showroom, lunchroom, salon, or another interior?', possibilities: 'CCT documents decorative overlays, stains, metallic effects, and protective coatings for commercial settings.', preparation: 'The existing floor and desired finish help determine which approach, if any, fits.', links: [paths.decorative, paths.protective, paths.overlay] },
        { name: 'Outdoor Space', need: 'Considering a walkway, patio, or other outdoor business surface?', possibilities: 'Explore decorative overlays and outdoor coating options without assuming every system fits every exposure.', preparation: 'Surface condition, weather exposure, and preparation should be discussed before selecting a finish.', links: [paths.decorative, paths.protective, paths.repair] }
      ]
    }
  ];
  const renderLinks = pathsForSpace => pathsForSpace.map(path => `<a href="${path}">${serviceByPath.get(path).title}<span aria-hidden="true">&rarr;</span></a>`).join('');
  const audienceChoices = audiences.map(audience => `<div class="service-audience-row"><details class="service-audience" id="${audience.name.toLowerCase()}" name="service-audience"><summary><span class="service-audience-name">${audience.name}</span><span class="service-audience-arrow" aria-hidden="true">&darr;</span></summary><div class="service-audience-body"><p class="service-step-label">02 / CHOOSE YOUR SPACE</p><div class="service-space-list">${audience.spaces.map(space => `<details class="service-space" name="service-space"><summary><span>${space.name}</span><span aria-hidden="true">+</span></summary><div class="service-space-panel"><p>${space.need}</p><p>${space.possibilities}</p><p>${space.preparation}</p><p class="service-fit-note">The right finish depends on the concrete and how the space is used. Melissa can help you compare options.</p><nav class="service-space-links" aria-label="Services to explore for ${audience.name.toLowerCase()} ${space.name.toLowerCase()}">${renderLinks(space.links)}</nav><a class="button button-gold" href="/contact-us/">Talk With Melissa <span aria-hidden="true">&rarr;</span></a></div></details>`).join('')}</div></div></details>${photoButton({ ...audience.image, group: 'services', caption: `${audience.name} concrete finish`, className: 'service-audience-photo', sizes: '(max-width: 700px) calc(100vw - 48px), (max-width: 1200px) 40vw, 500px' })}</div>`).join('');
  const education = `<section class="section service-education" id="lets-break-it-down" aria-labelledby="service-education-title"><div class="service-education-heading"><div class="section-kicker">THREE THINGS TO UNDERSTAND</div><h2 id="service-education-title">Let's <em>break it down.</em></h2><p>From getting your concrete ready to choosing the final look, here's how the pieces come together.</p></div><div class="service-education-topics"><article class="service-topic-prep">${photoButton({ src: "/images/projects/basement-grinding-poster.webp", full: "/images/projects/basement-grinding-poster.webp", alt: "A worker grinds a concrete basement floor before finishing", width: 720, height: 1280, group: "services", caption: "Surface preparation", className: "service-education-photo-trigger", imageClassName: "service-education-photo" })}<span class="service-education-number">01</span><h3>Prep &amp; Repair</h3><p>First, we look at the existing concrete. Grinding, repairs, and preparation help determine what's possible.</p><a href="${paths.repair}" aria-label="Explore Prep and Repair: Concrete Repair and Maintenance">Explore Prep &amp; Repair <span aria-hidden="true">&rarr;</span></a></article><article class="service-topic-coatings">${photoButton({ src: "/images/projects/floor-coating-application.webp", full: "/images/projects/full/coating-application.jpg", alt: "A worker smooths coating material across a concrete floor", width: 800, height: 600, group: "services", caption: "Coating application", className: "service-education-photo-trigger", imageClassName: "service-education-photo" })}<span class="service-education-number">02</span><h3>Coatings &amp; Overlays</h3><p>Depending on your surface and goals, we'll explore suitable coating or resurfacing options.</p><nav aria-label="Coating and overlay services"><a href="${paths.protective}">Protective Concrete Overlays <span aria-hidden="true">&rarr;</span></a><a href="${paths.overlay}">Concrete Overlay <span aria-hidden="true">&rarr;</span></a></nav></article><article class="service-topic-finishes">${photoButton({ src: "/images/projects/flake-finish-room.jpg", full: "/images/projects/full/flake-room.jpg", alt: "Close view of a gray flake-finished concrete floor in a room", width: 768, height: 417, group: "services", caption: "Decorative flake finish", className: "service-education-photo-trigger", imageClassName: "service-education-photo" })}<span class="service-education-number">03</span><h3>Finishes &amp; Style</h3><p>Colors, textures, decorative flakes, stone-inspired looks, and other finish options can bring the design together.</p><a href="${paths.decorative}" aria-label="Explore Decorative Finishes: Decorative Concrete Overlays">Explore Decorative Finishes <span aria-hidden="true">&rarr;</span></a></article></div><p class="service-education-note">These are topics to explore, not a fixed installation sequence. Some finishes are part of a coating system, and a project may not need every option.</p></section>`;

  const servicesHero = renderSplitHero('/services/', {
    sectionClass: 'page-hero services-hero',
    content: `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Services</span></nav><p class="eyebrow">CONCRETE SERVICES / RESIDENTIAL &amp; COMMERCIAL</p><h1>99 problems.<br><em>Your concrete doesn't have to be one.</em></h1><p>From repairs and protective coatings to decorative finishes, let's find the right starting point for your space.</p><p class="services-coverage">Serving Rhode Island &amp; Southern Massachusetts</p>`
  });

  return `${servicesHero}<section class="section service-benefits" aria-labelledby="service-benefits-title"><div class="service-benefits-top"><div class="service-benefits-heading"><div class="section-kicker">WHAT'S POSSIBLE</div><h2 id="service-benefits-title">Your concrete <em>has potential.</em></h2><p>A garage that needs some love? A business floor that's seen better days? Whether you're after a practical solution or a whole new look, let's talk about what your concrete could become.</p></div>${renderOverviewVisual()}</div><div class="service-benefits-grid"><article><h3>Easier upkeep</h3><p>Explore finishes that can make everyday cleaning simpler.</p></article><article><h3>A look you'll love</h3><p>From decorative flakes to stone-inspired and metallic effects.</p></article><article><h3>Surface protection</h3><p>Learn how appropriate coating systems can help protect concrete from everyday wear.</p></article><article><h3>Made for your space</h3><p>Explore options for homes, commercial settings, and how each space is used.</p></article></div></section><section class="section service-collection section-dark" aria-labelledby="services-options-title"><div class="section-heading"><div><div class="section-kicker">START WITH YOUR SPACE</div><h2 id="services-options-title">Home or <em>business?</em></h2><p>Choose the setting, then the space. We'll show you where to start.</p></div></div><div class="service-journey"><p class="service-step-label">01 / HOME OR BUSINESS?</p><div class="service-audience-list">${audienceChoices}</div></div></section>${education}<section class="final-cta"><h2>Not sure? <em>Ask Melissa.</em></h2><p>Tell Melissa a little about your space and what you're hoping to change. We'll help you explore your options.</p><a class="button button-gold" href="/contact-us/">Talk with Melissa <span aria-hidden="true">&rarr;</span></a><a class="cta-phone" href="tel:${phone}">Or call (401) 677-1000</a></section>`;
}
function serviceBody(service, services) {
  if (service.path === '/services/decorative-concrete-overlays/') return decorativeServiceBody(service, services);
  const data = customerContent[service.path];
  const copy = servicePageCopy[service.path];
  if (!data || !copy) throw new Error(`Missing service content for ${service.path}`);
  const slug = service.path.split('/').filter(Boolean).pop();
  const related = services.filter(item => item.path !== service.path);
  const paragraphs = copy.what.map(text => `<p>${text}</p>`).join('');
  const uses = copy.when.map(text => `<li>${text}</li>`).join('');
  const planningPoints = copy.planningPoints.map(text => `<li>${text}</li>`).join('');
  const options = copy.options.map((option, index) => `<article class="service-page-option"><span class="service-page-option-number">0${index + 1}</span><h3>${option.name}</h3><p>${option.text}</p></article>`).join('');

  return `<div class="service-page-detail service-page-${slug}">${renderServiceHero(service, copy)}<section class="service-page-section service-page-intro" aria-labelledby="service-what-title"><div class="service-page-container service-page-intro-grid"><div class="service-page-intro-copy"><div class="section-kicker">WHAT THIS SERVICE DOES</div><h2 id="service-what-title">${copy.whatHeading}</h2>${paragraphs}</div>${renderServiceVisual(service.path, 'intro')}<div class="service-page-when"><div class="section-kicker">WHEN TO EXPLORE IT</div><h3>${copy.whenHeading}</h3><ul>${uses}</ul></div></div></section><section class="service-page-section service-page-options" aria-labelledby="service-options-title"><div class="service-page-container"><div class="service-page-options-lead"><div class="service-page-section-head"><div class="section-kicker">YOUR OPTIONS</div><h2 id="service-options-title">${copy.optionsHeading}</h2><p>${copy.optionsIntro}</p></div>${renderServiceVisual(service.path, 'options')}</div><div class="service-page-options-list">${options}</div></div></section><section class="service-page-section service-page-planning" aria-labelledby="service-planning-title"><div class="service-page-container"><div class="service-page-planning-grid"><div><div class="section-kicker">WHAT TO EXPECT</div><h2 id="service-planning-title">${copy.planningHeading}</h2><p>${copy.planning}</p><a class="under-link service-page-contact-link" href="/contact-us/">Talk through your project <span aria-hidden="true">&rarr;</span></a></div><div class="service-page-planning-side"><ul class="service-page-planning-points">${planningPoints}</ul>${renderServiceVisual(service.path, 'planning')}</div></div><div class="service-page-more"><div class="service-page-more-heading"><div class="section-kicker">WANT TO LEARN MORE?</div><h2 id="service-more-title">${copy.detailsHeading}</h2><p>Open a topic for more detail, or ask Melissa about your specific concrete.</p></div><div class="service-page-disclosures">${data.details.map(disclosure).join('')}</div></div></div></section><section class="related section section-dark service-cross-nav" aria-labelledby="other-services-title"><div class="section-heading"><div><div class="section-kicker">SERVICE NAVIGATION</div><h2 id="other-services-title">Explore Other <em>Services</em></h2></div><a class="under-link all-services-link" href="/services/">All Services <span aria-hidden="true">&rarr;</span></a></div><div class="related-links">${related.map(item => `<a href="${item.path}"><span>${item.title}</span><b aria-hidden="true">&rarr;</b></a>`).join('')}</div></section><section class="final-cta"><div class="section-kicker">READY TO TALK?</div><h2>${copy.closeHeading}</h2><p>${copy.closeText}</p>${cta}<a class="cta-phone" href="tel:${phone}">Or call (401) 677-1000</a></section></div>`;
}
const pageBodies = {
  '/about-us/': `<section class="page-hero about-hero"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>About</span></nav><p class="eyebrow">BASED IN WEST WARWICK</p><h1>Meet Melissa.<br><em>Meet CCT.</em></h1><p>I'm Melissa, and I run Concrete Coating Technology LLC from West Warwick, Rhode Island.</p></section><section class="about-profile section"><figure class="about-photo"><img src="/images/projects/melissa-upscaled.webp" alt="Melissa beside a Concrete Coating Technology sign" width="960" height="1280" loading="lazy"></figure><div class="about-copy"><div class="section-kicker">A LOCAL CONCRETE BUSINESS</div><h2>Let's talk about<br><em>your concrete.</em></h2><p>I work with homeowners and businesses in Rhode Island and Southern Massachusetts on concrete repair, coatings, and decorative overlays.</p><p>Call, email, or book a time to talk about your space and the finish you have in mind.</p><a class="under-link" href="/contact-us/">Contact Melissa <span aria-hidden="true">&rarr;</span></a></div></section><!-- Mission copy proposed for Melissa's approval before publication. --><section class="about-mission section" aria-labelledby="about-mission-title"><div class="about-mission-heading"><div class="section-kicker">OUR MISSION</div><h2 id="about-mission-title">A little grit. <em>A lot of heart.</em> One great team.</h2></div><div class="about-mission-copy"><p>At Concrete Coating Technology, our mission is to bring new life to existing concrete through thoughtful preparation, quality workmanship, and finishes that fit each space.</p><p>We believe great work starts with honest conversations, clear expectations, and a team that takes pride in every project.</p></div></section><section class="final-cta"><h2>Start with a<br><em>conversation.</em></h2><p>Book a free 30-minute consultation with me.</p>${cta}</section>`,
  '/contact-us/': `<section class="page-hero contact-hero"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Contact</span></nav><p class="eyebrow">CONTACT CONCRETE COATING TECHNOLOGY LLC</p><h1>Let's talk about<br><em>your project.</em></h1><p>Call, email, or book a free consultation with Melissa.</p><p class="contact-coverage">Serving Rhode Island &amp; Southern Massachusetts</p>${cta}</section><section class="contact-layout section"><div><div class="section-kicker">GET IN TOUCH</div><h2>Choose how<br><em>to connect.</em></h2></div><div class="contact-methods"><a href="tel:${phone}"><span>CALL OR TEXT</span><strong>(401) 677-1000</strong><i aria-hidden="true">&rarr;</i></a><a href="mailto:${email}"><span>EMAIL</span><strong>${email}</strong><i aria-hidden="true">&rarr;</i></a><a href="${calendly}" target="_blank" rel="noopener noreferrer"><span>FREE 30-MINUTE CONSULTATION</span><strong>Choose a time with Melissa</strong><i aria-hidden="true">&rarr;</i></a></div></section><section class="section section-soft"><div class="section-kicker">HOURS</div><div class="hours-grid"><span>Monday to Friday</span><strong>8:00 AM to 5:00 PM</strong><span>Saturday</span><strong>By appointment</strong><span>Sunday</span><strong>Closed</strong></div></section>`,
  '/service-areas/': `<section class="page-hero service-areas-hero"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Service Areas</span></nav><p class="eyebrow">BASED IN WEST WARWICK</p><h1>Concrete services<br><em>in your area.</em></h1><p>Serving Rhode Island &amp; Southern Massachusetts from West Warwick. Contact me to discuss your location.</p>${cta}</section><section class="section service-area-directory"><div class="section-kicker">RHODE ISLAND LOCATIONS</div><div class="related-links"><a href="/areas-of-service/east-greenwich-concrete-overlay/">East Greenwich concrete overlay <b aria-hidden="true">&rarr;</b></a><a href="/areas-of-service/narragansett-concrete-overlay/">Narragansett concrete overlay <b aria-hidden="true">&rarr;</b></a><a href="/areas-of-service/west-warwick-concrete-overlay/">West Warwick concrete overlay <b aria-hidden="true">&rarr;</b></a></div><p>Contact me to discuss your location and project.</p>${cta}</section>`,
  '/about-us/reviews/': `<section class="page-hero reviews-hero"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Contact</span></nav><p class="eyebrow">A CONVERSATION ABOUT YOUR PROJECT</p><h1>Questions about<br><em>concrete services?</em></h1><p>Contact me to talk about your project or ask a question about our services.</p>${cta}</section><section class="section"><a class="under-link" href="/services/">Explore our services <span aria-hidden="true">&rarr;</span></a></section>`,
  '/about-us/blog/': `<section class="page-hero blog-hero"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>From CCT</span></nav><p class="eyebrow">FROM CCT</p><h1>Notes about<br><em>concrete.</em></h1><p>We share information about concrete repair, coatings, and decorative overlays.</p></section><section class="section blog-list"><article><p class="section-kicker">SEPTEMBER 15, 2025</p><h2><a href="/welcome-to-our-blog/">Welcome to our Blog</a></h2><a class="under-link" href="/welcome-to-our-blog/">Read the post <span aria-hidden="true">&rarr;</span></a></article></section>`,
  '/welcome-to-our-blog/': `<article class="page-hero blog-hero"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/about-us/blog/">From CCT</a><span aria-hidden="true">/</span><span>Welcome</span></nav><p class="eyebrow">SEPTEMBER 15, 2025</p><h1>Welcome to<br><em>our blog.</em></h1></article><section class="section"><p>Thanks for stopping by. For information about concrete coatings, repair, and decorative overlays, explore our services or get in touch with Melissa.</p><a class="under-link" href="/services/">Explore our services <span aria-hidden="true">&rarr;</span></a><p><a class="under-link" href="/about-us/blog/">Back to the blog <span aria-hidden="true">&rarr;</span></a></p></section>`,
  '/category/epoxy-flooring/': `<section class="page-hero blog-hero"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/about-us/blog/">From CCT</a><span aria-hidden="true">/</span><span>Epoxy flooring</span></nav><p class="eyebrow">EPOXY FLOORING</p><h1>Concrete floor<br><em>coatings.</em></h1></section><section class="section"><h2><a href="/welcome-to-our-blog/">Welcome to our Blog</a></h2><p>Explore epoxy and other concrete coating options on our protective coatings page.</p><a class="under-link" href="/services/protective-concrete-overlays/">Explore protective coatings <span aria-hidden="true">&rarr;</span></a></section>`,
  '/policy/privacy-policy/': `<section class="page-hero policy-hero"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Privacy</span></nav><p class="eyebrow">CONCRETE COATING TECHNOLOGY LLC</p><h1>Privacy <em>notice.</em></h1><p>For questions about this website or our contact details, please get in touch.</p><a class="under-link" href="/contact-us/">Contact us <span aria-hidden="true">&rarr;</span></a></section>`,
  '/policy/cookie-policy/': `<section class="page-hero policy-hero"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Cookies</span></nav><p class="eyebrow">CONCRETE COATING TECHNOLOGY LLC</p><h1>Cookie <em>notice.</em></h1><p>For questions about this website or our contact details, please get in touch.</p><a class="under-link" href="/contact-us/">Contact us <span aria-hidden="true">&rarr;</span></a></section>`,
  '/policy/terms-of-service/': `<section class="page-hero policy-hero"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Terms</span></nav><p class="eyebrow">CONCRETE COATING TECHNOLOGY LLC</p><h1>Terms of <em>service.</em></h1><p>For questions about this website or our contact details, please get in touch.</p><a class="under-link" href="/contact-us/">Contact us <span aria-hidden="true">&rarr;</span></a></section>`
};

const pageMeta = {
  '/about-us/': { title: 'About Melissa | Concrete Coating Technology LLC', description: 'Meet Melissa and CCT, based in West Warwick and serving Rhode Island and Southern Massachusetts.' },
  '/contact-us/': { title: 'Contact | Concrete Coating Technology LLC', description: 'Call, email, or book a free consultation with CCT, serving Rhode Island and Southern Massachusetts.' },
  '/service-areas/': { title: 'Rhode Island & Southern Massachusetts Service Areas | Concrete Coating Technology LLC', description: 'CCT is based in West Warwick and serves Rhode Island and Southern Massachusetts. Contact Melissa about your location.' },
  '/about-us/reviews/': { title: 'Contact Melissa | Concrete Coating Technology LLC', description: 'Contact Concrete Coating Technology LLC to discuss concrete coating and repair services.' },
  '/about-us/blog/': { title: 'Concrete Coating Notes | Concrete Coating Technology LLC', description: 'Information about concrete repair, coatings, and decorative overlays from Concrete Coating Technology LLC.' },
  '/welcome-to-our-blog/': { title: 'Welcome to our Blog | Concrete Coating Technology LLC', description: 'Welcome to Concrete Coating Technology LLC. Explore our concrete coating, repair, and overlay services.' },
  '/category/epoxy-flooring/': { title: 'Concrete Floor Coatings | Concrete Coating Technology LLC', description: 'Explore epoxy and other concrete coating options from Concrete Coating Technology LLC.' },
  '/policy/privacy-policy/': { title: 'Privacy Notice | Concrete Coating Technology LLC', description: 'Contact Concrete Coating Technology LLC with questions about this website.' },
  '/policy/cookie-policy/': { title: 'Cookie Notice | Concrete Coating Technology LLC', description: 'Contact Concrete Coating Technology LLC with questions about this website.' },
  '/policy/terms-of-service/': { title: 'Terms of Service | Concrete Coating Technology LLC', description: 'Contact Concrete Coating Technology LLC with questions about this website.' }
};

module.exports = { customerContent, renderServices, serviceBody, pageBodies, pageMeta, cta };
