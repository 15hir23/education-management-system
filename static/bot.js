document.addEventListener("DOMContentLoaded", () => {
    const chatbotIcon = document.getElementById("chatbot-icon");
    const chatPopup = document.getElementById("chat-popup");
    const closeBtn = document.getElementById("close-btn");
    const sendBtn = document.getElementById("send-btn");
    const askBtn = document.getElementById("ask-btn");
    const userInput = document.getElementById("user-input");
    const chatHistory = document.getElementById("chat-history");
    const questionSelect = document.getElementById("question-select");

    // Predefined questions and answers for Christ University
    const responses = {
        "How do I apply to Christ University?": "To apply to Christ University, visit the official admissions portal, fill in your details, and submit the necessary documents.",
        "What is the eligibility for the B.Sc. Computer Science course?": "The eligibility criteria for B.Sc. Computer Science includes passing 10+2 with Mathematics as one of the subjects.",
        "What are the available scholarships?": "Christ University offers scholarships based on merit and financial need. Visit our scholarship section on the official website for more details.",
        "How do I access the student portal?": "You can access the student portal via the university's main website by using your student ID and password.",
        "What is the contact email for admissions?": "For admissions queries, you can contact admissions@christuniversity.in."
    };

    // List of words to block (vulgar/invalid)
    const blockedWords = ["badword1", "badword2", "vulgarword"];  // Replace with actual words you want to block

    // Helper function to check for blocked words
    function containsBlockedWords(message) {
        return blockedWords.some(word => message.toLowerCase().includes(word));
    }

    // Toggle chat popup
    chatbotIcon.addEventListener("click", () => {
        chatPopup.classList.toggle("hidden");
        userInput.focus(); // Focus on the input when popup is opened
    });

    // Close chat popup
    closeBtn.addEventListener("click", () => {
        chatPopup.classList.add("hidden");
    });

    // Send user input to the chat history
    sendBtn.addEventListener("click", () => {
        const message = userInput.value.trim();
        if (message === "") return; // Don't send empty messages

        if (containsBlockedWords(message)) {
            alert("Please refrain from using inappropriate language.");
            userInput.value = ""; // Clear input field
            return;
        }

        chatHistory.innerHTML += `
            <div class="user-message">
                <div class="message-container">
                    <i class="fas fa-user-circle user-icon"></i>
                    <div class="user-message-text">${message}</div>
                </div>
            </div>`;

        handleUserMessage(message);
        userInput.value = ""; // Clear input field
        chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the bottom
    });

    // Handle user message and check if predefined or not
    function handleUserMessage(message) {
        if (responses[message]) {
            showBotThinking(message, responses[message]);
        } else {
            // Default response for unrecognized input
            const defaultResponse = "Please visit our website for more information or contact admissions@christuniversity.in.";
            showBotThinking(message, defaultResponse);
        }
    }

    // Show bot "thinking" phase before response
    function showBotThinking(question, response) {
        // Show bot "thinking" (ellipses ...)
        chatHistory.innerHTML += `
            <div class="bot-message thinking">
                <i class="fas fa-robot bot-icon"></i>
                <div class="bot-message-text">...</div>
            </div>`;
        chatHistory.scrollTop = chatHistory.scrollHeight;

        // After 2 seconds, replace "thinking" with actual response
        setTimeout(() => {
            const thinkingElement = document.querySelector(".bot-message.thinking");
            if (thinkingElement) {
                thinkingElement.innerHTML = `
                    <i class="fas fa-robot bot-icon"></i>
                    <div class="bot-message-text">${response}</div>`;
                thinkingElement.classList.remove("thinking");
            }
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }, 2000); // 2 seconds delay
    }

    // Ask predefined question
    askBtn.addEventListener("click", () => {
        const selectedQuestion = questionSelect.value;
        if (selectedQuestion && responses[selectedQuestion]) {
            chatHistory.innerHTML += `
                <div class="user-message">
                    <div class="message-container">
                        <i class="fas fa-user-circle user-icon"></i>
                        <div class="user-message-text">${selectedQuestion}</div>
                    </div>
                </div>`;

            showBotThinking(selectedQuestion, responses[selectedQuestion]);
            questionSelect.value = ""; // Clear selection
        }
    });
});
