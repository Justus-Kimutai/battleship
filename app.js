import { board } from "./board.js"

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

export class GameBoard{
    constructor(){
        
        this.tanker = new Ship(4);

        this.sub1 = new Ship(3);
        this.sub2 = new Ship(3);

        this.corrier1 = new Ship(2);
        this.corrier2 = new Ship(2);
        this.corrier3 = new Ship(2);

        this.patrol1 = new Ship(1);
        this.patrol2 = new Ship(1);
        this.patrol3 = new Ship(1);
        this.patrol4 = new Ship(1);

        this.board = board()
        this.allSunk = false
    }
    hits = {
        tankerHits:[],
        sub1Hits:[],
        sub2Hits:[],
        corrier1Hits:[],
        corrier2Hits:[],
        corrier3Hits:[],
        patrol1Hits:[],
        patrol2Hits:[],
        patrol3Hits:[],
        patrol4Hits:[]
    };
    generalHits = [];
    missed = [];
    sunk = [];
    hasAnySunk = false;
    message = ''
    intelligenceMessage = ''

    resetIntelligenceMessage(){
        this.intelligenceMessage = ''
    }

    checkhittedCell(){

    }
    
    receiveAttack(x,y){
        console.log('attack ordinates ', x, y);

        //check if the co-ordinates have been hit
        if(this.generalHits.length){

            let isHit = false

            this.generalHits.reduce((acc,arr,index) => {
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

            //check if it has been poped from the board
            if(x === undefined || y === undefined){
                console.log('Already hitted');
                isHit = true
            }

            if(isHit){
                console.log('returning');
                return
            }
        }

        if(this.board[x][y] === '4-0'){
            this.message = ''
            //record the hit in the tanker
            this.hasAnySunk = false
            console.log('...receiving a hit to tanker');
            this.tanker.hit()

            //record the hitted area in the hits array
            this.generalHits.push([x,y])
            this.hits.tankerHits.push([x,y])
            this.intelligenceMessage = 'tanker'

            if(this.tanker.isSunk() && !this.sunk.includes('tanker')) {
                this.sunk.push('tanker');
                console.log('tanker has sunk');
                this.message = 'tanker'
                this.hasAnySunk = true
            }

            //check if all ships have sunk
            if(this.checkAllShipSunk()){
                console.log('..All ships have sunk....game O..over');
            }

        }else if(this.board[x][y] === '3-0'){
            this.message = ''
            this.hasAnySunk = false
            //record the hit in the sub
            console.log('...receiving a hit to sub one');
            this.sub1.hit()

            //record the hitted area in the hits array
            this.generalHits.push([x,y])
            this.hits.sub1Hits.push([x,y])
            this.intelligenceMessage = 'sub one'

            if(this.sub1.isSunk() && !this.sunk.includes('sub-one')) {
                this.sunk.push('sub-one');
                console.log('sub one has sunk');
                this.message = 'sub one'
                this.hasAnySunk = true
            }

            if(this.checkAllShipSunk()){
                console.log('..All ships have sunk....game O..over');
                this.allSunk = true
            }

        }else if(this.board[x][y] === '3-1'){
            this.message = ''
            this.hasAnySunk = false
            //record the hit in the sub
            console.log('...receiving a hit to sub two');
            this.sub2.hit()

            //record the hitted area in the hits array
            this.generalHits.push([x,y])
            this.hits.sub2Hits.push([x,y])
            this.intelligenceMessage = 'sub two'

            if(this.sub2.isSunk() && !this.sunk.includes('sub-two')) {
                this.sunk.push('sub-two');
                console.log('sub two has sunk');
                this.message = 'sub two'
                this.hasAnySunk = true
            }

            if(this.checkAllShipSunk()){
                console.log('..All ships have sunk....game O..over');
                this.allSunk = true
            }

        }else if(this.board[x][y] === '2-0'){
            this.message = ''
            this.hasAnySunk = false
            //record the hit in the patrol
            console.log('...receiving a hit to corrier one');
            this.corrier1.hit()

            //record the hitted area in the hits array
            this.generalHits.push([x,y])
            this.hits.corrier1Hits.push([x,y])
            this.intelligenceMessage = 'corrier one'

            if(this.corrier1.isSunk() && !this.sunk.includes('corrier-one')) {
                this.sunk.push('corrier-one');
                console.log('corrier one has sunk');
                this.message = 'corrier one'
                this.hasAnySunk = true
            }

            if(this.checkAllShipSunk()){
                console.log('..All ships have sunk....game O..over');
                this.allSunk = true
            }

        }else if(this.board[x][y] === '2-1'){
            this.message = ''
            this.hasAnySunk = false
            //record the hit in the patrol
            console.log('...receiving a hit to corrier two');
            this.corrier2.hit()

            //record the hitted area in the hits array
            this.generalHits.push([x,y])
            this.hits.corrier2Hits.push([x,y])
            this.intelligenceMessage = 'corrier two'

            if(this.corrier2.isSunk() && !this.sunk.includes('corrier-two')) {
                this.sunk.push('corrier-two');
                console.log('corrier two has sunk');
                this.message = 'corrier two'
                this.hasAnySunk = true
            }

            if(this.checkAllShipSunk()){
                console.log('..All ships have sunk....game O..over');
                this.allSunk = true
            }

        }else if(this.board[x][y] === '2-2'){
            this.message = ''
            this.hasAnySunk = false
            //record the hit in the patrol
            console.log('...receiving a hit to corrier three');
            this.corrier3.hit()

            //record the hitted area in the hits array
            this.generalHits.push([x,y])
            this.hits.corrier3Hits.push([x,y])
            this.intelligenceMessage = 'corrier three'

            if(this.corrier3.isSunk() && !this.sunk.includes('corrier-three')) {
                this.sunk.push('corrier-three');
                console.log('corrier three has sunk');
                this.message = 'corrier three'
                this.hasAnySunk = true
            }

            if(this.checkAllShipSunk()){
                console.log('..All ships have sunk....game O..over');
                this.allSunk = true
            }

        }else if(this.board[x][y] === '1-0'){
            this.message = ''
            this.hasAnySunk = false
            //record the hit in the patrol
            console.log('...receiving a hit to patrol one');
            this.patrol1.hit()

            //record the hitted area in the hits array
            this.generalHits.push([x,y])
            this.hits.patrol1Hits.push([x,y])
            this.intelligenceMessage = 'patrol one'

            if(this.patrol1.isSunk() && !this.sunk.includes('patrol-one')) {
                this.sunk.push('patrol-one');
                console.log('patrol one has sunk');
                this.message = 'patrol one'
                this.hasAnySunk = true
            }

            if(this.checkAllShipSunk()){
                console.log('..All ships have sunk....game O..over');
                this.allSunk = true
            }

        }else if(this.board[x][y] === '1-1'){
            this.message = ''
            this.hasAnySunk = false
            //record the hit in the patrol
            console.log('...receiving a hit to patrol two');
            this.patrol2.hit()

            //record the hitted area in the hits array
            this.generalHits.push([x,y])
            this.hits.patrol2Hits.push([x,y])
            this.intelligenceMessage = 'patrol two'

            if(this.patrol2.isSunk() && !this.sunk.includes('patrol-two')) {
                this.sunk.push('patrol-two');
                console.log('patrol two has sunk');
                this.message = 'patrol two'
                this.hasAnySunk = true
            }

            if(this.checkAllShipSunk()){
                console.log('..All ships have sunk....game O..over');
                this.allSunk = true
            }

        }else if(this.board[x][y] === '1-2'){
            this.message = ''
            this.hasAnySunk = false
            //record the hit in the patrol
            console.log('...receiving a hit to patrol three');
            this.patrol3.hit()

            //record the hitted area in the hits array
            this.generalHits.push([x,y])
            this.hits.patrol3Hits.push([x,y])
            this.intelligenceMessage = 'patrol three'

            if(this.patrol3.isSunk() && !this.sunk.includes('patrol-three')) {
                this.sunk.push('patrol-three');
                console.log('patrol three has sunk');
                this.message = 'patrol three'
                this.hasAnySunk = true
            }

            if(this.checkAllShipSunk()){
                console.log('..All ships have sunk....game O..over');
                this.allSunk = true
            }

        }else if(this.board[x][y] === '1-3'){
            this.message = ''
            this.hasAnySunk = false
            //record the hit in the patrol
            console.log('...receiving a hit to patrol four');
            this.patrol4.hit()

            //record the hitted area in the hits array
            this.generalHits.push([x,y])
            this.hits.patrol4Hits.push([x,y])
            this.intelligenceMessage = 'patrol four'

            if(this.patrol4.isSunk() && !this.sunk.includes('patrol-four')) {
                this.sunk.push('patrol-four');
                console.log('patrol four has sunk');
                this.message = 'patrol four'
                this.hasAnySunk = true
            }

            if(this.checkAllShipSunk()){
                console.log('..All ships have sunk....game O..over');
                this.allSunk = true
            }

        }else{
            this.message = ''
            console.log('missed man');
            this.message = 'missed'
            this.missed.push([x,y])
        }

    }

    checkAllShipSunk(){
        return [
            'tanker',
            'sub-one',
            'sub-two',
            'corrier-one',
            'corrier-two',
            'corrier-three',
            'patrol-one',
            'patrol-two',
            'patrol-three',
            'patrol-four',
        ].every(item => this.sunk.includes(item))
    }

}

export class Player{
    constructor(name){
        this.gameBoard = new GameBoard();
        this.name = name
    }

    coOrdinates = [
        [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],
        [1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9],
        [2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9],
        [3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],
        [4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],
        [5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],
        [6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8],[6,9],
        [7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8],[7,9],
        [8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8],[8,9],
        [9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8],[9,9],
    ]

    middleHit = {
        isMiddleHit: false,
        values: []
    }

    soroundingElements  = []
    
    selectRandomCoOrdinates(arr){
    
        const randomNumber = Math.random();
        
        return arr[Math.floor(randomNumber * arr.length) ] 
    }

    getBoard(){
        return this.gameBoard
    }

    getName(){
        return this.name
    }

    getHit( message) {
        let hits;
        if (message === 'tanker') {
            hits = this.getBoard().hits.tankerHits;
        } else if (message === 'sub one') {
            console.log('hello');
            hits = this.getBoard().hits.sub1Hits;
        } else if (message === 'sub two') {
            hits = this.getBoard().hits.sub2Hits;
        } else if (message === 'corrier one') {
            hits = this.getBoard().hits.corrier1Hits;
        }  else if (message === 'corrier two') {
            hits = this.getBoard().hits.corrier2Hits;
        }  else if (message === 'corrier three') {
            hits = this.getBoard().hits.corrier3Hits;
        }  else if (message === 'patrol one') {
            hits = this.getBoard().hits.patrol1Hits;
        }   else if (message === 'patrol two') {
            hits = this.getBoard().hits.patrol2Hits;
        }   else if (message === 'patrol three') {
            hits = this.getBoard().hits.patrol3Hits;
        }   else if (message === 'patrol four') {
            hits = this.getBoard().hits.patrol4Hits;
        } 
        
        return hits
    
    }

    checkElement(mainArray, subArray) {
        return mainArray.some(array => 
            array.length === subArray.length && 
            array.every((value, index) => value === subArray[index])
        );
    }

    checkValuesNotZeroandEmpty(value){
        if (value === '' || value === '0') return false
        else return true
    }

    getSurroundingCellsForRectangle(rectangleCoordinates) {
        const surroundingCells = new Set();
        const rectangleSet = new Set(rectangleCoordinates.map(coord => JSON.stringify(coord)));
      
        rectangleCoordinates.forEach(([row, col]) => {
          // Check all 8 possible surrounding positions around each cell of the rectangle
          const neighbors = [
            [row - 1, col], // top
            [row + 1, col], // bottom
            [row, col - 1], // left
            [row, col + 1], // right
            [row - 1, col - 1], // top-left
            [row - 1, col + 1], // top-right
            [row + 1, col - 1], // bottom-left
            [row + 1, col + 1]  // bottom-right
          ];
      
          neighbors.forEach(([nRow, nCol]) => {
            // Only add coordinates if they are non-negative and not part of the rectangle itself
            if (nRow >= 0 && nCol >= 0 && !rectangleSet.has(JSON.stringify([nRow, nCol]))) {
              surroundingCells.add(JSON.stringify([nRow, nCol]));
            }
          });
        });
      
        // Convert the set of strings back to an array of arrays
        return Array.from(surroundingCells).map(JSON.parse);
    }

    compRound(){
        //randomise play
        const randomisedOrdinate = this.selectRandomCoOrdinates(this.coOrdinates);

        if(this.getBoard().intelligenceMessage !== ''){

            if(!this.soroundingElements.length){
                console.log('intelligence ready ', this.getBoard().intelligenceMessage);
            
                const hitArr = this.getHit(this.getBoard().intelligenceMessage)
    
                console.log('hits origin array ', hitArr);
    
                const lastElement = hitArr[hitArr.length - 1]
    
                const northElement = [lastElement[0]-1, lastElement[1]]
                const southElement = [lastElement[0]+1, lastElement[1]]
                const eastElement = [lastElement[0], lastElement[1]+1]
                const westElement = [lastElement[0], lastElement[1]-1]

                const northNorth =  [lastElement[0]-2, lastElement[1]]
                const southSouth = [lastElement[0]+2, lastElement[1]]
                const eastEast =  [lastElement[0], lastElement[1]+2]
                const westWest = [lastElement[0], lastElement[1]-2]

                //check for middle hits
                if(this.checkElement(this.coOrdinates,northElement) && this.checkElement(this.coOrdinates,southElement)){

                    if(this.checkValuesNotZeroandEmpty(this.getBoard().board[northElement[0]][northElement[1]]) 

                        &&

                        this.checkValuesNotZeroandEmpty(this.getBoard().board[southElement[0]][southElement[1]])
                    
                        ){

                        this.middleHit.isMiddleHit = true;
                        this.middleHit.values.push(northElement);
                        this.middleHit.values.push(southElement);
    
                        console.log(' north value ',this.getBoard().board[northElement[0]][northElement[1]]);
                        console.log(' south value ',this.getBoard().board[southElement[0]][southElement[1]]);
    
                        console.log('north or south found ', this.middleHit);

                        
                        //check northNorth element if its available and not empty

                        if(this.checkElement(this.coOrdinates,northNorth) && this.checkValuesNotZeroandEmpty(this.getBoard().board[northNorth[0]][northNorth[1]])){
                            console.log('pushing north NOrth ', northNorth);
                            this.middleHit.values.push(northNorth);
                        }

                        //check southSouth element if its available and not empty
                        if(this.checkElement(this.coOrdinates,southSouth) && this.checkValuesNotZeroandEmpty(this.getBoard().board[southSouth[0]][southSouth[1]])){
                            console.log('pushing south South ', southSouth);
                            this.middleHit.values.push(southSouth);
                        }


                    }


                }

                if(this.checkElement(this.coOrdinates,eastElement) && this.checkElement(this.coOrdinates,westElement)){

                    if( this.checkValuesNotZeroandEmpty(this.getBoard().board[westElement[0]][westElement[1]]) 
                    
                        && 
                        
                        this.checkValuesNotZeroandEmpty(this.getBoard().board[eastElement[0]][eastElement[1]])

                        ){


                        this.middleHit.isMiddleHit = true;
                        this.middleHit.values.push(eastElement);
                        this.middleHit.values.push(westElement);

                        console.log(' west value ',this.getBoard().board[westElement[0]][westElement[1]]);
                        console.log(' east value ',this.getBoard().board[eastElement[0]][eastElement[1]]);

                        console.log('east or west found ', this.middleHit);

                        //check eastEast element if its available and not empty

                        if(this.checkElement(this.coOrdinates,eastEast) && this.checkValuesNotZeroandEmpty(this.getBoard().board[eastEast[0]][eastEast[1]])){
                            console.log('pushing east East ', eastEast);
                            this.middleHit.values.push(eastEast);
                        }

                        //check westWest element if its available and not empty
                        if(this.checkElement(this.coOrdinates,westWest) && this.checkValuesNotZeroandEmpty(this.getBoard().board[westWest[0]][westWest[1]])){
                            console.log('pushing west West ', westWest);
                            this.middleHit.values.push(westWest);
                        }

                    }

                }

                const allElements = [  northElement,southElement,eastElement,westElement ]
    
                                
                allElements.forEach(arr => {
                    if(this.checkElement(this.coOrdinates,arr)){
                        this.soroundingElements.push(arr)
                    }
                })
                
                console.log('sorrounding elements ', this.soroundingElements);
            }

            if(this.getBoard().hasAnySunk){

                //take the name of sunk ship
                const nameOfSunk = this.getBoard().intelligenceMessage;
                const hits = this.getHit(nameOfSunk)

                const sorroundingCells = this.getSurroundingCellsForRectangle(hits);


                sorroundingCells.forEach(arr => {
                    if(this.checkElement(this.coOrdinates,arr)){

                        const targetElement = [arr[0], arr[1]];
                
                        const index = this.coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                        
                        this.coOrdinates.splice(index,1);

                    }
                })
                
            }

            if(this.soroundingElements.length && this.getBoard().hasAnySunk === false){

                if(this.middleHit.isMiddleHit){
                    this.middleHit.values.forEach(arr => {
                        // is it available in coOrdinates array 
                        if(this.checkElement(this.coOrdinates,arr)){

                            //it must not be available in the middleHit array
                            if(this.checkElement(this.middleHit.values,arr) === false){

                                this.soroundingElements.push(arr);

                                console.log('sorrounding to be accessed ', arr);

                            }

                        }

                    })

                    this.middleHit.isMiddleHit = false;

                }

                const randomisedOrdinate = this.selectRandomCoOrdinates(this.soroundingElements);
                this.getBoard().receiveAttack(randomisedOrdinate[0],randomisedOrdinate[1]);

                const targetElement = [randomisedOrdinate[0], randomisedOrdinate[1]];

                
                const index = this.soroundingElements.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);

                const ordinateIndex = this.coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
        
                this.coOrdinates.splice(ordinateIndex,1);
                
                this.soroundingElements.splice(index,1);

                return randomisedOrdinate
            }else{
                this.soroundingElements = [];
                this.getBoard().resetIntelligenceMessage();
            }

        }

        this.getBoard().receiveAttack(randomisedOrdinate[0],randomisedOrdinate[1]);

        const targetElement = [randomisedOrdinate[0], randomisedOrdinate[1]];
                
        const index = this.coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
        
        this.coOrdinates.splice(index,1);
        console.log('comp round running.....');

        return randomisedOrdinate
        
    }

}


