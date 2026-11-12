
const formulario = document.querySelector("#formulario");
const campo = document.querySelector("#texto");
const mensagens = document.querySelector("#mensagens");

function adicionarMensagem(texto, tipo) {
    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto;
    paragrafo.className = tipo;
    mensagens.appendChild(paragrafo);
    mensagens.scrollTop = mensagens.scrollHeight;
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const texto = campo.value.trim();

    if (texto === "") {
        campo.focus();
        return;
    }

    adicionarMensagem("Você: " + texto, "usuario");
    adicionarMensagem("Bot: Recebi sua mensagem!", "bot");

    campo.value = "";
    campo.focus();
});
