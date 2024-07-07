'use script';

// Letters
const letters = 'abcdefghijklmnopqrstuvwxyz';

// Get Array From Letters
// This will convert the string to an array of letters
let lettersArray = Array.from(letters);
// console.log(lettersArray);

// Select Letters Container
let lettersContainer = document.querySelector('.letters');

// Generate Letters
lettersArray.forEach(letter => {
  // Create Span
  let span = document.createElement('span');
  // Create Text Node
  let spanText = document.createTextNode(letter);
  // Append The Text To Span
  span.appendChild(spanText);
  // Add Class To Span
  span.className = 'letter-box';
  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
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

// Get Random Property
// This function will take an object and return all of its properties
let allKeys = Object.keys(words);
// console.log(allKeys);
// Random Number depends on Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// Category
let randomPropName = allKeys[randomPropNumber];
// console.log(words[randomPropName]);
// Category Words
let randomPropValue = words[randomPropName];
// console.log(randomPropValue);
// Random number depends on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// Word
let randomValue = randomPropValue[randomValueNumber];
// console.log(randomValue);

// Set Category Info
document.querySelector('.game-info .category span').textContent =
  randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector('.letters-guess');

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValue);

// Create Spans Depeneds On Word Length
lettersAndSpace.forEach(letter => {
  // Create Empty Span
  let emptySpan = document.createElement('span');
  // If Letter Is Space
  if (letter === ' ') {
    // Add Class To The Span
    emptySpan.className = 'has-space';
  }
  // Append Span To The Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});
