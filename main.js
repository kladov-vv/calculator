const display = document.querySelector('.display');
const keyboard = document.querySelector('.keyboard');
const operations = document.querySelector('.operations').querySelectorAll('button');
const maxLength = 9;
let curNum = '';
let firstNum = '';
let secondNum = '';
let operator = '';

keyboard.addEventListener('click', keyboardInput);

function keyboardInput(event) {
    let target = event.target;

    if (target.nodeName === 'BUTTON') {
        for (let i = 0; i < operations.length; i++) {
            operations[i].style.backgroundColor = '';
        }
    }

    switch (target.parentElement.className) {
        case 'numbers':
            if ((firstNum != '' && operator === '') // after calculation
                || Number(firstNum) === NaN) firstNum = ''; // after error
            populateDisplay(target.textContent);
            break;
        case 'operations':
            target.style.backgroundColor = '#e3e3e3';
            assignNum();
            calculate();
            operator = target.id;
            console.log(`operator: ${operator}`);
            break;
        case 'equal':
            if (firstNum != '' && operator != '' && curNum != '') {
                assignNum();
                calculate();  
                operator = '';
            }
            break;
        case 'actions':
            switch (target.id) {
                case 'clear':
                    clear();
                    break;
                case 'backspace':
                    backspace();
                    break; 
                case 'plus-minus':
                    changeOfSign();
                    break;
            }
            break;      
        }
}

// CALCULATOR BEHAVIOR
function populateDisplay(num) {
    if (curNum.length >= maxLength) return;
    if (num === '0' && curNum === '0') return;
    if (num === '.') {
        if (curNum.includes('.')) return;
        if (curNum === '') num = '0.';
    }
    curNum += num;
    display.textContent = curNum;
}

function assignNum() {
    if (firstNum === '') {
        firstNum = (curNum === '') ? '0' : curNum;
        console.log(`firstNum: ${firstNum}`);
    } else if (firstNum != '' && curNum != '') {
        secondNum = curNum;
        console.log(`secondNum: ${secondNum}`);
    }
    curNum = '';
}

function calculate() {
    if (firstNum != '' && secondNum != '' && operator != '') {
        firstNum = roundNum(operate(firstNum, secondNum, operator));
        secondNum = '';
        display.textContent = firstNum;
        console.log(`result (firstNum): ${firstNum}`);
    }
}

// ACTIONS
function clear() {
    curNum = '';
    firstNum = '';
    secondNum = '';
    operator = '';
    display.textContent = '0'; 
}

function backspace() {
    if (curNum.length > 1) {
        curNum = curNum.slice(0, curNum.length - 1);
        display.textContent = curNum;
    } else {
        curNum = '';
        display.textContent = '0';
    }
}

function changeOfSign() {
    if (curNum != '0' && curNum != '') {
        if (curNum.includes('-')) {
            curNum = curNum.slice(1);
        } else {
            curNum = '-' + curNum; 
        }
        display.textContent = curNum;
    }
}

// MATH
function operate(a, b, operator) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case 'divide':
            return (b === 0) ? 'Nooo!': a / b;
        case 'multiply':
            return a * b;
        case 'subtract':
            return a - b;
        case 'add':
            return a + b;
    }
}

function roundNum(num) {
    if (num.toString().length > maxLength) {
        if ((num > 1 || num < -1) 
            && !Number.isInteger(num) 
            && num.toString().split('.')[0].length < (maxLength + 1)) 
        {
            for (let i = num.toString().split('.')[1].length;
                num.toString().length > maxLength; 
                i--)
            {
                num = Math.round((num + Number.EPSILON) * (10**i)) / (10**i);
            }
        } else {
            for (i = 5; num.toString().length > maxLength; i--) {
                num = Number.parseFloat(num).toExponential(i);
            }
        }
    }
    return num;
}