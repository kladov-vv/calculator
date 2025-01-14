let firstNumber = '';
let secondNumber = '';
let operator = '';
let currentNumber = '';
const display = document.querySelector('.display');
const keyboard = document.querySelector('.keyboard');

keyboard.addEventListener('click', keyboardInput);

function keyboardInput(event) {
    let target = event.target;
    switch (target.parentElement.className) {
        case 'numbers':
            console.log('number');
            populateDisplay(target.textContent);
            break;
        case 'operators':
            console.log('operator');
            if (firstNumber === '' && secondNumber === '') {
                operator = target.textContent;
                firstNumber = currentNumber;
                currentNumber = '';
            }
            if (firstNumber != '') {
                secondNumber = currentNumber;
                
                currentNumber = operate(firstNumber, secondNumber, operator);
                display.textContent = currentNumber;

                firstNumber = currentNumber;
                secondNumber = '';
                operator = target.textContent;
                currentNumber = '';
            }
            break;
        case 'equal':
            console.log('equal');
            if (firstNumber != '') {
                secondNumber = currentNumber;
                
                currentNumber = operate(firstNumber, secondNumber, operator);
                display.textContent = currentNumber;

                firstNumber = currentNumber;
                secondNumber = '';
                operator = '';
                currentNumber = '';
            }
            break;
    }
}

function populateDisplay(number) {
    currentNumber += number;
    display.textContent = currentNumber;
}

function operate(firstNumber, secondNumber, operator){
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
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