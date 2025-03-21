const uiDisplay = document.querySelector('.display');
const uiKeyboard = document.querySelector('.keyboard');
const operations = document.querySelector('.operations').querySelectorAll('button');
const maxOutputLength = 9;
let buttonValue = '';
let buttonClass = '';
let currentNum = '';
let firstNum = '';
let secondNum = '';
let operator = '';

// EVENTS
uiKeyboard.addEventListener('click', uiKeyboardInput);
document.addEventListener('keydown', keyboardInput);

// INPUT
function uiKeyboardInput(event) {
    if (event.target.nodeName != 'BUTTON') return;
    
    if (event.target.parentElement.className === 'numbers') {
        buttonValue = event.target.textContent;
    }
    
    if (event.target.parentElement.className === 'operations' ||
        event.target.parentElement.className === 'actions') 
    {
        buttonValue = event.target.id;
    }

    buttonClass = event.target.parentElement.className;
    calculator();
    buttonValue = '';
    buttonClass = ''; 
}

function keyboardInput(event) {
    if ((event.key >= '0' && event.key <= '9') 
        || event.key === '.' || event.key === ',') 
    {
        buttonValue = event.key;
        buttonClass = 'numbers';
    }
    
    if (['/', '*', '-', '+'].indexOf(event.key) > -1) {
        if (event.key === '/') buttonValue = 'divide';
        if (event.key === '*') buttonValue = 'multiply';
        if (event.key === '-') buttonValue = 'subtract';
        if (event.key === '+') buttonValue = 'add';
        buttonClass = 'operations';
    }  
    
    if (event.key === 'Backspace') {
        buttonValue = 'backspace';
        buttonClass = 'actions';   
    }
    
    if (event.key === 'Enter') {
        buttonClass = 'equal';
    }

    calculator();
    buttonValue = '';
    buttonClass = '';
}

// CALCULATOR BEHAVIOR
function calculator() {
    for (let i = 0; i < operations.length; i++) {
        operations[i].style.backgroundColor = '';
    }
    
    if (buttonClass === 'numbers') {
        if ((firstNum !== '' && operator === '') 
            || firstNum === 'No-o-o!')
        {
            firstNum = ''; // after calculation
        }
        populateDisplay(buttonValue);
    }

    if (buttonClass === 'operations') {
        if (firstNum === 'No-o-o!') return;
        
        document.getElementById(buttonValue).style.backgroundColor = '#e3e3e3';
        assignCurrentNum();
        calculateOutput();
        operator = buttonValue;
    }

    if (buttonClass === 'equal') {
        if (firstNum !== '' && operator !== '' && currentNum !== '') {
            assignCurrentNum();
            calculateOutput();  
            operator = '';
        }
    }

    if (buttonClass === 'actions') {
        if (buttonValue === 'clear') clear();
        
        if (buttonValue === 'backspace') backspace();
        
        if (buttonValue === 'plus-minus') changeSign(); 
    }
}

function populateDisplay(num) {
    if (currentNum.length >= maxOutputLength) return;
    
    if (num === '0' && currentNum === '0') return;
    
    if (num === '.' || num === ',') {
        if (currentNum.includes('.')) return;
        num = (currentNum === '') ? '0,' : '.';
    }

    currentNum += num;
    uiDisplay.textContent = currentNum;
}

function assignCurrentNum() {
    if (firstNum === '') {
        firstNum = (currentNum === '') ? '0' : currentNum;
    } else if (firstNum != '' && currentNum != '') {
        secondNum = currentNum;
    }   
    
    currentNum = '';
}

function calculateOutput() {
    if (firstNum !== '' && secondNum !== '' && operator !== '') {
        firstNum = roundNum(operate(firstNum, secondNum, operator));
        secondNum = '';
        uiDisplay.textContent = firstNum;
    }
}

// ACTIONS
function clear() {
    currentNum = '';
    firstNum = '';
    secondNum = '';
    operator = '';
    uiDisplay.textContent = '0';
}

function backspace() {
    if (currentNum.length > 1) {
        currentNum = currentNum.slice(0, currentNum.length - 1);
        uiDisplay.textContent = currentNum;
    } else {
        currentNum = '';
        uiDisplay.textContent = '0';
    }
}

function changeSign() {
    if (currentNum !== '0' && currentNum !== '') {
        if (currentNum.includes('-')) {
            currentNum = currentNum.slice(1);
        } else {
            currentNum = '-' + currentNum; 
        }
        uiDisplay.textContent = currentNum;
    }
}

// MATH
function operate(a, b, operator) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case 'divide':
            return (b === 0) ? 'No-o-o!': a / b;
        case 'multiply':
            return a * b;
        case 'subtract':
            return a - b;
        case 'add':
            return a + b;
    }
}

function roundNum(num) {
    if (num.toString().length > maxOutputLength) {
        if ((num > 1 || num < -1)
            && !Number.isInteger(num) 
            && num.toString().split('.')[0].length < (maxOutputLength + 1)) 
        {
            for (let i = num.toString().split('.')[1].length;
                num.toString().length > maxOutputLength; 
                i--)
            {
                num = Math.round((num + Number.EPSILON) * (10**i)) / (10**i);
            }
        } else {
            for (i = 5; num.toString().length > maxOutputLength; i--) {
                num = Number.parseFloat(num).toExponential(i);
            }
        }
    }
    return num;
}