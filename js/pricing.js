document.addEventListener("DOMContentLoaded", () => {
    // Price toggle
    const toggle = document.getElementById("priceToggle");
    const prices = document.querySelectorAll(".price");

    if (toggle) {
        toggle.addEventListener("change", () => {
            prices.forEach((price) => {
                price.textContent = toggle.checked
                    ? "$" + price.dataset.year
                    : "$" + price.dataset.month;
            });
        });
    }

    // Card selection
    const cards = document.querySelectorAll(".selectable");

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            cards.forEach((item) => {
                item.classList.remove("selected");
            });

            card.classList.add("selected");
        });
    });

    // Razorpay plan prices
    const PLAN_PRICES = {
        Starter: 1599,
        Professional: 4099,
        Enterprise: 16599
    };

    // Razorpay checkout buttons
    const buttons = document.querySelectorAll(
        ".price-card .btn-primary"
    );

    buttons.forEach((button) => {
        button.addEventListener("click", async (event) => {
            event.preventDefault();

            const card = button.closest(".price-card");

            if (!card) {
                return;
            }

            const planElement = card.querySelector("h2");

            if (!planElement) {
                return;
            }

            const plan = planElement.textContent.trim();
            const amount = PLAN_PRICES[plan];

            if (!amount) {
                alert("Invalid plan selected.");
                return;
            }

            if (typeof Razorpay === "undefined") {
                alert(
                    "Payment system is not loaded. Please refresh the page."
                );
                return;
            }

            try {
                button.disabled = true;
                button.textContent = "Processing...";

                const response = await fetch("/api/create-order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        plan: plan
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Unable to create payment order."
                    );
                }

                const options = {
                    key: "rzp_test_TOAarLLImu64LT",
                    amount: data.amount,
                    currency: data.currency,
                    name: "CloudStack Pro",
                    description: plan + " Plan",
                    order_id: data.orderId,

                    handler: function (paymentResponse) {
                        console.log(
                            "Payment successful:",
                            paymentResponse
                        );

                        alert(
                            "Payment successful! Thank you for choosing CloudStack Pro."
                        );
                    },

                    theme: {
                        color: "#2563eb"
                    },

                    modal: {
                        ondismiss: function () {
                            console.log(
                                "Razorpay checkout closed."
                            );
                        }
                    }
                };

                const razorpay = new Razorpay(options);

                razorpay.open();

            } catch (error) {
                console.error("Payment Error:", error);

                alert(
                    error.message ||
                    "Unable to start payment. Please try again."
                );

            } finally {
                button.disabled = false;

                if (plan === "Starter") {
                    button.textContent = "Get Started";
                } else if (plan === "Professional") {
                    button.textContent = "Choose Plan";
                } else if (plan === "Enterprise") {
                    button.textContent = "Contact Sales";
                }
            }
        });
    });
});