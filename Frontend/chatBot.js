function toggleChat() {
    const chatWindow = document.getElementById("chatWindow");
    chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
}

function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBody = document.getElementById("chatBody");

    if (input.value.trim() !== "") {
        const userMsg = `<p><strong>You:</strong> ${input.value}</p>`;
        const botReply = `<p><strong>Bot:</strong> Thank you. We'll connect you with an expert shortly.</p>`;

        chatBody.innerHTML += userMsg + botReply;
        input.value = "";
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}
  
