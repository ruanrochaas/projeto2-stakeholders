function checkarUsuarioLogado(){
    if(localStorage.getItem("idUsuarioLogado")){
        let cadastrarNav = $(".header-explorar-nav-conteudo-navbar-login");
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

        cadastrarNav[0].appendChild(a);
        cadastrarNav[0].appendChild(a2);
    }
}

function addEventListenerBotoesCont(){
    let botoesCont = $(".conteudo button");

    botoesCont[0].addEventListener("click", ()=>{
        //window.location.href='./explorar-desenvolvedores.html';
        alert("Ainda não implementado.");
    });

    botoesCont[1].addEventListener("click", ()=>{
        //window.location.href='./explorar-desenvolvedores.html';
        alert("Ainda não implementado.");
    });

    botoesCont[2].addEventListener("click", ()=>{
        window.location.href='./explorar-desenvolvedores.html';
    });
}

function addEventListenerVoltar(){
    let botaoVoltar = $(".voltar");
    
    botaoVoltar[0].addEventListener("click", ()=>{
        window.history.back();
    });
}

checkarUsuarioLogado();
addEventListenerVoltar();
addEventListenerBotoesCont();