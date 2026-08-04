document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("success-message");

  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    })
      .then(response => {
        if (response.ok) {
          successMessage.style.display = "block";
          successMessage.innerHTML = "✅ Thank you! Your message has been sent successfully.";
          form.reset();
        } else {
          alert("❌ Something went wrong. Please try again.");
        }
      })
      .catch(() => {
        alert("❌ Network error. Please try again.");
      });
  });
});
