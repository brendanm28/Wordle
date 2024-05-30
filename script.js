/* OS WORDLE by Jaydon, Brendan, Dylan, Philip and Brandon, Spring 2024 */
// NOTE: To test a function, FIRST call main() to register all functions, then call the function itself. 
var goodGuesses = 0;
var guessed = false;
var answer = "test1"
var guessLetters = ["s", "h", "e", "a", "f"];
var answerLetters = ["s", "h", "e", "a", "f"];
var guessedSpots = [];
var turn = 1;
main();

/* MAIN: Contains all code to avoid global variables. */
function main(){
  setupBoard();
  getAnswerWord();
  fillGuess(turn) //fillGuess on line 170 has a parameter of "row" not "turn"

  /* SET UP BOARD: create the grid, with all row inputs disabled except the top row. 
   * @param: none;
   * @return: none;
   */
  function setupBoard(){
    let board = document.getElementById("board");
    for (let row = 1; row <7; row++){
      let letterRow = document.createElement("div");
      letterRow.classList.add("row");
      letterRow.id = "turn-"+row;
      for (let column = 0; column <5; column++){
        let box = document.createElement("div");
        let letter = document.createElement("input");
        box.classList.add("letter-box");
        letter.classList.add("letter-input");
        if (row > 1){
          letter.disabled = true;
        }
        box.appendChild(letter);
        letterRow.appendChild(box);
      }
      board.appendChild(letterRow);
    }
    turnButton(turn);
  }

  /* TURN BUTTON: turnButton() adds buttons for taking a turn.  This is temporary; what SHOULD work
   * is that after entering the last letter and pressing enter ("lose focus") the getGuess function should run. 
   * By Brandon
   * @param: none;
   * @return: none;
   */
  function turnButton(row){
    let addButton = document.getElementById("turn-"+row);
    let newButton = document.createElement("button");
    newButton.innerHTML = "Enter";
    addButton.appendChild(newButton);    
    newButton.addEventListener("click", getGuess);
    addButton.appendChild(newButton);
  }

  /* FILL GUESS: This is for testing purposes.  It fills the target row with the current guess letters. 
   * By Philip
   * @param: none;
   * @return: none;
   */
  function fillGuess(row) {
    let fillWord = document.getElementById("turn-" + row);
    let i = 0;
    for (const child of fillWord.children) {
      child.firstChild.value = guessLetters[i];
      i++;
    }
  }

  /* GET ANSWER WORD: getAnswerWord() gets the word you're trying to guess.
   * Jaydon
   * @param: none;
   * @return: none;
   */
  function getAnswerWord() {
    let words = ["alone", "bagel", "dream", "globe", "novel", "relax", "rider", "stare", "shape", "touch"];
    pickOne = Math.floor(Math.random() * words.length);
    answer = words[pickOne];
    answerLetters = answer.split("");
    answerLetters = ["s", "h", "e", "a", "f"]; // testing only against "fecal"
    console.log(answerLetters);
  } // end getAnswerWord

  /* GET GUESS: getGuess() gets the whatever the user guesses.
   * Brendan: Trigger on button, then on enter from last row
   * @param: none;
   * @return: none;
   */
  function getGuess(){
    let turnRow = document.getElementById("turn-"+turn); // variable for that row. 
    let i = 0;
    let tempGuess = [];
    for (const child of turnRow.children) { // collects the divs
      guessLetters[i] = child.firstChild.value;
      i++;
    }
    console.log("Turn "+ turn + " guess = "+ guessLetters.toString());
    processGuess();
  } // end getGuess

  /* PROCESS GUESS: processGuess() checks if the guess is correct.
   * Dylan
   * @param: none;
   * @return: none;
   */
  function processGuess() {
    console.log("turn = " + turn);
    checkRightSpot();
    if (compareArrays() == false){
      checkInWord();  
    }
    turn++;
    turnButton(turn);
  }

  /* CHECK RIGHT SPOT: checkRightSpot() checks if guessed letters are in 
   * the correct spot in the answer.
   * By Philip
   * @param : none;
   * @return: none;
   */
  function checkRightSpot() {
    for (let letter = 0; letter < 5; letter++) {
      if (guessLetters[letter] == answerLetters[letter]) {
        goodGuesses++;
        console.log("Letter ["+(letter+1) +"] is in the right spot.");
        guessedSpots.push(letter); 
        markRightSpot(letter);
      }
    }
  } // end checkRightSpot
    
  /* MARK RIGHT SPOT: markRightSpot() marks the letter that is in the correct spot.
   * By Jaydon
   * @param: letter;
   * @return: none;
   */
    function markRightSpot(letter) {
      // console.log("Marking In Spot "+ letter)
      letter++; // needed because classes and arrays are counted differently
      let turnID = "#turn-"+turn;
      let selectorString = turnID + " div:nth-child(" + letter + ")";
      var target = document.querySelector(selectorString);
      target.classList.add("spot");
    } 


  /* COMPARE ARRAYS: compareArrays() checks whether the guessLetters and answerLetters are a perfect match. 
   * Who made this one?  Philip?
   * @param: none;
   * @return: none;
   */
  function compareArrays() {
    let arr1 = guessLetters;
    let arr2 = answerLetters;
     if (arr1.length !== arr2.length) {
        return false;
     } 
     else {
        for (let i = 0; i < arr1.length; i++){
           if (arr1[i] !== arr2[i]){
              return false;
           } 
           else continue;
        }
     }
     return true;
  }

  /* CHECK IN WORD: checkInWord() checks remaining guessed letters against the 
    * answer to see if it is in the answer, but not in the right place. 
    * By Brandon
    * @param: none;
    * @return: none;
    */
  function checkInWord(){
    let turnID = "#turn-"+turn;
    let turnRow = document.getElementById(turnID); 
    let selectorString = null;
    let target = null;
    for(let letter=0; letter < 5; letter++){
      selectorString = turnID + " div:nth-child(" + (letter+1) + ")";
      console.log("Selector string = "+ selectorString);
      target = document.querySelector(selectorString);
      console.log("Testing letter "+ letter);
      if (!guessedSpots.includes(letter)) {
        for (let letterTry = 0; letterTry < 5; letterTry ++){
          console.log("Testing against letter "+ letterTry);
          if (target.classList.contains("spot")) {
            console.log(guess[letter] + "is in right spot");
          } 
          else {
            if (guessLetters[letter] == answerLetters[letterTry]) {
              console.log("Letter ["+ letter +"] is in the word.");
              markInWord(letter+1);
              console.log("Sending " + letter + " to markInWord");
            }
          }
        }
      }
    }
    console.log("Feedback Completed");
  } 

  /* MARK IN WORD: markInWord() marks the letter in the row with the "in word" class.
   * By Jaydon
   * @param: letter;
   * @return: none;
   */
    function markInWord(letter) {
      // console.log("Marking In Word "+ letter)
      // letter++; // needed because classes and arrays are counted differently
      let turnID = "#turn-"+turn;
      let selectorString = turnID + " div:nth-child(" + letter + ")";
      var target = document.querySelector(selectorString);
      target.classList.add("word");
    } 
} // end main