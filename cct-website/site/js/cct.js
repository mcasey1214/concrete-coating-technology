'use strict';

(() => {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let keyboardModality = false;
  document.addEventListener('keydown', event => {
    if (!['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) keyboardModality = true;
  }, true);
  const notePointerInput = () => { keyboardModality = false; };
  document.addEventListener('pointerdown', notePointerInput, true);
  document.addEventListener('touchstart', notePointerInput, { capture: true, passive: true });
  const announcement = document.querySelector('.announce');
  if (announcement) {
    const track = document.createElement('div');
    const group = document.createElement('div');
    track.className = 'announce-track';
    group.className = 'announce-group';
    [...announcement.children].forEach(item => {
      if (item.classList.contains('announce-divider')) item.remove();
      else group.appendChild(item);
    });
    track.appendChild(group);
    announcement.appendChild(track);

    let resizeFrame = null;
    let groupWidth = 0;
    let durationMs = 0;
    const fillTrack = () => {
      track.querySelectorAll('.announce-group[aria-hidden="true"]').forEach(copy => copy.remove());
      groupWidth = group.getBoundingClientRect().width;
      if (!groupWidth) return;
      const copies = Math.max(1, Math.ceil(announcement.clientWidth / groupWidth) + 1);
      for (let index = 0; index < copies; index += 1) {
        const copy = group.cloneNode(true);
        copy.setAttribute('aria-hidden', 'true');
        copy.querySelectorAll('a').forEach(link => { link.tabIndex = -1; });
        track.appendChild(copy);
      }
      durationMs = groupWidth / 42 * 1000;
      announcement.style.setProperty('--marquee-distance', `${-groupWidth}px`);
      announcement.style.setProperty('--marquee-duration', `${(durationMs / 1000).toFixed(2)}s`);
    };
    fillTrack();
    const announcementLinks = [...group.querySelectorAll('a')];
    announcementLinks.forEach(link => {
      link.addEventListener('focus', () => {
        const barRect = announcement.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        const groupRect = group.getBoundingClientRect();
        const relativeLeft = linkRect.left - groupRect.left;
        if (motionQuery.matches) {
          announcement.scrollLeft = Math.max(0, relativeLeft - (barRect.width - linkRect.width) / 2);
          return;
        }
        const animation = track.getAnimations()[0];
        if (!animation || !groupWidth) return;
        animation.pause();
        const centeredLeft = Math.max(0, relativeLeft - (barRect.width - linkRect.width) / 2);
        animation.currentTime = centeredLeft / groupWidth * durationMs;
        window.requestAnimationFrame(() => {
          if (document.activeElement === link) announcement.scrollLeft = 0;
        });
      });
      link.addEventListener('blur', () => {
        if (motionQuery.matches || touchPauseTimer !== null || announcement.matches(':hover')) return;
        track.getAnimations()[0]?.play();
      });
    });
    let touchPauseTimer = null;
    announcement.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch') return;
      track.getAnimations()[0]?.pause();
      window.clearTimeout(touchPauseTimer);
      touchPauseTimer = window.setTimeout(() => {
        touchPauseTimer = null;
        if (!announcement.matches(':hover') && !announcement.contains(document.activeElement)) {
          track.getAnimations()[0]?.play();
        }
      }, 5000);
    });
    window.addEventListener('resize', () => {
      if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = null;
        fillTrack();
      });
    });
  }

  const dropdown = document.querySelector('.nav-drop');
  const dropdownToggle = document.querySelector('.nav-drop-toggle');

  if (dropdown && dropdownToggle) {
    const setDropdown = open => {
      dropdown.classList.toggle('open', open);
      dropdownToggle.setAttribute('aria-expanded', String(open));
    };
    dropdownToggle.addEventListener('click', () => setDropdown(dropdownToggle.getAttribute('aria-expanded') !== 'true'));
    dropdownToggle.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setDropdown(true);
        dropdown.querySelector('.nav-drop-menu a')?.focus();
      }
    });
    dropdown.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        setDropdown(false);
        dropdownToggle.focus();
      }
    });
    dropdown.addEventListener('focusout', () => setTimeout(() => {
      if (!dropdown.contains(document.activeElement)) setDropdown(false);
    }, 0));
    document.addEventListener('click', event => {
      if (!dropdown.contains(event.target)) setDropdown(false);
    });
  }

  if (document.body.classList.contains('page-services')) {
    const openServiceDestination = () => {
      const id = window.location.hash.slice(1);
      const target = document.getElementById(id);
      if (!target || !['residential', 'commercial', 'lets-break-it-down'].includes(id)) return;
      if (target.matches('details.service-audience')) target.open = true;
      window.requestAnimationFrame(() => target.scrollIntoView({ block: 'start', behavior: 'instant' }));
    };
    window.addEventListener('hashchange', openServiceDestination);
    if (window.location.hash) window.addEventListener('load', openServiceDestination, { once: true });
  }

  const photoTriggers = [...document.querySelectorAll('[data-lightbox]')];
  if (photoTriggers.length) {
    const dialog = document.createElement('dialog');
    dialog.className = 'project-lightbox';
    dialog.setAttribute('aria-label', 'Project photo viewer');
    dialog.innerHTML = `<div class="project-lightbox-shell"><button type="button" class="project-lightbox-close" aria-label="Close photo viewer">&times;</button><div class="project-lightbox-view"><button type="button" class="project-lightbox-previous" aria-label="Previous photo">&#8249;</button><div class="project-lightbox-stage"><img alt=""><span class="project-lightbox-loading" role="status">Loading photo…</span></div><button type="button" class="project-lightbox-next" aria-label="Next photo">&#8250;</button></div><div class="project-lightbox-meta"><span class="project-lightbox-caption" aria-live="polite"></span><span class="project-lightbox-count" aria-live="polite"></span><button type="button" class="project-lightbox-zoom" aria-pressed="false">Zoom in</button></div></div>`;
    document.body.appendChild(dialog);
    const stage = dialog.querySelector('.project-lightbox-stage');
    const image = stage.querySelector('img');
    const loading = stage.querySelector('.project-lightbox-loading');
    const caption = dialog.querySelector('.project-lightbox-caption');
    const count = dialog.querySelector('.project-lightbox-count');
    const closeButton = dialog.querySelector('.project-lightbox-close');
    const previousButton = dialog.querySelector('.project-lightbox-previous');
    const nextButton = dialog.querySelector('.project-lightbox-next');
    const zoomButton = dialog.querySelector('.project-lightbox-zoom');
    let group = [];
    let current = 0;
    let opener = null;
    let touchStart = null;

    const fitImage = () => {
      stage.classList.remove('is-zoomed');
      image.style.width = '';
      zoomButton.textContent = 'Zoom in';
      zoomButton.setAttribute('aria-pressed', 'false');
    };
    const showPhoto = index => {
      current = (index + group.length) % group.length;
      const trigger = group[current];
      fitImage();
      loading.textContent = 'Loading photo…';
      loading.hidden = false;
      zoomButton.hidden = true;
      image.alt = trigger.querySelector('img')?.alt || '';
      image.src = trigger.dataset.lightboxFull;
      caption.textContent = trigger.dataset.lightboxCaption || image.alt;
      count.textContent = group.length > 1 ? `${current + 1} / ${group.length}` : '';
    };
    image.addEventListener('load', () => {
      loading.hidden = true;
      zoomButton.hidden = image.naturalWidth <= image.clientWidth * 1.2 && image.naturalHeight <= image.clientHeight * 1.2;
    });
    image.addEventListener('error', () => {
      loading.textContent = 'This photo could not be loaded.';
      loading.hidden = false;
      zoomButton.hidden = true;
    });
    photoTriggers.forEach(trigger => trigger.addEventListener('click', () => {
      opener = trigger;
      group = photoTriggers.filter(item => item.dataset.lightboxGroup === trigger.dataset.lightboxGroup && !item.closest('[hidden]'));
      previousButton.hidden = nextButton.hidden = group.length < 2;
      dialog.showModal();
      document.body.classList.add('project-lightbox-open');
      showPhoto(group.indexOf(trigger));
      closeButton.focus();
    }));
    closeButton.addEventListener('click', () => dialog.close());
    previousButton.addEventListener('click', () => showPhoto(current - 1));
    nextButton.addEventListener('click', () => showPhoto(current + 1));
    zoomButton.addEventListener('click', () => {
      if (stage.classList.contains('is-zoomed')) {
        fitImage();
      } else {
        stage.classList.add('is-zoomed');
        image.style.width = `${Math.min(image.naturalWidth, Math.round(stage.clientWidth * 2.2))}px`;
        zoomButton.textContent = 'Fit image';
        zoomButton.setAttribute('aria-pressed', 'true');
        stage.scrollLeft = (stage.scrollWidth - stage.clientWidth) / 2;
        stage.scrollTop = (stage.scrollHeight - stage.clientHeight) / 2;
      }
    });
    dialog.addEventListener('keydown', event => {
      if (event.key === 'Tab') {
        const focusable = [...dialog.querySelectorAll('button:not([hidden])')];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
      if (group.length < 2) return;
      if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(current - 1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(current + 1); }
    });
    stage.addEventListener('touchstart', event => {
      if (stage.classList.contains('is-zoomed')) return;
      const touch = event.changedTouches[0];
      touchStart = { x: touch.clientX, y: touch.clientY };
    }, { passive: true });
    stage.addEventListener('touchend', event => {
      if (!touchStart || group.length < 2 || stage.classList.contains('is-zoomed')) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - touchStart.x;
      const dy = touch.clientY - touchStart.y;
      touchStart = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) showPhoto(current + (dx < 0 ? 1 : -1));
    }, { passive: true });
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('project-lightbox-open');
      fitImage();
      image.removeAttribute('src');
      opener?.focus({ preventScroll: true });
    });
  }

  const galleryFilters = document.querySelector('.gallery-filters');
  const galleryGrid = document.querySelector('.project-gallery-grid');
  if (galleryFilters && galleryGrid) {
    const filterButtons = [...galleryFilters.querySelectorAll('[data-gallery-filter]')];
    const figures = [...galleryGrid.querySelectorAll('figure[data-gallery-categories]')];
    const status = galleryFilters.querySelector('.gallery-filter-status');
    const applyFilter = filter => {
      filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.galleryFilter === filter)));
      let visible = 0;
      figures.forEach(figure => {
        figure.hidden = filter !== 'all' && !figure.dataset.galleryCategories.split(' ').includes(filter);
        if (!figure.hidden) visible += 1;
      });
      galleryGrid.dataset.visibleCount = String(visible);
      if (status) status.textContent = `${visible} ${visible === 1 ? 'photo' : 'photos'} shown`;
    };
    filterButtons.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.galleryFilter)));
    applyFilter('all');
  }

  const hero = document.querySelector('[data-hero-carousel]');
  if (hero) {
    const slides = [...hero.querySelectorAll('.hero-slide')];
    const pauseButton = hero.querySelector('[data-hero-toggle]');
    const fadeMs = 750;
    const stillMs = 2500;
    const videoMs = 7200;
    let current = Math.max(0, slides.findIndex(slide => slide.getAttribute('aria-hidden') !== 'true'));
    let userPaused = false;
    let timer = null;
    let fadeTimer = null;
    let deadline = 0;
    let remainingMs = videoMs;

    const activeVideo = () => slides[current]?.querySelector('video');
    const loadImage = image => {
      if (!image?.dataset.src) return;
      if (image.dataset.srcset) {
        image.srcset = image.dataset.srcset;
        image.removeAttribute('data-srcset');
      }
      image.src = image.dataset.src;
      image.removeAttribute('data-src');
      image.loading = 'eager';
      image.decode?.().catch(() => {});
    };
    const preloadNextImages = (index, count) => {
      let started = 0;
      for (let offset = 1; offset < slides.length && started < count; offset += 1) {
        const candidate = slides[(index + offset) % slides.length];
        const image = candidate?.querySelector('img[data-src]');
        if (!image) continue;
        loadImage(image);
        started += 1;
      }
    };
    const isPaused = () => userPaused || document.hidden || motionQuery.matches;
    const stopTimer = () => {
      if (timer !== null) {
        window.clearTimeout(timer);
        remainingMs = Math.max(0, deadline - performance.now());
      }
      timer = null;
    };
    const updatePauseButton = () => {
      hero.dataset.heroPaused = String(isPaused());
      if (!pauseButton) return;
      pauseButton.hidden = motionQuery.matches;
      pauseButton.textContent = userPaused ? 'Resume' : 'Pause';
      pauseButton.setAttribute('aria-pressed', String(userPaused));
      pauseButton.setAttribute('aria-label', userPaused ? 'Resume the automatic photo montage' : 'Pause the automatic photo montage');
    };
    const pauseVideos = () => hero.querySelectorAll('.hero-slide.is-playing video').forEach(video => video.pause());
    const show = index => {
      stopTimer();
      const previous = current;
      const departing = slides[previous];
      const departingVideo = departing?.querySelector('video');
      if (departingVideo) departingVideo.onended = null;
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, position) => {
        slide.setAttribute('aria-hidden', String(position !== current));
        if (position === current) slide.classList.add('is-playing');
        else if (position !== previous) slide.classList.remove('is-playing');
      });
      loadImage(slides[current]?.querySelector('img[data-src]'));
      const video = activeVideo();
      remainingMs = video ? videoMs : stillMs;
      preloadNextImages(current, video ? 2 : 1);
      if (video) {
        video.currentTime = 0;
        video.muted = true;
      }
      schedule();
      if (previous !== current) {
        if (fadeTimer !== null) window.clearTimeout(fadeTimer);
        fadeTimer = window.setTimeout(() => {
          departing.classList.remove('is-playing');
          departingVideo?.pause();
          fadeTimer = null;
        }, fadeMs);
      }
    };
    const schedule = () => {
      stopTimer();
      updatePauseButton();
      if (isPaused() || slides.length < 2) {
        pauseVideos();
        return;
      }
      const video = activeVideo();
      if (video) {
        video.muted = true;
        video.play().catch(() => {});
        video.onended = () => show(current + 1);
      }
      deadline = performance.now() + remainingMs;
      timer = window.setTimeout(() => show(current + 1), remainingMs);
    };

    pauseButton?.addEventListener('click', () => {
      userPaused = !userPaused;
      schedule();
    });
    document.addEventListener('visibilitychange', schedule);
    motionQuery.addEventListener?.('change', event => {
      if (event.matches) userPaused = true;
      schedule();
    });
    show(current);
  }

  const reviews = document.querySelector('[data-review-carousel]');
  if (reviews) {
    const slides = [...reviews.querySelectorAll('[data-review-slide]')];
    const stage = reviews.querySelector('[data-review-stage]');
    const previous = reviews.querySelector('[data-review-previous]');
    const next = reviews.querySelector('[data-review-next]');
    const toggle = reviews.querySelector('[data-review-toggle]');
    const status = reviews.querySelector('[data-review-status]');
    let current = 0;
    let userPaused = false;
    let motionPaused = motionQuery.matches;
    let focusPaused = false;
    let timer = null;
    let touchStart = null;

    const isPaused = () => userPaused || motionPaused || focusPaused || document.hidden;
    const update = (index, announce = false) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, position) => {
        const offset = (position - current + slides.length) % slides.length;
        const place = offset === 0 ? 'active' : offset === 1 ? 'next' : offset === slides.length - 1 ? 'previous' : 'hidden';
        slide.dataset.position = place;
        slide.setAttribute('aria-hidden', String(place !== 'active'));
      });
      if (status) {
        status.textContent = `Review ${current + 1} of ${slides.length}: ${slides[current].dataset.reviewer}`;
        status.setAttribute('aria-live', announce ? 'polite' : 'off');
      }
    };
    const stop = () => {
      if (timer !== null) window.clearTimeout(timer);
      timer = null;
    };
    const schedule = () => {
      stop();
      if (toggle) {
        const pausedByPreference = motionPaused;
        const explicitlyPaused = userPaused || pausedByPreference;
        toggle.hidden = false;
        toggle.textContent = explicitlyPaused ? 'Resume reviews' : 'Pause reviews';
        toggle.setAttribute('aria-pressed', String(explicitlyPaused));
        toggle.setAttribute('aria-label', explicitlyPaused ? 'Resume automatic review rotation' : 'Pause automatic review rotation');
      }
      reviews.dataset.reviewPaused = String(isPaused());
      if (isPaused() || slides.length < 2) return;
      timer = window.setTimeout(() => {
        update(current + 1, false);
        schedule();
      }, 8000);
    };
    const interact = index => {
      userPaused = true;
      update(index, true);
      schedule();
    };

    previous?.addEventListener('click', () => interact(current - 1));
    next?.addEventListener('click', () => interact(current + 1));
    toggle?.addEventListener('click', () => {
      if (userPaused || motionPaused) {
        userPaused = false;
        motionPaused = false;
      } else {
        userPaused = true;
      }
      schedule();
    });
    reviews.addEventListener('focusin', () => {
      focusPaused = keyboardModality;
      schedule();
    });
    reviews.addEventListener('focusout', () => setTimeout(() => {
      focusPaused = reviews.contains(document.activeElement);
      schedule();
    }, 0));
    const resumeAfterPointerFocus = () => {
      keyboardModality = false;
      if (focusPaused) {
        focusPaused = false;
        schedule();
      }
    };
    reviews.addEventListener('pointerdown', resumeAfterPointerFocus);
    reviews.addEventListener('pointermove', resumeAfterPointerFocus, { passive: true });
    reviews.addEventListener('touchstart', resumeAfterPointerFocus, { passive: true });
    stage?.addEventListener('touchstart', event => {
      touchStart = event.changedTouches[0]?.clientX ?? null;
    }, { passive: true });
    stage?.addEventListener('touchend', event => {
      if (touchStart === null) return;
      const distance = event.changedTouches[0].clientX - touchStart;
      touchStart = null;
      if (Math.abs(distance) > 40) interact(current + (distance < 0 ? 1 : -1));
    }, { passive: true });
    reviews.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        interact(current - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        interact(current + 1);
      }
    });
    document.addEventListener('visibilitychange', schedule);
    motionQuery.addEventListener?.('change', event => {
      motionPaused = event.matches;
      schedule();
    });
    update(0);
    schedule();
  }

  const comparison = document.querySelector('[data-project-comparison]');
  const comparisonRange = comparison?.querySelector('.comparison-range');
  if (comparison && comparisonRange) {
    const updateComparison = () => {
      const value = Math.max(0, Math.min(100, Number(comparisonRange.value)));
      comparison.style.setProperty('--split', `${value}%`);
      comparisonRange.setAttribute('aria-valuetext', `Finished floor shown from the divider to the right: ${value}%`);
    };
    comparisonRange.addEventListener('input', updateComparison);
    comparisonRange.addEventListener('change', updateComparison);
    updateComparison();
  }

  const reviewToggle = document.querySelector('[data-spotlight-review-toggle]');
  const fullReview = document.querySelector('[data-spotlight-full-review]');
  const collapsedQuote = document.querySelector('[data-spotlight-collapsed-quote]');
  reviewToggle?.addEventListener('click', () => {
    const expanded = reviewToggle.getAttribute('aria-expanded') !== 'true';
    reviewToggle.setAttribute('aria-expanded', String(expanded));
    reviewToggle.textContent = expanded ? 'Show Less' : 'Read Ronald\'s Full Review';
    if (fullReview) fullReview.hidden = !expanded;
    if (collapsedQuote) collapsedQuote.hidden = expanded;
  });

  const revealItems = document.querySelectorAll('.reveal');
  if (motionQuery.matches || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const isLocalPreview = ['localhost', '127.0.0.1'].includes(window.location.hostname);

  const inquiryForms = document.querySelectorAll('[data-cct-inquiry]');
  inquiryForms.forEach(inquiryForm => {
    const formStatus = inquiryForm.querySelector('[data-form-status]');
    inquiryForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (isLocalPreview) {
        if (formStatus) formStatus.textContent = 'Local preview only. This form is not connected to email yet. Please call or email CCT instead.';
        return;
      }
      const submitButton = inquiryForm.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;
      if (formStatus) formStatus.textContent = 'Sending your inquiry...';
      try {
        const response = await fetch(inquiryForm.action || '/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(inquiryForm)).toString()
        });
        if (!response.ok) throw new Error('Form submission failed');
        inquiryForm.reset();
        if (formStatus) formStatus.textContent = 'Your inquiry was submitted. Email notification depends on the site configuration; Melissa will follow up soon.';
      } catch {
        if (formStatus) formStatus.textContent = 'We could not send your inquiry. Please call (401) 677-1000 or email melissa@concretecoatingtechnology.com.';
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  });

  const inquiryDialog = document.querySelector('[data-inquiry-dialog]');
  if (inquiryDialog) {
    const closeButtons = inquiryDialog.querySelectorAll('[data-close-inquiry]');
    let inquiryOpener = null;
    let inertState = [];
    const openInquiry = opener => {
      inquiryOpener = opener;
      inquiryDialog.hidden = false;
      document.body.classList.add('inquiry-dialog-open');
      inertState = [...document.body.children]
        .filter(element => element !== inquiryDialog)
        .map(element => ({ element, inert: element.inert, ariaHidden: element.getAttribute('aria-hidden') }));
      inertState.forEach(({ element }) => {
        element.inert = true;
        element.setAttribute('aria-hidden', 'true');
      });
      inquiryDialog.querySelector('[name="name"]')?.focus();
    };
    const closeInquiry = () => {
      if (inquiryDialog.hidden) return;
      inquiryDialog.hidden = true;
      document.body.classList.remove('inquiry-dialog-open');
      inertState.forEach(({ element, inert, ariaHidden }) => {
        element.inert = inert;
        if (ariaHidden === null) element.removeAttribute('aria-hidden');
        else element.setAttribute('aria-hidden', ariaHidden);
      });
      inquiryOpener?.focus();
      inquiryOpener = null;
    };
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (!link) return;
      const destination = new URL(link.href, window.location.href);
      const inquiryIntent = destination.pathname.replace(/\/$/, '') === '/contact-us'
        && (destination.hash === '#inquiry-form'
          || link.classList.contains('nav-cta')
          || link.classList.contains('button')
          || /request|estimate|contact melissa|talk with melissa|project inquiry/i.test(link.innerText));
      if (!inquiryIntent) return;
      event.preventDefault();
      openInquiry(link);
    });
    closeButtons.forEach(button => button.addEventListener('click', closeInquiry));
    inquiryDialog.addEventListener('click', event => {
      if (event.target === inquiryDialog) closeInquiry();
    });
    document.addEventListener('keydown', event => {
      if (inquiryDialog.hidden) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeInquiry();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [...inquiryDialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])')]
        .filter(element => !element.closest('[aria-hidden="true"]'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }
})();
