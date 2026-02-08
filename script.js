// Basic enhancements only. Content is fully readable without JS.

// 1. Mark JS enabled so CSS can animate
document.body.classList.remove("no-js");

// 2. Smooth scroll for nav + buttons with data-scroll
const scrollTriggers = document.querySelectorAll("[data-scroll]");

scrollTriggers.forEach((el) => {
  el.addEventListener("click", () => {
    const id = el.getAttribute("data-scroll");
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// 3. IntersectionObserver for section reveal
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
      threshold: 0.18,
    }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in-view"));
}

// 4. Active state on left-nav links
const navLinks = document.querySelectorAll(".rail-link");
const sectionIds = ["hero", "impact", "plan", "timeline", "links"];
const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

function updateActiveNav() {
  const scrollPosition = window.scrollY;
  let activeId = "hero";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    if (scrollPosition >= top - 150) {
      activeId = section.id;
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

// 5. Deep-dive toggle logic
const deepButtons = document.querySelectorAll(".deep-toggle, .deep-toggle-wide");

deepButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const panel = document.getElementById(targetId);
    if (!panel) return;

    const isOpen = panel.classList.contains("open");

    // Close any other deep dives inside the same parent panel
    const parentPanel = btn.closest(".panel");
    if (parentPanel) {
      const allDeep = parentPanel.querySelectorAll(".deep-dive.open");
      allDeep.forEach((d) => {
        if (d !== panel) {
          d.classList.remove("open");
        }
      });
    }

    if (isOpen) {
      panel.classList.remove("open");
      btn.textContent = btn.textContent.replace("↑", "↓");
    } else {
      panel.classList.add("open");
      btn.textContent = btn.textContent.replace("↓", "↑");
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
});
