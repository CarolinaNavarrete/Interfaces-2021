class Ficha{

    constructor(posX,posY,radio,fill,context,jugador){
        this.radio = radio;
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.seleccionada = false;
        this.colorSeleccion = "red";
        this.offsetX = 0;
        this.offsetY = 0;
        this.jugador = jugador;
    }

    draw(){
        this.context.beginPath();
        this.context.drawImage(this.fill, this.posX - this.radio - this.offsetX, this.posY - this.radio - this.offsetY, this.radio *2 , this.radio *2 );
        if(this.seleccionada === true){
            this.context.strokeStyle = this.colorSeleccion;
            this.context.lineWidth = 5;
            this.context.stroke();
        }else{
            this.context.strokeStyle = "black";
            this.context.lineWidth = 1;
            this.context.stroke();
        }
        this.context.closePath();
    }

    estaAdentro(x,y){
        let _x = this.posX -x;
        let _y = this.posY -y;
        if(Math.sqrt(_x * _x + _y * _y) < this.radio){
            this.offsetX = x - this.posX;
            this.offsetY = y - this.posY;
            return true;
        }else{
            return false;
        }
    }

    getRadio(){
        return this.radio;
    }

    offsetOff(){
        this.posX = this.posX - this.offsetX;
        this.posY = this.posY - this.offsetY;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    setFill(fill){
        this.fill = fill;
    }

    setSeleccionadaOn(){
        this.seleccionada = true;
    }
    
    setSeleccionadaOff(){
        this.seleccionada = false;
    }

    getSeleccionada(){
        return this.seleccionada;
    }

    getPosicion(){
        return{
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    setPosX(x){
        this.posX = x;
    }

    setPosY(y){
        this.posY = y;
    }

    setPosXY(x,y){
        this.posX = x;
        this.posY = y;
    }

    getFill(){
        return this.fill;
    }

    getJugador(){
        return this.jugador;
    }
}