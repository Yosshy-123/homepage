document.addEventListener("DOMContentLoaded", () => {

  const logo = document.getElementById("logoImg");
  const cards = document.querySelectorAll(".project-card");

  // Logo entrance animation
  if (logo) {
    logo.style.opacity = 0;
    logo.style.transform = "scale(0.85)";
    logo.style.transition = "all 600ms cubic-bezier(.22,.9,.35,1)";

    requestAnimationFrame(() => {
      logo.style.opacity = 1;
      logo.style.transform = "scale(1)";
    });
  }

  // Scroll reveal animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  cards.forEach(card => {
    card.style.transition = "all 700ms cubic-bezier(.2,.9,.3,1)";
    observer.observe(card);

    // show pointer for anchors (if card is an <a>)
    if (card.tagName.toLowerCase() === 'a') {
      card.style.cursor = 'pointer';
    }
  });

});
