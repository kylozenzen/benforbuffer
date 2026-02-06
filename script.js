// script.js

// Simple active-state handling for nav links as you scroll
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    const scrollPos = window.scrollY + 120; // offset for header

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach((link) => {
          link.classList.remove('text-sky-300');
          link.classList.remove('font-semibold');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-sky-300');
            link.classList.add('font-semibold');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll);
  onScroll();
});
