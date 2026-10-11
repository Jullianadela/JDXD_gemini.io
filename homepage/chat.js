const chat = document.querySelector("#chat");
const form = document.querySelector("#chat-form");
const question = document.querySelector("#question");
const sendButton = form.querySelector("button");
const status = document.querySelector("#chat-status");
const conversation = [];
const isSpanish = document.documentElement.lang.toLowerCase().startsWith("es");

function appendMessage(speaker, message) {
    const paragraph = document.createElement("p");
    const label = document.createElement("strong");
    const translatedSpeaker = isSpanish && speaker === "You" ? "Tú" : speaker;
    label.textContent = `${translatedSpeaker}: `;
    paragraph.append(label, document.createTextNode(message));
    chat.append(paragraph);
    chat.scrollTop = chat.scrollHeight;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = question.value.trim();
    if (!message || message.length > 4000) {
        status.textContent = isSpanish
            ? "Escribe un mensaje de menos de 4,000 caracteres."
            : "Please enter a message under 4,000 characters.";
        return;
    }

    sendButton.disabled = true;
    question.disabled = true;
    status.textContent = isSpanish ? "Pensando..." : "Thinking...";
    appendMessage("You", message);

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, conversation }),
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(
                isSpanish
                    ? "El asistente no pudo responder. Inténtalo de nuevo."
                    : result.error || "The assistant could not respond.",
            );
        }

        const answer = result.answer || (
            isSpanish
                ? "No pude crear una respuesta. Inténtalo de nuevo."
                : "I couldn't create a response. Please try again."
        );
        appendMessage("VeriSafe", answer);
        conversation.push(`User: ${message}`, `Safety Helper: ${answer}`);
        if (conversation.length > 20) {
            conversation.splice(0, conversation.length - 20);
        }
        question.value = "";
        status.textContent = isSpanish
            ? "Solo ofrece orientación educativa."
            : "Educational guidance only.";
    } catch (error) {
        status.textContent = isSpanish
            ? "No se pudo conectar. Revisa que el servidor esté funcionando e inténtalo de nuevo."
            : error.message || "Could not reach the local server.";
    } finally {
        sendButton.disabled = false;
        question.disabled = false;
        question.focus();
    }
});
