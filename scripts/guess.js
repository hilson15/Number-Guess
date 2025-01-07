let randomNumber = Math.floor(Math.random() * 5) + 1;
const guesses = document.querySelector(".guesses");
const prevResult = document.querySelector(".prevResult");
const lowOrHigh = document.querySelector(".lowOrHigh");
const  guessField = document.querySelector(".guessField");
const guessSubmit = document.querySelector(".guessSubmit");
const  introDiv = document.querySelector('.intro');
const userName = document.querySelector('.userName');
const submitUser = document.querySelector('#register');
const mainGame = document.getElementById('mainGame');
const welcomeMsg = document.querySelector('.welcome');
const reward = document.querySelector('.amountEarned');
let earnings = 0;


// Here is where we receive user information and welcome user before opening the main game

function registerUser() {
    const userInput = userName.value.trim();

    // console.log('working perfectly');
    // if (userInput === "") {
    //     console.log('ok');
    //     alert("Please enter your username.");
    //     return;
    // }

    mainGame.style.display = "block"; // Show the main game
    introDiv.style.display = "none"; // Hide the intro section
    welcomeMsg.textContent = `Hey Welcome to My Guessing Game, ${userInput}. LET'S PLAY!`;
    userName.value = ""; // Clear the username input field
}


submitUser.addEventListener('click', registerUser);

let guessCount = 1;
let resetButton;


function checkGuess() {
    const userGuess = Number(guessField.value);
    //this first condition is to check how many trials the user has made, especially if they start from 1, and then it records the guesses of the user in the paragraph provided, by appending it to the string (previous guesses which already I saved i a variable named guesses.textContent)
    if(guessCount === 1){
        guesses.textContent = "Previous Guesses: ";
    }

    guesses.textContent = `${guesses.textContent} ${userGuess}`;


    if(userGuess === randomNumber){
        prevResult.textContent = "Congratulations! you got it right";
        prevResult.style.backgroundColor = "green";
        lowOrHigh.textContent = "";
        earnings += 1;
        reward.textContent = `$${earnings}`;

        gameOver();
    }else if(guessCount === 10){
        prevResult.textContent = "GAME OVER";
        lowOrHigh.textContent = "";
        gameOver();
    }else{
        prevResult.textContent = "Wrong";
        prevResult.style.backgroundColor = "red";
        if(userGuess < randomNumber){
            lowOrHigh.textContent = "Last guess was too low!";
        }else if(userGuess > randomNumber){
            lowOrHigh.textContent = "Last guess was too high";
        }
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();
    
}


guessSubmit.addEventListener('click', checkGuess);



function gameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;

    // Check if the reset button already exists
    if (!document.querySelector('.resetbtn')) {
        resetButton = document.createElement('button');
        resetButton.textContent = "Start new game";
        resetButton.classList.add('resetbtn');
        document.body.append(resetButton);
        resetButton.addEventListener('click', resetGame);
    }
}



function resetGame() {
    guessCount = 1;
    const resetParas = document.querySelectorAll(".resultParas p");
    for (const resetPara of resetParas) {
        resetPara.textContent = "";
    }

    // Safely remove the reset button if it exists
    if (resetButton && resetButton.parentNode) {
        resetButton.parentNode.removeChild(resetButton);
    }

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    prevResult.style.backgroundColor = "white";

    // Generate a new random number for the next game
    randomNumber = Math.floor(Math.random() * 5) + 1;
}


const withdrawFund = document.querySelector('.withdraw');


function withdrawal() {
    const earnBal = 50 - earnings;

    if (earnings >= 50) {
        alert(`Successfully withdrawn. Your reward was $${earnings}.`);
        earnings = 0; // Reset earnings after withdrawal
        reward.textContent = `$${earnings}`; // Update displayed reward

        // Ensure the reset button is visible after withdrawal
        if (!document.querySelector('.resetbtn')) {
            resetButton = document.createElement('button');
            resetButton.textContent = "Start new game";
            resetButton.classList.add('resetbtn');
            document.body.append(resetButton);
            resetButton.addEventListener('click', resetGame);
        }
    } else {
        alert(`Insufficient balance. Earn $${earnBal} more to be eligible for withdrawal.`);
    }
}


withdrawFund.addEventListener('click', withdrawal);