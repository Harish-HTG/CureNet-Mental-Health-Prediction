const chatLog = document.getElementById('chatLog');

function sendMessage() {
    const userMessageInput = document.getElementById('userMessage');
    const userMessage = userMessageInput.value;

    displayMessage(userMessage, 'user');

    getBotResponse(userMessage).then((botResponse) => {
        displayMessage(botResponse, 'bot');
    });

    userMessageInput.value = '';
}

function displayMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
}

async function getBotResponse(userMessage) {
    try {
        const response = await fetch('http://localhost:5000/generate-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userMessage,
            }),
        });

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error in fetching AI response:', error);
        return "Sorry, I couldn't process that. Please try again.";
    }
}
