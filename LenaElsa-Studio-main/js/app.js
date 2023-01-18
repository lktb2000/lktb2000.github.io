window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.body.classList.add("is-loaded");
  }, 1000);

  fetch("./layout/menu.html")
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      document.getElementById("menu").innerHTML = data;

      document.getElementById("menu-toggle").addEventListener(
        "click",
        function () {
          this.classList.toggle("is-active");
          document.querySelector("aside").classList.toggle("is-open");
        },
        { passive: true }
      );

      document.querySelectorAll(".menu-title").forEach((title) => {
        title.addEventListener("click", function () {
          this.parentNode.classList.toggle("is-active");
        });
      });
    });

  fetch("./layout/header.html")
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      document.getElementById("header").innerHTML = data;

      function toggleTheme() {
        const theme = localStorage.getItem("theme");
        const htmlClassList = document.documentElement.classList;
        const isDark = theme === "dark";

        htmlClassList.toggle("dark", !isDark);
        htmlClassList.toggle("light", isDark);

        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      document
        .getElementById("theme-toggle")
        .addEventListener("click", toggleTheme, { passive: true });
    });

  const storagedTheme = localStorage.getItem("theme");
  const htmlClassList = document.documentElement.classList;
  const DARK = "dark";
  const LIGHT = "light";
  const isLight = storagedTheme === LIGHT;

  htmlClassList.toggle(LIGHT, isLight);
  htmlClassList.toggle(DARK, !isLight);

  if (!storagedTheme) {
    localStorage.setItem("theme", isLight ? LIGHT : DARK);
  }
});
