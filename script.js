'use strict';

// Constants
const letters = 'abcdefghijklmnopqrstuvwxyz';
const maxWrongAttempts = 8;
const lettersArray = Array.from(letters);
const elements = {
  lettersContainer: document.querySelector('.letters'),
  categorySpan: document.querySelector('.game-info .category span'),
  lettersGuessContainer: document.querySelector('.letters-guess'),
  hangmanDraw: document.querySelector('.hangman-draw'),
  modal: document.querySelector('.modal'),
  overlay: document.querySelector('.overlay'),
  popupMessage: document.querySelector('.popup-message'),
  playAgainButton: document.querySelector('.play-again'),
  highscoreSpan: document.querySelector('.highscore'),
  attemptsLeftSpan: document.querySelector('.attempts-left'),
  statsElement: document.querySelector('.stats'),
};
const words = {
  programming: ['python', 'javascript', 'php', 'html', 'css'],
  animals: ['dog', 'cat', 'elephant', 'tiger', 'lion'],
  countries: ['lebanon', 'france', 'germany', 'brazil', 'canada'],
};

// Variables
let wrongAttempts,
  correctGuesses,
  randomCategory,
  randomWord,
  wordArray,
  guessSpans;
let highScore = 0;

// Initialize the game
function initializeGame() {
  resetGameVariables();
  randomCategory = getRandomCategory();
  randomWord = getRandomWord(randomCategory);
  wordArray = Array.from(randomWord);

  elements.categorySpan.textContent = randomCategory;
  renderLetters();
  renderWordSpaces();
  guessSpans = document.querySelectorAll('.letters-guess span');
  updateStats();
}

// Reset game variables
function resetGameVariables() {
  wrongAttempts = 0;
  correctGuesses = 0;
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
  elements.lettersContainer.innerHTML = lettersArray
    .map(letter => `<span class="letter-box">${letter}</span>`)
    .join('');
}

// Render spaces for the letters in the word to be guessed
function renderWordSpaces() {
  elements.lettersGuessContainer.innerHTML = wordArray
    .map(letter => `<span class="${letter === ' ' ? 'has-space' : ''}"></span>`)
    .join('');
}

// Handle letter click events
function handleLetterClick(target) {
  target.classList.add('clicked');
  const clickedLetter = target.textContent.toLowerCase();
  let guessedCorrectly = updateGuesses(clickedLetter);

  if (!guessedCorrectly) {
    wrongAttempts++;
    elements.hangmanDraw.classList.add(`wrong-${wrongAttempts}`);
    if (wrongAttempts === maxWrongAttempts) endGame(false);
  } else if (correctGuesses === wordArray.length) {
    endGame(true);
  }

  updateStats();
}

// Update guesses and return if guessed correctly
function updateGuesses(clickedLetter) {
  let guessedCorrectly = false;
  wordArray.forEach((wordLetter, wordIndex) => {
    if (clickedLetter === wordLetter) {
      guessedCorrectly = true;
      guessSpans[wordIndex].textContent = clickedLetter;
      correctGuesses++;
    }
  });
  return guessedCorrectly;
}

// End the game with a win or loss message
function endGame(won) {
  const attemptsLeft = maxWrongAttempts - wrongAttempts;
  if (won && attemptsLeft > highScore) highScore = attemptsLeft;

  elements.modal.classList.add('show');
  elements.overlay.classList.add('show');
  elements.popupMessage.innerHTML = won
    ? `Congratulations, You Won!`
    : `Game Over! The word was ${randomWord}`;
  elements.popupMessage.style.color = won ? '#009688' : '#e74c3c';
  elements.statsElement.style.display = won ? 'flex' : 'none';
  elements.lettersContainer.classList.add('finished');
}

// Reset the game to start again
function resetGame() {
  elements.modal.classList.remove('show');
  elements.overlay.classList.remove('show');
  elements.hangmanDraw.className = 'hangman-draw';
  elements.lettersContainer.classList.remove('finished');
  initializeGame();
}

// Update the statistics displayed in the modal
function updateStats() {
  elements.attemptsLeftSpan.textContent = maxWrongAttempts - wrongAttempts;
  elements.highscoreSpan.textContent = highScore;
}

// Event Listeners
elements.playAgainButton.addEventListener('click', resetGame);

document.addEventListener('click', e => {
  if (e.target.className.includes('letter-box')) {
    handleLetterClick(e.target);
  }
});

// Start the game
initializeGame();
