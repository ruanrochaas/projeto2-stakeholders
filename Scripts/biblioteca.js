function getScriptsBiblioteca(){
    let id = localStorage.getItem("idUsuarioLogado");
    let url = "http://localhost:3000/usuarios/" + id;
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            let scripts = data.bibliotecaIdScripts.split(",");
            for(let ind = 1; ind < scripts.length - 1; ind++){
                let idScript = scripts[ind];
                let objetoScript = getScript(idScript);
                criarCard(objetoScript.titulo, objetoScript.rota, objetoScript.id, data);
            }
        }
    });
}

function getScript(id){
    let url = "http://localhost:3000/scripts/" + id;
    let objeto = {};
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            objeto = data;
        },
        async: false
    });
    return objeto;
}

function removerDaBiblioteca(idUsuario, objeto, idScript){
    let url = "http://localhost:3000/usuarios/" + idUsuario;
    
    console.log(objeto);

    let objeto2 = objeto;
    let biblioteca = objeto.bibliotecaIdScripts.split(",");
    
    for (let ind = 1; ind < biblioteca.length - 1; ind++) {
        if(biblioteca[ind] == idScript){
            biblioteca.splice(ind, 1);
        }
    }

    biblioteca = biblioteca.join(",");
    objeto2.bibliotecaIdScripts = biblioteca;

    $.ajax({
        url: url,
        type: 'PUT',
        data: objeto2,
        async: false
    });

    window.location.reload();
}

function criarCard(titulo, rota, id, objeto){
    let card = document.createElement("div");
    card.classList.add("scripts-card");
    
    let cardConteudo = `<div class="script-card-conteudo-textos">
                            <h3 class="titulo-bloco"></h3>
                        </div>
                        <div class="div-botoes-bloco-texto">
                            <button class="botao-executar">Executar</button>
                            <button class="botao-mais-detalhes">Mais detalhes</button>
                            <button class="botao-remover">Remover da biblioteca</button>
                        </div>`;

    card.innerHTML = cardConteudo;
    let titulo2 = card.querySelector('.titulo-bloco');
    let botoes = card.querySelectorAll('button');

    titulo2.innerText = titulo;

    botoes[0].addEventListener("click", ()=>{
        let rota2 = rota;
        window.open(String("http://localhost:8000" + rota2), '_blank');
    });

    botoes[1].addEventListener("click", ()=>{
        let ident = id;
        localStorage.setItem("verScriptId", ident);
        window.location.href = "./script.html";
    });

    botoes[2].addEventListener("click", ()=>{
        let idUsuario = localStorage.getItem("idUsuarioLogado");
        let idScript = id;
        let objeto2 = objeto;
        removerDaBiblioteca(idUsuario, objeto2, idScript);
    });

    let containerCard = $('.scripts-resultado');
    let feedback = $('body > div > div > div > div > h3')[0].innerHTML;
    let comparacao = "Você não possui scripts na sua biblioteca.";

    if (feedback == comparacao){
        containerCard.html("");
    }

    containerCard.append(card);
}

function checkarUsuarioValido(){
    let url = "http://localhost:3000/usuarios";
    let id = localStorage.getItem("idUsuarioLogado");
    let valido = false;
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            for(let usuario of data){
                if(usuario.id == id){
                    valido = true;
                }
            }
        },
        async: false
    });
    return valido;
}

function checkarUsuarioLogado(valido){
    if (valido) {
        let cadastrarNav = $(".header-biblioteca-nav-conteudo-navbar-login");
        cadastrarNav[0].innerHTML = "";
        let a = document.createElement("a");
        let a2 = document.createElement("a");

        a.innerText = "Meu menu";
        a.setAttribute("href","");
        a2.innerText = localStorage.getItem("nomeUsuarioLogado");
        a2.setAttribute("href","");

        a2.addEventListener("click", ()=>{
            localStorage.removeItem("idUsuarioLogado");
            localStorage.removeItem("nomeUsuarioLogado");
            window.location.reload();
        });

        a2.addEventListener("mouseover", ()=>{
            a2.innerText = "Logout";
        });

        a2.addEventListener("mouseout", ()=>{
            a2.innerText = localStorage.getItem("nomeUsuarioLogado");
        });

        cadastrarNav[0].appendChild(a);
        cadastrarNav[0].appendChild(a2);

        getScriptsBiblioteca();
    }
}

function addEventListenerVoltar(){
    let botaoVoltar = $(".voltar");
    
    botaoVoltar[0].addEventListener("click", ()=>{
        window.history.back();
    });
}


addEventListenerVoltar();
checkarUsuarioLogado(checkarUsuarioValido());