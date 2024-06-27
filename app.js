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
    
}

