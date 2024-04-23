const wordColumn = document.getElementById('wordColumn');
const definitionColumn = document.getElementById('definitionColumn');
const checkButton = document.getElementById('checkButton');
const resetButton = document.getElementById('resetButton');
const showAnswersButton = document.getElementById('showAnswersButton');
//NEW
const sidebar = document.getElementById('sidebar'); 
const categoryButtons = document.querySelectorAll('#categories button'); //old
categoryButtons.forEach(button => {
sidebar.appendChild(button);  
});

document.getElementById('categories').remove(); // Remove the old empty div
//NEW

const sidebarButton = document.getElementById('openSidebarButton'); // Assuming you add a button with this ID
const body = document.body;

sidebarButton.addEventListener('click', () => {
  body.classList.toggle('sidebar-open');
});

let currentCategory = 'category1'; // Select initial category
let wordData = {
  category1: [
    { word: "festival", definition: "A celebration or series of events marked by special entertainments", "translation": "festiwal" },
    { word: "performance", definition: "The act of performing a work of entertainment", "translation": "występ" }
  ],
  category2: [
    { word: "accommodation", definition: "Lodgings, rooms, or board, especially those provided commercially for travelers", "translation": "zakwaterowanie"}, 
    { word: "apartment", definition: "A set of rooms in a building used as living quarters for one or more people", "translation": "mieszkanie" },
    { word: "boutique", definition: "A small, stylish shop selling fashionable clothes, jewelry, or other accessories", "translation": "butik" },
    { word: "hotel", definition: "An establishment offering lodging, especially overnight, to travelers", "translation": "hotel" },
    { word: "hostel", definition: "A low-cost lodging house providing dormitory-style accommodations, typically with shared facilities", "translation": "schronisko" },
    { word: "room", definition: "A space within a building or vehicle that is enclosed by walls and a roof and used for living, sleeping, or storing things in", "translation": "pokój" },
    { word: "suite", definition: "A set of rooms forming a self-contained apartment in a hotel", "translation": "apartament" }
  ],
  category3: [
    { word: "advertisement", definition: "A public announcement or notice designed to promote a product or service", "translation": "reklama" },
    { word: "commercial", definition: "A short television or radio advertisement", "translation": "spot reklamowy" }
  ],
  category4: [
    { word: "cobra", definition: "A large, venomous snake of tropical Asia and Africa", "translation": "kobra" },
    { word: "octopus", definition: "A soft-bodied, eight-armed marine mollusk", "translation": "ośmiornica" },
    { word: "ostriches", definition: "A large flightless bird native to Africa", "translation": "strusie" },
    { word: "reindeer", definition: "A large deer of the northern hemisphere, especially one kept for pulling a sleigh", "translation": "renifer" }
  ],
  category5: [
    { word: "artwork", definition: "A work of art, especially one considered to have aesthetic value", "translation": "dzieło sztuki" },
    { word: "painting", definition: "The process of applying paint, color, pigment, or other medium to a solid surface (such as a wall, canvas, paper, or board)", "translation": "obraz" },
    { word: "sculpture", definition: "The art of carving or molding three-dimensional figures", "translation": "rzeźba" }
],
category6: [
    { word: "competition", definition: "The act or process of competing or the condition of being in competition", "translation": "konkurencja" },
    { word: "contest", definition: "A competition, especially one involving a test of skill or ability", "translation": "konkurs" },
    { word: "tournament", definition: "A series of competitive events, especially one in which the winners of each contest go on to compete in a higher level until there is only one overall winner", "translation": "turniej" }
],
category7: [
    { word: "bridge", definition: "A structure that spans a physical obstacle such as a river, ravine, or road, allowing vehicles, people, or trains to cross", "translation": "most" },
    { word: "building", definition: "A structure with a roof and walls, such as a house, factory, or store", "translation": "budynek" },
    { word: "construction", definition: "The process of building or constructing something", "translation": "budowa" },
    { word: "house", definition: "A building for human habitation", "translation": "dom" },
    { word: "road", definition: "A wide, paved way designed for vehicles", "translation": "droga" }
],
category8: [
    { word: "barbecued", definition: "Cooked over hot coals or embers", "translation": "grillowany" },
    { word: "cooking", definition: "The preparation of food by heat", "translation": "gotowanie" },
    { word: "cuisine", definition: "The style of cooking and food preparation of a particular country or region", "translation": "kuchnia" },
    { word: "eating habits", definition: "The regular patterns of food consumption of a person or group", "translation": "nawyki żywieniowe" },
    { word: "recipe", definition: "A set of instructions for preparing a particular food dish", "translation": "przepis" }
], 
category9: [
    { word: "acrobat", definition: "A performer who specializes in acrobatics", "translation": "akrobata" },
    { word: "circus", definition: "A traveling entertainment show featuring trained animals, acrobats, and clowns", "translation": "cyrk" },
    { word: "concert", definition: "A public performance of music by an orchestra or other ensemble", "translation": "koncert" }
],
category10: [
    { word: "boutique", definition: "A small, stylish shop selling fashionable clothes, jewelry, or other accessories", "translation": "butik" },
    { word: "clothes", definition: "Garments worn for covering the body and limbs", "translation": "ubrania" },
    { word: "dress", definition: "An outer garment worn by women and girls, consisting of a one-piece skirt and bodice", "translation": "sukienka" },
    { word: "fashion", definition: "The prevailing style or custom at a particular time", "translation": "moda" },
    { word: "jewelry", definition: "Decorative items, worn for personal adornment, made of precious metals and stones", "translation": "biżuteria" },
    { word: "sandals", definition: "Open-toed shoes with straps securing them to the wearer's feet", "translation": "sandały" }
],
category11: [
    { word: "dessert", definition: "The sweet course eaten at the end of a meal", "translation": "deser" },
    { word: "fruit", definition: "The sweet, edible part of a seed-bearing plant", "translation": "owoc" },
    { word: "honey", definition: "A sweet, sticky yellow fluid made by bees from the nectar of flowers", "translation": "miód" },
    { word: "octopus", definition: "A soft-bodied, eight-armed marine mollusk", "translation": "ośmiornica" },
    { word: "oysters", definition: "Edible, salt-water bivalve mollusks that live attached to rocks or other surfaces", "translation": "ostrygi" }, 
    { word: "pizza", definition: " A round, flat baked dish of Italian origin, typically covered with cheese, tomatoes, and other toppings", "translation": "pizza" }
], 
category12: [
    { word: "actor", definition: "One who performs a role in a play, movie, or television show", "translation": "aktor" },
    { word: "actress", definition: "A female actor", "translation": "aktorka" },
    { word: "archaeologist", definition: "One who studies the material remains of past human life and activities", "translation": "archeolog" },
    { word: "designer", definition: "One who plans the form, look, or workings of something before its creation", "translation": "projektant" },
    { word: "journalist", definition: "One who collects information, writes news, or prepares content for the media", "translation": "dziennikarz" },
    { word: "mechanic", definition: "One who is skilled in the repair and maintenance of machinery", "translation": "mechanik" },
    { word: "pilot", definition: "One who operates the controls of an aircraft", "translation": "pilot" },
    { word: "steward", definition: "One who manages another's property or attends to passengers on a ship or aircraft", "translation": "steward" }, 
    { word: "waitress", definition: "A female server in a restaurant", "translation": "kelnerka" } 
], 
category13: [
    { word: "canal", definition: "An artificial waterway for navigation or irrigation", "translation": "kanał" },
    { word: "Caribbean", definition: "The region of the world that includes the Caribbean Sea and its islands", "translation": "Karaiby" },
    { word: "city", definition: "A large, inhabited center of commerce and culture", "translation": "miasto" },
    { word: "coast", definition: "The area where the land meets the sea", "translation": "wybrzeże" },
    { word: "country", definition: "A nation with its own territory and government", "translation": "kraj" }, 
    { word: "desert", definition: "A dry, barren region with little rainfall and sparse vegetation",  "translation": "pustynia" } 
], 
category14: [
    { word: "backpack", definition: "A bag with straps carried on one's back", "translation": "plecak" },
    { word: "balloon", definition: "An inflatable bag of lightweight material, filled with gas, that can float in the air", "translation": "balon" },
    { word: "blender", definition: "An appliance with rotating blades for mixing and pureeing food", "translation": "blender" },
    { word: "book", definition: "A written or printed work consisting of pages bound together", "translation": "książka" },
    { word: "suitcase", definition: "A portable case with a handle used for carrying clothes and belongings while traveling", "translation": "walizka" } 
], 
category15: [ 
  { word: "best man", definition: "The male attendant of the groom at a wedding", "translation": "drużba" },
  { word: "bride", definition: "A woman who is about to be married or has recently been married", "translation": "panna młoda" },
  { word: "bridesmaid", definition: "A female attendant of the bride at a wedding", "translation": "druhna" },
  { word: "celebrity", definition: "A famous person, especially in the world of entertainment or sports", "translation": "celebryta" },
  { word: "customer", definition: "A person who buys goods or services from a shop or business", "translation": "klient" }, 
  { word: "groom", definition: "A man who is about to be married or has recently been married", "translation": "pan młody" } 
], 
category16: [ 
  { word: "department store", definition: "A large retail store organized into departments offering a variety of merchandise", "translation": "dom towarowy" },
  { word: "gallery", definition: "A place where works of art are exhibited or sold", "translation": "galeria" },
  { word: "library", definition: "A building or room containing a collection of books for public or private use", "translation": "biblioteka" },
  { word: "museum", definition: "A building devoted to the acquisition, conservation, study, exhibition, and educational interpretation of objects of cultural value", "translation": "muzeum" },
  { word: "pizzeria", definition: "A restaurant specializing in pizzas", "translation": "pizzeria" }, 
  { word: "seashore", definition: "The land along the edge of the sea", "translation": "brzeg morski" } 
],
category17: [ 
  { word: "airplane", definition: "A powered flying vehicle with fixed wings", "translation": "samolot" },
  { word: "cabin", definition: "A private room or compartment on a ship, train, or aircraft", "translation": "kabina" },
  { word: "camera", definition: "A device for recording visual images in the form of photographs, film, or video signals", "translation": "aparat fotograficzny" },
  { word: "computer", definition: "An electronic device for storing and processing data, often in binary form, according to instructions given to it", "translation": "komputer" },
  { word: "phone", definition: "A device used for talking to people over long distances", "translation": "telefon" }
],  
category18: [ 
  { word: "adventure", definition: "An exciting or unusual experience or activity", "translation": "przygoda" },
  { word: "airport", definition: "A place where aircraft regularly take off and land",  "translation": "lotnisko" },
  { word: "honeymoon", definition: "A vacation taken by a newly married couple", "translation": "miesiąc miodowy" },
  { word: "ticket", definition: "A small piece of paper, card, or plastic that gives the holder a certain right, such as entering a place or traveling by public transport", "translation": "bilet" },
  { word: "tour", definition: "A journey for pleasure during which several different places are visited", "translation": "wycieczka" }, 
  { word: "voyage", definition: "A long journey, especially by sea or in space", "translation": "podróż (morska lub kosmiczna)" }
  ],

  category19: [
    { word: "complaint", definition: "An expression of dissatisfaction or grievance" },
    { word: "editor", definition: "A person who prepares text for publication by correcting, revising, or improving it" },
    { word: "magazine", definition: "A periodical publication containing articles and illustrations" },
    { word: "translation", definition: "The process of changing something into a different language, form, or appearance" }
  ],

  category20: [
    { word: 'announce', definition: 'to make something known publicly', translation: 'ogłosić' },
    { word: 'persuade', definition: 'to convince someone to do something', translation: 'przekonać' },
    { word: 'reassure', definition: 'to make someone feel more confident or less worried', translation: 'uspokoić' },
    { word: 'remark', definition: 'to say something briefly', translation: 'zauważyć' },
    // ... Add more if wanted
  ],

  category21: [
    { word: 'admit', definition: 'to allow someone to enter a place or to participate in something', translation: 'wpuścić' },
    { word: 'confirm', definition: 'to make something officially certain', translation: 'potwierdzić' },
    { word: 'conclude', definition: 'to bring something to an end', translation: 'zakończyć' },
    { word: 'instruct', definition: 'to give someone instructions on how to do something', translation: 'pouczyć' },
    { word: 'forbid', definition: 'to order someone not to do something', translation: 'zakazać' },
    { word: 'threaten', definition: 'to say that you will harm someone or something if they do not do what you want', translation: 'grozić' },
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
    'green', 
    'lightblue', 
    'pink', 
    'lightgreen',
    'orange',     // Added a new color 
    'magenta',    // Another color
    '#CAE1FF'     // Example using hex code
]; 
let usedDefinitions = []; // Keep track of used definitions

let usedWords = []; // Keep track of clicked words

function handleClickWord(event) {
  const clickedWordBox = event.target;  

  // Check if the word has already been used
  if (usedWords.includes(clickedWordBox.textContent)) {
    return;  // Do nothing if the word has been clicked before
  }

  // Reset previously active word if any
  if (activeWord) {
    activeWord.classList.remove('highlighted');
  }

  // Highlight the clicked word
  clickedWordBox.classList.add('highlighted');
  activeWord = clickedWordBox;

  // Add the word to the usedWords array
  usedWords.push(clickedWordBox.textContent); 
}


function handleClickDefinition(event) {
    const clickedDefinitionBox = event.target;

    // Reset previously active definition if any
    if (activeDefinition) {
        activeDefinition.classList.remove('highlighted');
    }

    //NEW
    if (usedDefinitions.includes(clickedDefinitionBox.textContent)) {
      return; // Do nothing if the definition has been used already
    }
    //NEW

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

        //NEW
        activeWord = null; 
        usedDefinitions.push(clickedDefinitionBox.textContent); // Mark as used
        //NEW
    } 
}


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
      wordBox.style.backgroundColor = ''; 
    });
  
    // 2. Remove checkmarks/crosses
    const checkmarks = document.querySelectorAll('.correct, .incorrect');
    checkmarks.forEach(checkmark => checkmark.remove());
  
    // 3. Reset data structures tracking matching
    allWordBoxes.forEach(wordBox => delete wordBox.dataset.matchedWith); 
  
    // 4. Remove translations
    allWordBoxes.forEach(wordBox => {
      const translation = wordBox.querySelector('.translation');
      if (translation) { 
        translation.remove(); 
      }
    });
  
    // 5. Reset state variables for the next cycle
    activeWord = null;
    activeDefinition = null;
    colorIndex = 0;
    usedDefinitions = [];
    // 6. Reset word tracking
    usedWords = [];
  }
  




function showAnswers() {
  resetGame();
  const allWordBoxes = document.querySelectorAll('.word-box');

  allWordBoxes.forEach(wordBox => {
    wordBox.classList.remove('highlighted'); 

    const wordDataEntry = wordData[currentCategory].find(
      item => item.word === wordBox.textContent
    );
    const correctDefinition = wordDataEntry.definition;

    // **Change: Getting the translation**
    const translation = wordDataEntry.translation; 

    // Find the matching definition box
    const correctDefinitionBox = Array.from(allWordBoxes).find(defBox => 
         defBox.textContent === correctDefinition);

    // Apply visual connection
    const currentColor = highlightColors[colorIndex % highlightColors.length];
    wordBox.style.backgroundColor = currentColor;
    correctDefinitionBox.style.backgroundColor = currentColor;

    // **Change: Displaying the translation**
    wordBox.insertAdjacentHTML('beforeend', `<span class="translation">Polish: ${translation}</span>`);

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
    // 1. Remove 'active-category' class from all buttons
    categoryButtons.forEach(btn => btn.classList.remove('active-category'));

    // 2. Add 'active-category' class to the clicked button
    button.classList.add('active-category');       

    currentCategory = button.dataset.category;
    loadWords();
    });
});
checkButton.addEventListener('click', checkAnswers);
resetButton.addEventListener('click', resetGame);
showAnswersButton.addEventListener('click', showAnswers);
//NEW
wordColumn.addEventListener('click', function(event) {
  if (event.target.classList.contains('word-box')) {
    handleClickWord(event);
  }
});

definitionColumn.addEventListener('click', function(event) {
  if (event.target.classList.contains('word-box')) {
    handleClickDefinition(event);
  }
});
//NEW
// Initialize
loadWords(); 
