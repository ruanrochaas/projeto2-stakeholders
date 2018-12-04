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
        let cadastrarNav = $(".header-fazer-pedido-nav-conteudo-navbar-login");
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


checkarUsuarioLogado(checkarUsuarioValido());