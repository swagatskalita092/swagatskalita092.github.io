// Scroll-triggered reveals + failure-sequence diagram playback.
// No frameworks — plain IntersectionObserver, runs once per element.

document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal, .failure-seq');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Current year in footer
  const yearEls = document.querySelectorAll('[data-year]');
  yearEls.forEach((el) => { el.textContent = new Date().getFullYear(); });

  // Mobile nav toggle — the capsule holds two separate <ul class="nav-links">
  // groups either side of the brand, so the toggle opens/closes the whole
  // capsule rather than a single list.
  const navToggle = document.querySelector('.nav-toggle');
  const navCapsule = document.querySelector('.nav-capsule');
  if (navToggle && navCapsule) {
    navToggle.addEventListener('click', () => {
      const open = navCapsule.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navCapsule.querySelectorAll('.nav-links a').forEach((a) => {
      a.addEventListener('click', () => navCapsule.classList.remove('is-open'));
    });
  }
});
