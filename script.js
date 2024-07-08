'use strict';

// Constants
const letters = 'abcdefghijklmnopqrstuvwxyz';
const maxWrongAttempts = 8;
const lettersArray = Array.from(letters);
const lettersContainer = document.querySelector('.letters');
const categorySpan = document.querySelector('.game-info .category span');
const lettersGuessContainer = document.querySelector('.letters-guess');
const hangmanDraw = document.querySelector('.hangman-draw');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const popupMessage = document.querySelector('.popup-message');
const playAgainButton = document.querySelector('.play-again');
const highscoreSpan = document.querySelector('.highscore');
const attemptsLeftSpan = document.querySelector('.attempts-left');
const statsElement = document.querySelector('.stats');
const words = {
  programming: ['python', 'javascript', 'php', 'html', 'css'],
  animals: ['dog', 'cat', 'elephant', 'tiger', 'lion'],
  countries: ['lebanon', 'france', 'germany', 'brazil', 'canada'],
};

// Variables
let wrongAttempts = 0;
let correctGuesses = 0;
let randomCategory;
let randomWord;
let wordArray;
let guessSpans;
let highScore = maxWrongAttempts;

// Initialize the game
function initializeGame() {
  randomCategory = getRandomCategory();
  randomWord = getRandomWord(randomCategory);
  wordArray = Array.from(randomWord);

  categorySpan.textContent = randomCategory;
  renderLetters();
  renderWordSpaces();
  guessSpans = document.querySelectorAll('.letters-guess span');
  updateStats();
}

// Get a random category from the words object
function getRandomCategory() {
  const categories = Object.keys(words);
  return categories[Math.floor(Math.random() * categories.length)];
}

// Get a random word from a given category
function getRandomWord(category) {
  const wordList = words[category];
  return wordList[Math.floor(Math.random() * wordList.length)];
}

// Render letter buttons
function renderLetters() {
  lettersContainer.innerHTML = '';
  lettersArray.forEach(letter => {
    const span = document.createElement('span');
    span.className = 'letter-box';
    span.textContent = letter;
    lettersContainer.appendChild(span);
  });
}

// Render spaces for the letters in the word to be guessed
function renderWordSpaces() {
  lettersGuessContainer.innerHTML = '';
  wordArray.forEach(letter => {
    const span = document.createElement('span');
    if (letter === ' ') {
      span.classList.add('has-space');
    }
    lettersGuessContainer.appendChild(span);
  });
}

// Handle letter click events
function handleLetterClick(target) {
  target.classList.add('clicked');
  const clickedLetter = target.textContent.toLowerCase();
  let guessedCorrectly = false;

  wordArray.forEach((wordLetter, wordIndex) => {
    if (clickedLetter === wordLetter) {
      guessedCorrectly = true;
      guessSpans[wordIndex].textContent = clickedLetter;
      correctGuesses++;
    }
  });

  if (!guessedCorrectly) {
    wrongAttempts++;
    hangmanDraw.classList.add(`wrong-${wrongAttempts}`);
    if (wrongAttempts === maxWrongAttempts) {
      endGame(false);
    }
  } else if (correctGuesses === wordArray.length) {
    endGame(true);
  }

  updateStats();
}

// End the game with a win or loss message
function endGame(won) {
  const attemptsLeft = maxWrongAttempts - wrongAttempts;
  if (won && attemptsLeft > highScore) {
    highScore = attemptsLeft;
  }

  modal.classList.add('show');
  overlay.classList.add('show');
  popupMessage.innerHTML = won
    ? `Congratulations, You Won!`
    : `Game Over! The word was ${randomWord}`;
  popupMessage.style.color = won ? '#009688' : '#e74c3c';
  statsElement.style.display = won ? 'flex' : 'none';
  lettersContainer.classList.add('finished');
}

// Reset the game to start again
function resetGame() {
  modal.classList.remove('show');
  overlay.classList.remove('show');
  hangmanDraw.className = 'hangman-draw';
  wrongAttempts = 0;
  correctGuesses = 0;
  lettersContainer.classList.remove('finished');
  initializeGame();
}

// Update the statistics displayed in the modal
function updateStats() {
  attemptsLeftSpan.textContent = maxWrongAttempts - wrongAttempts;
  highscoreSpan.textContent = highScore;
}

// Event Listeners
playAgainButton.addEventListener('click', resetGame);

document.addEventListener('click', e => {
  if (e.target.className === 'letter-box') {
    handleLetterClick(e.target);
  }
});

// Start the game
initializeGame();
