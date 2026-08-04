// Sticky Header Shadow on Scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,.1)";
  } else {
    header.style.boxShadow = "0 5px 20px rgba(0,0,0,.05)";
  }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Company Logos Active Toggle
document.addEventListener("DOMContentLoaded", () => {
  const logos = document.querySelectorAll('.company-logos div');

  logos.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active from all first
      logos.forEach(b => b.classList.remove('active'));
      // Add active only to the clicked one
      button.classList.add('active');
    });
  });

  // Remove glow when clicking outside logos
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.company-logos')) {
      logos.forEach(b => b.classList.remove('active'));
    }
  });

  // Remove glow when scrolling
  window.addEventListener('scroll', () => {
    logos.forEach(b => b.classList.remove('active'));
  });

  // Remove glow when switching tabs or losing focus
  window.addEventListener('blur', () => {
    logos.forEach(b => b.classList.remove('active'));
  });
});


