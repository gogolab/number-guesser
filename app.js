const gameConfig = {
    min: 1,
    max: 10,
    winningNum: null,
    guessesLeft: 3,
    gameIsOver: false
};

// UI Elements
const game = document.querySelector("#game");
const minNum = document.querySelector(".min-num");
const maxNum = document.querySelector(".max-num");
const guessBtn = document.querySelector("#guess-btn");
const guessInput = document.querySelector("#guess-input");
const message = document.querySelector(".message");

// Assign UI min and max, winning number, clear input
gameConfig.winningNum = getRandomNum(gameConfig.min, gameConfig.max);
minNum.textContent = gameConfig.min;
maxNum.textContent = gameConfig.max;
guessInput.value = "";

// Listen for guess
guessBtn.addEventListener("click", function() {
    if (gameConfig.gameIsOver) {
        window.location.reload();
    }

    let guess = parseInt(guessInput.value);

    // Validate
    if (isNaN(guess) || guess < gameConfig.min || guess > gameConfig.max) {
        setMessage(
            `Please enter a number between ${gameConfig.min} and ${
                gameConfig.max
            }`,
            "red"
        );
    }

    // Check if won
    if (guess === gameConfig.winningNum) {
        gameOver(true, `${gameConfig.winningNum} is correct, YOU WIN!`);
    } else {
        gameConfig.guessesLeft -= 1;

        if (gameConfig.guessesLeft > 0) {
            setMessage(
                `${guess} is not correct. ${
                    gameConfig.guessesLeft
                } guesses left.`
            );
        } else {
            gameOver(
                false,
                `You lost. Correct number was: ${gameConfig.winningNum}`
            );
        }
    }
});

function gameOver(won, msg) {
    let color;
    won === true ? (color = "green") : (color = "red");

    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set message
    setMessage(msg, color);

    guessBtn.value = "Play again!";
    gameConfig.gameIsOver = true;
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}
