// Simple Calculator Logic

const expressionEl = document.getElementById('expression');
const resultEl = document.getElementById('result');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let expression = '';
let lastWasEquals = false;

function updateDisplay() {
  expressionEl.textContent = expression;
  resultEl.textContent = currentInput;
}

function appendNumber(num) {
  if (lastWasEquals) {
    currentInput = num;
    expression = '';
    lastWasEquals = false;
  } else if (currentInput === '0') {
    currentInput = num;
  } else {
    currentInput += num;
  }
}

function appendDecimal() {
  if (lastWasEquals) {
    currentInput = '0.';
    expression = '';
    lastWasEquals = false;
    return;
  }
  if (!currentInput.includes('.')) {
    currentInput += '.';
  }
}

function chooseOperator(op) {
  if (expression && !lastWasEquals) {
    calculate();
  }
  lastWasEquals = false;
  expression = currentInput + ' ' + op + ' ';
  currentInput = '0';
}

function calculate() {
  if (!expression) return;

  const parts = expression.trim().split(' ');
  const firstOperand = parseFloat(parts[0]);
  const operator = parts[1];
  const secondOperand = parseFloat(currentInput);

  if (isNaN(firstOperand) || isNaN(secondOperand)) return;

  let result;
  switch (operator) {
    case '+':
      result = firstOperand + secondOperand;
      break;
    case '-':
      result = firstOperand - secondOperand;
      break;
    case '*':
      result = firstOperand * secondOperand;
      break;
    case '/':
      result = secondOperand === 0 ? 'Error' : firstOperand / secondOperand;
      break;
    case '%':
      result = firstOperand % secondOperand;
      break;
    default:
      return;
  }

  expression = expression + currentInput + ' =';
  currentInput = result.toString();
  lastWasEquals = true;
}

function clearAll() {
  currentInput = '0';
  expression = '';
  lastWasEquals = false;
}

function deleteLast() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    switch (action) {
      case 'number':
        appendNumber(value);
        break;
      case 'decimal':
        appendDecimal();
        break;
      case 'operator':
        chooseOperator(value);
        break;
      case 'equals':
        calculate();
        break;
      case 'clear':
        clearAll();
        break;
      case 'delete':
        deleteLast();
        break;
    }

    updateDisplay();
  });
});

updateDisplay();
