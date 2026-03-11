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

// Ticket chooser modal
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('tickets-modal');
  const openButtons = document.querySelectorAll('[data-open-ticket-modal]');
  const closeButtons = document.querySelectorAll('[data-close-ticket-modal]');
  const navToggle = document.querySelector('.nav-toggle');
  const header = document.querySelector('.site-header');
  const closeButton = modal?.querySelector('.ticket-modal-close');
  const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  if (!modal || !openButtons.length || !closeButton) return;

  const trapFocus = e => {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(modal.querySelectorAll(focusableSelector));
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('ticket-modal-open');
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused) lastFocused.focus();
  };

  const onKeydown = e => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }
    trapFocus(e);
  };

  const openModal = () => {
    lastFocused = document.activeElement;
    if (header) header.setAttribute('data-nav-open', 'false');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('ticket-modal-open');
    closeButton.focus();
    document.addEventListener('keydown', onKeydown);
  };

  openButtons.forEach(button => button.addEventListener('click', openModal));
  closeButtons.forEach(button => button.addEventListener('click', closeModal));
  modal.querySelectorAll('.ticket-option').forEach(link => {
    link.addEventListener('click', closeModal);
  });
});
