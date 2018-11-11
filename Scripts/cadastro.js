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
            feedback("branco");
            return null;
        }
    }

    let email = elementos[1].value;
    let emailP1 = email.substring(0, email.indexOf("@"));
    let emailP2 = email.substring(email.indexOf("@")+ 1, email.length);

    let senha1 = elementos[2].value;
    let senha2 = elementos[3].value;

    //Checkando se usuário se marcou como desenvolvedor
    let desenvolvedor = false;
    let radios = $(".radio");
    if(radios[0].checked){
        desenvolvedor = true;
    }

    //Checkando as categorias escolhidas
    let checkBoxCateg = $(".checkbox");
    let categorias = [];

    if(checkBoxCateg[0].checked){
        categorias.push(checkBoxCateg[0].value)
    }
    if(checkBoxCateg[1].checked){
        categorias.push(checkBoxCateg[1].value)
    }
    if(checkBoxCateg[2].checked){
        categorias.push(checkBoxCateg[2].value)
    }

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
        "categoriasFav[]": categorias2,
        "bibliotecaIdScripts[]": ["", ""],
        "listaIdPedidosCriados[]": ["", ""],
        "qtdPedidosCriados": 0,
        "listaIdScriptsCriados[]": ["", ""],
        "qtdScriptsCriados": 0,
        "qtdScriptsCriadosMais10Gosteis": 0,
        "emblemas[]": ["", ""],
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


addEventListenerCadastrar();