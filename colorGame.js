let numSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll(".square")
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode")


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
               this.classList.add("selected");
               // αντί για if και βλακείες.
               this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
               reset();
          })
     }   
}

function setUpSquares(){
     for(let i = 0; i < squares.length; i++) {
          //add click listeners to squares
          squares[i].addEventListener("click", function(){
               //grab color of clicked square
               let clickedColor = this.style.backgroundColor;
               //compare color to pickedcolor
               if( clickedColor === pickedColor){
                    messageDisplay.textContent = "Correct!"
                    resetButton.textContent = "Play Again?"
                    changeColors(clickedColor);
                    h1.style.backgroundColor = clickedColor;
               } else {
                    this.style.backgroundColor = "#232323";
                    messageDisplay.textContent = "Try Again"
               }
          });
     }
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