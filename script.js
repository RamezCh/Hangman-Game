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
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
// console.log(words[randomPropName]);
let randomPropValue = words[randomPropName];
// console.log(randomPropValue);
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValue = randomPropValue[randomValueNumber];
// console.log(randomValue);
