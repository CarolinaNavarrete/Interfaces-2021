class Tablero{
    
    
    
    constructor(context){
        this.context = context;
        this.matrizTablero = [];
        this.filas = 6;
        this.columnas = 7;
        this.colorFicha1;
        this.colorFicha2;
        this.radio = 35;
        this.inicMatriz();    
        this.posiciones = [377,467,557,647,737,827,917];
    }
    
    inicMatriz(){
        for(let x = 0; x < this.filas; x++){
            this.matrizTablero[x] = [];
            for(let y= 0; y < this.columnas; y++){
                this.matrizTablero[x][y] = -1;
            }
        }
        console.table(this.matrizTablero);
    }

    draw(){
        this.context.fillStyle = "rgb(8, 7, 48)";
        this.context.beginPath();
        this.context.fillRect(330,50,640,500);
        this.context.fillRect(250,550,800,50);
        this.context.strokeStyle = "red";
        this.context.lineWidth = 5;
        this.context.strokeRect(330,50,640,500);
        this.context.strokeRect(250,550,800,50);
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.moveTo(250,0);
        this.context.lineTo(250,canvas.height);
        this.context.moveTo(1050,0);
        this.context.lineTo(1050,canvas.height);
        this.context.stroke();
        let x = 377;
        let y = 93;
        for(let i = 0; i < 6; i++){
            for(let j = 0; j < 7; j++){
                this.context.beginPath();
                if(this.matrizTablero[i][j] == "j1"){
                    this.context.drawImage(this.colorFicha1, x - this.radio, y - this.radio, this.radio *2 , this.radio *2 );
                }else{
                    if(this.matrizTablero[i][j] == "j2"){
                        this.context.drawImage(this.colorFicha2, x - this.radio, y - this.radio, this.radio *2 , this.radio *2 );
                    }else{
                        this.context.fillStyle = "rgb(255, 255, 255, 1)";
                        this.context.arc(x,y,35,0,2*Math.PI);
                        this.context.fill();
                    }
                }
                this.context.closePath();
                x += 90;
           }
           x = 377;
           y += 83;
        }
        for(let i = 0; i < this.posiciones.length; i++){
            this.context.beginPath();
            this.context.fillStyle = "rgb(50, 50, 50, 1)";
            this.context.arc(this.posiciones[i],30,10,0,2*Math.PI);
            this.context.fill();
        }
        this.context.closePath();
    }
    
    estaAdentro(x,y){
        let _x = this.posX -30;
        let _y = 30 - y;
        for(let i = 0; i < this.posiciones.length; i++){
            _x = this.posiciones[i] -x;
            if(Math.sqrt(_x * _x + _y * _y) < 10){
                return i;
            }
        }
        return -1;
    }

    insertarFicha(posicion,jugador){
        let i = 5;
        while(i >= 0 && this.matrizTablero[posicion][i] != -1){
            i--;            
        }
        if(i >= 0){
            this.matrizTablero[posicion][i] = jugador;
            return {posicion,i};
        }
        return null;
    }

    setMatrizTablero(matriz){
        this.matrizTablero = matriz;
    }

    resetTablero(){
        this.inicMatriz();
    }

    setColorFicha1(img){
        this.colorFicha1 = img;
    }

    setColorFicha2(img){
        this.colorFicha2 = img;
    }
}