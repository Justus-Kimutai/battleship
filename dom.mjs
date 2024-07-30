import { GameController } from './game.js';

//intro
const introScreen = document.querySelector('.intro-screen');
const introInput = document.querySelector('.name')
const introContinueBtn = document.querySelector('.btn-continue')
let UserName = ''

const boardOne = document.querySelector('.board1')
const boardTwo = document.querySelector('.board2')
const boardOneDiv = document.querySelector('.board1div')
const boardTwoDiv = document.querySelector('.board2div')
const gameOverDiv = document.querySelector('.gameOver')
const shuffleBtn = document.querySelector('.shuffleShip')
const doneShuffling = document.querySelector('.shuffle-done');
const coverValeBoard2 = document.querySelector('.board2div .cover-vale');
const coverValeBoard1 = document.querySelector('.board1div .cover-vale');
const shufflebtndiv = document.querySelector('.shuffle-btn-div')

setTimeout(()=>{
    introInput.style.visibility = 'visible';
    introContinueBtn.style.visibility = 'visible'
},3000)

printTextLetterByLetterforIntro('Welcome Aboard, what\'s your name',2000);

introContinueBtn.addEventListener('click', ()=>{
    if(introInput.value !== ''){

        UserName = introInput.value
        introScreen.style.display = 'none'

        const introText = 'Hey Captain ' + UserName + ' please shuffle your ships'

        printTextLetterByLetter(introText,3000)

        setTimeout(()=>{
            shufflebtndiv.style.display = 'block'        
            document.querySelector('.footer').style.display = 'none'
        },3000)


    }

})

const game = new GameController('comp',UserName);

shuffleBtn.addEventListener('click', ()=>{
    game.player2.getBoard().refreshBoard()
    boardTwo.textContent = ''
    boardOne.textContent = ''
    populateBoard()
})

doneShuffling.addEventListener('click', ()=>{
    printTextLetterByLetter('Awsome you can now start the game, your ships are in pacific ocean on the right',4000)
    shuffleBtn.style.display = 'none'
    doneShuffling.style.display = 'none'
    coverValeBoard2.style.display = 'block'
    coverValeBoard1.style.display = 'block'
    boardOneDiv.style.display = 'block'
    document.querySelector('.footer').style.display = 'block'

    setTimeout(()=>{
        coverValeBoard1.style.display = 'none'
    },4000)

})



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

                    
                    const hitShip = game.player1.getBoard().getIntelligenceMessage();

                    if(game.player1.getBoard().hasAnySunk){
                        const turnsText = `You sunk ${hitShip}`
                    
                        printTextLetterByLetter(turnsText,1000);

                    }else{
                        const turnsText = `Receiving a hit on ${hitShip}`
                    
                        printTextLetterByLetter(turnsText,1000);

                    }

                    boardOneDiv.firstElementChild.style.display = 'none'
                    boardTwoDiv.firstElementChild.style.display = 'block'
                }else{

                    console.log('comp turn....');

                
                    const turnsText = `You missed ${game.player1.getName()}'s turn`

                    printTextLetterByLetter(turnsText,1000);

                    setTimeout(()=>{

                        compTurn()
                        console.log('print after 2 sec');

                    },2000)


                    boardOneDiv.firstElementChild.style.display = 'block'
                    boardTwoDiv.firstElementChild.style.display = 'none'

                                        
                    return;
                }


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
                    winner.textContent = `Congrats you beat my algorithm, refresh to start again`
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
            cellButton.textContent = '';

            if(cell !== '' && cell !== 0){
                cellButton.style.background = 'rgb(17, 136, 120)'
            }

            cellButton.classList.add('cell');
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


            const hitShip = game.player2.getBoard().getIntelligenceMessage();

            if(game.player2.getBoard().hasAnySunk){

                const turnsText = `Comp sunk ${hitShip}`
            
                printTextLetterByLetter(turnsText,1000);

            }else{
                const turnsText = `Receiving a hit on ${hitShip}`
            
                printTextLetterByLetter(turnsText,1000);

            }


            console.log('comp turn....');
            setTimeout(()=>{
                compTurn()
                console.log('print after 2 sec');
            },2000)
            // compTurn()
            
        }else{

            setTimeout(()=>{
                
                boardOneDiv.firstElementChild.style.display = 'none'
                boardTwoDiv.firstElementChild.style.display = 'block'

            },2000)

            const turnsText = `Comp missed Your turn Captain ${game.player2.getName()}`

            printTextLetterByLetter(turnsText,1000);


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
            winner.textContent = `Sorry you lost, try again by refreshing the page !`
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

function printTextLetterByLetter(text, duration) {
    const outputElement =  document.querySelector('.status-bar-h2');
    outputElement.textContent = '...'
    let index = 0;
    const intervalTime = duration / text.length;

    function printLetter() {
        if (index < text.length) {
            outputElement.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }

    const interval = setInterval(printLetter, intervalTime);
}

function printTextLetterByLetterforIntro(text, duration) {
    const outputElement = document.querySelector('.label-text');
    outputElement.style.display = 'block'
    let index = 0;
    const intervalTime = duration / text.length;

    function printLetter() {
        if (index < text.length) {
            outputElement.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }

    const interval = setInterval(printLetter, intervalTime);
}

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

populateBoard();
