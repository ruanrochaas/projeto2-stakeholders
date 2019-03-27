


function criarCard(titulo, categoria, descricao, id){
    let containerCards = $('.container-scripts');
    let card = document.createElement("div");
    card.classList.add("todos-scripts-card","card-conteudo");
    
    let conteudo = `<div class="todos-scripts-card card-conteudo-textos">
                        <p class="titulo-bloco"></p>
                        <p class="categoria-bloco">Categoria: </p>
                        <br>
                        <p class="descricao-script"></p>
                    </div>
                    <div class="div-botoes-bloco-texto">
                        <button class="button">
                            Mais detalhes
                        </button>
                        <button class="button">
                            Mostrar relacionados
                        </button>
                    </div>`;
    
    card.innerHTML = conteudo;
    
    let textos = card.querySelectorAll('p');
    let botoes = card.querySelectorAll('.button');

    textos[0].innerText = titulo;
    textos[1].innerText = textos[1].innerText + categoria;
    textos[2].innerText = descricao;

    botoes[0].addEventListener("click", ()=>{
        let idScript = id;
        localStorage.setItem("verScriptId", idScript);
        window.location.href = "./script.html";
    });

    botoes[1].addEventListener("click", ()=>{
        alert('Ainda não implementado.');
    });

    containerCards.append(card);
}

function pegarScriptsEmAlta(){
    let url = "http://localhost:3000/scripts?_sort=id&_order=desc";
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            for (let script of data) {
                criarCard(script.titulo, script.categorias, script.descricao, script.id);
            }
        }
    });
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
        let cadastrarNav = $(".header-todos-scripts-nav-conteudo-navbar-login");
        cadastrarNav[0].innerHTML = "";
        let a = document.createElement("a");
        let a2 = document.createElement("a");

        let span = document.createElement("span");
        let feedback = document.createTextNode("Clique no seu nome a seguir para fazer logout:");

        span.classList.add("feedback-tela-acessibilidade");
        span.appendChild(feedback);

        a.innerText = "Meu menu";
        a.setAttribute("href","./biblioteca.html");
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
        cadastrarNav[0].appendChild(span);
        cadastrarNav[0].appendChild(a2);
    }
}

function addEventListenerVoltar(){
    let botaoVoltar = $(".voltar");
    
    botaoVoltar[0].addEventListener("click", ()=>{
        window.history.back();
    });
}

function barra_acessibilidade_abrir() {
    let botao = document.querySelector(".barra-acessibilidade-abrir");
    let barra = document.querySelectorAll(".barra-acessibilidade ul");
    botao.addEventListener("click", ()=>{
        event.preventDefault();
        barra[0].classList.remove("invisivel");
        barra[1].classList.remove("invisivel");
        botao.setAttribute("style","display:none");
    });
}

addEventListenerVoltar();
checkarUsuarioLogado(checkarUsuarioValido());
barra_acessibilidade_abrir();
pegarScriptsEmAlta();