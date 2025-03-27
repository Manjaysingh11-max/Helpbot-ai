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
document.getElementById("send-btn").addEventListener("click", function () {
    let userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    let chatBody = document.getElementById("chat-body");

    // Add user's message
    let userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.textContent = userInput;
    chatBody.appendChild(userMessage);

    // Clear input
    document.getElementById("user-input").value = "";

    // Show bot "thinking" animation
    let typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typing");
    typingIndicator.innerHTML = "<span></span><span></span><span></span>";
    chatBody.appendChild(typingIndicator);

    chatBody.scrollTop = chatBody.scrollHeight;

    // Simulate API request delay (replace with real API call)
    setTimeout(() => {
        chatBody.removeChild(typingIndicator); // Remove typing animation

        // Fake bot response (replace with OpenAI API response)
        let botMessage = document.createElement("div");
        botMessage.classList.add("bot-message");
        botMessage.textContent = "🤖 Thinking... (Replace this with OpenAI API response)";
        chatBody.appendChild(botMessage);

        chatBody.scrollTop = chatBody.scrollHeight;
    }, 2000); // Simulating a delay of 2 seconds
});
