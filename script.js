var parts = ["abdomen","thorax","head","left","right","nose","lose"];
var nextPartId = 0;
var answer = getAnswer();
var letterArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var answerLetters = Array.from(answer);
var guessedLetters = makeBlanks();
var gameOver = false;
setup();

function getAnswer(){
  let answers = ["upbeat" , "unnatural" , "nervous" , "deep" , "insidious" , "sincere" , "vengeful" , "outgoing" , "fretful" , "wary" , "zany" , "frightening" , "inconclusive" , "sloppy" , "sneaky" , "penitent" , "rough" , "nifty" , "quirky" , "awake"]; 
  let aLength = answers.length;
  let which = Math.floor(Math.random() *aLength);
  console.log(answers[which])
  return answers[which];
}

function makeBlanks(answer){
  let blanks = answerLetters.length;
  let underScores = [];
  for (let index = 0; index < blanks; index++) {
    underScores.push("_");
  }
  return underScores;
}


function setup(){
  let guesses = document.getElementById("guesses");
  guesses.style.border="none";
  let guessButton = document.createElement("button");
  guessButton.setAttribute("id", "guessButton");
  guessButton.addEventListener("click", simpleGuess);
  guessButton.innerHTML = "Guess";
  guesses.appendChild(guessButton);
  guessButton.style.display = "none";
  let feedback = document.createElement("p");
  feedback.setAttribute("id","feedback");
  feedback.innerHTML = "Input guess here.";
  guesses.appendChild(feedback);
  let snowman = document.getElementById("snowman");
  snowman.style.backgroundImage = "url('images/snow.jpg')";
  snowman.style.backgroundRepeat = "no-repeat";
  snowman.style.backgroundSize = "cover";
  snowman.style.backgroundColor = "#c6d1b3";
  let entryBox = document.createElement("input");
  entryBox.setAttribute("id","entryBox");
  guesses.appendChild(entryBox);
  entryBox.addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		document.getElementById("guessButton").click();
	}
  });
}


function simpleGuess(){
      let guesses = document.getElementById("guesses");
      let letters = document.getElementById("feedback");
      let entryBox = document.getElementById("entryBox");
	  let letter = entryBox.value;
	  entryBox.value = "";
      let message = "";
      if (checkLetter(letter) == true) {
        if (guessedLetters.join() == answerLetters.join()) {
          message = "You win! The answer was " + answer;
        }
        else {
          message = "Good guess! Your letters are now: <br>"+ guessedLetters;
        }
      }
      else {
        if (nextPartId == parts.length){
          message = "You lose! The answer was "+answer;
        }
        else {
          message = "Bad guess! Your letters are still: <br>"+ guessedLetters;
          badGuess();
        }
      }
      feedback.innerHTML = message;
    }		


function checkLetter(letter){
  let goodLetter = false;
  for(let index = 0;index < answerLetters.length;index++){
    if (answerLetters[index] == letter){
      goodLetter = true;
      guessedLetters[index] = letter;
    }
  }
  return goodLetter;
}

function playSnowman(){
  setup();
  let letter = "";
  while (gameOver == false){
    letter = prompt("Guess a letter");
    if (checkLetter(letter) == true){
      alert(guessedLetters);
    }
    else {
    alert("Bad guess! "+guessedLetters);
    badGuess();
    if (nextPartId == parts.length){
      alert("You lose! The answer was "+answer);
      gameOver = true;
    }
  }
  }		
}

function badGuess(){
	checkBackground();
  if (nextPartId < parts.length) {
    let nextPart = parts[nextPartId];
    let next = document.getElementById(nextPart);
    next.style.display="block";
    nextPartId++;
  }
}

function checkBackground() {
	let snowman = document.getElementById("snowman");
	if (nextPartId == 4) {
		snowman.classList.add("yellowshift");
	}
	else if (nextPartId == 5) {
		snowman.classList.add("redshift");
	}
}