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

function tituloPedido(){
    let url = "http://localhost:3000/pedidos/" + localStorage.getItem("verPedidoId");
    let titulo = "";
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            titulo = data.titulo;
        },
        async: false
    });
    return titulo;
}

function mudarStatusPedido(){
    let url = "http://localhost:3000/pedidos/" + localStorage.getItem("verPedidoId");
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            let objeto = data;
            objeto.status = "Atendido";
            $.ajax({
                url: url,
                type: 'PUT',
                data: objeto
            });
        },
        async: false
    });
}

function criarForm(){
    let form = `<p class="titulo-pedido">
                    Você está respondendo ao pedido de nome: 
                </p>
                <p class="titulo-script">
                    Digite abaixo o titulo do script
                </p>
                <input type="text" class="input" placeholder="Título do seu script" id="titulo">
                <span class="dados-invalidos invisivel">O campo</span>

                <p class="titulo-script">
                    Escolha uma rota para o script
                </p>
                <input type="text" class="input" placeholder="/rota-do-seu-script" id="rota">
                <span class="dados-invalidos invisivel">O campo</span>

                <p class="categoria-script">
                    Selecione a categoria do script
                </p>
                <select name="categoria" class="input input-categoria" id="categoria">
                    <option value="Universidade">Universidade</option>
                    <option value="Compras">Compras</option>
                    <option value="Viagens">Viagens</option>    
                </select>
                <span class="dados-invalidos invisivel"> Error </span>

                <p class="descricao-script">
                    Digite a descrição do script, o passo a passo que ele vai executar
                </p>
                <textarea type="textarea" class="input input-descricao" id="descricao" placeholder="Descreva detalhadamente o passo-a-passo do que o seu script faz."></textarea>
                <span class="dados-invalidos invisivel"> Error </span>

                <p class="input-script">
                    Selecione o script nos seus arquivos e faça o upload
                </p>
                <input type="file" class="input input-file" id="file">
                <span class="dados-invalidos">Voce precisa enviar o arquivo contendo o script.</span>

                <div class="botoes-form">
                    <button type="submit" class="botao-enviar">Enviar Script</button>
                    <button type="reset" class="botao-cancelar">Cancelar</button>
                </div>`;

    let formContainer = $('.script-conteudo-card > form');
    formContainer.html(form);

    let idPedido = $('.titulo-pedido');
    idPedido.html("Você está respondendo ao pedido de nome: <b>" + tituloPedido() + "<b>");

    let botoes = $('.botoes-form > button');

    botoes[0].addEventListener("click", ()=>{
        event.preventDefault();
        let titulo = $('#titulo').val();
        let categoria = $('#categoria').val();
        let rota = $('#rota').val();
        let descricao = $('#descricao').val();

        if(cadastroValido()){
            mudarStatusPedido();
            cadastrarNovoScript(criarObjeto(titulo,rota,descricao,categoria));
        } else {
            alert('Dados inválidos.');
        }
    });

    botoes[1].addEventListener("click", ()=>{
        let form = $('.script-conteudo-card > form');
        form.trigger('reset');
    });
}

function ultimoIdPedido(){
    let url = "http://localhost:3000/dados/2";
    let id = 0;
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            id = Number(data.ultimoIdScript);
        },
        async: false
    });
    return id;
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

function criarObjeto(titulo, rota, descricao, categorias){
    let objeto = {
                    "id": String(ultimoIdPedido() + 1),
                    "titulo": titulo,
                    "autor": localStorage.getItem("nomeUsuarioLogado"),
                    "rota": rota,
                    "idAutor": localStorage.getItem("idUsuarioLogado"),
                    "dataCria": getData(),
                    "categorias": categorias,
                    "descricao": descricao, //precisa arrumar isso depois
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

function atualizandoIdScript(id){
    let url = "http://localhost:3000/dados/2";
    $.ajax({
        url: url,
        type: 'PUT',
        data: {
            "ultimoIdScript": id
          }
    });
}

function cadastrarNovoScript(objeto){
    let url = "http://localhost:3000/scripts";

    atualizandoIdScript(objeto.id);

    $.ajax({
        type: 'POST',
        url: url,
        data: objeto,
        success: function() {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "./explorar.html";
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
        criarForm();

        addEventListenerFeedbacks();
    }
}

function addEventListenerFeedbacks(){
    let elementos = $(".input");
    let msgs = $(".dados-invalidos");

    elementos[0].addEventListener("input", ()=>{
        let titulo = elementos[0].value;

        if(titulo.length == 0){
            msgs[0].innerText = "O campo não pode ficar vazio.";
            msgs[0].classList.remove("invisivel");
        } else {
            msgs[0].classList.add("invisivel");
        }
    });

    elementos[1].addEventListener("input", ()=>{
        let rota = elementos[1].value;

        if(rota.length == 0){
            msgs[1].innerText = "O campo não pode ficar vazio.";
            msgs[1].classList.remove("invisivel");
        } else if(rota[0] != "/"){
            msgs[1].innerText = "As rotas começam com / .";
            msgs[1].classList.remove("invisivel");
        } else if(rota.length <= 1){
            msgs[1].innerText = "A rota precisa ter algo depois da barra.";
            msgs[1].classList.remove("invisivel");
        } else {
            msgs[1].classList.add("invisivel");
        }
    });

    elementos[2].addEventListener("input", ()=>{
        let categoria = elementos[2].value;

        if(categoria.length == 0){
            msgs[2].innerText = "O campo não pode ficar vazio.";
            msgs[2].classList.remove("invisivel");
        } else {
            msgs[2].classList.add("invisivel");
        }
    });

    elementos[3].addEventListener("input", ()=>{
        let desc = elementos[3].value;

        if(desc.length == 0){
            msgs[3].innerText = "O campo não pode ficar vazio.";
            msgs[3].classList.remove("invisivel");
        } else {
            msgs[3].classList.add("invisivel");
        }
    });

    elementos[4].addEventListener("input", ()=>{
        let file = elementos[4].value;

        if(file.length == 0){
            msgs[4].innerText = "Voce precisa enviar o arquivo contendo o script.";
            msgs[4].classList.remove("invisivel");
        } else {
            msgs[4].classList.add("invisivel");
        }
    });
}

function cadastroValido(){
    let elementos = $(".input");
    
    let titulo = elementos[0].value;
    let rota = elementos[1].value;
    let categoria = elementos[2].value;
    let desc = elementos[3].value;
    let file = elementos[4].value;

    let valido = false;

    if(titulo.length == 0){
        valido = false;
    } else {
        valido = true;
    }

    if(rota.length == 0){
        valido = false;
    } else if(rota[0] != "/"){
        valido = false;
    } else if(rota.length <= 1){
        valido = false;
    } else {
        valido = true;
    }

    if(categoria.length == 0){
        valido = false;
    } else {
        valido = true;
    }

    if(desc.length == 0){
        valido = false;
    } else {
        valido = true;
    }

    if(file.length == 0){
        valido = false;
    } else {
        valido = true;
    }

    return valido;
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