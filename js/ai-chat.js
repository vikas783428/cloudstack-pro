const aiChatToggle = document.getElementById("aiChatToggle");
const aiChatWindow = document.getElementById("aiChatWindow");
const aiChatClose = document.getElementById("aiChatClose");
const aiChatInput = document.getElementById("aiChatInput");
const aiChatSend = document.getElementById("aiChatSend");
const aiChatMessages = document.getElementById("aiChatMessages");

let welcomeShown = false;

// Open chatbot
aiChatToggle.addEventListener("click", () => {
    aiChatWindow.classList.toggle("active");
    if (!welcomeShown) {
        addMessage(
            "Hi 👋 I'm CloudStack AI.\n\nI can help you with cloud solutions, DevOps, Kubernetes, migration, and security services.",
            "bot"
        );
        addQuickButtons();
        welcomeShown = true;
    }
});

aiChatClose.addEventListener("click", () => {
    aiChatWindow.classList.remove("active");
});

// Add chat message
function addMessage(message, type) {
    const messageElement = document.createElement("div");
    messageElement.className = `ai-message ${type}`;
    messageElement.textContent = message;
    aiChatMessages.appendChild(messageElement);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
}

// Quick action buttons
function addQuickButtons() {
    const container = document.createElement("div");
    container.className = "ai-quick-buttons";
    const buttons = ["Cloud Migration", "DevOps Services", "Kubernetes Solutions", "Contact Sales"];
    buttons.forEach(text => {
        const button = document.createElement("button");
        button.textContent = text;
        button.addEventListener("click", () => {
            aiChatInput.value = text;
            sendMessage();
        });
        container.appendChild(button);
    });
    aiChatMessages.appendChild(container);
}

// Send message
async function sendMessage() {
    const message = aiChatInput.value.trim();
    if (!message) return;

    addMessage(message, "user");
    aiChatInput.value = "";

    const loadingMessage = document.createElement("div");
    loadingMessage.className = "ai-message bot";
    loadingMessage.textContent = "CloudStack AI is typing... 🤖";
    aiChatMessages.appendChild(loadingMessage);

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        loadingMessage.remove();
        addMessage(
            data.reply || "AI service is temporarily unavailable. Please try again later. 🤖",
            "bot"
        );
    } catch (error) {
        console.error(error);
        loadingMessage.remove();
        addMessage("AI service is temporarily unavailable. Please try again later. 🤖", "bot");
    }
}

aiChatSend.addEventListener("click", sendMessage);

aiChatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
