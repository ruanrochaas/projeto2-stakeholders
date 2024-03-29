

function formarStringCategorias(objeto){
    let string = "Categorias:"
    let listaCateg = objeto.categorias.split(",");

    for(let indice = 1; indice < listaCateg.length; indice++){
        string += " ";
        string += listaCateg[indice];
    }
    return string;
}

function carregarScript(id) {
    let url = "http://localhost:3000/scripts/" + String(localStorage.getItem("verScriptId"));
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            criarCardScript(data);
        }
    });
}

function usuarioValido(){
    let url = "http://localhost:3000/usuarios";
    let resposta = false;
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            for(let usuario of data){
                let idUsuario = usuario.id;
                let idLogado = localStorage.getItem("idUsuarioLogado");
                if(idLogado == idUsuario){
                    resposta = true
                }
            };
        },
        async: false
    });
    return resposta;
}

function scriptNaBiblioteca(){
    let url = "http://localhost:3000/usuarios/" + String(localStorage.getItem("idUsuarioLogado"));
    let idScript = "," + String(localStorage.getItem("verScriptId")) + ",";
    let resposta = false;
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            if(data.bibliotecaIdScripts.search(idScript) != -1){
                resposta = true;
            }
        },
        async: false
    });
    return resposta;
}

function feedback(num){
    let usuario = localStorage.getItem("idUsuarioLogado");
    let resposta;
    if(num == 0){
        resposta = true;
        if(!usuario){
            alert("Para executar scripts é necessário ter uma conta no site, estar logado, ter o servidor local instalado em seu computador e ter adicionado esse script à sua biblioteca.");
            resposta = false;
        };
        if(usuario){
            if(!usuarioValido()){
                alert("Você precisa estar logado com um usuário válido.");
                resposta = false;
            } else if(!scriptNaBiblioteca()){
                alert("Esse script precisa estar adicionado à sua biblioteca.");
                resposta = false;
            }
        }
    } else if(num == 1){
        resposta = true;
        if(!usuario){
            alert("É preciso estar logado para adicionar scripts à sua biblioteca.");
            resposta = false;
        } else if(usuario){
            if(!usuarioValido()){
                alert("Você precisa estar logado com um usuário válido.");
                resposta = false;
            } else if(scriptNaBiblioteca()){
                alert("Esse script já foi adicionado à sua biblioteca.");
                resposta = false;
            }
        }
    } else if(num == 2){
        //VER O Q FAZER AQUI
        resposta = true;
    } else if(num == 3){
        resposta = true;
        if(!usuario){
            alert("É preciso estar logado para poder curtir esse script.");
            resposta = false;
        } else if(usuario){
            if(!usuarioValido()){
                alert("Você precisa estar logado com um usuário válido.");
                resposta = false;
            }
        }
    } else if(num == 4){
        resposta = true;
        if(!usuario){
            alert("É preciso estar logado para poder fazer denúncias.");
            resposta = false;
        } else if(usuario){
            if(!usuarioValido()){
                alert("Você precisa estar logado com um usuário válido.");
                resposta = false;
            }
        }
    }
    return resposta; 
}

function criarCardScript(objeto){
    let h3 = $(".titulo-script");
    let p1 = $(".categorias-script");
    let p2 = $(".descricao-script");
    let p3 = $(".engajamento-script");
    let p4 = $(".criador-script");
    let botoes = $(".botoes-script li a");

    botoes[0].addEventListener("click", ()=>{
        event.preventDefault();

        if(!feedback(0)){
            return;
        };
        
        window.location.href='http://localhost:8000/puppe';
    });

    botoes[1].addEventListener("click", ()=>{
        event.preventDefault();

        if(!feedback(1)){
            return;
        };
        
        adicionarScriptNaBiblioteca();
        alert('Script adicionado à sua biblioteca.');
    });

    botoes[2].addEventListener("click", ()=>{
        event.preventDefault();

        if(!feedback(2)){
            return;
        };
        
        alert('Ainda não implementado.');
    });

    botoes[3].addEventListener("click", ()=>{
        event.preventDefault();

        if(!feedback(3)){
            return;
        };
        
        alert('Ainda não implementado.');
    });

    botoes[4].addEventListener("click", ()=>{
        event.preventDefault();

        if(!feedback(4)){
            return;
        };
        
        alert('Ainda não implementado.');
    });

    h3.empty();
    h3.text(objeto.titulo);

    p1.text(formarStringCategorias(objeto));
    p2.text(objeto.descricao);
    p3.text(String(objeto.gosteis) + " gostaram");
    p4.text("Criado por: " + String(objeto.autor));


    /* conteudoCard.empty(); */


}

function adicionarScriptNaBiblioteca(){
    let url1 = "http://localhost:3000/usuarios/" + String(localStorage.getItem("idUsuarioLogado"));
    let idScript = localStorage.getItem("verScriptId");
    let objUsuario = {};
    
    $.ajax({
        type: 'GET',
        url: url1,
        success: function(data) {
            objUsuario = data;
        },
        async: false
    });

    objUsuario.bibliotecaIdScripts = objUsuario.bibliotecaIdScripts + idScript + ",";

    $.ajax({
        url: url1,
        type: 'PUT',
        data: objUsuario
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
        let cadastrarNav = $(".script-header-nav-conteudo-navbar-login");
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
    botao.addEventListener("click", ()=>{
        event.preventDefault();
        barra[0].classList.remove("invisivel");
        barra[1].classList.remove("invisivel");
        botao.setAttribute("style","display:none");
    });
}

function addEventListenerVoltar(){
    let botaoVoltar = $(".voltar");
    
    botaoVoltar[0].addEventListener("click", ()=>{
        window.history.back();
    });
}

addEventListenerVoltar();
checkarUsuarioLogado(checkarUsuarioValido());
barra_acessibilidade_abrir();
carregarScript();