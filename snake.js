const canvas = document.querySelector("#game-canvas");
const contextoCanvas = canvas.getContext("2d");

const ancho = 20;
const largo = 20;
const velocidad = 5;


function gameLoop(){
    dibujar();

    moverSerpiente();
    intercepcion();
}

function agregarHijo(){
    serpiente.hijos[serpiente.numeroDeHijos] =  {
        x: serpiente.hijos[serpiente.numeroDeHijos-1].x - serpiente.width,
        y: serpiente.hijos[serpiente.numeroDeHijos-1].y - serpiente.height,
    }

   /* serpiente.hijos[serpiente.numeroDeHijos].push({
        x: serpiente.hijos[serpiente.numeroDeHijos-1].x - serpiente.width,
        y: serpiente.hijos[serpiente.numeroDeHijos-1].y - serpiente.height,
    });*/
    serpiente.numeroDeHijos = serpiente.numeroDeHijos + 1;
    console.log(serpiente.hijos);  
}



function inicializar(){

    serpiente.x = Math.trunc(canvas.width/2);
    serpiente.y = Math.trunc(canvas.height/2);
    serpiente.numeroDeHijos = 0;
    serpiente.width = ancho;
    serpiente.height = largo;

    serpiente.hijos[0] = {
        x: serpiente.x - serpiente.width,
        y: serpiente.y - serpiente.height,
    }
    serpiente.numeroDeHijos += 1; 

    manzana.x = 400;
    manzana.y = 400;
    manzana.width = ancho;
    manzana.height = largo;

    direccion = "derecha";
}


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
    moverHijos();
}

function moverHijos(){
    serpiente.hijos[0].x = serpiente.x - serpiente.width;
    serpiente.hijos[0].y = serpiente.y;
    let contador = 0;
    serpiente.hijos.forEach(i => {
        if(i !== serpiente.hijos[0]){
            i.x = serpiente.hijos[contador].x;
            i.y = serpiente.hijos[contador].y;
        }

    });
}


function moverManzana(){
    // return Math.random() * (max - min) + min; no incluye el maximo
    let posicionX = 0;
    let posicionY = 0;

    let maxAncho = Math.trunc(canvas.width / ancho);
    let maxLargo = Math.trunc(canvas.height / largo);

    posicionX = ancho *(Math.floor(Math.random()*maxAncho));
    posicionY = largo *(Math.floor(Math.random()*maxLargo));

    manzana.x = posicionX;
    manzana.y = posicionY;
}
function intercepcion(){



    if(serpiente.x === manzana.x && serpiente.y === manzana.y){
        console.log();
        contextoCanvas.clearRect(manzana.x, manzana.y, manzana.width, manzana.height);
        moverManzana();
        agregarHijo();
    }    

    /*if((serpiente.x > manzana.x + manzana.width &&
        serpiente.x + serpiente.width < manzana.x &&
        serpiente.y > manzana.y + manzana.height &&
        serpiente.y + serpiente.width < manzana.y)){
            
            console.log("no toca");
            contextoCanvas.clearRect(manzana.x, manzana.y, manzana.width, manzana.height);
            moverManzana();
        }else{
            
            console.log("si toca");
        }*/

    /*if((serpiente.x > manzana.x + manzana.width &&
        serpiente.x + serpiente.width < manzana.x &&
        serpiente.y > manzana.y + manzana.height &&
        serpiente.y + serpiente.width < manzana.y)){
            
            contextoCanvas.clearRect(manzana.x, manzana.y, manzana.width, manzana.height);
            moverManzana();
        }*/

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
        serpiente.x, 
        serpiente.y, 
        serpiente.width, 
        serpiente.height
        );
    //Dibuja la hijos
    contextoCanvas.fillStyle = "darkgreen";

    contextoCanvas.fillRect(
        serpiente.hijos[0].x, 
        serpiente.hijos[0].y, 
        serpiente.width, 
        serpiente.height
        );

        serpiente.hijos.forEach(i => {

            contextoCanvas.fillRect(
                i.x, 
                i.y, 
                serpiente.width, 
                serpiente.height
                );
        });

    //Dibuja la manzana
    contextoCanvas.fillStyle = "red";

    contextoCanvas.fillRect(manzana.x, manzana.y, manzana.width, manzana.height);
}




inicializar();
setInterval(gameLoop, 1000/velocidad);
