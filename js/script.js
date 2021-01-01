//// DOM Elements
let hourEl = document.querySelector(".hour");
let minuteEl = document.querySelector(".minute");
// add digital clock
const updateTime = () => {
    var date = new Date();
    var currentHour = date.getHours();
    var currentMinute = date.getMinutes();

    if (currentHour > 12) {
        currentHour -= 12; // 12 hour time
    }
    if (currentHour === 0) {
        currentHour = 12;
    }
    hourEl.textContent = currentHour.toString();
    minuteEl.textContent = currentMinute.toString().padStart(2, '0');
}
setInterval(updateTime, 1000); /* setting timer */
updateTime();
// DOM Elements
let displayValue = document.querySelector(".value");
let acEl = document.querySelector(".ac");
let plusMinus = document.querySelector(".pm");
let percent = document.querySelector(".percent");
let divisor = document.querySelector(".division");

let seven = document.querySelector(".number-7");
let eight = document.querySelector(".number-8");
let nine = document.querySelector(".number-9");
let multiply = document.querySelector(".multiplication");
let four = document.querySelector(".number-4");
let five = document.querySelector(".number-5");
let six = document.querySelector(".number-6");
let subtract = document.querySelector(".subtraction");
let one = document.querySelector(".number-1");
let two = document.querySelector(".number-2");
let three = document.querySelector(".number-3");
let addEl = document.querySelector(".addition");
let zero = document.querySelector(".number-0");
let decimal = document.querySelector(".decimal");
let equal = document.querySelector(".equal");

// collect them in array
let numberArray = [zero, one, two, three, four, five, six, seven, eight, nine];

// variables
let valueStrInMemory = null;
let operatorInMemory = null;

// functions
function getValueAsStr() {
    var currentValueStr = displayValue.textContent;
    return currentValueStr.split(',').join('');
}

function getValueAsNum() {
    return parseFloat(getValueAsStr());
}

function setStrAsValue(str) {
    if (str[str.length - 1] === '.') {
        displayValue.textContent += '.';
        return;
    }
    var [wholeNumStr, decimalStr] = str.split('.');
    if (decimalStr) {
        displayValue.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    } else {
        displayValue.textContent = parseFloat(str).toLocaleString();
    }
}

var numberClick = (numStr) => {
    var currentValueStr = getValueAsStr();
    if (currentValueStr === '0') {
        setStrAsValue(numStr);
    } else {
        setStrAsValue(currentValueStr + numStr);
    }
}

// event listeners for numbers and decimal 
for (let i = 0; i < numberArray.length; i++) {
    var numberEl = numberArray[i];
    numberEl.addEventListener('click', () => {
        numberClick(i.toString());
    });
}
decimal.addEventListener('click', function() {
    var valueStr = getValueAsStr();
    if (!valueStr.includes('.')) {
        setStrAsValue(valueStr + '.');
    }
});

// event listeners for functions
acEl.addEventListener('click', () => {
    setStrAsValue('0');
    valueStrInMemory = null;
    operatorInMemory = null;
});
plusMinus.addEventListener('click', () => {
    let currentNum = getValueAsNum();
    let currentStr = getValueAsStr();
    if (currentStr === '-0') {
        setStrAsValue('0');
        return;
    } else if (currentNum >= 0) {
        setStrAsValue('-' + currentStr);
    } else {
        setStrAsValue(currentStr.substring(1));
    }
});
percent.addEventListener('click', () => {
    let currentValueNum = getValueAsNum();
    let newValueNum = currentValueNum / 100;
    setStrAsValue(newValueNum.toString());
    valueStrInMemory = null;
    operatorInMemory = null;
});

// Event listeners for operators 
addEl.addEventListener('click', () => {
    operatorClick('addition');
});
subtract.addEventListener('click', () => {
    operatorClick('subtraction');
});
multiply.addEventListener('click', () => {
    operatorClick('multiplication');
});
divisor.addEventListener('click', () => {
    operatorClick('division');
});

equal.addEventListener('click', () => {
    if (valueStrInMemory) {
        setStrAsValue(resultOperationStr());
        valueStrInMemory = null;
        operatorInMemory = null;
    }
});

// Handling operation
var operatorClick = (operation) => {
    let currentValueStr = getValueAsStr();

    if (!valueStrInMemory) {
        valueStrInMemory = currentValueStr;
        operatorInMemory = operation;
        setStrAsValue('0');
        return;
    }
    const valueNumInMemory = parseFloat(valueStrInMemory)
    valueNumInMemory = resultOperationStr();
    operatorInMemory = opration;
    setStrAsValue('0');
};
// function for operation
var resultOperationStr = () => {
    let currentNumValue = getValueAsNum();
    const valueNumInMemory = parseFloat(valueStrInMemory)
    let newNumValue;
    if (operatorInMemory === 'addition') {
        newNumValue = valueNumInMemory + currentNumValue;
    } else if (operatorInMemory === 'subtraction') {
        newNumValue = valueNumInMemory - currentNumValue;
    } else if (operatorInMemory === 'multiplication') {
        newNumValue = valueNumInMemory * currentNumValue;
    } else if (operatorInMemory === 'division') {
        newNumValue = valueNumInMemory / currentNumValue;
    }
    return newNumValue.toString();
};