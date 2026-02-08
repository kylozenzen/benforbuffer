// Smooth scroll for top nav + hero buttons
const scrollTriggers = document.querySelectorAll("[data-scroll]");

scrollTriggers.forEach((el) => {
  el.addEventListener("click", () => {
    const targetId = el.getAttribute("data-scroll");
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Card "More context" toggles
const cardToggles = document.querySelectorAll(".card-toggle");

cardToggles.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const deep = document.getElementById(targetId);
    if (!deep) return;

    const isOpen = deep.classList.contains("open");
    deep.classList.toggle("open", !isOpen);
    btn.textContent = isOpen ? "More context" : "Less context";
  });
});

// Inline deep toggle
const inlineToggles = document.querySelectorAll(".inline-toggle");

inlineToggles.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const panel = document.getElementById(targetId);
    if (!panel) return;

    const isOpen = panel.classList.contains("open");
    panel.classList.toggle("open", !isOpen);
    btn.textContent = isOpen
      ? "How this matches Buffer today"
      : "Hide details";
  });
});
