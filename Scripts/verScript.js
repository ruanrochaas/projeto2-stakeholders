{/* <h3 class="titulo-script">
    Emitir Histórico Acadêmico do aluno - SIGAA UFC
</h3>
<div class="textos-card">
    <p class="categorias-script">
        Categorias: Universidade
    </p>
    <p class="descricao-script">
        Este script irá guiá-lo até o sistema SIGAA da UFC e emitir o histórico acadêmico do discente em pdf.Este script irá guiá-lo até o sistema SIGAA da UFC e emitir o histórico acadêmico do discente em pdf.Este script irá guiá-lo até o sistema SIGAA da UFC e emitir o histórico acadêmico do discente em pdf.
    </p>
    <p class="engajamento-script">
        35 gostaram
    </p>
</div>
<ul class="botoes-script">
    <li><a href="" onclick="alert('Para executar scripts é necessário ter o servidor local instalado em seu computador e ter adicionado esse script à sua biblioteca.')">Executar</a></li>
    <li><a href="">Adicionar à minha biblioteca</a></li>
    <li><a href="">Ver comentários</a></li>
    <li><a href="">Gostei</a></li>
    <li><a href="">Denunciar</a></li>
</ul> */}

function formarStringCategorias(objeto){
    let string = "Categorias:"
    for(let elemento of objeto.categorias){
        string += " ";
        string += elemento;
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

function criarCardScript(objeto){
    let h3 = $(".titulo-script");
    let p1 = $(".categorias-script");
    let p2 = $(".descricao-script");
    let p3 = $(".engajamento-script");
    let p4 = $(".criador-script");
    let botoes = $(".botoes-script li a");

    botoes[0].addEventListener("click", ()=>{
        event.preventDefault();
        alert('Para executar scripts é necessário ter o servidor local instalado em seu computador e ter adicionado esse script à sua biblioteca.');
    });
    botoes[1].addEventListener("click", ()=>{
        event.preventDefault();
        alert('Ainda não implementado.');
    });
    botoes[2].addEventListener("click", ()=>{
        event.preventDefault();
        alert('Ainda não implementado.');
    });
    botoes[3].addEventListener("click", ()=>{
        event.preventDefault();
        alert('Ainda não implementado.');
    });
    botoes[4].addEventListener("click", ()=>{
        event.preventDefault();
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



carregarScript();