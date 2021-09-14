'use strict';

let canvas=document.querySelector('#MyCanvas');
let ctx =canvas.getContext('2d') //Contexto donde se dibuja
let rect = canvas.getBoundingClientRect(); //devuelve el tamaño de un elemento y su posición relativa a la ventana gráfica.
let width=800; //ancho del canvas
let height=500; //alto del canvas
let imageData=ctx.createImageData(width,height);//crea un nuevo objeto ImageData en blanco

//BTNS Y VARIABLES FILTROS
document.querySelector('#brillo').addEventListener('click',brillo);
document.querySelector('#negativo').addEventListener('click',negativo);
document.querySelector('#binarizacion').addEventListener('click',binarizacion);
document.querySelector('#sepia').addEventListener('click',sepia);

let brillo=false;
let negativo=false;
let binarizacion=false;
let sepia=false;
let imagenAuxiliar = '';
//



let foto = document.querySelector("#imagen");
let x = 0;
let y = 0; 
let dibujando = false;
let color = "black";
let grosor = 1;
//let  a = 255;
ctx.lineWidth = 1;
let r=255;
let g=255;
let b=0;
let a=255;


//LÁPIZ PARA DIBUJAR
document.querySelector("#lapiz").addEventListener("click",function(){
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
})


//GOMA PARA BORRAR LIENZO
document.querySelector("#goma").addEventListener("click",function(){
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
})



//FUNCION PARA DIBUJAR EN LIENZO
canvas.addEventListener("mousemove",dibujar);

function dibujar(e){
    x = e.clientX - rect.left - 4; //el 4 es por el borde de 4px
    y = e.clientY - rect.top - 4;
    if(dibujando == true){
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
canvas.addEventListener("mousedown",function(){
    dibujando = true;
    ctx.beginPath();
    ctx.moveTo(x,y);
    canvas.addEventListener("mousemove",dibujar);
});

canvas.addEventListener("mouseup",function(){
    dibujando = false;
});


//FUNCION PARA SELECCIONAR COLOR
function canvascolor(e){
    ctx.strokeStyle = e;
}
//FUNCION PARA SELECCIONR GROSOR AL TRAZO DEL LÁPIZ
function canvasgrosor(e){
    ctx.lineWidth = e;
}


//FUNCION ANONIMA DE CARGA DE IMAGEN A TRAVEZ DE TYPE=FILE


foto.onchange = e => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = readerEvent => {
        let content = readerEvent.target.result;
        let image = new Image();
        image.src = content;
        image.onload = function () {
            let imageAspectRatio = (1.0 * this.height) / this.width;
            let imageScaledWidth = canvas.width;
            let imageScaledHeight = canvas.width * imageAspectRatio;
            ctx.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);
        }
    }
}


//               FILTROS

function sepia() {
    if(sepia==false){
        let imageData = ctx.getImageData(0,0,this.width,this.height);
        imagenAuxiliar = imageData;
        for(x=0; x<canvas.height;x++){
            for(y=0;y<canvas.height;y++){
                let r=getRed(imageData,x,y);
                let g=getGreen(imageData,x,y);
                let b=getBlue(imageData,x,y);

                let newR= 0.393 * r + 0.769 * g + 0.189 *b;
                let newG= 0.349 * r + 0.686 * g + 0.168 *b;
                let newB= 0.272 * r + 0.534 * g + 0.131 *b;

                if(newR>255){
                    newR=255;
                }
                if(newG>255){
                    newG=255;
                }
                if(newB>255){
                    newB=255;
                    setPixel(imageData,x,y,newR,newG,newB,a);
                }


            }
            sepia=true;
            ctx.putImageData(imageData,0,0);
        }
        
    }else{
    for(x=0;x<canvas.width;x++){
        for(y = 0; y < canvas.height; y ++){
            let r = getRed(imagenAuxiliar,x,y);
            let g = getGreen(imagenAuxiliar,x,y);
            let b = getBlue(imagenAuxiliar,x,y);
            setPixel(imageData,x,y,r,g,b,a);
        }
    }
    ctx.putImageData(imageData,0,0);
    sepia = false;
    }
    }
    



for(let x=0; x<width;x++){
    for(let y=0;y<height;y++){
        setPixel(imageData,x,y,r,g,b,a)
    }
}

//ctx.putImageData(imageData,x,y)*4;




function myDrawImageMethod(image){
    ctx.drawImage(image,0,0);
}
let image1 = new Image();
image1.src = "circulos.jpg"
image1.onload=()=>{
    myDrawImageMethod(this);
    imageData=ctx.getImageData(0,0, this.width,this.height);
    ctx.putImageData(imageData,0.0);
}



foto.onchange = e => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = readerEvent => {
        let content = readerEvent.target.result;
        let img = new Image();
        img.src = content;
        img.onload = function () {
            let imageAspectRatio = (1.0 * this.height) / this.width;
            let imageScaledWidth = canvas.width;
            let imageScaledHeight = canvas.width * imageAspectRatio;
            ctx.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);
        }
    }
}

function setPixel(imageData,x,y,r,g,b,a){
    let index =(x+y*imageData.height)*4; //el 4 es por los valores posibles  RGBA
    imageData.data[index + 0]=r;
    imageData.data[index + 1]=g;
    imageData.data[index + 2]=b;
    imageData.data[index + 3]=a;
    
}


function getRed(imageData,x,y){
    ind =(x+y*imageData.width)*4;
    return imageData.data[ind+0];
}

function getGreen(imageData,x,y){
    ind =(x+y*imageData.width)*4;
    return imageData.data[ind+1];
}
function getBlue(imageData,x,y){
    ind =(x+y*imageData.width)*4;
    return imageData.data[ind+2];
}



