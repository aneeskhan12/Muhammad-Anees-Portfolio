/* Muhammad Anees — portfolio interactivity: theme toggle, mobile drawer, scroll reveal. */
(function () {
  "use strict";

  var root = document.documentElement;
  var THEME_KEY = "ma-portfolio-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var btn = document.getElementById("themeFlip");
    if (btn) btn.textContent = theme === "light" ? "☾" : "☀";
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* storage may be unavailable */ }
    if (saved === "light" || saved === "dark") {
      applyTheme(saved);
    } else {
      applyTheme("dark");
    }
    var btn = document.getElementById("themeFlip");
    if (btn) {
      btn.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
        applyTheme(next);
        try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
      });
    }
  }

  function initDrawer() {
    var menuBtn = document.getElementById("menuFlip");
    var drawer = document.getElementById("drawer");
    if (!menuBtn || !drawer) return;
    menuBtn.addEventListener("click", function () {
      drawer.classList.toggle("open");
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { drawer.classList.remove("open"); });
    });
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach(function (el) { obs.observe(el); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initDrawer();
    initReveal();
  });
})();
