// Motion View app shell: mobile menu, "/" to focus search, and search that sends you to the prompt library.
(function () {
  const body = document.body;
  const menu = document.getElementById("menu");
  const side = document.getElementById("side");
  const scrim = document.getElementById("scrim");
  const close = () => { body.classList.remove("nav-open"); if (scrim) scrim.hidden = true; if (menu) menu.setAttribute("aria-expanded", "false"); };
  const open = () => { body.classList.add("nav-open"); if (scrim) scrim.hidden = false; if (menu) menu.setAttribute("aria-expanded", "true"); };
  if (menu) menu.addEventListener("click", () => body.classList.contains("nav-open") ? close() : open());
  if (scrim) scrim.addEventListener("click", close);
  const sx = document.getElementById("side-x"); if (sx) sx.addEventListener("click", close);
  if (side) side.addEventListener("click", e => { if (e.target.closest("a")) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });

  // On phones, open the menu once on the first visit so people see it is there, then close it.
  try {
    if (menu && window.matchMedia("(max-width:900px)").matches && !localStorage.getItem("mv-menu-seen")) {
      localStorage.setItem("mv-menu-seen", "1");
      let touched = false;
      if (side) side.addEventListener("pointerdown", () => { touched = true; }, {once: true});
      setTimeout(() => {
        body.classList.add("nav-peek"); open();
        setTimeout(() => {
          if (!touched) close();
          setTimeout(() => body.classList.remove("nav-peek"), 600);
        }, 1800);
      }, 700);
    }
  } catch (e) {}

  // Pages that run their own search (the prompt library) set data-own-search on <body>.
  if (body.dataset.ownSearch !== undefined) return;
  const q = document.getElementById("q");
  if (!q) return;
  document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement !== q && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); q.focus(); }
  });
})();
