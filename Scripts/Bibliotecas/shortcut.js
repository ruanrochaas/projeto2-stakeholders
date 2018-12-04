var map = {18: false, 49: false, 50:false, 51:false, 48:false, 192:false, 52:false, 53:false, 54:false, 192:false};
$(document).keydown(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = true;
        if(map[18] && map[192]){
            window.location.href = "./bem-vindo.html";
        }else if (map[18] && map[49]) {
            window.location.href = "./biblioteca.html";
        } else if(map[18] && map[50]){
            window.history.back();
        } else if(map[18] && map[51]){
            $('.pesquisa').focus();
        } else if(map[18] && map[52]){
            //window.location.href = "./scripts.html";
        } else if(map[18] && map[53]){
            //window.location.href = "./pedidos.html";
        } else if(map[18] && map[54]){
            //window.location.href = "./fazer-pedido.html";
        } else if(map[18] && map[48]){
            window.location.href = "./entrar.html";
            //setTimeout(()=>{$('#email').focus();}, 3000); ver como fazer isso depois
        }
    }
}).keyup(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = false;
    }
});