class Ship{
    constructor(length){
        this.length = length
        this.sunk = false
        this.hits = 0
    }

    hit(){
        this.hits++
    }

    isSunk(){
        if(this.hits === this.length){
            this.sunk = true
        }
        return this.sunk
    }

}

class GameBoard{
    constructor(){
        this.tanker = new Ship(5);
        this.sub = new Ship(3);
        this.patrol = new Ship(2);
    }
    board = this.board();
    hits = [];
    missed = [];
    sunk = [];
    board(){
        const rows = 6;
        const colums = 6;
        const board = [];

        for (let i = 0; i < rows; i++){
            board[i] = [];
            for (let j = 0; j < colums; j++){
                board[i].push('')
            }
        }
 
        //this placement should be random

        //Place the tanker 
        // i is the starting row point and i<value is the length of the ship 
        for (let i = 0; i < 5; i++){
            board[1][i] = 't'
        }

        //Place the sub
        for (let i = 2; i < 5; i++){
            board[3][i] = 's'
        }

        //place the patrol
        for (let i = 1; i < 3; i++){
            board[5][i] = 'p'
        }

        return board
    }

    receiveAttack(x,y){
        //check if the co-ordinates have been hit
        if(this.hits.length){
            let isHit = false
            this.hits.reduce((acc,arr,index) => {
                if(arr[0] === x && arr[1] === y){
                    console.log('Already hitted');
                    isHit = true
                }
            },0)
            this.missed.reduce((acc,arr,index) => {
                if(arr[0] === x && arr[1] === y){
                    console.log('Already missed');
                    isHit = true
                }
            },0)
            if(isHit){
                console.log('returning');
                return
            }
        }

        if(this.board[x][y] === 't'){
            //record the hit in the tanker
            console.log('...receiving a hit to tanker');
            this.tanker.hit()

            //record the hitted area in the hits array
            this.hits.push([x,y])

            if(this.tanker.isSunk() && !this.sunk.includes('tanker')) {
                this.sunk.push('tanker');
                console.log('tanker has sunk');
            }

            //check if all ships have sunk
            if(this.checkAllShipSunk()){
                console.log('..All ships have sunk....game O..over');
            }

        }else if(this.board[x][y] === 's'){
            //record the hit in the sub
            console.log('...receiving a hit to sub');
            this.sub.hit()

            //record the hitted area in the hits array
            this.hits.push([x,y])

            if(this.sub.isSunk() && !this.sunk.includes('sub')) {
                this.sunk.push('sub');
                console.log('sub has sunk');
            }

            if(this.checkAllShipSunk()){
                console.log('..All ships have sunk....game O..over');
            }

        }else if(this.board[x][y] === 'p'){
            //record the hit in the patrol
            console.log('...receiving a hit to patrol');
            this.patrol.hit()

            //record the hitted area in the hits array
            this.hits.push([x,y])

            if(this.patrol.isSunk() && !this.sunk.includes('patrol')) {
                this.sunk.push('patrol');
                console.log('patrol has sunk');
            }

            if(this.checkAllShipSunk()){
                console.log('..All ships have sunk....game O..over');
            }

        }else{
            console.log('missed man');
            this.missed.push([x,y])
        }

    }

    checkAllShipSunk(){
        return ['tanker','patrol','sub'].every(item => this.sunk.includes(item))
    }

    showUpdates(){
        console.log('board');
        console.table(this.board);
        console.log('hits');
        console.table(this.hits)
        console.log('sunk');
        console.table(this.sunk)
        console.log('missed');
        console.table(this.missed);
    }

}

const myBoard = new GameBoard()


myBoard.receiveAttack(5,2)
myBoard.receiveAttack(1,2)
myBoard.receiveAttack(1,0)
myBoard.receiveAttack(1,1)
myBoard.receiveAttack(5,1)
myBoard.receiveAttack(1,3)
myBoard.receiveAttack(1,4)
myBoard.receiveAttack(3,2)
myBoard.receiveAttack(5,5)
myBoard.receiveAttack(5,5)
myBoard.receiveAttack(3,4)
myBoard.receiveAttack(3,3)

myBoard.showUpdates()


