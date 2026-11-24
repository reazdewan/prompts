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

  // Pages that run their own search (the prompt library) set data-own-search on <body>.
  if (body.dataset.ownSearch !== undefined) return;
  const q = document.getElementById("q");
  if (!q) return;
  document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement !== q && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); q.focus(); }
  });
})();
