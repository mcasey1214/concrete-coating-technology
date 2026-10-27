/**
 * Project Shell — Main JavaScript
 *
 * Minimal functionality only:
 * - Navigation menu toggle
 * - Accordion expand/collapse
 * - Footer year auto-update
 */

// ============================================================
// NAVIGATION MENU TOGGLE
// ============================================================

(function() {
  const toggle = document.querySelector('.nav-menu-toggle');
  const nav = document.getElementById('nav-menu');

  if (!toggle || !nav) return;

  // Toggle menu on button click
  toggle.addEventListener('click', function() {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isExpanded);
  });

  // Close menu when a link is clicked
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on Escape key. Focus inside the menu would be left on a hidden link,
  // so it returns to the toggle button.
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      const focusWasInMenu = nav.contains(document.activeElement);
      toggle.setAttribute('aria-expanded', 'false');
      if (focusWasInMenu) toggle.focus();
    }
  });
})();

// ============================================================
// FAQ ACCORDION
// ============================================================

(function() {
  const accordionButtons = document.querySelectorAll('.accordion-button');

  accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const contentId = this.getAttribute('aria-controls');
      const content = document.getElementById(contentId);

      // Toggle expanded state
      this.setAttribute('aria-expanded', !isExpanded);

      // Toggle content visibility
      if (!isExpanded) {
        content.removeAttribute('hidden');
      } else {
        content.setAttribute('hidden', '');
      }

      // Close other accordion items (optional: comment out for allow-multiple behavior)
      accordionButtons.forEach(otherButton => {
        if (otherButton !== this && otherButton.getAttribute('aria-expanded') === 'true') {
          otherButton.setAttribute('aria-expanded', 'false');
          const otherContentId = otherButton.getAttribute('aria-controls');
          const otherContent = document.getElementById(otherContentId);
          otherContent.setAttribute('hidden', '');
        }
      });
    });

    // Allow Enter/Space to expand accordion
    button.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.click();
      }
    });
  });
})();

// ============================================================
// FOOTER YEAR AUTO-UPDATE
// ============================================================

(function() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();
