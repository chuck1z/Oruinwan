const calculator = { //base state
  display: '',
  firstOperand: null,
  nextOperand: false,
  operator: null,
};

function Num(num) { //function to input number
  const { display, nextOperand } = calculator;

  if (nextOperand === true) { 
    calculator.display = num;
    calculator.nextOperand = false;
  } else 
    {
    calculator.display = display === '' ? num : display + num;
  }
}

function Decimal(dot) { //function to input dot
  if (!calculator.display.includes(dot)) { //prevents to input more than 1 dot
    calculator.display += dot;
  }
}

//function to handle operator
function operatorHandler(nextOperator){ 
  const {firstOperand, display, operator} = calculator
  const inputValue = parseFloat(display);

  if (operator && calculator.nextOperand){
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null){
    calculator.firstOperand = inputValue;
  } 
  else if (operator){
    const currentValue = firstOperand || 0;
    const ans = Calculate[operator](currentValue, inputValue);

    calculator.display = String(ans);
    calculator.firstOperand = ans;
  }

  calculator.nextOperand = true;
  calculator.operator = nextOperator;
}

const Calculate = { //base calculation
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  '^': (firstOperand, secondOperand) => Math.pow(firstOperand, secondOperand),
  'mod': (firstOperand, secondOperand) => firstOperand % secondOperand,
  '=': (firstOperand, secondOperand) => secondOperand
};

function clear(){ //display clear, resets back to base state
  calculator.display = '';
  calculator.firstOperand = null;
  calculator.nextOperand = false;
  calculator.operator = null;
  update()
}

function update(){ //display update
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.display;
}

function SQRT(){ //function for square root operation, since it's not possible to do it with basic calculation
  var result = Math.sqrt(calculator.display);
  calculator.display = result;
}

//event listener
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {

  const {target} = event;

  if (!target.matches('button')){
    return;
  }

  if (target.classList.contains('operator')){
    operatorHandler(target.value);
		update();
    return;
  }

  if (target.classList.contains('decimal')){
    Decimal(target.value);
		update();
    return;
  }

  if(target.classList.contains('all-clear')){
    clear();
    return;
  }

  if(target.classList.contains('sqrt')){
    SQRT();
    update();
    return;
  }

  Num(target.value);
  update();
}
);