const inputBox = document.getElementById('guess');
const submitButton = document.getElementById('submit');
var hangSteps = document.getElementById('hangman');
var hangWord = document.getElementById('word');
var notif = document.getElementById('notif');
var wrong = document.getElementById("wrong-guesses");
const hangmanWords = ['hello', 'dog', 'cat', 'bird', 'fish', 'car', 'tree', 'house', 'phone',
                        'computer', 'misery', 'happiness', 'dragon', 'dinosoar', 'clock', 'apple', 
                        'battery', 'host', 'science', 'programming', 'biology', 'economy', 'money',
                        'awesome', 'king', 'queen', 'card'];
const hangman = ['0.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png'];
let index = Math.floor(Math.random() * hangmanWords.length);
let guessedindices = new Set();
let prevSize = 0;
let step = 1;
let gameActive = true;
let wrongGuesses = [];

function guess() {
    if (!gameActive) return;
    if (inputBox.value === '') {
        notif.innerHTML = ('Please enter a guess');
        return;
    } else {
        if (inputBox.value.length > 1) {
            notif.innerHTML = ('Guess only one letter');
            inputBox.value = '';
            return;
        } else {
            let guessed = true;
            const letter = inputBox.value.toLowerCase();
            const word = hangmanWords[index].toLowerCase();
            const wordArray = word.split('');

            for (let i = 0; i < wordArray.length; i++) {
                if (wordArray[i] === letter) {
                    if(guessedindices.has(i)) {
                        notif.innerHTML = ('You already guessed this letter');
                        inputBox.value = '';
                        return;
                    }
                    guessedindices.add(i);

                }
            }

            if (guessedindices.size <= prevSize) {
                if(wrongGuesses.indexOf(letter)>-1){
                    notif.innerHTML = ('You already tried this wrong letter');
                    inputBox.value = '';
                    return; 
                }
                hangSteps.src = hangman[step];
                step++;
                notif.innerHTML = ('Wrong guess');
                wrongGuesses.push(letter);
                if(step>8) {
                    notif.innerHTML = ("you lost. resetting in 3 seconds...");
                    gameActive = false;
                    setTimeout(resetGame, 3000);
                }
                inputBox.value = '';
                wrong.innerHTML = String(wrongGuesses);
                return;
            }
            notif.innerHTML = "";
            let result = '';
            for (let i = 0; i < wordArray.length; i++) {
                if (guessedindices.has(i)) {
                    result += wordArray[i] +" ";
                } else {
                    result += '_ ';
                    guessed = false;
                }
            }

            hangWord.innerHTML = result;
            console.log(guessedindices);
            prevSize = guessedindices.size;
            if(guessed) {
                setTimeout(resetGame, 3000);
                gameActive = false;
                alert("YOU WON!!");
            }
        }
    }
    inputBox.value = '';
    wrong.innerHTML = String(wrongGuesses);
}

function resetGame(){
    step = 1;
    hangSteps.src = hangman[0];
    index = Math.floor(Math.random() * hangmanWords.length);
    hangWord.innerHTML = "_ ".repeat(hangmanWords[index].length);
    guessedindices = new Set();
    prevSize = 0;
    notif.innerHTML = '';
    gameActive = true;
    inputBox.value = "";
    wrongGuesses = [];
}

resetGame();