const boxes = [...document.querySelectorAll('.box')];
const currentPlayerText = document.querySelector('#player');
currentPlayerText.innerHTML = `Let's Play!`;
const restartBtn = document.querySelector('#restartBtn');
const boxSpaces = [null, null, null, null, null, null, null, null, null];
let currentPlayer = 'X';
let playerTurn = document.querySelector('.playerTurn');

playerTurn.innerHTML = `It's ${currentPlayer} 's turn`;

boxes.forEach(box => {
    // set borders for each box
    if (box.id < 3) {
        box.style.borderBottom = '2px solid  #676767'
    }
    if (box.id % 3 === 0) {
        box.style.borderRight = '2px solid  #676767'
    }
    if (box.id % 3 === 2) {
        box.style.borderLeft = '2px solid  #676767'
    }
    if (box.id > 5) {
        box.style.borderTop = '2px solid  #676767'
    }

    // add current player's text in box and spaces array
    const addPlayerText = (e) => {
        if (boxSpaces[e.target.id] === null) {
            boxSpaces[e.target.id] = currentPlayer;
            box.innerHTML = currentPlayer;
        }
    }
    // detect click event on boxes, and player value in that box
    const changePlayer = () => {
        return currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    }
    // check if current player has won the game
    const playerHasWon = () => {
        // top, left, diagnally from left
        if (boxSpaces[0] === currentPlayer) {
            if (boxSpaces[1] === currentPlayer && boxSpaces[2] === currentPlayer) {
                return `<span id="playerColor">${currentPlayer}</span> won the game, up top!`;
            }
            if (boxSpaces[3] === currentPlayer && boxSpaces[6] === currentPlayer) {
                return `<span id="playerColor">${currentPlayer}</span> won the game, on the left!`;
            }
            if (boxSpaces[4] === currentPlayer && boxSpaces[8] === currentPlayer) {
                return `<span id="playerColor">${currentPlayer}</span> won the game, from the left, diagnally!`;;
            }
        }

        // right, bottom
        if (boxSpaces[8] === currentPlayer) {
            if (boxSpaces[7] === currentPlayer && boxSpaces[6] === currentPlayer) {
                return `<span id="playerColor">${currentPlayer}</span> won the game, at the bottom!`;
            }
            if (boxSpaces[5] === currentPlayer && boxSpaces[2] === currentPlayer) {
                return `<span id="playerColor">${currentPlayer}</span> won the game, on the right!`;
            }
        }

        // middle vertical, middle horizontal, diagnally right
        if (boxSpaces[4] === currentPlayer) {
            if (boxSpaces[3] === currentPlayer && boxSpaces[5] === currentPlayer) {
                return `<span id="playerColor">${currentPlayer}</span> won the game, in the middle, horizontally!`;
            }
            if (boxSpaces[1] === currentPlayer && boxSpaces[7] === currentPlayer) {
                return `<span id="playerColor">${currentPlayer}</span> won the game, in the middle, vertically!`;
            }
            if (boxSpaces[2] === currentPlayer && boxSpaces[6] === currentPlayer) {
                return `<span id="playerColor">${currentPlayer}</span> won the game, from the right, diagnally!`;;
            }
        }
    }

    box.addEventListener('click', (e) => {
        addPlayerText(e);

        box.addEventListener("mouseover", (e) => {
            box.style.cursor = 'no-drop';
        })
        if (playerHasWon()) {
            currentPlayerText.innerHTML = playerHasWon();
            return;
        }
        changePlayer();
        playerTurn.innerHTML = `It's ${currentPlayer} 's turn`;
    })
})

const restartGame = () => {
    // make all array elements null
    boxSpaces.forEach((box, index) => {
        boxSpaces[index] = null;
    })

    // clear innerHtml of all div boxes
    boxes.forEach(boxDiv => {
        boxDiv.innerHTML = '';
    })
    currentPlayerText.innerHTML = `Let's Play!`;
    currentPlayer = 'X';
}
// reset the game
restartBtn.addEventListener('click', restartGame);
