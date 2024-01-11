let numSquares = 3;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll(".square")
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode")
let bestStreakDisplay = document.getElementById("bestStreakCount");
let hardcoreMode = false; // Variable to track whether Hardcore mode is active
let streakCount = 0;
let bestStreak = 0;
let streakDisplay = document.getElementById("streakCount");
let gameWon = false; // Add this variable to track whether the game is won

init();

function init(){
     //mode buttons event listeners
     setUpModeButtons();
     setUpSquares();
     reset();
}

function setUpModeButtons(){
     for( let i = 0; i < modeButtons.length; i++){
          modeButtons[i].addEventListener("click", function(){
               modeButtons[0].classList.remove("selected");
               modeButtons[1].classList.remove("selected");
               modeButtons[2].classList.remove("selected");
               modeButtons[3].classList.remove("selected");
               this.classList.add("selected");
               // αντί για if και βλακείες.
               switch (this.textContent) {
                    case "Easy":
                        numSquares = 3;
                        if (hardcoreMode) {
                         disableHardcoreMode()
                        }
                        break;
                        
                    case "Hard":
                        numSquares = 6;
                        if (hardcoreMode) {
                         disableHardcoreMode()
                        }
                        break;
                    case "Hardcore":
                        numSquares = 6; // You can adjust the number of squares for Hardcore mode
                        enableHardcoreMode();
                        break;
                    case "Hell":
                         numSquares = 9; // You can adjust the number of squares for Hardcore mode
                         enableHardcoreMode();
                         break;
               }
               reset();
          })
     }   
}

function setUpSquares() {
     for (let i = 0; i < squares.length; i++) {
         squares[i].addEventListener("click", squareClickHandler);
     }
 }

 function squareClickHandler() {
     if (!gameWon) {     

          let clickedColor = this.style.backgroundColor;

          if (clickedColor === pickedColor) {
               changeColors(clickedColor);

               resetButton.textContent = "Play Again?";
               h1.style.backgroundColor = clickedColor;

               // Increase streak count and update display
               streakCount++;
               messageDisplay.textContent = "Correct!"
               streakDisplay.textContent = streakCount;
               if (streakCount > bestStreak) {
                    bestStreak = streakCount;
                    bestStreakDisplay.textContent = bestStreak;
                }
    
               disableSquareClicks();

          } else {
               if (hardcoreMode) {
                    // Player loses immediately in Hardcore mode
                    messageDisplay.textContent = "You Lost! Correct Answer was:";
                    resetStreak();
                    resetButton.textContent = "Play Again?";
                    changeColors(pickedColor);
                    disableSquareClicks()
               } else {
                    // Player gets another chance in non-Hardcore mode
                    this.style.backgroundColor = "#232323";
                    messageDisplay.textContent = "Try Again";
                    resetStreak();
               }
          }
     }
}
 

function enableHardcoreMode() {
     hardcoreMode = true;
}

function disableHardcoreMode() {
     hardcoreMode = false;
}

function reset(){
     //generate all new colors
     colors = generateRandomColors(numSquares);
     //pick a new random color from array
     pickedColor = pickColor();
     //change colorDisplay to match pickedColor
     colorDisplay.textContent = pickedColor;
     //change colors of squares
     resetButton.textContent = "New Colors"
     messageDisplay.textContent = "";
     for(let i = 0; i < squares.length; i++) {
          if(colors[i]){
               squares[i].style.display = "block"
               squares[i].style.backgroundColor = colors[i];
          } else {
               squares[i].style.display = "none"
          }
     }
     h1.style.backgroundColor = "steelblue";
     for (let i = 0; i < squares.length; i++) {
          squares[i].addEventListener("click", squareClickHandler);
      }

     gameWon = false; 
}

resetButton.addEventListener("click", function(){
     reset()
})


function changeColors(color){
     //loop through all squares
     for(let i = 0; i < squares.length; i++){
     //change each color to match given color
     squares[i].style.backgroundColor = color;
     }
}

function pickColor(){
     // 
     let random = Math.floor(Math.random() * colors.length)
     return colors[random];
}

function generateRandomColors(num) {
     //make an array
     let arr = []
     //repeat num times
     for ( i = 0; i < num; i++) {
          //get random color and push into array
          arr.push(randomColor())
     }
     //return that array
     return arr;
}

function randomColor(){
     //pick a "red" from 0 -255
     let r = Math.floor(Math.random() * 256)
     //pick a "green" from 0 -255
     let g = Math.floor(Math.random() * 256)
     //pick a "blue" from 0 -255
     let b = Math.floor(Math.random() * 256)
     return `rgb(${r}, ${g}, ${b})`;

}

function resetStreak() {
     streakCount = 0;
     streakDisplay.textContent = streakCount;
 }
 
 function disableSquareClicks() {
     for (let i = 0; i < squares.length; i++) {
         squares[i].removeEventListener("click", squareClickHandler); // Remove the click event listener
     }
     gameWon = true;

 }
 