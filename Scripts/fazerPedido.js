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

function cadastroValido(){
    let elementos = $(".input");
    let descricao = $(".input-descricao");
    
    let nome = elementos[0].value;
    let url = elementos[1].value;
    let desc = descricao[0].value;

    let valido = false;

    if(nome.length == 0){
        valido = false;
    } else {
        valido = true;
    }

    if(url.length == 0){
        valido = false;
    } else if(!checkarUrl(url)){
        valido = false;
    } else {
        valido = true;
    }

    if(desc.length == 0){
        valido = false;
    } else {
        valido = true;
    }

    return valido;
}

function criarForm(){
    let form = `<form>
                    <div class="conteudo-info">
                        <p class="titulo">Dê um título para o seu script abaixo</p>
                        <input type="text" placeholder="Meu Script" class="input" id="titulo" required>
                        <p class="dados-invalidos invisivel"></p>
                        <p class="titulo">Selecione categoria</p>
                        <select name="categorias" class="input-select" id="categoria" required>
                            <option value="universidade">Universidade</option>
                            <option value="compras">Compras</option>
                            <option value="viagens">Viagens</option>
                        </select>
                        <p class="titulo">Qual é o endereço URL (Link) do site onde será realizada a automação?</p>
                        <input type="url" placeholder="Exemplo: https://twitter.com" class="input" id="url" required>
                        <p class="dados-invalidos invisivel"></p>
                        <p class="titulo">Descreva o que você precisa que seja feito</p>
                        <textarea placeholder="Passo-a-passo do que você quer que o seu script faça" class="input-descricao" id="descricao" required></textarea>
                        <p class="dados-invalidos invisivel"></p>

                        <div class="botoes-fazer-pedido">
                            <ul>
                                <li><button class="botao-fazer-pedido">Fazer pedido</button></li>
                                <li><button class="botao-cancelar">Cancelar</button></li>
                            </ul>
                        </div>
                    </div>
                </form>`
    
    let formContainer = $('.card-cadastrar');
    formContainer.html(form);

    let botoes = $('.botoes-fazer-pedido > ul > li');
    botoes[0].addEventListener("click", ()=>{
        event.preventDefault();
        let titulo = $('#titulo').val();
        let categoria = $('#categoria').val();
        let url = $('#url').val();
        let descricao = $('#descricao').val();

        if(cadastroValido()){
            cadastrarNovoPedido(criarObjeto(titulo,url,descricao,categoria));
        } else {
            alert('Dados inválidos.');
        }
    });

    botoes[1].addEventListener("click", ()=>{
        let form = $('.card-cadastrar > form');
        form.trigger('reset');
    });
}

function getData(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

function ultimoIdPedido(){
    let url = "http://localhost:3000/dados/1";
    let id = 0;
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            id = Number(data.ultimoIdPedido);
        },
        async: false
    });
    return id;
}

function criarObjeto(titulo, url, descricao, categorias){
    let objeto = {
                    "id": String(ultimoIdPedido() + 1),
                    "titulo": titulo,
                    "autor": localStorage.getItem("nomeUsuarioLogado"),
                    "idAutor": localStorage.getItem("idUsuarioLogado"),
                    "dataCria": getData(),
                    "categorias": categorias,
                    "url": url,
                    "descricao": descricao,
                    "status": "Não recebido",
                    "gosteis": 0,
                    "idQuemGostou": ",",
                    "foiDenunciado": false,
                    "denuncia": `[
                    {
                        "idUsuario": 0,
                        "descricao": ""
                    }
                    ]`,
                    "comentarios": `[
                    {
                        "idUsuario": 0,
                        "texto": ""
                    }
                    ]`
                };
    
    return objeto;
}

function atualizandoIdPedido(id){
    let url = "http://localhost:3000/dados/1";
    $.ajax({
        url: url,
        type: 'PUT',
        data: {
            "ultimoIdPedido": id
          }
    });
}

function cadastrarNovoPedido(objeto){
    let url = "http://localhost:3000/pedidos";

    atualizandoIdPedido(objeto.id);

    $.ajax({
        type: 'POST',
        url: url,
        data: objeto,
        success: function() {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "./pedidos.html";
        }
    });
}

function addEventListenerVoltar(){
    let botaoVoltar = $(".voltar");
    
    botaoVoltar[0].addEventListener("click", ()=>{
        window.history.back();
    });
}

function checkarUsuarioLogado(valido){
    if (valido) {
        let cadastrarNav = $(".header-fazer-pedido-nav-conteudo-navbar-login");
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
        criarForm();

        addEventListenerFeedbacks();
    }
}

function checkarUrl() {
    var url = document.getElementById("url").value;
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (pattern.test(url)) {
        return true;
    }
        return false;

}

function addEventListenerFeedbacks(){
    let elementos = $(".input");
    let descricao = $(".input-descricao");
    let msgs = $(".dados-invalidos");

    elementos[0].addEventListener("input", ()=>{
        let nome = elementos[0].value;

        if(nome.length == 0){
            msgs[0].innerText = "O campo não pode ficar vazio.";
            msgs[0].classList.remove("invisivel");
        } else {
            msgs[0].classList.add("invisivel");
        }
    });

    elementos[1].addEventListener("input", ()=>{
        let url = elementos[1].value;

        if(url.length == 0){
            msgs[1].innerText = "O campo não pode ficar vazio.";
            msgs[1].classList.remove("invisivel");
        } else if(!checkarUrl(url)){
            msgs[1].innerText = "Você precisa digitar uma url válida.";
            msgs[1].classList.remove("invisivel");
        } else {
            msgs[1].classList.add("invisivel");
        }
    });

    descricao[0].addEventListener("input", ()=>{
        let desc = descricao[0].value;

        if(desc.length == 0){
            msgs[2].innerText = "O campo não pode ficar vazio.";
            msgs[2].classList.remove("invisivel");
        } else {
            msgs[2].classList.add("invisivel");
        }
    });
}




addEventListenerVoltar();
checkarUsuarioLogado(checkarUsuarioValido());



/* //EXEMPLO
let teste = `[
    {
        "idUsuario": 0,
        "texto": ""
    }
]`;

let teste2 = JSON.parse(teste);
console.log(teste2[0].idUsuario); */