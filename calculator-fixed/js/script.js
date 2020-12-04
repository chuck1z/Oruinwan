const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else 
    {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
  } 
  else if (operator) {
    const currentValue = firstOperand || 0;
    const ans = Calculate[operator](currentValue, inputValue);

    calculator.displayValue = String(ans);
    calculator.firstOperand = ans;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

const Calculate = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  '^': (firstOperand, secondOperand) => Math.pow(firstOperand, secondOperand),
  'mod': (firstOperand, secondOperand) => firstOperand % secondOperand,
  '=': (firstOperand, secondOperand) => secondOperand
};

function clear() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  updateDisplay()
}

function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

function SQRT(){
  var result = Math.sqrt(calculator.displayValue);
  calculator.displayValue = result;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    handleOperator(target.value);
		updateDisplay();
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
		updateDisplay();
    return;
  }

  if(target.classList.contains('all-clear')){
    clear();
    updateDisplay();
    return;
  }

  if(target.classList.contains('sqrt')){
    SQRT();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
}
);