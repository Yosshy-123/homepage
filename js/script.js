document.addEventListener("DOMContentLoaded", () => {

  const logo = document.querySelector(".logo");
  const cards = document.querySelectorAll(".project-card");

  /* -----------------------
     Logo animation
  ----------------------- */

  if (logo) {
    requestAnimationFrame(() => {
      logo.classList.add("logo-visible");
    });
  }

  /* -----------------------
     Scroll reveal
  ----------------------- */

  const observer = new IntersectionObserver((entries, obs) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      entry.target.classList.add("card-visible");
      obs.unobserve(entry.target);

    });

  }, { threshold: 0.18 });

  cards.forEach(card => observer.observe(card));

});
