const wordColumn = document.getElementById('wordColumn');
const definitionColumn = document.getElementById('definitionColumn');
const checkButton = document.getElementById('checkButton');
const resetButton = document.getElementById('resetButton');
const showAnswersButton = document.getElementById('showAnswersButton');
const categoryButtons = document.querySelectorAll('#categories button');

let currentCategory = 'category1'; // Select initial category
let wordData = {
    category1: [
        { word: 'House', definition: 'A building for human habitation' },
        { word: 'Tree', definition: 'A tall woody plant with a trunk and branches' },
        { word: 'Computer', definition: 'An electronic device for storing and processing data' },
        // ... add more words for category 1
    ],
    category2: [
        { word: 'Car', definition: 'A road vehicle with an engine' },
        { word: 'Bicycle', definition: 'A vehicle with two wheels propelled by pedals' },
        { word: 'Train', definition: 'A series of connected railway carriages' },
        // ... add more words for category 2
    ],
    // Add more categories here
    
  // Communication-focused verbs
  category3: [
    { word: 'announce', definition: 'to make something known publicly' },
    { word: 'persuade', definition: 'to convince someone to do something' },
    { word: 'reassure', definition: 'to make someone feel more confident or less worried' },
    { word: 'remark', definition: 'to say something briefly' },
    // ... add more if wanted
  ],

  // Decision/Action-focused verbs
  category4: [
    { word: 'admit', definition: 'to allow someone to enter a place or to participate in something' },
    { word: 'confirm', definition: 'to make something officially certain' },
    { word: 'conclude', definition: 'to bring something to an end' },
    { word: 'instruct', definition: 'to give someone instructions on how to do something' },
    { word: 'forbid', definition: 'to order someone not to do something' },
    { word: 'threaten', definition: 'to say that you will harm someone or something if they do not do what you want' },
    // ...add others as needed
  ]
};


// Functions we'll fill in


function loadWords() {
    // Clear existing content
    wordColumn.innerHTML = '';
    definitionColumn.innerHTML = '';

    // Get words for the selected category
    const words = wordData[currentCategory];

    // Shuffle definitions (for randomness)
    const definitions = words.map(item => ({ ...item })) // Copy definitions
                           .sort(() => Math.random() - 0.5); 

    // Create word boxes
    words.forEach(item => {
        const wordBox = document.createElement('div');
        wordBox.classList.add('word-box');
        wordBox.textContent = item.word;
        wordBox.addEventListener('click', handleClickWord);
        wordColumn.appendChild(wordBox);
    });

    // Create definition boxes
    definitions.forEach(item => {
        const definitionBox = document.createElement('div');
        definitionBox.classList.add('word-box');
        definitionBox.textContent = item.definition;
        definitionBox.addEventListener('click', handleClickDefinition);
        definitionColumn.appendChild(definitionBox);
    });
}


let activeWord = null;
let activeDefinition = null; 
let colorIndex = 0; // To keep track of colors
const highlightColors = [
    'yellow', 
    'lightblue', 
    'pink', 
    'lightgreen',
    'orange',     // Added a new color 
    'magenta',    // Another color
    '#CAE1FF'     // Example using hex code
]; 


function handleClickWord(event) {
    const clickedWordBox = event.target;  

    // Reset previously active word if any
    if (activeWord) {
        activeWord.classList.remove('highlighted');
    }

    // Highlight the clicked word
    clickedWordBox.classList.add('highlighted');
    activeWord = clickedWordBox;
}

function handleClickDefinition(event) {
    const clickedDefinitionBox = event.target;

    // Reset previously active definition if any
    if (activeDefinition) {
        activeDefinition.classList.remove('highlighted');
    }

    // If we have a selected word, attempt to connect
    if (activeWord) {
        // Apply dynamic color
        clickedDefinitionBox.classList.add('highlighted');  
        clickedDefinitionBox.style.backgroundColor = highlightColors[colorIndex]; 

        activeWord.classList.add('highlighted');         
        activeWord.style.backgroundColor = highlightColors[colorIndex]; 


        // Cycle to the next color
        colorIndex = (colorIndex + 1) % highlightColors.length; 
//NEW
activeWord.dataset.matchedWith = clickedDefinitionBox.textContent; // Store match attempt
activeDefinition = clickedDefinitionBox; // Keep track of definition
//NEW        
    } 
}


//wow it works now
function checkAnswers() {
    const allWordBoxes = document.querySelectorAll('.word-box');
  
    allWordBoxes.forEach(wordBox => {
      const attemptedMatch = wordBox.dataset.matchedWith;
      const correctDefinition = wordData[currentCategory].find(
        item => item.word === wordBox.textContent
      ).definition;
  
      wordBox.classList.remove('highlighted'); // Clear any temporary highlighting
  
      if (attemptedMatch === correctDefinition) {
        // Correct match
        wordBox.insertAdjacentHTML('beforeend', '<span class="correct">✔️</span>');
      } else if (attemptedMatch) {
        // Incorrect match
        wordBox.insertAdjacentHTML('beforeend', '<span class="incorrect">❌</span>');
      }
    });
  
    // Reset state for next matching cycle
    activeWord = null;
    activeDefinition = null; 
    colorIndex = 0; 
  }


function resetGame() {
  // 1. Remove highlights 
  const allWordBoxes = document.querySelectorAll('.word-box');
  allWordBoxes.forEach(wordBox => {
    wordBox.classList.remove('highlighted');
    wordBox.style.backgroundColor = ''; // Reset background color
  });

  // 2. Remove checkmarks/crosses
  const checkmarks = document.querySelectorAll('.correct, .incorrect');
  checkmarks.forEach(checkmark => {
    checkmark.remove();
  });

  // 3. Reset data structures tracking matching
  allWordBoxes.forEach(wordBox => {
    delete wordBox.dataset.matchedWith; // Remove match attempts
  });

  // 4. Reset state variables for the next matching cycle 
  activeWord = null;
  activeDefinition = null;
  colorIndex = 0;
}




function showAnswers() {
    const allWordBoxes = document.querySelectorAll('.word-box');
  
    allWordBoxes.forEach(wordBox => {
      wordBox.classList.remove('highlighted'); // Clear highlights
  
      const correctDefinition = wordData[currentCategory].find(
        item => item.word === wordBox.textContent
      ).definition;
  
      // Find the matching definition box
      const correctDefinitionBox = Array.from(allWordBoxes).find(defBox => 
           defBox.textContent === correctDefinition);
  
      // Apply the current color for visual connection
      const currentColor = highlightColors[colorIndex % highlightColors.length];
      wordBox.style.backgroundColor = currentColor;
      correctDefinitionBox.style.backgroundColor = currentColor;
  
      // Move to the next color for the next word pair
      colorIndex++;
    });
  
    // Reset for the next use of showAnswers
    activeWord = null;
    activeDefinition = null; 
    colorIndex = 0;
  }
  
  




// Event listeners
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
       currentCategory = button.dataset.category;
       loadWords();
    });
});
checkButton.addEventListener('click', checkAnswers);
resetButton.addEventListener('click', resetGame);
showAnswersButton.addEventListener('click', showAnswers);

wordColumn.addEventListener('click', handleClickWord);
definitionColumn.addEventListener('click', handleClickDefinition);

// Initialize
loadWords(); 
