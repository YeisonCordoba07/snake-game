const canvas = document.querySelector("#game-canvas");
const contextoCanvas = canvas.getContext("2d");

const ancho = 20;
const largo = 20;


function inicializar(){

    serpiente.x = Math.trunc(canvas.width/2);
    serpiente.y = Math.trunc(canvas.height/2);
    serpiente.numeroDeHijos = 1;
    serpiente.width = ancho;
    serpiente.height = largo;

    serpiente.hijos[serpiente.numeroDeHijos] = {
        x: serpiente.x - serpiente.width,
        y: serpiente.y - serpiente.height,
    }
    serpiente.numeroDeHijos += 1; 

    manzana.x = 30;
    manzana.y = 30;
    manzana.width = ancho;
    manzana.height = largo;
}


let manzana = {
    x: 30,
    y: 30,
    width: 50,
    height: 50,
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



document.addEventListener("keydown", cambiarDireccion);

function cambiarDireccion(evento){

    if(evento.keyCode === 37 || evento.keyCode === 65 && direccion !== "derecha"){
        direccion = "izquierda";
    }else if(evento.keyCode === 38 || evento.keyCode === 87 && direccion !== "abajo"){
        direccion = "arriba";
    }else if(evento.keyCode === 39 || evento.keyCode === 68 && direccion !== "izquierda"){
        direccion = "derecha";
    }else if(evento.keyCode === 40 || evento.keyCode === 83 && direccion !== "arriba"){
        direccion = "abajo";
    }else{
        console.log("Tecla if no reconocida");
    }
}

function moverSerpiente(){
    if(direccion === "izquierda"){
        serpiente.x = serpiente.x + serpiente.width;
    }else if(direccion === "derecha"){
        serpiente.x = serpiente.x - serpiente.width;
    }

    if(direccion === "arriba"){
        serpiente.y = serpiente.y + serpiente.height;
    }else if(direccion === "abajo"){
        serpiente.y = serpiente.y - serpiente.height;
    }
}




function moverManzana(){
    // return Math.random() * (max - min) + min; no incluye el maximo
    manzana.x = (Math.random() * (ancho - 0)) + 0;
    manzana.y = (Math.random() * (largo - 0)) + 0;
}
function intercepcion(){

    if(!(serpiente.x > manzana.x + manzana.width &&
        serpiente.x + serpiente.width < manzana.x &&
        serpiente.y > manzana.y + manzana.height &&
        serpiente.y + serpiente.width < manzana.y)){
            
            contextoCanvas.clearRect(manzana.x, manzana.y, manzana.width, manzana.height);
            moverManzana();
        }

   /* Si ( x1 > x2+w2 ) ==> No hay colisión
Si ( x1+w1 < x2 ) ==> No hay colisión
Si ( y1 > y2+h2 ) ==> No hay colisión
Si ( y1+h1 < y2 ) ==> No hay colisión
En otro caso ==> Hay colisión*/
}

function dibujar(){
    contextoCanvas.clearRect(0,0,canvas.width, canvas.height);

   

    //Dibuja la serpiente
    contextoCanvas.fillStyle = "green";

    contextoCanvas.fillRect(
        serpiente.x + serpiente.width, 
        serpiente.y + serpiente.height, 
        serpiente.width, 
        serpiente.height
        );


    //Dibuja la manzana
    contextoCanvas.fillStyle = "red";

    contextoCanvas.fillRect(manzana.x, manzana.y, manzana.width, manzana.height);
}




console.log(canvas.height);

inicializar();
dibujar();
