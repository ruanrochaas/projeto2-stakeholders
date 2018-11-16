function checkarLogin(){
    if (localStorage.getItem("usuarioLogado")) {
        
    } else {
        window.location.href='./index.html';
    }
}

function addEventListenerCadastrar(){
    let botaoCadastrar = $(".botao-cadastrar");
    botaoCadastrar[0].addEventListener("click", ()=>{
        event.preventDefault();
        encontrarUltimoId();
    });
}

function checkarDados(ultimoId){

    //Checando se existe algum elemento vazio
    let elementos = $(".input");
    for(let elemento of elementos){
        if(((elemento.value == "") || (elemento.value == " "))){
            feedback("Nenhum campo pode ser deixado em branco.");
            return null;
        }
    }

    let email = elementos[1].value;
    let emailP1 = email.substring(0, email.indexOf("@"));
    let emailP2 = email.substring(email.indexOf("@")+ 1, email.length);

    let senha1 = elementos[2].value;
    let senha2 = elementos[3].value;

    //Checkando se usuário se marcou como desenvolvedor
    let desenvolvedor = localStorage.getItem("auxCadastroDev");
    if(desenvolvedor == "sim"){
        desenvolvedor = true;
    } else {
        desenvolvedor = false;
    }

    //Checkando as categorias escolhidas
    let categorias = localStorage.getItem("auxCadastroCateg").split(",");

    //Checkando se email e senha tem valores válidos
    if ((emailP1.length >=1) && (emailP2.length >=3) && (emailP1.search("@")==-1) && (emailP2.search("@")==-1) && (emailP1.search(" ")==-1) && 
    (emailP2.search(" ")==-1) && (emailP2.search(".")!=-1) && (emailP2.indexOf(".") >=1)&& (emailP2.lastIndexOf(".") < emailP2.length - 1)){
        if(!checkarSeEmailJaExiste(email)){
            if(senha1 == senha2){
                //O Cadastro é chamado aqui
                let objeto = formarObjeto(Number(ultimoId) + 1, elementos[0].value, elementos[1].value, elementos[2].value, desenvolvedor, categorias);
                cadastrarNovoUsuario(objeto);
            } else {
                feedback("valores de senha diferentes");
            }
        } else {
            feedback("email já cadastrado");
        }
    } else {
        feedback("email inválido");
    }
}

function feedback(texto){
    alert(texto);
}

function checkarSeEmailJaExiste(email){
    let url = "http://localhost:3000/usuarios/";
    let retorno = false;
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            for(let objeto of data){
                if(objeto.email == email){
                    retorno = true;
                }
            };
        },
        async: false
    });
    return retorno;
}

function formarObjeto(id, nome, email, senha, desenvolvedor, categorias){
    let categorias2 = categorias;
    if(categorias2.length == 0){
        categorias2 = ["", ""];
    }
    let objeto = {
        "id": id,
        "nome": nome,
        "email": email,
        "senha": senha,
        "desenvolvedor": desenvolvedor,
        "foto": "",
        "categoriasFav": categorias2,
        "bibliotecaIdScripts": "",
        "listaIdPedidosCriados": "",
        "qtdPedidosCriados": 0,
        "listaIdScriptsCriados": "",
        "qtdScriptsCriados": 0,
        "qtdScriptsCriadosMais10Gosteis": 0,
        "emblemas": "",
        "qtdComentarios": 0
    };
    return objeto;
}

function cadastrarNovoUsuario(objeto){
    let url = "http://localhost:3000/usuarios";

    atualizandoId(objeto.id);

    $.ajax({
        type: 'POST',
        url: url,
        data: objeto,
        success: function() {
            alert("deu certo!");
        }
    });
}

function atualizandoId(id){
    let url = "http://localhost:3000/dados/0";
    $.ajax({
        url: url,
        type: 'PUT',
        data: {
            "ultimoIdUsuario": id
          }
    });
}

function encontrarUltimoId(){
    let url = "http://localhost:3000/dados/0";
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            checkarDados(data.ultimoIdUsuario);
        }
    });
}

function addEventListenerFeedbacks(){
    let elementos = $(".input");
    let msgs = $(".dados-invalidos");

    elementos[0].addEventListener("input", ()=>{
        let nome = elementos[0].value;

        if((nome == "")){
            msgs[0].innerText = "O campo não pode ficar vazio.";
            msgs[0].classList.remove("invisivel");
        } else {
            msgs[0].classList.add("invisivel");
        }
    });

    elementos[1].addEventListener("input", ()=>{
        let email = elementos[1].value;
        let emailP1 = email.substring(0, email.indexOf("@"));
        let emailP2 = email.substring(email.indexOf("@")+ 1, email.length);
        
        if((emailP1.length >=1) && (emailP2.length >=3) && (emailP1.search("@")==-1) && (emailP2.search("@")==-1) && (emailP1.search(" ")==-1) && 
        (emailP2.search(" ")==-1) && (emailP2.search(".")!=-1) && (emailP2.indexOf(".") >=1)&& (emailP2.lastIndexOf(".") < emailP2.length - 1)){
            msgs[1].classList.add("invisivel");
        } else if(email.length == 0){
            msgs[1].innerText = "O campo não pode ficar vazio.";
            msgs[1].classList.remove("invisivel");
        } else {
            msgs[1].innerText = "Formato do email está incorreto.";
            msgs[1].classList.remove("invisivel");
        }
    });

    elementos[2].addEventListener("input", ()=>{
        let nome = elementos[2].value;

        if((nome == "")){
            msgs[2].innerText = "O campo não pode ficar vazio.";
            msgs[2].classList.remove("invisivel");
        } else {
            msgs[2].classList.add("invisivel");
        }
    });

    elementos[3].addEventListener("input", ()=>{
        if(elementos[2].value != elementos[3].value){
            msgs[3].innerText = "As senhas digitadas precisam ser iguais."
            msgs[3].classList.remove("invisivel");
        } else if(elementos[3].value == ""){
            msgs[3].innerText = "O campo não pode ficar vazio."
            msgs[3].classList.remove("invisivel");
        } else {
            msgs[3].classList.add("invisivel");
        };
    });
}


function addEventListenerAuxCadastroRadios(){
    localStorage.setItem("auxCadastroDev","sim");
    localStorage.setItem("auxCadastroCateg", "");

    let radio = $(".radio");
    let radiobox = $(".radiobox");
    radio[0].addEventListener("click", ()=>{
        event.preventDefault();
        let dev = localStorage.getItem("auxCadastroDev");
        if (dev == "nao") {
            localStorage.setItem("auxCadastroDev","sim");
            radio[0].classList.add("radio-selecionado");
            radio[1].classList.remove("radio-selecionado");
            radiobox[0].checked = true;
            radiobox[1].checked = false;
        }
    });

    radio[1].addEventListener("click", ()=>{
        event.preventDefault();
        let dev = localStorage.getItem("auxCadastroDev");
        if (dev == "sim") {
            localStorage.setItem("auxCadastroDev","nao");
            radio[1].classList.add("radio-selecionado");
            radio[0].classList.remove("radio-selecionado");
            radiobox[0].checked = false;
            radiobox[1].checked = true;
        }
    });
}

function addEventListenerAuxCadastroRadiobox(){

    let radio = $(".radio");
    let radiobox = $(".radiobox");
    radiobox[0].addEventListener("click", ()=>{
        let dev = localStorage.getItem("auxCadastroDev");
        if (dev == "nao") {
            localStorage.setItem("auxCadastroDev","sim");
            radio[0].classList.add("radio-selecionado");
            radio[1].classList.remove("radio-selecionado");
        }
    });

    radiobox[1].addEventListener("click", ()=>{
        let dev = localStorage.getItem("auxCadastroDev");
        if (dev == "sim") {
            localStorage.setItem("auxCadastroDev","nao");
            radio[1].classList.add("radio-selecionado");
            radio[0].classList.remove("radio-selecionado");
        }
    });
}


/* ARRUMAR ISSO AQUI */
function addEventListenerAuxCadastroCheckboxes1(){
    let checkboxs = $(".checkbox");
    let caixasCheckbox = $(".caixaCheckbox");

    checkboxs[0].addEventListener("click", ()=>{
        event.preventDefault();
        let categorias = localStorage.getItem("auxCadastroCateg").split(",");

        if(categorias[0] == ""){
            categorias = [];
        }
        
        let categoria = checkboxs[0].innerText;
        let estaDentro = categorias.indexOf(categoria);
        if(estaDentro == -1){
            categorias.push(categoria);
            checkboxs[0].classList.add("selecionado");
            caixasCheckbox[0].checked = true;
        } else {
            for(let i in categorias){
                if(categorias[i] == categoria){
                    categorias.splice(i,1);
                }
            }
            checkboxs[0].classList.remove("selecionado");
            caixasCheckbox[0].checked = false;
        }
        categorias.join(",");
        localStorage.setItem("auxCadastroCateg", categorias);
    });

    checkboxs[1].addEventListener("click", ()=>{
        event.preventDefault();
        let categorias = localStorage.getItem("auxCadastroCateg").split(",");

        if(categorias[0] == ""){
            categorias = [];
        }

        let categoria = checkboxs[1].innerText;
        let estaDentro = categorias.indexOf(categoria);
        if(estaDentro == -1){
            categorias.push(categoria);
            checkboxs[1].classList.add("selecionado");
            caixasCheckbox[1].checked = true;
        } else {
            for(let i in categorias){
                if(categorias[i] == categoria){
                    categorias.splice(i,1);
                }
            }
            checkboxs[1].classList.remove("selecionado");
            caixasCheckbox[1].checked = false;
        }
        categorias.join(",");
        localStorage.setItem("auxCadastroCateg", categorias);
    });

    checkboxs[2].addEventListener("click", ()=>{
        event.preventDefault();
        let categorias = localStorage.getItem("auxCadastroCateg").split(",");

        if(categorias[0] == ""){
            categorias = [];
        }

        let categoria = checkboxs[2].innerText;
        let estaDentro = categorias.indexOf(categoria);
        if(estaDentro == -1){
            categorias.push(categoria);
            checkboxs[2].classList.add("selecionado");
            caixasCheckbox[2].checked = true;
        } else {
            for(let i in categorias){
                if(categorias[i] == categoria){
                    categorias.splice(i,1);
                }
            }
            checkboxs[2].classList.remove("selecionado");
            caixasCheckbox[2].checked = false;
        }
        categorias.join(",");
        localStorage.setItem("auxCadastroCateg", categorias);
    });
}

function addEventListenerAuxCadastroCheckboxes2(){

    let checkboxs = $(".checkbox");
    let caixasCheckbox = $(".caixaCheckbox");

    caixasCheckbox[0].addEventListener("click", ()=>{
        let categorias = localStorage.getItem("auxCadastroCateg").split(",");

        if(categorias[0] == ""){
            categorias = [];
        }
        
        let categoria = checkboxs[0].innerText;
        let estaDentro = categorias.indexOf(categoria);
        if(estaDentro == -1){
            categorias.push(categoria);
            checkboxs[0].classList.add("selecionado");
            caixasCheckbox[0].checked = true;
        } else {
            for(let i in categorias){
                if(categorias[i] == categoria){
                    categorias.splice(i,1);
                }
            }
            checkboxs[0].classList.remove("selecionado");
            caixasCheckbox[0].checked = false;
        }
        categorias.join(",");
        localStorage.setItem("auxCadastroCateg", categorias);
    });

    caixasCheckbox[1].addEventListener("click", ()=>{
        let categorias = localStorage.getItem("auxCadastroCateg").split(",");

        if(categorias[0] == ""){
            categorias = [];
        }
        
        let categoria = checkboxs[1].innerText;
        let estaDentro = categorias.indexOf(categoria);
        if(estaDentro == -1){
            categorias.push(categoria);
            checkboxs[1].classList.add("selecionado");
            caixasCheckbox[1].checked = true;
        } else {
            for(let i in categorias){
                if(categorias[i] == categoria){
                    categorias.splice(i,1);
                }
            }
            checkboxs[1].classList.remove("selecionado");
            caixasCheckbox[1].checked = false;
        }
        categorias.join(",");
        localStorage.setItem("auxCadastroCateg", categorias);
    });

    caixasCheckbox[2].addEventListener("click", ()=>{
        let categorias = localStorage.getItem("auxCadastroCateg").split(",");

        if(categorias[0] == ""){
            categorias = [];
        }
        
        let categoria = checkboxs[2].innerText;
        let estaDentro = categorias.indexOf(categoria);
        if(estaDentro == -1){
            categorias.push(categoria);
            checkboxs[2].classList.add("selecionado");
            caixasCheckbox[2].checked = true;
        } else {
            for(let i in categorias){
                if(categorias[i] == categoria){
                    categorias.splice(i,1);
                }
            }
            checkboxs[2].classList.remove("selecionado");
            caixasCheckbox[2].checked = false;
        }
        categorias.join(",");
        localStorage.setItem("auxCadastroCateg", categorias);
    });
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



checkarUsuarioLogado();
addEventListenerVoltar();
addEventListenerAuxCadastroRadios();
addEventListenerAuxCadastroRadiobox();
addEventListenerAuxCadastroCheckboxes1();
addEventListenerAuxCadastroCheckboxes2();
addEventListenerFeedbacks();
addEventListenerCadastrar();