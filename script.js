// some variables
let OPERATORS = ["*", "-", "/", "+"];
let POWER = "POWER(";
let FACTORIAL = "FACTORIAL";
let PI = "Math.PI";
let E = "Math.E";
let MATHLOG10 = "Math.log10(";
let MATHLOG = "Math.log(";
let MATHSQRT = "Math.sqrt(";
let MATHCBRT = "Math.cbrt(";
let OPENPARANTHESE = "(";
// advanced function toggler
function advFuncToggler() {
  let hiddenFunc = document.querySelectorAll(".visually-hidden");
  let visFunc = document.querySelectorAll(".visible");
  for (let i = 0; i < hiddenFunc.length; i++) {
    hiddenFunc[i].classList.remove("visually-hidden");
    hiddenFunc[i].classList.add("visible");
    visFunc[i].classList.add("visually-hidden");
    visFunc[i].classList.remove("visible");
  }
}
//degree button toggler
let isDegree = document.querySelector(".deg");

function degToggler() {
  isDegree.addEventListener("click", () => {
    console.log(isDegree.innerHTML);
    if (isDegree.innerHTML == "DEG") {
      isDegree.innerHTML = "RAD";
    } else {
      isDegree.innerHTML = "DEG";
    }
  });
}
degToggler();
// targeting buttons
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let trigoFuncs = document.querySelectorAll(".trigo-function");
let advFuncs = document.querySelectorAll(".adv-function");
let mathFucns = document.querySelectorAll(".math-function");
let keys = document.querySelectorAll(".key");
let output = document.querySelector(".output");
let dataValue = [];
let dataFormula = [];

// update input function
function updateInput(value, formula) {
  dataValue.push(value);
  dataFormula.push(formula);
}
// function to print keys
function print(dataType) {
  for (let i = 0; i < dataType.length; i++) {
    let formula = dataType[i].getAttribute("data-formula");
    dataType[i].addEventListener(
      "click",
      (event) => {
        if (output.value.length <= 18) {

          //checks which type of button it is and making minor changes to input accordingly
          if (dataType[i].classList[2] == "math-function") {
            let symbol;
            if (formula == "FACTORIAL") {
              symbol = "!";
              updateInput(symbol, formula);
              output.value = dataValue.join("");
            } else if (formula == "POWER") {
              symbol = "^(";
              updateInput(symbol, `POWER(`);
              output.value = dataValue.join("");
            } else if (formula == "square") {
              symbol = "^("
              updateInput(symbol, "POWER(");
              updateInput("2)", "2)");
              output.value = dataValue.join("");
            } else if (formula == "cube") {
              symbol = "^(";
              updateInput(symbol, "POWER(");
              updateInput("3)", "3)");
              output.value = dataValue.join("");
            } else if (formula == "tenx") {
              symbol = "^(";
              updateInput("10", "10");
              updateInput(symbol, "POWER(");
              output.value = dataValue.join("");
            } else if (formula == "twox") {
              symbol = "^(";
              updateInput("2", "2");
              updateInput(symbol, "POWER(");
              output.value = dataValue.join("");
            } else if (formula == "onebyx") {
              symbol = "^(";
              updateInput(symbol, "POWER(");
              updateInput("-1)", "-1)");
              output.value = dataValue.join("");
            } else if (formula == "ex") {
              symbol = "^(";
              updateInput("e", "Math.E");
              updateInput(symbol, "POWER(");
              output.value = dataValue.join("");
            } else if (formula == "nroot") {
              symbol = "^(";
              updateInput(symbol, "POWER(");
              updateInput("1", "1");
              updateInput("/", "/");
              output.value = dataValue.join("");
            } else {
              symbol = event.target.value + "(";
              let newFormula = formula + "(";
              updateInput(symbol, newFormula);
              output.value += dataValue[dataValue.length - 1];
            }
          } else if (dataType[i].classList[2] == "trigo-function") {
            let symbol = event.target.value + "(";
            updateInput(symbol, formula);
            output.value += dataValue[dataValue.length - 1];
          } else if (dataType[i].classList[2] == "operator") {      //checking for operators
            if (formula == "-") {                                   //minus cannot be appended if last element is minus
              if (dataFormula[dataFormula.length - 1] == "-") {     //if they are +, /, * it will append
              } else {
                updateInput(event.target.value, formula);
                output.value = dataValue.join("");
              }
            } else {                                                //changing the value of operator if it is +,/,*
              if (dataFormula[dataFormula.length - 1] == "-") {
              } else {
                if (
                  dataFormula[dataFormula.length - 1] == "+" ||
                  dataFormula[dataFormula.length - 1] == "*" ||
                  dataFormula[dataFormula.length - 1] == "/"
                ) {
                  dataFormula.pop();
                  dataValue.pop();
                  updateInput(event.target.value, formula);
                  output.value = dataValue.join("");
                } else {
                  updateInput(event.target.value, formula);
                  output.value += dataValue[dataValue.length - 1];
                }
              }
            }
          } else if (formula == "negate") {
            if (dataFormula[0] != "-") {
              dataValue.unshift("-");
              dataFormula.unshift("-");
              output.value = dataValue.join("");
            } else {
              dataValue.shift();
              dataFormula.shift();
              output.value = dataValue.join("");
            }
          } else {
            updateInput(event.target.value, formula);
            output.value += dataValue[dataValue.length - 1];
          }
          disableDecimal();
        } else {
          alert("Input limit reached");
        }
      }
    );
  }
}
print(operators);
print(numbers);
print(advFuncs);
print(mathFucns);
print(keys);
print(trigoFuncs);

//calculate function
let calculateBtn = document.querySelector(".calculate");
function calculate() {
  calculateBtn.addEventListener("click", () => {
    // checking positions of some consecutive constants and functions and putting * before them 
    const logPositions = correctConstants(MATHLOG10);
    logPositions.forEach((index) => {
      dataFormula[index] = "*Math.log10(";
    });
    const lnPositions = correctConstants(MATHLOG);
    lnPositions.forEach((index) => {
      dataFormula[index] = "*Math.log(";
    });
    const sqrtPositions = correctConstants(MATHSQRT);
    sqrtPositions.forEach((index) => {
      dataFormula[index] = "*Math.sqrt(";
    });
    const cbrtPositions = correctConstants(MATHCBRT);
    cbrtPositions.forEach((index) => {
      dataFormula[index] = "*Math.cbrt(";
    });
    const piPositions = correctConstants(PI);
    piPositions.forEach((index) => {
      dataFormula[index] = "*Math.PI";
    });
    const ePositions = correctConstants(E);
    ePositions.forEach((index) => {
      dataFormula[index] = "*Math.E";
    });
    const paranPositions = correctConstants(OPENPARANTHESE);
    paranPositions.forEach((index) => {
      dataFormula[index] = "*(";
    });
    formulaStr = dataFormula.join("");
    
    // getting power base and correcting it in string
    let power_search_result = search(dataFormula, POWER);
    const BASES = getPowerBase(dataFormula, power_search_result);
    BASES.forEach((base) => {
      let toReplace = base + POWER;
      let replacement = "Math.pow(" + base + ",";
      formulaStr = formulaStr.replace(toReplace, replacement);
    });

    // search for factorial and replacing it correctly
    let factorial_search_result = search(dataFormula, FACTORIAL);
    const NUMBERS = getFactorialNumber(dataFormula, factorial_search_result);
    NUMBERS.forEach((factorial) => {
      formulaStr = formulaStr.replace(
        factorial.toReplace,
        factorial.replacement
      );
    });

    let result;
    // using try and catch for evaluation
    try {
      result = eval(formulaStr);
      if (result % 1 != 0) {
        result = result.toFixed(4);
      }
      if (result >= Number.MAX_SAFE_INTEGER) {
        result = Infinity;
      }
      if (result <= Number.MIN_SAFE_INTEGER) {
        result = -Infinity;
      }
      dataFormula = [];
      dataFormula.push(result);
      dataValue = [];
      dataValue.push(result);
      output.value = dataValue.join("");
    } catch (error) {
      result = "Syntax Error!";
      dataFormula = [];
      dataValue = [];
      output.value = result;
    }
  });
}
calculate();

// search function
function search(array, keyword) {
  let result_array = [];
  // this searches  keyword in array and puts it's index in result_array
  array.forEach((element, index) => {
    if (element == keyword) {
      result_array.push(index);
    }
  });
  //console.log(result_array)
  return result_array;
}

//clear function
let clearAllBtn = document.querySelector(".clear");
function clearAll() {
  clearAllBtn.addEventListener("click", () => {
    dataValue = [];
    output.value = "";
    dataFormula = [];
  });
}
clearAll();

//backspace function
let backSpaceBtn = document.querySelector(".backspace");
function backSpace() {
  backSpaceBtn.addEventListener("click", () => {
    dataValue.pop();
    output.value = dataValue.join("");
    dataFormula.pop();
    disableDecimal();
  });
}
backSpace();

//factorial function
function factorial(num) {
  if (num % 1 != 0) {
    num = Math.round(num);
  }
  if (num === 0 || num === 1) return 1;
  let result = 1;
  for (let i = 1; i <= num; i++) {
    result = result * i;
    if (result === Infinity) return Infinity;
  }
  return result;
}
//radian or degree
function trigo(callback, angle) {
  if (isDegree.innerHTML == "DEG") {
    angle = (angle * Math.PI) / 180;
  }
  return callback(angle);
}

// getting power bases
function getPowerBase(formulas, power_search_result) {
  let powerBases = []; //saves all bases

  power_search_result.forEach((powerIndex) => {
    let base = []; //current base

    let paranthesesCount = 0;

    let previousIndex = powerIndex - 1;

    while (previousIndex >= 0) {
      if (formulas[previousIndex] == "(") paranthesesCount--;
      if (formulas[previousIndex] == ")") paranthesesCount++;

      let isOperator = false;
      OPERATORS.forEach((OPERATOR) => {
        if (formulas[previousIndex] == OPERATOR) isOperator = true;
      });

      let isPower = formulas[previousIndex] == POWER;

      if ((isOperator && paranthesesCount == 0) || isPower) break;
      base.unshift(formulas[previousIndex]);

      previousIndex--;
    }

    powerBases.push(base.join(""));
  });
  console.log(powerBases);
  return powerBases;
}

// getting factorial numbers
function getFactorialNumber(formulas, factorial_search_result) {
  let numbers = []; //save all numbers in same array
  let factorialSequence = 0;

  factorial_search_result.forEach((factorialIndex) => {
    let number = []; //current factorial

    let nextIndex = factorialIndex + 1;
    let nextInput = formulas[nextIndex];

    if (nextInput == FACTORIAL) {
      factorialSequence += 1;
      return;
    }
    // if there was a factorial sequence, we need to get index of the first factorial
    let firstFactorialIndex = factorialIndex - factorialSequence;

    //then to get the number right before it
    let previousIndex = firstFactorialIndex - 1;
    let paranthesesCount = 0
    while (previousIndex >= 0) {
      if (formulas[previousIndex] == "(") paranthesesCount--;
      if (formulas[previousIndex] == ")") paranthesesCount++;

      let isOperator = false;
      OPERATORS.forEach((OPERATOR) => {
        if (formulas[previousIndex] == OPERATOR) isOperator = true;
      });

      if (isOperator && paranthesesCount == 0) break;
      number.unshift(formulas[previousIndex]);

      previousIndex--;
    }

    let numberStr = number.join("");
    const factorial = "factorial(",
      closeParanthese = ")";
    let times = factorialSequence + 1;

    let toReplace = numberStr + FACTORIAL.repeat(times);
    let replacement =
      factorial.repeat(times) + numberStr + closeParanthese.repeat(times);

    numbers.push({
      toReplace: toReplace,
      replacement: replacement,
    });

    // reset factorialSequence
    factorialSequence = 0;
  });
  return numbers;
}

let decimalBtn = document.querySelector(".decimal");
//disable decimal function
function disableDecimal() {
  let value = getValue();

  if (value[value.length - 1] == ")") {
    decimalBtn.disabled = false;
  } else if (value.includes(".")) {
    decimalBtn.disabled = true;
  } else {
    decimalBtn.disabled = false;
  }
}

// getting value from dataFormula after last operator
function getValue() {
  let index = dataFormula.length - 1;
  let value = [];
  while (index >= 0) {
    if (
      dataFormula[index] == OPERATORS[1] ||
      dataFormula[index] == OPERATORS[2] ||
      dataFormula[index] == OPERATORS[0] ||
      dataFormula[index] == OPERATORS[3]
    ) {
      return value;
    } else if (dataFormula[index] == "(") {
      return value;
    } else {
      value.unshift(dataFormula[index]);
    }
    index--;
  }
  return value;
}

// function to put multiply sign before constants and some functions, this function returns indexes of val passed
function correctConstants(val) {
  let search_result = search(dataFormula, val);

  let indexes = [];
  search_result.forEach((index) => {
    if (index == 0) {
    } else {
      let previousIndex = index - 1;
      if (
        dataFormula[previousIndex] == ")" ||
        isFinite(dataFormula[previousIndex]) ||
        dataFormula[previousIndex] == "Math.PI" ||
        dataFormula[previousIndex] == "Math.E"
      ) {
        indexes.push(index);
      }
    }
  });
  console.log(indexes);
  return indexes;
}
// -------------Memory functions and evaluations---------------
let memory = 0;
let memDisplay = document.querySelector(".mem-value");
let memoryBtns = document.querySelectorAll(".mem");
let mcBtn = memoryBtns[0];
let mrBtn = memoryBtns[1];
let mPlusBtn = memoryBtns[2];
let mMinusBtn = memoryBtns[3];
let mSBtn = memoryBtns[4];
function msEval() {
  mSBtn.addEventListener("click", () => {
    let formulaStr = dataFormula.join("");
    let result;
    try {
      result = eval(formulaStr);
      if (result % 1 == 0) {
        memory = result;
      } else {
        memory = result.toFixed(4);
      }
      memDisplay.innerHTML = memory;
      mcBtn.disabled = false;
      mrBtn.disabled = false;
    } catch (error) {
      alert("Invalid expression, cant store in memory");
    }
  });
}
msEval();

function mPlusEval() {
  mPlusBtn.addEventListener("click", () => {
    let formulaStr = dataFormula.join("");
    let result;
    try {
      result = eval(formulaStr);
      if (result % 1 == 0) {
        memory += result;
      } else {
        memory += result.toFixed(4);
      }
      memDisplay.innerHTML = memory;
    } catch (error) {
      alert("Invalid expression, cant add in memory");
    }
  });
}
mPlusEval();

function mMinusEval() {
  mMinusBtn.addEventListener("click", () => {
    let formulaStr = dataFormula.join("");
    let result;
    try {
      result = eval(formulaStr);
      if (result % 1 == 0) {
        memory -= result;
      } else {
        memory -= result.toFixed(4);
      }
      memDisplay.innerHTML = memory;
    } catch (error) {
      alert("Invalid expression, cant add in memory");
    }
  });
}
mMinusEval();

function mrEval() {
  mrBtn.addEventListener("click", () => {
    let result = memory;
    dataFormula.push(result);
    dataValue.push(result);
    output.value = dataValue.join("");
  });
}
mrEval();

function mcEval() {
  mcBtn.addEventListener("click", () => {
    memory = 0;
    memDisplay.innerHTML = memory;
    mrBtn.disabled = true;
    mcBtn.disabled = true;
  });
}
mcEval();
let feBtn = document.querySelector('.f-e')
function fE(){
  feBtn.addEventListener('click', ()=>{
    let formulaStr = dataFormula.join('');
    let result
    try{
      result = eval(formulaStr);
      let value = result.toExponential(4) 
      dataFormula = []
      dataValue = []
      updateInput(value, value)
      output.value = dataValue.join('')
    }catch(error){
      alert('Wrong expression')
    }
  })
}
fE()