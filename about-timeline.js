(() => {
  const buttons = Array.from(document.querySelectorAll(".year-btn"));
  const panels  = Array.from(document.querySelectorAll(".story-panel"));
  const arrows  = Array.from(document.querySelectorAll(".rail-arrow"));

  const years = buttons.map(b => b.dataset.year);

  function setActiveYear(year) {
    // buttons
    buttons.forEach(b => {
      const on = b.dataset.year === year;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });

    // panels
    panels.forEach(p => {
      const on = p.id === `panel-${year}`;
      p.classList.toggle("is-active", on);
      p.hidden = !on;
    });
  }

  function currentIndex() {
    const active = document.querySelector(".year-btn.is-active");
    return Math.max(0, years.indexOf(active?.dataset.year));
  }

  // click year
  buttons.forEach(b => {
    b.addEventListener("click", () => setActiveYear(b.dataset.year));
  });

  // click arrows
  arrows.forEach(a => {
    a.addEventListener("click", () => {
      const dir = Number(a.dataset.dir); // -1 or +1
      let i = currentIndex() + dir;
      if (i < 0) i = years.length - 1;
      if (i >= years.length) i = 0;
      setActiveYear(years[i]);
    });
  });

  // init
  const firstActive = document.querySelector(".year-btn.is-active")?.dataset.year || years[0];
  setActiveYear(firstActive);
})();
