// Theme toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const sunPath =
  '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
const moonPath = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>';

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  themeIcon.innerHTML = isDark ? sunPath : moonPath;
});

// Nav overlay
const navToggle = document.getElementById("navToggle");
const navClose = document.getElementById("navClose");
const navOverlay = document.getElementById("navOverlay");

function toggleNav(open) {
  navOverlay.classList.toggle("open", open);
}
navToggle.addEventListener("click", () => toggleNav(true));
navClose.addEventListener("click", () => toggleNav(false));
document
  .querySelectorAll("[data-nav]")
  .forEach((a) => a.addEventListener("click", () => toggleNav(false)));

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in");
    });
  },
  { threshold: 0.15 },
);
revealEls.forEach((el) => observer.observe(el));
