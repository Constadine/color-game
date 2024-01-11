let numSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll(".square")
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode")
let hardcoreMode = false; // Variable to track whether Hardcore mode is active

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
                        break;
                    case "Hard":
                        numSquares = 6;
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

function enableHardcoreMode() {
     // Add code specific to Hardcore mode here
 }

function setUpSquares() {
     for (let i = 0; i < squares.length; i++) {
          squares[i].addEventListener("click", function () {
               let clickedColor = this.style.backgroundColor;

               if (clickedColor === pickedColor) {
                    messageDisplay.textContent = "Correct!";
                    resetButton.textContent = "Play Again?";
                    changeColors(clickedColor);
                    h1.style.backgroundColor = clickedColor;
               } else {
                    if (hardcoreMode) {
                         // Player loses immediately in Hardcore mode
                         messageDisplay.textContent = "You Lost! Correct Answer is Revealed.";
                         resetButton.textContent = "Play Again?";
                         changeColors(pickedColor);
                         revealAnswer();
                         reset();
                    } else {
                         // Player gets another chance in non-Hardcore mode
                         this.style.backgroundColor = "#232323";
                         messageDisplay.textContent = "Try Again";
                    }
               }
          });
     }
}
   

 function enableHardcoreMode() {
     hardcoreMode = true;
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
}

// easyBtn.addEventListener("click", function(){
//      hardBtn.classList.remove("selected");
//      easyBtn.classList.add("selected");
//      // δεν βαζω let, δεν δουλεύει σωστά
//      numSquares = 3;
//      colors = generateRandomColors(numSquares);
//      pickedColor = pickColor();
//      colorDisplay.textContent = pickedColor;
//      for(let i = 0; i < squares.length; i++) {
//           if(colors[i]){
//                squares[i].style.backgroundColor = colors[i];
//           } else { 
//                squares[i].style.display = "none"
//           }
//      }

// })

// hardBtn.addEventListener("click", function(){
//      hardBtn.classList.add("selected");
//      easyBtn.classList.remove("selected");
//      numSquares = 6;
//      colors = generateRandomColors(numSquares);
//      pickedColor = pickColor();
//      colorDisplay.textContent = pickedColor;
//      for(let i = 0; i < squares.length; i++) {
//                squares[i].style.backgroundColor = colors[i];
//                squares[i].style.display = "block"
//           }
// })


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