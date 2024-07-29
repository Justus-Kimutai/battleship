const rows = 10;
const colums = 10;
const board = [];

for (let i = 0; i < rows; i++){
    board[i] = [];
    for (let j = 0; j < colums; j++){
        board[i].push(0)
    }
}

board[2][0] = '1-0'
board[5][0] = '1-1'
board[0][6] = '1-2'
board[0][9] = '1-3'

board[1][4] = '2-0'
board[2][4] = '2-0'
board[3][7] = '2-1'
board[4][7] = '2-1'
board[7][7] = '2-2'
board[8][7] = '2-2'

board[7][0] = '3-0'
board[7][1] = '3-0'
board[7][2] = '3-0'
board[5][4] = '3-1'
board[6][4] = '3-1'
board[7][4] = '3-1'

board[3][9] = '4-0'
board[4][9] = '4-0'
board[5][9] = '4-0'
board[6][9] = '4-0'

export default board