let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let moviendo = false;
let fichaClickeada = null;

let tablero = new Tablero(ctx);
let juego1 = new Juego();
let ganador = "nadie";
const maxFichas = 50;
const sectorFichas1 = 250;
const sectorFichas2 = 1050;
const tamañoFicha = 35;
let fichas = [];
let posOriginalX;
let posOriginalY;

let reanudar=document.querySelector('#reiniciar').addEventListener('click',reiniciar);

let imagenj1 = new Image();
let imagenj2 = new Image();
imagenj1.src = "../img/america.png";
imagenj1.onload = () => {
    imagenj2.src = "../img/thor.png"
    imagenj2.onload = () => {
        inciarTablero();
    }
}

function addFicha(){
    let jugador;
    let posX = 0;
    let posY = Math.round(Math.random() * (canvas.height));
    let color;
    if(posY < tamañoFicha){
        posY += tamañoFicha;
    }if(posY > canvas.height - tamañoFicha){
        posY -= tamañoFicha;
    }
    if(fichas.length < (maxFichas/2)){
        jugador = "j1";
        color = imagenj1;
        posX = Math.round(Math.random() * (sectorFichas1));
        if(posX < tamañoFicha){
            posX += tamañoFicha;
        }if(posX > sectorFichas1 - tamañoFicha){
            posX -= tamañoFicha;
        }
    }else{
        jugador = "j2";
        color = imagenj2;
        posX = Math.round(Math.random() * (canvas.width - sectorFichas2) + sectorFichas2);
        if(posX < sectorFichas2 + tamañoFicha){
            posX += tamañoFicha;
        }if(posX > canvas.width - tamañoFicha){
            posX -= tamañoFicha;
        }
    }
    let ficha = new Ficha(posX,posY,tamañoFicha,color,ctx,jugador);
    fichas.push(ficha);
}



function drawFichas(){
    clearCanvas();
    for(let i = 0; i < fichas.length; i++){
        fichas[i].draw();
    }
}

function inciarTablero(){
    addFichas();
    drawFichas();
    tablero.setColorFicha1(imagenj1);
    tablero.setColorFicha2(imagenj2);
    tablero.draw();
}

function clearCanvas(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function addFichas(){
    for(i = 0; i < maxFichas; i++){
        addFicha();
    }
}

function buscarFichaClickeada(x,y){
    for(i = 0; i < fichas.length; i++){
        let ficha = fichas[i];
        if(ficha.estaAdentro(x,y)){
            ficha.setSeleccionadaOn();
            return ficha;
        }
    }
}

canvas.addEventListener("mousedown",function(e){
    let x = e.layerX;
    let y = e.layerY;
    fichaClickeada = buscarFichaClickeada(x,y);
    if(fichaClickeada != null){
        moviendo = true;
        posOriginalX = fichaClickeada.getPosX();
        posOriginalY = fichaClickeada.getPosY();
    }
});

canvas.addEventListener("mousemove",function(e){
    let x = e.layerX;
    let y = e.layerY;
    if(moviendo == true){
        fichaClickeada.setPosXY(x,y);
        drawFichas();
        tablero.draw();  
    }
});

canvas.addEventListener("mouseup",function(e){
    let x = e.layerX;
    let y = e.layerY;
    let posFicha = tablero.estaAdentro(x,y);
    if(posFicha != -1 && fichaClickeada != null){ // Pregunto si le dió al circulito donde se ingresa la ficha
        let jugador = fichaClickeada.getJugador();
        console.log("jugador: "+jugador);
        if(juego1.getTurno() == "cualquiera" || juego1.getTurno() == jugador){ // Pregunto si es el primer turno o si es el de el
            juego1.insertarFicha(posFicha,jugador);
            tablero.setMatrizTablero(juego1.getMatrizTablero()); // Uso la misma matriz del juego para dibujar el tablero
            let cont = 0;
            while(cont < fichas.length){ // Para eliminar del arreglo la que ingreso al tablero
                if(fichas[cont] == fichaClickeada){
                    fichas.splice(cont,1);
                    cont = fichas.length + 1;
                }
                cont++;
            }
            if(jugador == "j1"){
                juego1.setTurno("j2");
            }else{
                juego1.setTurno("j1");
            }
        }else{
            alert("No es tu turno");
            volverFichaClickeada();
        }
        if(juego1.getGano() != false){
            ganador = juego1.getGano();
            setTimeout(ganadorEs,5);
            setTimeout(reiniciar,1000);
            
        }
    }if(posFicha == -1 && fichaClickeada != null){
        volverFichaClickeada();
    }
    moviendo = false;
    if(fichaClickeada != null){
        fichaClickeada.offsetOff();
        fichaClickeada.setSeleccionadaOff();
    }
    fichaClickeada = null;
    drawFichas();
    tablero.draw();
});

//tienen 5 minutos para jugar

let countdown= document.querySelector('#countdown');
const startingMinutes=0.30;
let time = startingMinutes*60;
let div=document.querySelector('.canvas');
let div2=document.querySelector('#contenedor');

let tiempo=setInterval(contador, 1000);
div2.classList.toggle('ocultar');

function contador(){
    let minutes = Math.floor(time/60);
    let seconds = time %60;

    seconds = seconds <0.1 ? '0' + seconds:seconds;
    countdown.innerHTML= `${minutes}:${seconds}`;
    time --;

    if(minutes==0 &&seconds==0){
        div.classList.toggle('ocultar');
        div2.classList.toggle('ocultar');
        clearInterval(tiempo);

    }
     
    

    
}
function reiniciar(){
    div.classList.toggle('ocultar');
    div2.classList.toggle('ocultar');
    tiempo;
    
    tablero.resetTablero();
            juego1.resetJuego();
            fichas = [];
            inciarTablero();
            
}



function ganadorEs(){
    if(ganador == "j1"){
        console.log(ganador);
        alert("Ganó el jugador: America");
    }else{
        alert("Ganó el jugador: Thor");
    }
}

function volverFichaClickeada(){
    fichaClickeada.offsetOff();
    fichaClickeada.setPosX(posOriginalX);
    posOriginalX = null;
    fichaClickeada.setPosY(posOriginalY);
    posOriginalY = null;
}





