'use strict';

// Letters and Game Variables
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

let wrongAttempts = 0;
let correctGuesses = 0;

const words = {
  programming: ['python', 'javascript', 'php', 'html', 'css'],
  animals: ['dog', 'cat', 'elephant', 'tiger', 'lion'],
  countries: ['lebanon', 'france', 'germany', 'brazil', 'canada'],
};

let randomCategory;
let randomWord;
let wordArray;
let guessSpans;

function initializeGame() {
  randomCategory = getRandomCategory();
  randomWord = getRandomWord(randomCategory);
  wordArray = Array.from(randomWord);

  categorySpan.innerHTML = randomCategory;
  renderLetters();
  renderWordSpaces();
  guessSpans = document.querySelectorAll('.letters-guess span');
}

function getRandomCategory() {
  const categories = Object.keys(words);
  return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomWord(category) {
  const wordList = words[category];
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function renderLetters() {
  lettersContainer.innerHTML = '';
  lettersArray.forEach(letter => {
    const span = document.createElement('span');
    span.className = 'letter-box';
    span.innerHTML = letter;
    lettersContainer.appendChild(span);
  });
}

function renderWordSpaces() {
  lettersGuessContainer.innerHTML = '';
  wordArray.forEach(letter => {
    const span = document.createElement('span');
    if (letter === ' ') {
      span.className = 'has-space';
    }
    lettersGuessContainer.appendChild(span);
  });
}

document.addEventListener('click', e => {
  if (e.target.className === 'letter-box') {
    handleLetterClick(e.target);
  }
});

function handleLetterClick(target) {
  target.classList.add('clicked');
  const clickedLetter = target.innerHTML.toLowerCase();
  let guessedCorrectly = false;

  wordArray.forEach((wordLetter, wordIndex) => {
    if (clickedLetter === wordLetter) {
      guessedCorrectly = true;
      guessSpans[wordIndex].innerHTML = clickedLetter;
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
}

playAgainButton.addEventListener('click', resetGame);

function endGame(won) {
  modal.classList.add('show');
  overlay.classList.add('show');
  popupMessage.innerHTML = won
    ? 'Congratulations, You Won!'
    : `Game Over! The word was ${randomWord}`;
  popupMessage.style.color = won ? '#009688' : '#e74c3c';
  lettersContainer.classList.add('finished');
}

function resetGame() {
  modal.classList.remove('show');
  overlay.classList.remove('show');
  hangmanDraw.className = 'hangman-draw';
  wrongAttempts = 0;
  correctGuesses = 0;
  lettersContainer.classList.remove('finished');
  initializeGame();
}

initializeGame();
