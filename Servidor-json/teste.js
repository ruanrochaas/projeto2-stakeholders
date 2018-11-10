let xhttp = new XMLHttpRequest();
xhttp.open("GET","http://localhost:3000/usuarios",true);
xhttp.onload = function(){
    if(this.status == 200){
        console.log(JSON.parse(this.responseText)[0].ultimoIdCriado);
    }
};
xhttp.send();

//_sort -> ordenar, _ordem -> crescente e decrescente, _limit -> qtd de resultados
//http://localhost:3000/usuarios?_sort=id&_order=desc&_limit=1