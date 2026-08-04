document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".read-more");
  const modal = document.getElementById("infoModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const closeBtn = document.getElementById("closeModal");

  console.log("Resources JS Loaded");

  // Open modal when any "read-more" button is clicked
  buttons.forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault();
      console.log("Button clicked");

      modalTitle.textContent = button.dataset.title;
      modalText.textContent = button.dataset.info;
      modal.style.display = "flex";
    });
  });

  // Close modal when close button is clicked
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside of modal content
  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
