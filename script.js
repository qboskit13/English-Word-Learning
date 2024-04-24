const body = document.body;
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

const toggleDarkModeButton = document.getElementById('toggleDarkMode');

const nextCategoryButton = document.getElementById('nextCategoryButton');

const previousCategoryButton = document.getElementById('previousCategoryButton');

// Initial theme setup (Optional but recommended)
const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark') {
    body.classList.add('dark-mode');
} 

let currentCategory = 'category1'; // Select initial category
let wordData = {
  category1: [
    { word: "festival", definition: "A celebration or series of events marked by special entertainments", "translation": "festiwal" },
    { word: "performance", definition: "The act of performing a work of entertainment", "translation": "występ" },
    { word: "concert", definition: "A live musical performance given in public.", "translation": "koncert"},
    { word: "exhibition", definition: "A public display of works of art or items of interest.", "translation": "wystawa"},
    { word: "carnival", definition: "A period of merrymaking and revelry, particularly associated with Shrove Tuesday.", "translation": "karnawał"},
    { word: "ceremony", definition: "A formal religious or public occasion.", "translation": "ceremonia"},
    { word: "spectacle", definition: "A visually striking performance or display.", "translation": "spektakl"},
    { word: "show", definition: "A theatrical performance or exhibition.", "translation": "przedstawienie"},
    { word: "celebration", definition: "The action of marking a significant event or occasion.", "translation": "obchody" }
 ],

  category2: [
    { word: "accommodation", definition: "Lodgings, rooms, or board, especially those provided commercially for travelers", "translation": "zakwaterowanie"}, 
    { word: "apartment", definition: "A set of rooms in a building used as living quarters for one or more people", "translation": "mieszkanie" },
    { word: "boutique", definition: "A small, stylish shop selling fashionable clothes, jewelry, or other accessories", "translation": "butik" },
    { word: "hotel", definition: "An establishment offering lodging, especially overnight, to travelers", "translation": "hotel" },
    { word: "hostel", definition: "A low-cost lodging house providing dormitory-style accommodations, typically with shared facilities", "translation": "schronisko" },
    { word: "suite", definition: "A set of rooms forming a self-contained apartment in a hotel", "translation": "apartament" },
    { word: "cabin", definition: "A small, simple dwelling; often made of wood.", "translation": "domek letniskowy"},
    { word: "guesthouse", definition: "A small hotel or private house offering accommodation to paying guests. ", "translation": "pensjonat"},
    { word: "resort", definition: "A place frequented for holidays or recreation.", "translation": "ośrodek wypoczynkowy"}
 ],

  category3: [
    { word: "advertisement", definition: "A public announcement or notice designed to promote a product or service", "translation": "reklama" },
    { word: "billboard", definition: "A large outdoor board for displaying advertisements.", "translation": "billboard"},
    { word: "brochure", definition: "A small booklet or pamphlet, often containing promotional material.", "translation": "broszura"},
    { word: "flyer", definition: "A small handbill advertising an event or product.", "translation": "ulotka"},
    { word: "endorsement", definition: "An act of giving one's public approval or support to someone or something.", "translation": "rekomendacja"},
    { word: "promotion", definition: "Activity that supports or provides active encouragement for a cause or venture.", "translation": "promocja"},
    { word: "campaign", definition: "A connected series of operations designed to bring about a particular result. ", "translation": "kampania"},
    { word: "marketing", definition: "The action or business of promoting and selling products or services.", "translation": "marketing"},
    { word: "publicity", definition: "Public attention or notice obtained by disseminating information.", "translation": "rozgłos"},
 ],

 category4: [
    { word: "cobra", definition: "A large, venomous snake of tropical Asia and Africa", "translation": "kobra" },
    { word: "octopus", definition: "A soft-bodied, eight-armed marine mollusk", "translation": "ośmiornica" },
    { word: "ostriches", definition: "A large flightless bird native to Africa", "translation": "strusie" },
    { word: "reindeer", definition: "A large deer of the northern hemisphere, especially one kept for pulling a sleigh", "translation": "renifer" },
    { word: "eagle", definition: "A large, powerful bird of prey with a heavy head and beak.", "translation": "orzeł"},
    { word: "whale", definition: "A very large marine mammal with a streamlined hairless body.", "translation": "wieloryb"},
    { word: "penguin", definition: "A short-legged, flightless aquatic bird. ", "translation": "pingwin"},
    { word: "tiger", definition: "A very large, solitary cat with a yellow-brown coat striped with black.", "translation": "tygrys"},
    { word: "elephant", definition: "A very large, plant-eating mammal with a prehensile trunk, long curved tusks, and large ears", "translation": "słoń" } 
 ],

 category5: [
    { word: "artwork", definition: "A work of art, especially one considered to have aesthetic value", "translation": "dzieło sztuki" },
    { word: "painting", definition: "The process of applying paint, color, pigment, or other medium to a solid surface (such as a wall, canvas, paper, or board)", "translation": "obraz" },
    { word: "sculpture", definition: "The art of carving or molding three-dimensional figures", "translation": "rzeźba" },
    { word: "drawing", definition: "A form of visual art in which an artist uses instruments on a surface to make marks. ", "translation": "rysunek"},
    { word: "mural", definition: "A painting or other work of art executed directly on a wall. ", "translation": "mural"},
    { word: "photography", definition: "The art or practice of taking and processing photographs.", "translation": "fotografia"},
    { word: "collage", definition: "A technique of composing a work of art by pasting on a single surface various materials not normally associated with one another.", "translation": "kolaż"},
    { word: "architecture", definition: "The art or practice of designing and constructing buildings.", "translation": "architektura"},
    { word: "illustration", definition: "A visual explanation within a text, often a book, article, or manual.", "translation": "ilustracja"}

],
category6: [
  { word: "contest", definition: "A competition, especially one involving a test of skill or ability", "translation": "konkurs" },
  { word: "tournament", definition: "A series of competitive events, especially one in which the winners of each contest go on to compete in a higher level until there is only one overall winner", "translation": "turniej" },
  { word: "race", definition: "A competition between runners, horses, vehicles to see who is the fastest.", "translation": "wyścig"},
  { word: "match", definition: "A contest in which people or teams compete against each other in a particular sport.", "translation": "mecz"},
  { word: "trial", definition: "A formal test of the performance, qualities, or suitability of someone or something.", "translation": "proces"},
  { word: "championship", definition: "A contest for the position of champion in a sport or game. ", "translation": "mistrzostwa"},
  { word: "league", definition: "A group of sports teams that compete against each other in a related series of games. ", "translation": "liga"},
  { word: "marathon", definition: "A long-distance running race of strictly 42.195 kilometers.", "translation": "maraton"},
  { word: "rivalry", definition:  "Competition for the same objective or for superiority in the same field.", "translation": "rywalizacja"}

],

category7: [
  { word: "bridge", definition: "A structure that spans a physical obstacle such as a river, ravine, or road, allowing vehicles, people, or trains to cross", "translation": "most" },
  { word: "building", definition: "A structure with a roof and walls, such as a house, factory, or store", "translation": "budynek" },
  { word: "construction", definition: "The process of building or constructing something", "translation": "budowa" },
  { word: "road", definition: "A wide, paved way designed for vehicles", "translation": "droga" },
  { word: "skyscraper", definition: "A very tall, multi-storied building.", "translation": "drapacz chmur"},
  { word: "monument", definition: "A statue, building, or other structure erected to commemorate a famous or notable person or event.", "translation": "pomnik"},
  { word: "tunnel", definition: "An artificial underground passage.", "translation": "tunel"},
  { word: "highway", definition: "A main road, especially one connecting major towns or cities.", "translation": "autostrada"},
  { word: "path", definition: "A way or track laid down for walking or made by continual treading.", "translation": "ścieżka"},  
],

category8: [
  { word: "barbecued", definition: "Cooked over hot coals or embers", "translation": "grillowany" },
  { word: "cuisine", definition: "The style of cooking and food preparation of a particular country or region", "translation": "kuchnia" },
  { word: "eating habits", definition: "The regular patterns of food consumption of a person or group", "translation": "nawyki żywieniowe" },
  { word: "recipe", definition: "A set of instructions for preparing a particular food dish", "translation": "przepis" },
  { word: "boil", definition: "To reach or cause to reach the temperature at which a liquid begins to bubble and turn into vapor.", "translation": "gotować (doprowadzić do wrzenia)"},
  { word: "fry", definition: "To cook in hot fat or oil.", "translation": "smażyć"},
  { word: "bake", definition: "To cook food in an enclosed oven using dry heat.", "translation": "piec"},
  { word: "roast", definition: "To cook food by exposing it to the direct heat of an open fire or oven.", "translation": "piec (mięso)"}, 
  { word: "ingredient", definition: "A component part or element of a mixture or compound.", "translation": "składnik"}
], 

category9: [
  { word: "acrobat", definition: "A performer who specializes in acrobatics", "translation": "akrobata" },
  { word: "circus", definition: "A traveling entertainment show featuring trained animals, acrobats, and clowns", "translation": "cyrk" },
  { word: "concert", definition: "A public performance of music by an orchestra or other ensemble", "translation": "koncert" },
  { word: "festival", definition: "A day or period of celebration, typically a religious commemoration. ", "translation": "festiwal"}, 
  { word: "theater", definition: "A building or outdoor area in which plays, movies, and other dramatic performances are given.", "translation": "teatr"},
  { word: "fair", definition: "A gathering of people for entertainment or trade.", "translation": "jarmark"},
  { word: "dance", definition: "To move rhythmically to music.", "translation": "taniec"},
  { word: "opera", definition: "A dramatic work in one or more acts, set to music for singers and orchestra. ", "translation": "opera"},
  { word: "ballet", definition: "An artistic dance form performed to music using precise and highly formalized set steps and gestures.", "translation": "balet"}
],

category10: [
  { word: "boutique", definition: "A small, stylish shop selling fashionable clothes, jewelry, or other accessories", "translation": "butik" },
  { word: "clothes", definition: "Garments worn for covering the body and limbs", "translation": "ubrania" },
  { word: "dress", definition: "An outer garment worn by women and girls, consisting of a one-piece skirt and bodice", "translation": "sukienka" },
  { word: "fashion", definition: "The prevailing style or custom at a particular time", "translation": "moda" },
  { word: "jewelry", definition: "Decorative items, worn for personal adornment, made of precious metals and stones", "translation": "biżuteria" },
  { word: "sandals", definition: "Open-toed shoes with straps securing them to the wearer's feet", "translation": "sandały" },
  { word: "hat", definition: "A covering for the head, especially one with a shaped crown and brim.", "translation": "kapelusz"}, 
  { word: "belt", definition: "A strip of leather or material worn around the waist especially to support clothes.", "translation": "pasek"},
  { word: "necklace", definition: "An ornamental chain or string of beads, jewels, or links worn around the neck.", "translation": "naszyjnik"} 

], 
category11: [
  { word: "dessert", definition: "The sweet course eaten at the end of a meal", "translation": "deser" },
  { word: "fruit", definition: "The sweet, edible part of a seed-bearing plant", "translation": "owoc" },
  { word: "honey", definition: "A sweet, sticky yellow fluid made by bees from the nectar of flowers", "translation": "miód" },
  { word: "octopus", definition: "A soft-bodied, eight-armed marine mollusk", "translation": "ośmiornica" },
  { word: "oysters", definition: "Edible, salt-water bivalve mollusks that live attached to rocks or other surfaces", "translation": "ostrygi" }, 
  { word: "pizza", definition: " A round, flat baked dish of Italian origin, typically covered with cheese, tomatoes, and other toppings", "translation": "pizza" },
  { word: "chocolate", definition: "A food made from roasted and ground cacao pods.", "translation": "czekolada"},
  { word: "ice cream", definition: "A smooth, sweet, frozen food made from a mixture of cream, milk, sugar, and flavorings.", "translation": "lody"},
  { word: "vegetarian", definition: "A person who does not eat meat or fish.", "translation": "wegetarianin/wegetarianka"}
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
  { word: "waitress", definition: "A female server in a restaurant", "translation": "kelnerka" }, 
], 

category13: [
  { word: "canal", definition: "An artificial waterway for navigation or irrigation", "translation": "kanał" },
  { word: "city", definition: "A large, inhabited center of commerce and culture", "translation": "miasto" },
  { word: "coast", definition: "The area where the land meets the sea", "translation": "wybrzeże" },
  { word: "country", definition: "A nation with its own territory and government", "translation": "kraj" }, 
  { word: "desert", definition: "A dry, barren region with little rainfall and sparse vegetation",  "translation": "pustynia" }, 
  { word: "island", definition: "A piece of land completely surrounded by water.", "translation": "wyspa"},
  { word: "forest", definition: "A large area covered chiefly with trees and undergrowth.", "translation": "las"},
  { word: "lake", definition: "A large body of water within a body of land.", "translation": "jezioro"},
  { word: "mountain", definition: "A landmass that projects conspicuously above its surroundings and is higher than a hill", "translation": "góra"} 
], 

category14: [
  { word: "backpack", definition: "A bag with straps carried on one's back", "translation": "plecak" },
  { word: "balloon", definition: "An inflatable bag of lightweight material, filled with gas, that can float in the air", "translation": "balon" },
  { word: "blender", definition: "An appliance with rotating blades for mixing and pureeing food", "translation": "blender" },
  { word: "book", definition: "A written or printed work consisting of pages bound together", "translation": "książka" },
  { word: "suitcase", definition: "A portable case with a handle used for carrying clothes and belongings while traveling", "translation": "walizka" }, 
  { word: "glasses", definition: "Optical devices with lenses to aid vision, worn in a frame that rests on the nose and ears.", "translation": "okulary"},
  { word: "camera", definition: "A device for recording visual images in the form of photographs, film, or video signals. ", "translation": "aparat fotograficzny"}, 
  { word: "bicycle", definition: "A vehicle composed of two wheels held in a frame one behind the other, propelled by pedals and steered with handlebars attached to the front wheel.", "translation": "rower"},
  { word: "toy", definition: "An object for a child to play with, typically a model or miniature replica of something.", "translation": "zabawka"},
], 

category15: [ 
{ word: "best man", definition: "The male attendant of the groom at a wedding", "translation": "drużba" },
{ word: "bride", definition: "A woman who is about to be married or has recently been married", "translation": "panna młoda" },
{ word: "bridesmaid", definition: "A female attendant of the bride at a wedding", "translation": "druhna" },
{ word: "celebrity", definition: "A famous person, especially in the world of entertainment or sports", "translation": "celebryta" },
{ word: "customer", definition: "A person who buys goods or services from a shop or business", "translation": "klient" }, 
{ word: "groom", definition: "A man who is about to be married or has recently been married", "translation": "pan młody" },
{ word: "friend", definition: "A person attached to another by feelings of affection or personal regard.", "translation": "przyjaciel/przyjaciółka"},
{ word: "neighbor", definition: "A person living next door to or very near to another.", "translation": "sąsiad/sąsiadka"},
{ word: "guest", definition: "A person who is invited to visit the home of or take part in a function organized by another.", "translation": "gość"}
],   
category16: [ 
  { word: "department store", definition: "A large retail store organized into departments offering a variety of merchandise", "translation": "dom towarowy" },
  { word: "gallery", definition: "A place where works of art are exhibited or sold", "translation": "galeria" },
  { word: "library", definition: "A building or room containing a collection of books for public or private use", "translation": "biblioteka" },
  { word: "museum", definition: "A building devoted to the acquisition, conservation, study, exhibition, and educational interpretation of objects of cultural value", "translation": "muzeum" },
  { word: "pizzeria", definition: "A restaurant specializing in pizzas", "translation": "pizzeria" }, 
  { word: "seashore", definition: "The land along the edge of the sea", "translation": "brzeg morski" },
    { word: "hospital", definition: "An institution providing medical and surgical treatment and nursing care for sick or injured people.", "translation": "szpital"},
    { word: "post office", definition: "A place where stamps are sold and mail is sorted and delivered from.", "translation": "poczta"},
    { word: "shop", definition: "A place where you can buy goods or services.", "translation": "sklep"} // British English: shop,  American English: store
 ],

 category17: [ 
  { word: "airplane", definition: "A powered flying vehicle with fixed wings", "translation": "samolot" },
  { word: "cabin", definition: "A private room or compartment on a ship, train, or aircraft", "translation": "kabina" },
  { word: "camera", definition: "A device for recording visual images in the form of photographs, film, or video signals", "translation": "aparat fotograficzny" },
  { word: "phone", definition: "A device used for talking to people over long distances", "translation": "telefon" },
    { word: "cell phone", definition: "A portable telephone that can make and receive calls over a radio frequency link.", "translation": "telefon komórkowy"}, // Alternate: mobile phone
    { word: "car", definition: "A road vehicle with four wheels, powered by an engine, and able to carry a small number of passengers.", "translation": "samochód"},
    { word: "bus", definition: "A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route.", "translation": "autobus"},
    { word: "train", definition: "A series of railroad cars pulled or pushed by one or more engines.", "translation": "pociąg"},
    { word: "bicycle", definition: "A vehicle composed of two wheels held in a frame one behind the other, propelled by pedals and steered with handlebars attached to the front wheel.", "translation": "rower"}
 ], 

 category18: [ 
  { word: "adventure", definition: "An exciting or unusual experience or activity", "translation": "przygoda" },
  { word: "airport", definition: "A place where aircraft regularly take off and land",  "translation": "lotnisko" },
  { word: "honeymoon", definition: "A vacation taken by a newly married couple", "translation": "miesiąc miodowy" },
  { word: "ticket", definition: "A small piece of paper, card, or plastic that gives the holder a certain right, such as entering a place or traveling by public transport", "translation": "bilet" },
  { word: "tour", definition: "A journey for pleasure during which several different places are visited", "translation": "wycieczka" }, 
  { word: "voyage", definition: "A long journey, especially by sea or in space", "translation": "podróż (morska lub kosmiczna)" },
    { word: "travel", definition: "To make a journey, typically of some length or abroad.", "translation": "podróżować"},
    { word: "vacation", definition: "An extended period of leisure and recreation, especially one spent away from home or in traveling. ", "translation": "wakacje"}, // American English: vacation, British English: holiday 
    { word: "destination", definition: "The place to which someone or something is going or being sent.", "translation": "cel podróży"}
 ],

 category19: [
    { word: "complaint", definition: "An expression of dissatisfaction or grievance", "translation": "zażalenie, skarga" },
    { word: "editor", definition: "A person who prepares text for publication by correcting, revising, or improving it", "translation": "redaktor" },
    { word: "magazine", definition: "A periodical publication containing articles and illustrations", "translation": "magazyn (czasopismo)" },
    { word: "translation", definition: "The process of changing something into a different language, form, or appearance", "translation": "tłumaczenie" },
    { word: "newspaper", definition: "A printed publication that contains news, articles, advertisements and correspondence.", "translation": "gazeta"},
    { word: "website", definition: "A collection of related web pages located under a single domain name.", "translation": "strona internetowa"}, 
    { word: "article", definition: "A piece of writing included in a publication.", "translation": "artykuł"},
    { word: "author", definition: "A writer of a book, article, or report.", "translation": "autor/autorka"},
    { word: "novel", definition: "A fictitious prose narrative of book length, typically representing character and action with some degree of realism.", "translation": "powieść"}, 
 ],

 category20: [
    { word: 'announce', definition: 'to make something known publicly', translation: 'ogłosić' },
    { word: 'persuade', definition: 'to convince someone to do something', translation: 'przekonać' },
    { word: 'reassure', definition: 'to make someone feel more confident or less worried', translation: 'uspokoić' },
    { word: 'remark', definition: 'to say something briefly', translation: 'zauważyć' },
    { word: 'explain', definition: 'to make something clear or easy to understand ', translation: 'wyjaśnić'},
    { word: 'describe', definition: 'to give an account of something in words', translation: 'opisać'},
    { word: 'discuss', definition: 'to talk about something, especially to give everyone a chance to express an opinion', translation: 'przedyskutować'},
    { word: 'apologize', definition: 'to say that you are sorry', translation: 'przeprosić'},
    { word: 'agree', definition: 'to have the same opinion about something', translation: 'zgodzić się'}, 
 ],

  category21: [
    { word: 'admit', definition: 'to allow someone to enter a place or to participate in something', translation: 'wpuścić' },
    { word: 'confirm', definition: 'to make something officially certain', translation: 'potwierdzić' },
    { word: 'conclude', definition: 'to bring something to an end', translation: 'zakończyć' },
    { word: 'forbid', definition: 'to order someone not to do something', translation: 'zakazać' },
    { word: 'threaten', definition: 'to say that you will harm someone or something if they do not do what you want', translation: 'grozić' },
    { word: 'warn', definition: 'to inform someone in advance of a possible danger, problem, or other unpleasant thing', translation: 'ostrzec' }, 
    { word: 'deny', definition: 'to state that something is not true', translation: 'zaprzeczać' }, 
    { word: 'claim', definition: 'to state or assert that something is the case, typically without providing evidence or proof.', translation: 'twierdzić' }, 
    { word: 'argue', definition: 'to give reasons or cite evidence in support of an idea, action, or theory, typically with the aim of persuading others to share oneʹs view.', translation: 'kłócić się'} 
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
    // Update the active category button in the sidebar
    categoryButtons.forEach(btn => {
      btn.classList.toggle('active-category', btn.dataset.category === currentCategory)  
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
sidebarButton.addEventListener('click', () => {
  body.classList.toggle('sidebar-open');
  sidebarButton.classList.toggle('open'); /* Assuming you add an 'open' class */
});

toggleDarkModeButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const buttonText = toggleDarkModeButton.querySelector('span'); // Target the <span>

  // Toggle text content
  buttonText.textContent = body.classList.contains('dark-mode') ? '🌙' : '☀️'; 

  // Optional: Store the preference in localStorage
  if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
  } else {
      localStorage.setItem('theme', 'light');
  }
});


nextCategoryButton.addEventListener('click', () => {
  const categoryNames = Object.keys(wordData); // Get an array of category names
  const currentIndex = categoryNames.indexOf(currentCategory);
  const nextIndex = (currentIndex + 1) % categoryNames.length; // Cycle to the next index

  currentCategory = categoryNames[nextIndex]; 
  loadWords(); 

  // Update the active category button in the sidebar
  categoryButtons.forEach(btn => {
    btn.classList.toggle('active-category', btn.dataset.category === currentCategory)  
  }); 
});


previousCategoryButton.addEventListener('click', () => {
  const categoryNames = Object.keys(wordData); // Get an array of category names
  const currentIndex = categoryNames.indexOf(currentCategory);
  const previousIndex = (currentIndex - 1 + categoryNames.length) % categoryNames.length; // Cycle to the previous index

  currentCategory = categoryNames[previousIndex]; 
  loadWords();

  // Update the active category button in the sidebar
  categoryButtons.forEach(btn => {
    btn.classList.toggle('active-category', btn.dataset.category === currentCategory)  
  }); 
});


// Initialize
loadWords(); 
