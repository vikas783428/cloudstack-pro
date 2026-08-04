document.addEventListener("DOMContentLoaded", () => {
  // Price toggle
  const toggle = document.getElementById("priceToggle");
  const prices = document.querySelectorAll(".price");

  if (toggle) {
    toggle.addEventListener("change", () => {
      prices.forEach(price => {
        price.textContent = toggle.checked
          ? "$" + price.dataset.year
          : "$" + price.dataset.month;
      });
    });
  }

  // Card selection
  const cards = document.querySelectorAll(".selectable");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(item => item.classList.remove("selected"));
      card.classList.add("selected");
    });
  });
});
