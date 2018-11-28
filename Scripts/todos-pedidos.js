


function criarCard(titulo, categoria, descricao, id){
    let containerCards = $('.container-pedidos');
    let card = document.createElement("div");
    card.classList.add("todos-pedidos-card","card-conteudo");
    
    let conteudo = `<div class="todos-pedidos-card card-conteudo-textos">
                        <p class="titulo-bloco"></p>
                        <p class="categoria-bloco">Categoria: </p>
                        <br>
                        <p class="descricao-script"></p>
                    </div>
                    <div class="div-botoes-bloco-texto">
                        <button class="button button-atender">
                            Atender
                        </button>
                        <button class="button button-mais-detalhes">
                            Mais detalhes
                        </button>
                    </div>`;
    
    card.innerHTML = conteudo;
    
    let textos = card.querySelectorAll('p');
    let botoes = card.querySelectorAll('.button');

    textos[0].innerText = titulo;
    textos[1].innerText = textos[1].innerText + categoria;
    textos[2].innerText = descricao;

    botoes[0].addEventListener("click", ()=>{
        let idPedido = id;
        localStorage.setItem("verPedidoId", idPedido);
        window.location.href = "./responder-um-pedido.html";
    });

    botoes[1].addEventListener("click", ()=>{
        alert('Ainda não implementado.');
    });

    containerCards.append(card);
}

function pegarPedidosEmAlta(){
    let url = "http://localhost:3000/pedidos?_sort=id&_order=desc";
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            for (let pedido of data) {
                if (pedido.status == "Não atendido"){
                    criarCard(pedido.titulo, pedido.categorias, pedido.descricao, pedido.id);
                }
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
        let cadastrarNav = $(".header-todos-pedidos-nav-conteudo-navbar-login");
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
    }
}

function addEventListenerVoltar(){
    let botaoVoltar = $(".voltar");
    
    botaoVoltar[0].addEventListener("click", ()=>{
        window.history.back();
    });
}


addEventListenerVoltar();
checkarUsuarioLogado(checkarUsuarioValido());
pegarPedidosEmAlta();