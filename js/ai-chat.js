const aiChatToggle = document.getElementById("aiChatToggle");
const aiChatWindow = document.getElementById("aiChatWindow");
const aiChatClose = document.getElementById("aiChatClose");

const aiChatInput = document.getElementById("aiChatInput");
const aiChatSend = document.getElementById("aiChatSend");
const aiChatMessages = document.getElementById("aiChatMessages");

aiChatToggle.addEventListener("click", () => {
    aiChatWindow.classList.toggle("active");
});

aiChatClose.addEventListener("click", () => {
    aiChatWindow.classList.remove("active");
});

function addMessage(message, type) {

    const messageElement = document.createElement("div");

    messageElement.className = `ai-message ${type}`;

    messageElement.textContent = message;

    aiChatMessages.appendChild(messageElement);

    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
}


async function sendMessage() {

    const message = aiChatInput.value.trim();

    if (!message) return;

    addMessage(message, "user");

    aiChatInput.value = "";


    // Loading message
    const loadingMessage = document.createElement("div");

    loadingMessage.className = "ai-message bot";

    loadingMessage.textContent = "Thinking... 🤖";

    aiChatMessages.appendChild(loadingMessage);


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


        // Remove loading message
        loadingMessage.remove();


        // Handle API errors gracefully
        if (!data.reply) {

            addMessage(
                "AI service is temporarily unavailable. Please try again later. 🤖",
                "bot"
            );

            return;
        }


        addMessage(
            data.reply,
            "bot"
        );


    } catch (error) {

        console.error(error);

        loadingMessage.remove();

        addMessage(
            "AI service is temporarily unavailable. Please try again later. 🤖",
            "bot"
        );
    }
}


aiChatSend.addEventListener("click", sendMessage);


aiChatInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        sendMessage();

    }

});