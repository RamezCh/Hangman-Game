'use strict';

// Letters
const letters = 'abcdefghijklmnopqrstuvwxyz';
const maxWrongAttempts = 8;

// Get Array From Letters
const lettersArray = Array.from(letters);

// Select Elements
const lettersContainer = document.querySelector('.letters');
const categorySpan = document.querySelector('.game-info .category span');
const lettersGuessContainer = document.querySelector('.letters-guess');
const draw = document.querySelector('.hangman-draw');
const popup = document.querySelector('.popup');

// Generate Letters
const generateLetters = () => {
  lettersArray.forEach(letter => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.className = 'letter-box';
    lettersContainer.appendChild(span);
  });
};

// Game Words and Categories
const words = {
  programming: [
    'php',
    'javascript',
    'go',
    'scala',
    'fortran',
    'r',
    'mysql',
    'python',
  ],
  movies: [
    'shawshank redemption',
    'godfather',
    'dark knight',
    'casablanca',
    'pulp fiction',
    'forrest gump',
    'inception',
  ],
  people: [
    'brad pitt',
    'angelina jolie',
    'morgan freeman',
    'tom hanks',
    'jack nicholson',
  ],
  countries: ['egypt', 'syria', 'yemen', 'australia', 'canada', 'china'],
};

// Get Random Word
const getRandomWord = () => {
  const categories = Object.keys(words);
  const category = categories[Math.floor(Math.random() * categories.length)];
  const word =
    words[category][Math.floor(Math.random() * words[category].length)];
  return { category, word };
};

// Initialize Game
const initGame = () => {
  const { category, word } = getRandomWord();
  categorySpan.textContent = category;

  const lettersAndSpace = Array.from(word);

  lettersAndSpace.forEach(letter => {
    const span = document.createElement('span');
    if (letter === ' ') span.className = 'has-space';
    lettersGuessContainer.appendChild(span);
  });

  return word;
};

// Handle Letter Click
const handleLetterClick = (letter, word, guessSpans) => {
  let isFound = false;
  let correctGuessCount = 0;

  // Check if letter exists in the word
  Array.from(word).forEach((wordLetter, index) => {
    if (letter === wordLetter) {
      guessSpans[index].textContent = letter;
      isFound = true;
      correctGuessCount++;
    }
  });

  // Check if guessed letter is correct or not
  if (!isFound) {
    wrongAttempts++;
    draw.classList.add(`wrong-${wrongAttempts}`);
    if (wrongAttempts === maxWrongAttempts) endGame(word, false);
  } else {
    correctGuesses += correctGuessCount;
    if (correctGuesses === word.replace(/ /g, '').length) endGame(word, true);
  }
};

// End Game
const endGame = (word, won) => {
  popup.textContent = won
    ? `Congratulations! You guessed the word: ${word}`
    : `Game Over! The word was: ${word}`;
  popup.style.display = 'block';
  lettersContainer.classList.add('finished');
};

// Main
let wrongAttempts = 0;
let correctGuesses = 0;
const word = initGame();
const guessSpans = document.querySelectorAll('.letters-guess span');

document.addEventListener('click', e => {
  if (e.target.className === 'letter-box') {
    const letter = e.target.textContent.toLowerCase();
    e.target.classList.add('clicked');
    handleLetterClick(letter, word, guessSpans);
  }
});

// Start the game
generateLetters();
