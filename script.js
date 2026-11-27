
const formulario = document.querySelector("#formulario");
const campo = document.querySelector("#texto");
const mensagens = document.querySelector("#mensagens");

const memoria = {
    nome: null,
    assunto: null
};

function adicionarMensagem(texto, tipo) {
    const paragrafo = document.createElement("p");

    paragrafo.textContent = texto;
    paragrafo.className = tipo;

    mensagens.appendChild(paragrafo);
    mensagens.scrollTop = mensagens.scrollHeight;
}

function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function pensar(mensagem) {

    const texto = normalizar(mensagem);

   
    const nome = texto.match(/(?:meu nome e|me chamo|sou o|sou a)\s+(.+)/);

    if (nome) {
        memoria.nome = nome[1].trim();

        return `Prazer em conhecer você, ${memoria.nome}! Vou guardar seu nome durante esta conversa.`;
    }

    
    if (/qual (e|eh) meu nome|voce sabe meu nome/.test(texto)) {
        return memoria.nome
            ? `Seu nome é ${memoria.nome}!`
            : "Você ainda não me contou seu nome.";
    }

    
    if (/^(oi|ola|eai|e ai|opa|bom dia|boa tarde|boa noite)\b/.test(texto)) {
        return "Olá! Como posso ajudar você hoje?";
    }

    if (/como voce esta|tudo bem|como vai voce/.test(texto)) {
        return "Estou funcionando perfeitamente! E você, como está?";
    }

    
    if (/quem e voce|o que voce e|qual seu nome/.test(texto)) {
        return "Sou um chatbot desenvolvido em HTML, CSS e JavaScript. Tenho um pequeno sistema de reconhecimento de mensagens!";
    }

    if (/javascript|programacao|programar/.test(texto)) {
        memoria.assunto = "programação";

        return "JavaScript é uma linguagem de programação usada para adicionar funcionalidades e interatividade aos sites. Você sabia que estou funcionando com JavaScript agora?";
    }

    if (/html/.test(texto)) {
        memoria.assunto = "HTML";

        return "HTML é a linguagem utilizada para estruturar páginas web. Ela define títulos, parágrafos, imagens, botões e outros elementos.";
    }

    if (/css/.test(texto)) {
        memoria.assunto = "CSS";

        return "CSS é responsável pela aparência do site, como cores, fontes, espaçamentos, animações e organização dos elementos.";
    }


    if (/computador|pc|tecnologia|hardware/.test(texto)) {
        memoria.assunto = "tecnologia";

        return "Tecnologia é um assunto interessante! Posso conversar sobre computadores, hardware, programação e desenvolvimento de sites.";
    }

   
    if (/escola|prova|estudar|estudo|materia|trabalho/.test(texto)) {
        memoria.assunto = "estudos";

        return "Estudar fica mais fácil quando dividimos o conteúdo em partes menores. Qual matéria você está estudando?";
    }

    const conta = texto.match(/(-?\d+(?:[.,]\d+)?)\s*([+\-*/x])\s*(-?\d+(?:[.,]\d+)?)/);

    if (conta) {
        const a = Number(conta[1].replace(",", "."));
        const b = Number(conta[3].replace(",", "."));
        const operacao = conta[2];

        let resultado;

        switch (operacao) {
            case "+":
                resultado = a + b;
                break;

            case "-":
                resultado = a - b;
                break;

            case "*":
            case "x":
                resultado = a * b;
                break;

            case "/":
                if (b === 0) {
                    return "Não é possível dividir um número por zero!";
                }

                resultado = a / b;
                break;
        }

        return `O resultado de ${a} ${operacao} ${b} é ${resultado}.`;
    }

   
    if (/piada|me faz rir|conte uma piada/.test(texto)) {
        const piadas = [
            "Por que o computador foi ao médico? Porque estava com um vírus!",
            "O que o JavaScript falou para o HTML? Você é a estrutura da minha vida!",
            "Por que o programador não gosta de natureza? Porque tem muitos bugs!"
        ];

        return piadas[Math.floor(Math.random() * piadas.length)];
    }

    
    if (/obrigado|obrigada|valeu|agradeco/.test(texto)) {
        return "Por nada! Estou aqui para ajudar.";
    }

    
    if (/tchau|ate mais|falou|adeus/.test(texto)) {
        return "Até mais! Foi bom conversar com você.";
    }

    if (/sobre isso|me explica melhor|continue|fala mais/.test(texto)) {
        if (memoria.assunto === "programação") {
            return "Podemos continuar falando sobre programação! JavaScript permite criar sistemas, jogos, sites interativos e muito mais.";
        }

        if (memoria.assunto === "HTML") {
            return "O HTML funciona por meio de elementos chamados tags. Por exemplo, a tag <h1> cria um título principal.";
        }

        if (memoria.assunto === "CSS") {
            return "No CSS podemos utilizar seletores para modificar elementos HTML, definindo cores, tamanhos, posições e estilos.";
        }

        if (memoria.assunto === "tecnologia") {
            return "Podemos explorar vários assuntos de tecnologia, como hardware, software, redes e desenvolvimento.";
        }

        if (memoria.assunto === "estudos") {
            return "Podemos continuar estudando! Uma boa estratégia é entender o conteúdo e depois praticar com exercícios.";
        }
    }

    const alternativas = [
        "Interessante! Pode explicar um pouco melhor o que você quis dizer?",
        "Não consegui entender completamente. Tente perguntar de outra maneira.",
        "Ainda estou aprendendo a reconhecer novas perguntas. Pode reformular?",
        "Hmm, não tenho uma resposta para isso ainda. Vamos tentar outro assunto?"
    ];

    return alternativas[Math.floor(Math.random() * alternativas.length)];
}

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const texto = campo.value.trim();

    if (texto === "") {
        campo.focus();
        return;
    }

    adicionarMensagem("Você: " + texto, "usuario");

    const resposta = pensar(texto);

    adicionarMensagem("Bot: " + resposta, "bot");

    campo.value = "";
    campo.focus();
});
