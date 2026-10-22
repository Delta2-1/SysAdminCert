/* SysAdmin Path interactions: theme, mobile navigation, filters, footer year. */
(() => {
  "use strict";
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const menuToggle = document.getElementById("menuToggle");
  const menuIcon = document.getElementById("menuIcon");
  const mainNav = document.getElementById("mainNav");

  function readSavedTheme() {
    try { return localStorage.getItem("sysadmin-path-theme"); }
    catch (error) { return null; }
  }
  function saveTheme(theme) {
    try { localStorage.setItem("sysadmin-path-theme", theme); }
    catch (error) { /* Theme still works for this page view if storage is unavailable. */ }
  }
  function updateThemeControl() {
    const light = root.dataset.theme === "light";
    themeIcon.textContent = light ? "☾" : "☼";
    themeToggle.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
    themeToggle.title = light ? "Switch to dark mode" : "Switch to light mode";
  }
  const savedTheme = readSavedTheme();
  if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;
  updateThemeControl();

  themeToggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    saveTheme(root.dataset.theme);
    updateThemeControl();
  });

  function closeMenu() {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuIcon.textContent = "☰";
  }
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuIcon.textContent = isOpen ? "×" : "☰";
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) closeMenu();
  });

  const filters = document.querySelectorAll(".filter-button");
  const cards = document.querySelectorAll(".cert-card");
  filters.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filters.forEach(item => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      cards.forEach(card => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    });
  });

  document.getElementById("year").textContent = String(new Date().getFullYear());
})();
