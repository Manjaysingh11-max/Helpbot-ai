document.addEventListener("DOMContentLoaded", function () {
    const chatIcon = document.getElementById("chat-icon");
    const chatContainer = document.getElementById("chat-container");
    const chatBody = document.getElementById("chat-body");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");

    // Toggle chatbot visibility
    chatIcon.addEventListener("click", function () {
        chatContainer.style.display = chatContainer.style.display === "none" ? "flex" : "none";
    });

    // Send message on button click
    sendButton.addEventListener("click", sendMessage);

    // Send message on Enter key press
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent new line
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();

        if (message === "") return; // Prevent empty messages

        // Display user message
        appendMessage("user", message);
        userInput.value = ""; // Clear input

        // Show bot thinking animation
        showBotThinking();

        // Simulate API call delay
        setTimeout(() => {
            fetchChatGPTResponse(message);
        }, 2000); // Simulating 2-second delay for API response
    }

    function showBotThinking() {
        const botThinking = document.createElement("div");
        botThinking.id = "bot-thinking";
        botThinking.classList.add("bot-message");
        botThinking.innerHTML = `<div class="typing-dots">
            <span></span><span></span><span></span>
        </div>`;

        chatBody.appendChild(botThinking);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function fetchChatGPTResponse(userMessage) {
        const apiKey = "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"; // Replace with your actual OpenAI API Key
        const apiUrl = "https://api.openai.com/v1/chat/completions";

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: userMessage }],
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Remove bot thinking animation
            document.getElementById("bot-thinking").remove();

            // Get bot response
            const botReply = data.choices[0].message.content;
            appendMessage("bot", botReply);
        })
        .catch(error => {
            console.error("Error fetching ChatGPT response:", error);
            document.getElementById("bot-thinking").remove();
            appendMessage("bot", "Oops! Something went wrong. Please try again.");
        });
    }

    function appendMessage(sender, text) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
        messageDiv.innerText = text;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
});
