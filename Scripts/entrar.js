function addEventListenerBotaoLogar(){
    let botao = $(".botao-entrar");
    botao[0].addEventListener("click", ()=>{
        event.preventDefault();
        let email = $("#email")[0].value;
        let senha = $("#senha")[0].value;

        if((email.length > 0) && (senha.length > 0)){
            let objResposta = checkarEmailESenha(email,senha);
            if(objResposta.confirmado){
                localStorage.setItem("nomeUsuarioLogado",objResposta.nome);
                localStorage.setItem("idUsuarioLogado",objResposta.id);
                window.location.href = './index.html';
            } else {
                feedbackComplementaresDeLogin2(objResposta.feedback);
            }
        } else {
            feedbackComplementaresDeLogin1(email, senha);
        }
    });
    
}

function checkarEmailESenha(email, senha){
    let url = "http://localhost:3000/usuarios/";
    let confirmacao = {
        confirmado: false,
        feedback: "",
        nome: "",
        id: ""
    };
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data){
            for(let usuario of data){
                if(usuario.email == email){
                    if(usuario.senha == senha){
                        confirmacao.confirmado = true;
                        confirmacao.feedback = "Deu bom";
                        confirmacao.nome = usuario.nome;
                        confirmacao.id = usuario.id;
                        return;
                    } else {
                        confirmacao.feedback = 1;
                        return;
                    }
                } else {
                    confirmacao.feedback = 0;
                }
            }
        },
        async: false
    })
    return confirmacao;
}

function addEventListenerFeedbacks(){
    let elementos = $(".input");
    let msgs = $(".dados-invalidos");

    elementos[0].addEventListener("input", ()=>{
        let email = elementos[0].value;
        let emailP1 = email.substring(0, email.indexOf("@"));
        let emailP2 = email.substring(email.indexOf("@")+ 1, email.length);
        
        if((emailP1.length >=1) && (emailP2.length >=3) && (emailP1.search("@")==-1) && (emailP2.search("@")==-1) && (emailP1.search(" ")==-1) && 
        (emailP2.search(" ")==-1) && (emailP2.search(".")!=-1) && (emailP2.indexOf(".") >=1)&& (emailP2.lastIndexOf(".") < emailP2.length - 1)){
            msgs[0].classList.add("invisivel");
        } else if(email.length == 0){
            msgs[0].innerText = "O campo não pode ficar vazio.";
            msgs[0].classList.remove("invisivel");
        } else {
            msgs[0].innerText = "Formato do email está incorreto.";
            msgs[0].classList.remove("invisivel");
        }
    });

    elementos[1].addEventListener("input", ()=>{
        if(elementos[1].value == ""){
            msgs[1].innerText = "O campo não pode ficar vazio."
            msgs[1].classList.remove("invisivel");
        } else {
            msgs[1].classList.add("invisivel");
        };
    });
}

function feedbackComplementaresDeLogin1(email, senha){
    let msgs = $(".dados-invalidos");
    if((email.length == 0) && (senha.length == 0)){
        msgs[0].innerText = "O campo não pode ficar vazio.";
        msgs[0].classList.remove("invisivel");
        msgs[1].innerText = "O campo não pode ficar vazio.";
        msgs[1].classList.remove("invisivel");
    } else if((email.length == 0) && (senha.length != 0)){
        msgs[0].innerText = "O campo não pode ficar vazio.";
        msgs[0].classList.remove("invisivel");
    } else if((email.length != 0) && (senha.length == 0)){
        msgs[1].innerText = "O campo não pode ficar vazio.";
        msgs[1].classList.remove("invisivel");
    }
}

function feedbackComplementaresDeLogin2(feedback){
    let msgs = $(".dados-invalidos");
    if(feedback == 0){
        msgs[0].innerText = "Email não cadastrado";
        msgs[0].classList.remove("invisivel");
    } else {
        msgs[1].innerText = "Senha incorreta";
        msgs[1].classList.remove("invisivel");
    }
}

/* AINDA FALTA MUDAR ISSO AQUI */
function checkarUsuarioLogado(){
    if(localStorage.getItem("idUsuarioLogado")){
        let cadastrarNav = $(".header-home-nav-conteudo-navbar-login");
        cadastrarNav[0].innerHTML = "";
        let a = document.createElement("a");
        let a2 = document.createElement("a");

        a.innerText = "Meu menu";
        a.setAttribute("href","");
        a2.innerText = localStorage.getItem("nomeUsuarioLogado");

        cadastrarNav[0].appendChild(a);
        cadastrarNav[0].appendChild(a2);
    }
}

function addEventListenerVoltar(){
    let botaoVoltar = $(".voltar");
    
    botaoVoltar[0].addEventListener("click", ()=>{
        window.history.back();
    });
}

addEventListenerVoltar();
addEventListenerFeedbacks();
addEventListenerBotaoLogar();