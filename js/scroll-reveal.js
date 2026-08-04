document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight;

    reveals.forEach(section => {
      const revealTop = section.getBoundingClientRect().top;

      if (revealTop < windowHeight - 100) {
        section.classList.add("active");
      }
    });
  });
});
