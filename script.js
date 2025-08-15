/* Small progressive enhancements only */

// Current year in footer
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Smooth-scroll for same-page anchor links (accessibility-friendly)
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').substring(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', `#${id}`);
      target.setAttribute('tabindex', '-1'); // focusable
      target.focus({ preventScroll: true });
    }
  });
});

// NEW: mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelectorAll('.site-nav a');

  if (header && toggle) {
    toggle.addEventListener('click', () => {
      const open = header.getAttribute('data-nav-open') === 'true';
      header.setAttribute('data-nav-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });
    links.forEach(a => a.addEventListener('click', () => {
      header.setAttribute('data-nav-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }
});
