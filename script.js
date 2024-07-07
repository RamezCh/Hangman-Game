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
