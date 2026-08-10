const aiChatToggle = document.getElementById("aiChatToggle");
const aiChatWindow = document.getElementById("aiChatWindow");
const aiChatClose = document.getElementById("aiChatClose");
const aiChatInput = document.getElementById("aiChatInput");
const aiChatSend = document.getElementById("aiChatSend");
const aiChatMessages = document.getElementById("aiChatMessages");
const newChatBtn = document.getElementById("newChatBtn");
const aiTyping = document.getElementById("aiTyping");

let welcomeShown = false;


// ================================
// OPEN CHATBOT
// ================================

aiChatToggle.addEventListener("click", () => {
    aiChatWindow.classList.toggle("active");
});


// ================================
// CLOSE CHATBOT
// ================================

aiChatClose.addEventListener("click", () => {
    aiChatWindow.classList.remove("active");
});


// ================================
// ADD MESSAGE
// ================================

function addMessage(message, type) {

    const messageElement = document.createElement("div");

    messageElement.className = `ai-message ${type}`;

    messageElement.textContent = message;

    aiChatMessages.appendChild(messageElement);

    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
}


// ================================
// SHOW TYPING INDICATOR
// ================================

function showTyping() {

    if (aiTyping) {
        aiTyping.style.display = "flex";

        aiChatMessages.scrollTop =
            aiChatMessages.scrollHeight;
    }
}


// ================================
// HIDE TYPING INDICATOR
// ================================

function hideTyping() {

    if (aiTyping) {
        aiTyping.style.display = "none";
    }
}


// ================================
// SEND MESSAGE
// ================================

async function sendMessage() {

    const message = aiChatInput.value.trim();

    if (!message) return;

    if (aiChatSend.disabled) return;


    // Disable send button
    aiChatSend.disabled = true;


    // Add user message
    addMessage(message, "user");


    // Clear input
    aiChatInput.value = "";


    // Show typing animation
    showTyping();


    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });


        const data = await response.json();


        // Hide typing animation
        hideTyping();


        // Check response
        if (!data.reply) {

            addMessage(
                "AI service is temporarily unavailable. Please try again later. 🤖",
                "bot"
            );

            return;
        }


        // Add AI response
        addMessage(data.reply, "bot");


    } catch (error) {

        console.error("AI Error:", error);


        // Hide typing animation
        hideTyping();


        addMessage(
            "AI service is temporarily unavailable. Please try again later. 🤖",
            "bot"
        );

    } finally {

        // Re-enable send button
        setTimeout(() => {

            aiChatSend.disabled = false;

        }, 4000);

    }
}


// ================================
// QUICK ACTION BUTTONS
// ================================

document
    .querySelectorAll(".ai-quick-buttons button")
    .forEach((button) => {

        button.addEventListener("click", () => {

            const question =
                button.textContent.trim();


            if (!question || aiChatSend.disabled) {
                return;
            }


            aiChatInput.value = question;


            sendMessage();

        });

    });


// ================================
// SEND BUTTON
// ================================

aiChatSend.addEventListener(
    "click",
    sendMessage
);


// ================================
// ENTER KEY
// ================================

aiChatInput.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            !aiChatSend.disabled
        ) {

            sendMessage();

        }

    }
);


// ================================
// NEW CHAT
// ================================

if (newChatBtn) {

    newChatBtn.addEventListener(
        "click",
        () => {

            startNewChat();

        }
    );

}


// ================================
// LOAD SAVED CHAT
// ================================

loadChatHistory();