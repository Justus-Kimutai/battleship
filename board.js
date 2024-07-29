//guard variable 

export function board(){
        const rows = 10;
        const colums = 10;
        const board = [];

        for (let i = 0; i < rows; i++){
            board[i] = [];
            for (let j = 0; j < colums; j++){
                board[i].push(0)
            }
        }

        const coOrdinates = 
        [
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
        const ships = [4,3,2,1]

        // board[2][8] = '3-1'
        // board[3][8] = '3-1'
        // board[4][8] = '3-1'
        // board[2][7] = ''
        // board[3][7] = ''
        // board[4][7] = ''
        // board[2][9] = ''
        // board[3][9] = ''
        // board[4][9] = ''
        // board[1][7] = ''
        // board[1][8] = ''
        // board[1][9] = ''
        // board[5][7] = ''
        // board[5][8] = ''
        // board[5][9] = ''


        function chooseTimes(){
            let times = 0
            if(ships[0] === 4) times = 1
            else if(ships[0] === 3) times = 2
            else if(ships[0] === 2) times = 3
            else if(ships[0] === 1) times = 4
            // console.log(ships);
            return times
        }


        while(ships.length){

            const times = chooseTimes()

            for(let w = 0; w < times; w++){

                while(true){
            
                    const randomisedCoordinate = selectRandomCoOrdinates(coOrdinates);
                    // const randomisedCoordinate = [6,8]
                    const randomisedRow = randomisedCoordinate[0];
                    const  randomisedCol = randomisedCoordinate[1];
                
                    if((randomisedRow + ships[0] ) < 10){
                        //check if the ship has emough space otherwise continue

                        let isSpaceEnough = true
                        for(let q = randomisedRow; q < (randomisedRow + ships[0] ); q++){
                            if(board[q][randomisedCol] !== 0) {
                                isSpaceEnough = false;
                                console.log('colition alert');
                                break;
                            }
                        }
                        if(!isSpaceEnough)  continue

                        for( let i = randomisedRow; i < (randomisedRow + ships[0] ); i++){
                            const continueVariable = false;
                        
                            if (findItemInCoOrdinates(coOrdinates,[i, randomisedCol])){
                                board[i][randomisedCol] = `${ships[0]}-${w}`;

                                const targetElement = [i, randomisedCol];
                    
                                const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                                
                                
                                coOrdinates.splice(index,1);
                            }


                
                            //populate the parallel sides

                            if(board[i][ randomisedCol + 1 ] !== undefined){
                                
                                if (findItemInCoOrdinates(coOrdinates,[i, randomisedCol + 1 ])){
                                
                                    board[i][randomisedCol + 1 ] = '';
                                    const targetElement = [i, randomisedCol + 1];
                    
                                    const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                                    
                                    coOrdinates.splice(index,1);
                                }
                            }

                            if(board[i][ randomisedCol - 1 ] !== undefined){
                                
                                if (findItemInCoOrdinates(coOrdinates,[i, randomisedCol - 1])){
                                
                                    board[i][randomisedCol - 1 ] = ''
                                    const targetElement = [i, randomisedCol - 1];
                    
                                    const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                                    
                                    coOrdinates.splice(index,1);
                                }
                            }

                        }
                
                        //populate top and bottom
                        if( 
                            (board[randomisedRow - 1]) !== undefined && findItemInCoOrdinates(coOrdinates,[randomisedRow - 1, randomisedCol])
                
                        ){
                            board[randomisedRow - 1][randomisedCol] = ``;
                            const targetElement = [randomisedRow - 1, randomisedCol];

                            
                
                            const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                            
                            coOrdinates.splice(index,1);
                
                
                            //populate the adjascent part of the external 
                            if(
                                ( board[randomisedRow - 1][randomisedCol - 1] ) !== undefined && findItemInCoOrdinates(coOrdinates,[randomisedRow - 1, randomisedCol - 1])
                            ){
                                board[randomisedRow - 1][randomisedCol - 1 ] = '';
                                const targetElement = [randomisedRow - 1, randomisedCol - 1 ];
                                
                
                                const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                                
                                coOrdinates.splice(index,1);
                    
                            }
                
                            if(
                                ( board[randomisedRow - 1][randomisedCol + 1 ] ) !== undefined && findItemInCoOrdinates(coOrdinates,[randomisedRow - 1, randomisedCol + 1 ])
                            ){
                                board[randomisedRow - 1][randomisedCol + 1 ] = '';
                                const targetElement = [randomisedRow - 1, randomisedCol + 1 ];
                                
                
                                const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                                
                                coOrdinates.splice(index,1);
                    
                            }
                
                        }
                        if( 
                            (board[(randomisedRow + ships[0] ) ]) !== undefined && findItemInCoOrdinates(coOrdinates,[(randomisedRow + ships[0] ), randomisedCol])
                            
                        ){
                            
                            board[(randomisedRow + ships[0] ) ][randomisedCol] = ``;
                            const targetElement =[(randomisedRow + ships[0] ), randomisedCol];
                            
                
                            const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                            
                            coOrdinates.splice(index,1);
                
                
                
                            if(
                                ( board[randomisedRow + ships[0] ][randomisedCol - 1] ) !== undefined && findItemInCoOrdinates(coOrdinates,[randomisedRow + ships[0], randomisedCol - 1 ])
                            ){
                                board[randomisedRow + ships[0] ][randomisedCol - 1 ] = '';
                                const targetElement =[randomisedRow + ships[0], randomisedCol - 1 ];
                                
                
                                const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                                
                                coOrdinates.splice(index,1);
                    
                            }
                
                            if(
                                ( board[randomisedRow + ships[0] ][randomisedCol + 1 ] ) !== undefined && findItemInCoOrdinates(coOrdinates,[randomisedRow + ships[0], randomisedCol + 1 ])
                            ){
                                board[randomisedRow + ships[0] ][randomisedCol + 1 ] = '';
                                const targetElement =[randomisedRow + ships[0], randomisedCol + 1 ];
                                
                
                                const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                                
                                coOrdinates.splice(index,1);
                    
                                // console.log('index ', index);
                                // console.log('targetElement ', targetElement);
                                // console.table(coOrdinates);
                            }
                
                        }
                
                
                        break;
                
                    }else if( ( randomisedCol + ships[0] ) <= 10){

                        //check if the ship has emough space otherwise continue
                        let isSpaceEnough = true
                        for(let i = randomisedCol; i < (randomisedCol + ships[0]); i++){
                            if( board[randomisedRow][i]  !== 0) {
                                isSpaceEnough = false;
                                console.log('colition alert');
                                break;
                            }
                        }
                        if(!isSpaceEnough)  continue
                        
                        for(let i = randomisedCol; i < (randomisedCol + ships[0]); i++){
                            
                            if (findItemInCoOrdinates(coOrdinates,[randomisedRow, i])){
                                
                                board[randomisedRow][i] = `${ships[0]}-${w}`;
                                const targetElement = [randomisedRow, i];
                    
                                const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                                
                                coOrdinates.splice(index,1);
                            }
                
                
                            if(board[randomisedRow - 1 ] !== undefined){
                                if (findItemInCoOrdinates(coOrdinates,[randomisedRow - 1, i])){
                
                                    board[randomisedRow - 1 ][i] = ''
                                    const targetElement = [randomisedRow - 1, i];
                    
                                    const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                                    
                                    coOrdinates.splice(index,1);
                                }
                                
                            }
                            if(board[randomisedRow + 1 ] !== undefined){
                                if (findItemInCoOrdinates(coOrdinates,[randomisedRow + 1, i])){
                                    board[randomisedRow + 1 ][i] = '';
                                    const targetElement = [randomisedRow + 1, i];
                    
                                    const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                                    
                                    coOrdinates.splice(index,1);
                                }
                            
                            }
                        }
                
                
                        //populate top and bottom
                        if( 
                            (board[randomisedRow][randomisedCol + ships[0] ] ) !== undefined && findItemInCoOrdinates(coOrdinates,[randomisedRow,randomisedCol + ships[0] ])
                
                        ){
                
                            board[randomisedRow][randomisedCol + ships[0] ]  = ``;
                
                            const targetElement = [randomisedRow,(randomisedCol + ships[0]) ];
                            
                
                            const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                            
                            coOrdinates.splice(index,1);
                
                
                            if(
                                ( board[randomisedRow - 1][randomisedCol + ships[0]] ) !== undefined && findItemInCoOrdinates(coOrdinates,[randomisedRow - 1, randomisedCol + ships[0] ])
                            ){
                                board[randomisedRow - 1][randomisedCol + ships[0] ] = ''
                                const targetElement = [(randomisedRow - 1), (randomisedCol + ships[0]) ];
                                
                
                                const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                                
                                coOrdinates.splice(index,1);
                            }
                
                            if(
                                board[randomisedRow + 1]  !== undefined && findItemInCoOrdinates(coOrdinates,[randomisedRow + 1, randomisedCol + ships[0] ])
                            ){
                                board[randomisedRow + 1][ randomisedCol + ships[0] ] = '';
                                const targetElement = [randomisedRow + 1, randomisedCol + ships[0] ];
                                
                
                                const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                                
                                coOrdinates.splice(index,1);
                
                            }
                
                        }
                        if( 
                            (board[randomisedRow][randomisedCol - 1 ]) !== undefined && findItemInCoOrdinates(coOrdinates,[randomisedRow , randomisedCol - 1 ])
                            
                        ){
                
                            board[randomisedRow][randomisedCol - 1 ] = ``;
                            const targetElement = [randomisedRow, randomisedCol - 1 ];
                            
                
                            const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                            
                            coOrdinates.splice(index,1);
                
                
                
                            if(
                                ( board[randomisedRow - 1 ][randomisedCol - 1] ) !== undefined && findItemInCoOrdinates(coOrdinates,[randomisedRow - 1, randomisedCol - 1 ])
                            ){
                                board[randomisedRow - 1 ][randomisedCol - 1 ] = '';
                                const targetElement = [randomisedRow - 1, randomisedCol - 1 ];
                                
                
                                const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                                
                                coOrdinates.splice(index,1);
                    
                            }
                
                            if(
                                board[randomisedRow + 1 ] !== undefined && findItemInCoOrdinates(coOrdinates,[randomisedRow + 1, randomisedCol - 1 ])
                            ){
                                board[randomisedRow + 1 ][randomisedCol - 1 ] = '';
                                const targetElement = [randomisedRow + 1, randomisedCol - 1 ];
                                
                
                                const index = coOrdinates.findIndex(coordinate => coordinate[0] === targetElement[0] && coordinate[1] === targetElement[1]);
                                
                                coOrdinates.splice(index,1);


                                // console.log('index ', index);
                                // console.log('targetElement ', targetElement);
                                // console.table(coOrdinates);
                    
                            }
                
                        }
                
                        break;
                    }
                
                }
            
            }
            //pop the ship
            ships.splice(0,1) 
        }

        function selectRandomCoOrdinates(arr){

            const randomNumber = Math.random();
            
            return arr[Math.floor(randomNumber * arr.length) ] 
        }


        function findItemInCoOrdinates(array, itemToFind) {
            const arraysEqual = (arr1, arr2) => 
            arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
        
            return array.some(element => arraysEqual(element, itemToFind));
        }

        return board

}
