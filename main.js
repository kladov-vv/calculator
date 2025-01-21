const display = document.querySelector('.display');
const keyboard = document.querySelector('.keyboard');
let currentNum = '';
let firstNum = '';
let secondNum = '';
let operator = '';

keyboard.addEventListener('click', keyboardInput);

function keyboardInput(event) {
    console.log(target.id);
    switch (target.parentElement.className) {
        case 'numbers':
            if (operator === '') {
                firstNum = populateDisplay(target.textContent);
            } else {
                secondNum = populateDisplay(target.textContent);
            }
            break;
        case 'operators':
            if (secondNum === '') {
                operator = target.id;
                currentNum = '';
            } else {
                currentNum = '';
                firstNum = populateDisplay( operate(firstNum, secondNum, operator) );
                secondNum = ''
                operator = target.id;
                currentNum = '';
            }
            break;
        case 'equal':
            currentNum = '';
            firstNum = populateDisplay( operate(firstNum, secondNum, operator) );
            secondNum = ''
            operator = '';
            currentNum = '';
            break;
        case 'actions':
            switch (target.id) {
                case 'clear':
                    clear();
                    break;
                case 'backspace':
                    backspace();
                    break; 
            }
            break;      
        }
}

// ACTIONS
function backspace() {
    currentNum = currentNum.slice(0, currentNum.length - 1);
    if (currentNum.length < 1) {
        display.textContent = 0;
    } else {
        display.textContent = currentNum;
    }
}

function clear() {
    display.textContent = 0;
    currentNum = '';
    firstNum = '';
    secondNum = '';
    operator = '';
}

// DISPLAY BEHAVIOR
function populateDisplay(num) {
    currentNum += num;
    display.textContent = currentNum;
    return currentNum;
}

// MATH FUNCTIONS
function operate(a, b, operator) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case 'obelus':
            return divide(a, b);
        case 'times':
            return multiply(a, b);
        case 'minus':
            return subtract(a, b);
        case 'plus':
            return add(a, b);
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