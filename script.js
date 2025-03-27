// Toggle chatbox visibility
function toggleChat() {
    let chatContainer = document.getElementById("chat-container");
    chatContainer.style.display = chatContainer.style.display === "none" || chatContainer.style.display === "" ? "block" : "none";
}

// Send message when pressing Enter
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Send user message
async function sendMessage() {
    let inputField = document.getElementById("user-input");
    let userMessage = inputField.value.trim();
    if (userMessage === "") return;

    let chatBody = document.getElementById("chat-body");

    // Add user message
    let userMsgElement = document.createElement("div");
    userMsgElement.classList.add("user-message");
    userMsgElement.textContent = userMessage;
    chatBody.appendChild(userMsgElement);

    inputField.value = "";

    let userLang = await detectLanguage(userMessage);

    let response = await fetch("chatbot.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, lang: userLang })
    });

    let data = await response.json();

    // Add bot response
    let botMsgElement = document.createElement("div");
    botMsgElement.classList.add("bot-message");
    botMsgElement.textContent = data.reply;
    chatBody.appendChild(botMsgElement);

    chatBody.scrollTop = chatBody.scrollHeight;
}
