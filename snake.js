const canvas = document.querySelector("#game-canvas");
const contextoCanvas = canvas.getContext("2d");

const ancho = 20;
const largo = 20;
const velocidad = 7;


let manzana = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
}

let serpiente = {
    numeroDeHijos: 0,
    x: 10,
    y: 10,
    width: 50,
    height: 50,   
    hijos: [],
}

let direccion = "derecha";





function gameLoop(){
    dibujar();
    moverSerpiente();
    intercepcion();
}



function inicializar(){

    serpiente.x = Math.trunc(canvas.width/2);
    serpiente.y = Math.trunc(canvas.height/2);
    serpiente.numeroDeHijos = 0;
    serpiente.width = ancho;
    serpiente.height = largo;

    serpiente.hijos[0] = {
        x: serpiente.x,
        y: serpiente.y,
    }
    serpiente.numeroDeHijos += 1; 

    manzana.x = 400;
    manzana.y = 400;
    manzana.width = ancho;
    manzana.height = largo;

    direccion = "derecha";


}



document.addEventListener("keydown", function cambiarDireccion(event){

    if((event.keyCode === 37 || event.keyCode === 65)&& direccion !== "derecha"){
        direccion = "izquierda";
    }else if((event.keyCode === 38 || event.keyCode === 87) && direccion !== "abajo"){
        direccion = "arriba";
    }else if((event.keyCode === 39 || event.keyCode === 68) && direccion !== "izquierda"){
        direccion = "derecha";
    }else if((event.keyCode === 40 || event.keyCode === 83) && direccion !== "arriba"){
        direccion = "abajo";
    }else{
        console.log("Tecla if no reconocida");
    }
});





function moverSerpiente(){
    moverHijos();
    if(direccion === "izquierda"){
        serpiente.x = serpiente.x - serpiente.width;
    }else if(direccion === "derecha"){
        serpiente.x = serpiente.x + serpiente.width;
    }

    if(direccion === "arriba"){
        serpiente.y = serpiente.y - serpiente.height;
    }else if(direccion === "abajo"){
        serpiente.y = serpiente.y + serpiente.height;
    }
    
}





function moverHijos(){

    serpiente.hijos[0].x = serpiente.x;
    serpiente.hijos[0].y = serpiente.y;
    for(let i = serpiente.hijos.length -1; i > 0; i--){
        serpiente.hijos[i].x = serpiente.hijos[i-1].x;
        serpiente.hijos[i].y = serpiente.hijos[i-1].y;
    }

}



function moverManzana(){

    let maxAncho = Math.trunc(canvas.width / ancho);
    let maxLargo = Math.trunc(canvas.height / largo);

    manzana.x = ancho *(Math.floor(Math.random()*maxAncho));
    manzana.y = largo *(Math.floor(Math.random()*maxLargo));

}






function intercepcion(){

    if(serpiente.x === manzana.x && serpiente.y === manzana.y){
        console.log();
        contextoCanvas.clearRect(manzana.x, manzana.y, manzana.width, manzana.height);
        moverManzana();
        agregarHijo();
    }    

}




function agregarHijo(){

    serpiente.hijos[serpiente.numeroDeHijos] =  {
        x: serpiente.hijos[serpiente.hijos.length -1].x,
        y: serpiente.hijos[serpiente.hijos.length -1].y,
    }

    serpiente.numeroDeHijos = serpiente.numeroDeHijos + 1;

}





function dibujar(){
    contextoCanvas.clearRect(0,0,canvas.width, canvas.height);


    //Dibuja la serpiente
    contextoCanvas.fillStyle = "green";

    contextoCanvas.fillRect(
        serpiente.x, 
        serpiente.y, 
        serpiente.width, 
        serpiente.height
        );


    //Dibuja la hijos
    contextoCanvas.fillStyle = "lightgreen";

    for(let i = serpiente.hijos.length -1; i > 0; i--){

        contextoCanvas.fillRect(
            serpiente.hijos[i].x, 
            serpiente.hijos[i].y, 
            serpiente.width, 
            serpiente.height
            );

    }


    //Dibuja la manzana
    contextoCanvas.fillStyle = "red";

    contextoCanvas.fillRect(manzana.x, manzana.y, manzana.width, manzana.height);
}




inicializar();
setInterval(gameLoop, 1000/velocidad);

