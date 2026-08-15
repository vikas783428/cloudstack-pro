document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // Payment Result Modal
    // =========================================================

    const paymentModal =
        document.getElementById("paymentResultModal");

    const paymentCard =
        paymentModal?.querySelector(".payment-result-card");

    const paymentIcon =
        document.getElementById("paymentResultIcon");

    const paymentTitle =
        document.getElementById("paymentResultTitle");

    const paymentMessage =
        document.getElementById("paymentResultMessage");

    const paymentDetails =
        document.getElementById("paymentResultDetails");

    const paymentAction =
        document.getElementById("paymentResultAction");

    const paymentClose =
        document.getElementById("closePaymentResult");

    function closePaymentModal() {
        if (!paymentModal) {
            return;
        }

        paymentModal.classList.remove("show");
        paymentModal.setAttribute("aria-hidden", "true");
    }

    function showPaymentResult(type, title, message, details = {}) {
        if (!paymentModal || !paymentCard) {
            return;
        }

        paymentCard.classList.remove("success", "failure");
        paymentCard.classList.add(type);

        paymentIcon.textContent =
            type === "success" ? "SUCCESS" : "FAILED";

        paymentTitle.textContent = title;
        paymentMessage.textContent = message;

        paymentDetails.innerHTML = "";

        Object.entries(details).forEach(([label, value]) => {
            const row = document.createElement("div");

            row.className = "payment-result-detail";

            row.innerHTML = `
                <span>${label}</span>
                <strong>${value}</strong>
            `;

            paymentDetails.appendChild(row);
        });

        paymentModal.classList.add("show");
        paymentModal.setAttribute("aria-hidden", "false");
    }

    paymentClose?.addEventListener(
        "click",
        closePaymentModal
    );

    paymentAction?.addEventListener(
        "click",
        closePaymentModal
    );

    paymentModal?.addEventListener(
        "click",
        (event) => {
            if (event.target === paymentModal) {
                closePaymentModal();
            }
        }
    );

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

                    handler: async function (paymentResponse) {
                        try {
                            const verifyResponse = await fetch(
                                "/api/verify-payment",
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        razorpay_order_id:
                                            paymentResponse.razorpay_order_id,

                                        razorpay_payment_id:
                                            paymentResponse.razorpay_payment_id,

                                        razorpay_signature:
                                            paymentResponse.razorpay_signature
                                    })
                                }
                            );

                            const verification = await verifyResponse.json();

                            if (!verifyResponse.ok || !verification.success) {
                                throw new Error(
                                    verification.error ||
                                    "Payment verification failed."
                                );
                            }

                            console.log(
                                "Payment verified:",
                                verification
                            );

                            showPaymentResult(
                                "success",
                                "Payment Successful",
                                "Your payment has been verified successfully. Thank you for choosing CloudStack Pro.",
                                {
                                    "Plan": plan,
                                    "Payment ID": verification.paymentId,
                                    "Order ID": verification.orderId
                                }
                            );

                        } catch (error) {
                            console.error(
                                "Payment Verification Error:",
                                error
                            );

                            showPaymentResult(
                                "failure",
                                "Payment Verification Failed",
                                "We could not verify this payment. Please contact support if money was deducted.",
                                {
                                    "Plan": plan,
                                    "Status": "Verification failed"
                                }
                            );
                        }
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
