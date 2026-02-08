// Remove no-js class so CSS knows JS is running
document.body.classList.remove("no-js");

// Smooth scroll for all buttons with data-scroll
const scrollButtons = document.querySelectorAll("[data-scroll]");

scrollButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-scroll");
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  // Fallback: just show everything
  revealEls.forEach((el) => el.classList.add("in-view"));
}

// Active nav highlighting
const navLinks = document.querySelectorAll(".nav-link");
const sectionIds = ["intro", "impact", "buffer-now", "plan", "resources"];
const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

function updateActiveNav() {
  const scrollPos = window.scrollY;
  let activeId = "intro";

  sections.forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    if (scrollPos >= top - 140) {
      activeId = sec.id;
    }
  });

  navLinks.forEach((link) => {
    const target = link.getAttribute("data-scroll");
    if (target === activeId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

