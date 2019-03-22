

let urlScripts = "http://localhost:3000/scripts?_sort=id&_order=desc";

function pegarScriptsEmAlta(){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", urlScripts, true);
    xhttp.onload = function(){
        if (this.status == 200) {
            let listaResposta = JSON.parse(this.responseText);
            for (let index = 0; index < 2; index++) {
                const objeto = listaResposta[index];
                cardsScripts(objeto, 0);
            };
            formarBotCarregarMais(0);
        }
    }
    xhttp.send();
}

let urlPedidos = "http://localhost:3000/pedidos?_sort=id&_order=desc";

function pegarPedidosEmAlta(){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", urlPedidos, true);
    xhttp.onload = function(){
        if (this.status == 200) {
            let listaResposta = JSON.parse(this.responseText);
            for (let index = 0; index < 2; index++) {//aumentar iterações para 2
                const objeto = listaResposta[index];
                cardsScripts(objeto, 1);
            };
            formarBotCarregarMais(1);
        }
    }
    xhttp.send();
}

function formarStringCategorias(objeto){
    let string = "Categorias: " + objeto.categorias;
    return string;
}

function formarBotCarregarMais(id){
    let scripts = document.querySelector(".scripts");
    let pedidos = document.querySelector(".pedidos");
    let bot3 = document.createElement("button");
    let textoBot3 = document.createTextNode("Ver Mais");

    if(id == 0){
        bot3.classList.add("carregar-mais-scripts");
        bot3.appendChild(textoBot3);
        bot3.addEventListener("click", ()=>{
            window.location.href = "./scripts.html";
        });
        scripts.appendChild(bot3);
    }else{
        bot3.classList.add("carregar-mais-pedidos");
        bot3.appendChild(textoBot3);
        bot3.addEventListener("click", ()=>{
            window.location.href = "./todos-pedidos.html";
        });
        pedidos.appendChild(bot3);
    }
}

function cardsScripts(objeto, num) {
    let stringCategorias = formarStringCategorias(objeto);
    let scripts = document.querySelector(".scripts");
    let pedidos = document.querySelector(".pedidos");
    let card = document.createElement('div');
    let cardCont = document.createElement('div');
    let cardContTxt = document.createElement('div');
    let botoes = document.createElement('div');
    let titulo = document.createElement('h3');
    let subTitulo = document.createElement('h4');
    let descricao = document.createElement('p');
    let bot1 = document.createElement("button");
    let bot2 = document.createElement("button");
    let textoTit = document.createTextNode(objeto.titulo);
    let textoSubTit = document.createTextNode(stringCategorias);
    let textoDesc = document.createTextNode(objeto.descricao);
    let textoBot1 = document.createTextNode("Mais detalhes");
    let textoBot2 = document.createTextNode("Mostrar relacionados");

    card.classList.add("scripts-card");
    cardCont.classList.add("script-card-conteudo");
    cardContTxt.classList.add("script-card-conteudo-textos");
    botoes.classList.add("div-botoes-bloco-texto");
    titulo.classList.add("titulo-bloco");
    subTitulo.classList.add("subtitulo-bloco");
    descricao.classList.add("descrição-script");
    
    if (num == 0) {
        bot1.classList.add("botao-mais-detalhes");
        bot2.classList.add("botao-mostrar-relacionados");
    } else {
        bot1.classList.add("botao-mais-detalhes-pedidos");
        bot2.classList.add("botao-mostrar-relacionados-pedidos");    
    }

    if (num == 0) {
        bot1.addEventListener("click", ()=>{
            localStorage.setItem("verScriptId",String(objeto.id));
            window.location.href='./script.html';
        });
    
        bot2.addEventListener("click", ()=>{
            event.preventDefault();
            alert('Ainda não implementado.');
        });
    } else {
        bot1.addEventListener("click", ()=>{
            event.preventDefault();
            alert('Ainda não implementado.');
        });
    
        bot2.addEventListener("click", ()=>{
            event.preventDefault();
            alert('Ainda não implementado.');
        });
    }

    titulo.appendChild(textoTit);
    subTitulo.appendChild(textoSubTit);
    descricao.appendChild(textoDesc);
    bot1.appendChild(textoBot1);
    bot2.appendChild(textoBot2);

    botoes.appendChild(bot1);
    botoes.appendChild(bot2);
    cardContTxt.appendChild(titulo);
    cardContTxt.appendChild(subTitulo);
    cardContTxt.appendChild(descricao);
    cardCont.appendChild(cardContTxt);
    cardCont.appendChild(botoes);
    card.appendChild(cardCont);

    if (num == 0) {
        scripts.appendChild(card);
    } else {
        pedidos.appendChild(card);
    }
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
        let cadastrarNav = $(".header-home-nav-conteudo-navbar-login");
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

function barra_acessibilidade_abrir() {
    let botao = document.querySelector(".barra-acessibilidade-abrir");
    let barra = document.querySelectorAll(".barra-acessibilidade ul");
    console.log(barra[0]);
    console.log(barra[1]);
    botao.addEventListener("click", ()=>{
        event.preventDefault();
        barra[0].classList.remove("invisivel");
        barra[1].classList.remove("invisivel");
        botao.setAttribute("style","display:none");
    });
}


checkarUsuarioLogado(checkarUsuarioValido());
pegarScriptsEmAlta();
pegarPedidosEmAlta();
barra_acessibilidade_abrir();