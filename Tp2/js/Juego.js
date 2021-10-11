class Juego{

    constructor(){
        this.turno = "cualquiera";
        this.gano = false;
        this.matrizTablero = [];
        this.filas = 6;
        this.columnas = 7;
        this.inicMatriz();
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

    insertarFicha(posicion,jugador){
        let i = 5;
        while(i >= 0 && this.matrizTablero[i][posicion] != -1){
            i--;            
        }
        if(i >= 0){
            this.matrizTablero[i][posicion] = jugador;
            console.table(this.matrizTablero);
            this.verificarJuego(i,posicion,jugador);
            return true;
        }
        return false;
    }

    verificarJuego(y,x,jugador){
        let i = 0;
        let posInicialX = x;
        let posInicialY = y;
        while(x > -1 && this.matrizTablero[y][x] == jugador && i < 4){ //Izquierda
            i++;
            x--;
        }
        if(i < 4){
            i = 0;
            x = posInicialX;
            while(x > -1 && y > -1 && this.matrizTablero[y][x] == jugador && i < 4){ //Arriba Izquierda
                i++;
                x--;
                y--;
            }
            if(i < 4){
                i = 0;
                x = posInicialX;
                y = posInicialY;
                while(x > -1 && y < 6 && this.matrizTablero[y][x] == jugador && i < 4){ //Abajo Izquierda
                    i++;
                    x--;
                    y++;
                }
                if(i < 4){
                    i = 0;
                    x = posInicialX;
                    y = posInicialY;
                    while(y < 6 && this.matrizTablero[y][x] == jugador && i < 4){ //Abajo
                        i++;
                        y++;
                    }
                    if(i < 4){
                        i = 0;
                        x = posInicialX;
                        y = posInicialY;
                        while(x < 7 && y < 6 && this.matrizTablero[y][x] == jugador && i < 4){ //Abajo Derecha
                            i++;
                            y++;
                            x++;
                        }
                        if(i < 4){
                            i = 0;
                            x = posInicialX;
                            y = posInicialY;
                            while(x < 7 && this.matrizTablero[y][x] == jugador && i < 4){ //Derecha
                                i++;
                                x++;
                            }
                            if(i < 4){
                                i = 0;
                                x = posInicialX;
                                y = posInicialY;
                                while(x < 7 && y > -1 && this.matrizTablero[y][x] == jugador && i < 4){ //Arriba Derecha
                                    i++;
                                    x++;
                                }
                                if(i < 4){
                                    console.log("Nadie ganó");
                                }
                            }else{
                                this.gano = jugador;
                            }
                        }else{
                            this.gano = jugador;
                        }
                    }else{
                        this.gano = jugador;
                    }
                }else{
                    this.gano = jugador;
                }
            }else{
                this.gano = jugador;
            }
        }else{
            this.gano = jugador;
        }
    }

    getMatrizTablero(){
        return this.matrizTablero;
    }

    getTurno(){
        return this.turno;
    }

    setTurno(jugador){
        this.turno = jugador;
    }

    getGano(){
        return this.gano;
    }

    resetJuego(){
        this.inicMatriz();
        this.turno = "cualquiera";
        this.gano = false;
    }

}