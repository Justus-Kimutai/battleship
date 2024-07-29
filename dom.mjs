import { GameController } from './game.js';

const game = new GameController('justus','kimutai')
const boardOne = document.querySelector('.board1')
const boardTwo = document.querySelector('.board2')
const boardOneDiv = document.querySelector('.board1div')
const boardTwoDiv = document.querySelector('.board2div')
const gameOverDiv = document.querySelector('.gameOver')
const turn1Indicator = document.querySelector('.turn1Indicator')
const turn2Indicator = document.querySelector('.turn2Indicator')

function getSpecificCell(row, col, board) { 
    if(board === 'board2'){
        const boardTwo = document.querySelector('.board2')
        const cell = boardTwo.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    
        cell.classList.add('attacked')
        const cancelIcon = document.createElement('span')
        cancelIcon.classList.add('cancel-icon')
        cell.style.background = 'red'
        cell.replaceChildren(cancelIcon)

        return
    }
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    // cell.textContent = 'X'
    cell.style.background = 'red'

    cell.classList.add('attacked')
    const cancelIcon = document.createElement('span')
    cancelIcon.classList.add('cancel-icon')
    cell.replaceChildren(cancelIcon)

    return
}

function populateBoard(){
    const player1Board = game.player1.getBoard().board
    const player2Board = game.player2.getBoard().board

    player1Board.forEach( (row,rowIndex) =>{
        row.forEach((cell,collIndex) => {
            const cellButton = document.createElement('button');
            cellButton.dataset.row = rowIndex
            cellButton.dataset.col = collIndex
            cellButton.textContent = '';


            cellButton.addEventListener('click', (e)=>{

                game.player1.getBoard().receiveAttack(e.target.dataset.row,e.target.dataset.col);

                const dot = document.createElement('span')
                dot.classList.add('dot')
                e.target.replaceChildren(dot)

                if(game.player1.getBoard().message !== 'missed'){
                    boardOneDiv.firstElementChild.style.display = 'none'
                    boardTwoDiv.firstElementChild.style.display = 'block'
                }else{
                    boardOneDiv.firstElementChild.style.display = 'block'
                    boardTwoDiv.firstElementChild.style.display = 'none'
                    console.log('comp turn....');
                    setTimeout(()=>{
                        compTurn()
                        console.log('print after 2 sec');
                    },2000)
                    // compTurn()
                    return;
                }

                // turn2Indicator.textContent = `${game.player2.name}'s turn`

                if(game.player1.getBoard().hasAnySunk){
                    console.log(game.player1.getBoard().message);
                    const message = game.player1.getBoard().message;
                    getHit(game.player1,message,'board1')
                }

                console.log(game.player1.getBoard().hasAnySunk);

                
                //check if all sunk
                if(game.player1.getBoard().allSunk){
                    gameOverDiv.style.display = 'flex'
                    console.log(game.player1.getBoard().allSunk);
                    const winner = document.createElement('p');
                    winner.classList.add('winner')
                    winner.textContent = `${game.player2.name} won`
                    gameOverDiv.appendChild(winner)
                }

            })
            cellButton.classList.add('cell')
            boardOne.appendChild(cellButton);
        })
    })

    player2Board.forEach( (row,rowIndex) =>{
        row.forEach((cell,collIndex) => {
            const cellButton = document.createElement('button');
            cellButton.dataset.row = rowIndex
            cellButton.dataset.col = collIndex
            cellButton.textContent = cell;
            cellButton.classList.add('cell')
            boardTwo.appendChild(cellButton);
        })
    });

    function compTurn(){
        const randomOrdinate = game.player2.compRound()
        const boardTwo = document.querySelector('.board2')
        const cell = boardTwo.querySelector(`[data-row="${randomOrdinate[0]}"][data-col="${randomOrdinate[1]}"]`);
        const dotTwo = document.createElement('span')
        dotTwo.classList.add('dot')
        cell.replaceChildren(dotTwo)

        console.log('board measseage ', game.player2.getBoard().message);

        if(game.player2.getBoard().message !== 'missed'){
            boardOneDiv.firstElementChild.style.display = 'block'
            boardTwoDiv.firstElementChild.style.display = 'none'
            console.log('comp turn....');
            setTimeout(()=>{
                compTurn()
                console.log('print after 2 sec');
            },2000)
            // compTurn()
            
        }else{
            boardOneDiv.firstElementChild.style.display = 'none'
            boardTwoDiv.firstElementChild.style.display = 'block'
            return
        }

        if(game.player2.getBoard().hasAnySunk){
            const message = game.player2.getBoard().message;
            getHit(game.player2,message,'board2')
        }

        //check if all sunk
        if(game.player2.getBoard().allSunk){
            gameOverDiv.style.display = 'flex'
            const winner = document.createElement('p');
            winner.classList.add('winner')
            winner.textContent = `${game.player1.name} won`
            gameOverDiv.appendChild(winner)
        }
    }

}

function getHit(player, message, board) {
    let hits;
    if (message === 'tanker') {
        hits = player.getBoard().hits.tankerHits;
    } else if (message === 'sub one') {
        console.log('hello');
        hits = player.getBoard().hits.sub1Hits;
    } else if (message === 'sub two') {
        hits = player.getBoard().hits.sub2Hits;
    } else if (message === 'corrier one') {
        hits = player.getBoard().hits.corrier1Hits;
    }  else if (message === 'corrier two') {
        hits = player.getBoard().hits.corrier2Hits;
    }  else if (message === 'corrier three') {
        hits = player.getBoard().hits.corrier3Hits;
    }  else if (message === 'patrol one') {
        hits = player.getBoard().hits.patrol1Hits;
    }   else if (message === 'patrol two') {
        hits = player.getBoard().hits.patrol2Hits;
    }   else if (message === 'patrol three') {
        hits = player.getBoard().hits.patrol3Hits;
    }   else if (message === 'patrol four') {
        hits = player.getBoard().hits.patrol4Hits;
    } 
    
    hits.forEach(arr => {
        getSpecificCell(arr[0], arr[1],board);
    });

}

populateBoard();
