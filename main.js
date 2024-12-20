let firstNumber;
let secondNumber;
let operator;
const display = document.querySelector('.display');
const keyboard = document.querySelector('.keyboard');

keyboard.addEventListener('click', keyboardInput);

function keyboardInput(event) {
    let target = event.target;
    console.log(target);
}

function operate(firstNumber, secondNumber, operator){
    switch (operator) {
        case 'add':
            return add(firstNumber, secondNumber);
        case 'subtract':
            return subtract(firstNumber, secondNumber);
        case 'multiply':
            return multiply(firstNumber, secondNumber);
        case 'divide':
            return divide(firstNumber, secondNumber);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}