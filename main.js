// main.js — lightweight site enhancements (reveal + count-up)

console.log("[main.js] Loaded ✅");

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Scroll Reveal Animation
  // =========================
  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length) {
    if (!("IntersectionObserver" in window)) {
      // Fallback: show everything if the browser is very old
      revealElements.forEach((el) => el.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target); // reveal only once
            }
          });
        },
        {
          threshold: 0.15, // reveal when 15% visible
          rootMargin: "0px 0px -60px 0px",
        }
      );

      revealElements.forEach((el) => revealObserver.observe(el));
    }
  }

  // =========================
  // Impact Strip Count-Up on Scroll
  // =========================
  const numbers = document.querySelectorAll(".impact-number[data-count]");
  if (!numbers.length) return;

  const formatNumber = (n) => Math.round(n).toLocaleString();

  function animateCount(el, to, duration = 1200) {
    const startTime = performance.now();
    const suffix = el.getAttribute("data-suffix") || "";

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = to * eased;
      el.textContent = formatNumber(current) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  // fallback for old browsers
  if (!("IntersectionObserver" in window)) {
    numbers.forEach((el) => {
      const to = Number(el.getAttribute("data-count")) || 0;
      const suffix = el.getAttribute("data-suffix") || "";
      el.textContent = formatNumber(to) + suffix;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const to = Number(el.getAttribute("data-count")) || 0;
        if (!el.dataset.animated) {
          el.dataset.animated = "true";
          animateCount(el, to, 1200);
        }
        obs.unobserve(el);
      });
    },
    { threshold: 0.35, rootMargin: "0px 0px -40px 0px" }
  );

  numbers.forEach((el) => observer.observe(el));
});
