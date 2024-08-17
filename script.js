const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".button-container .item");

//function handle each of the operator mathematical equation
const add = (firstOperand, secondOperand) => firstOperand + secondOperand;
const subtract = (firstOperand, secondOperand) => firstOperand - secondOperand;
const multiply = (firstOperand, secondOperand) => firstOperand * secondOperand;
const divide = (firstOperand, secondOperand) => firstOperand / secondOperand;
const modulo = (firstOperand, secondOperand) => firstOperand % secondOperand;

//calculation function
function calculation(operator, firstOperand, secondOperand){
  switch(operator){
    case "+":
      return add(firstOperand,secondOperand);
    case "-":
      return subtract(firstOperand,secondOperand);
    case "*":
      return multiply(firstOperand,secondOperand);
    case "/":
      return divide(firstOperand, secondOperand);
    case "%":
      return modulo(firstOperand,secondOperand);
    default:
      display.textContent = "ERROR"
  }
 // return subtract(firstOperand,secondOperand);
}

//check if the button includes digit or operator
const isOperand = (value) => "1234567890".includes(value);
const isOperator = (value) => "+-*/%".includes(value);

//a flag to track if an operator has been clicked
let isOperatorClicked = false;

let firstOperand = undefined;
let secondOperand = undefined;
let operator = undefined;

let userInput = [];
console.log(userInput)

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    
    let myBtn = event.target.value;

    //handle the operand clicks
    if(isOperand(myBtn)){
      if(isOperatorClicked){
        display.textContent = "";
        isOperatorClicked = false;
      }
        display.textContent += myBtn
    }

    //handle the operator clicks
    if(isOperator(myBtn)){
      if(userInput.length < 2){
        isOperatorClicked = true
        userInput.push(display.textContent)
        userInput.push(myBtn)
      }else{
        isOperatorClicked = true;
        let result = calculation(userInput[1], userInput[0], display.textContent);
        display.textContent = result;

        userInput[0] = result;
        console.log(userInput[0]);
        userInput[1] = myBtn;
        console.log(userInput[1]);
        
      }
    }
   
    //handle the = button click
    if(myBtn === "=" && userInput.length === 2){
      operator = userInput[1];
      firstOperand = userInput[0];
      secondOperand = display.textContent;
      display.textContent = (calculation(operator, Number(firstOperand), Number(secondOperand)));
      isOperatorClicked = true;
      userInput = [];
    }
    if(myBtn === "." && display.textContent != "" && !display.textContent.includes(".")){
      display.textContent += "."
    }

    //delete only the last char from the display
    if(myBtn === "del"){
      let remainString = display.textContent.split("");
      remainString.pop();
      let newString = remainString.join("")
      display.textContent = newString;
    }

    //clear the display by clicking the AC button
    if(myBtn === "clear"){
      display.textContent = "";
      userInput = []
    }

    //if the textContent length greater than 9 the button wont generate digit anymore
    if(display.textContent.length > 9){
      display.textContent = display.textContent.substring(0, 9)
      console.log(display.textContent)
    }

    console.log(display.textContent.length)
  });
});




