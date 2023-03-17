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
let isDegree = document.querySelector('.deg')
console.log(isDegree.innerHTML)
function degToggler(){
  isDegree.addEventListener('click', ()=>{
    if(isDegree.innerHTML == 'DEG'){
      isDegree.innerHTML = 'RAD'
    }
    else{
      isDegree.innerHTML = 'DEG'
    }
  })
}
degToggler()
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
// function to print keys
function print(dataType) {
  for (i = 0; i < dataType.length; i++) {
    //console.log(dataType[i]);
    let formula = dataType[i].getAttribute("data-formula");
    dataType[i].addEventListener(
      "click",
      (event) => {
        if (output.value.length <= 18) {
          //console.log(event.target);
          dataValue.push(event.target.value);
          //console.log(dataValue.join(""));
          output.value += dataValue[dataValue.length - 1];
          //console.log(output.value);
          dataFormula.push(formula);
          //console.log(dataFormula.join(""));

          const POWER = "Math.pow(";
          let power_search_result = search(dataFormula, POWER); // gets indexes of Power function in a form of array
          function getPowerBase(dataFormula, power_search_result) {
            let base = []; //to find a single base
            let powerBases = []; //stores all bases
            let paranthesesCount = 0;
            //console.log(power_search_result);

            // loop to find base and store them in a base array
            for (let i = 0; i < power_search_result.length; i++) {
              let powerIndex = power_search_result[i];
              let index = powerIndex - 1;

              //runs backwards in dataFormula to find the base
              while (index >= 0) {
                if (dataFormula[index] == "(") paranthesesCount--;
                if (dataFormula[index] == ")") paranthesesCount++;
                let isOperator = dataFormula[index] == ["+", "-", "*", "/"];
                let isPower = dataFormula[index] == POWER;
                if ((isOperator && paranthesesCount == 0) || isPower) {
                  break;
                }
                base.unshift(dataFormula[index]);
                index = index - 1;
              }
              powerBases.push(base.join(""));
            }

            //console.log(powerBases);
            return powerBases;
          }
          let BASES = getPowerBase(dataFormula, power_search_result);
          let formulaStr = dataFormula.join("");
          // loop to replace power in string
          for (let i = 0; i < BASES.length; i++) {
            let toReplace = BASES[i] + POWER;
            let replacement = "Math.pow(" + BASES[i] + ",";
            formulaStr = formulaStr.replace(toReplace, replacement);
            //console.log(formulaStr);
          }
          //fixing factorial function
          const FACTORIAL = "factorial";
          let factorial_search_result = search(dataFormula, FACTORIAL);
          function getFactorialNumber(dataFormula, factorial_search_result) {
            let number = [];
            let numberStr = [];
            let factorialNumbers = [];
            let factorialSequence = 0;
            for (let i = 0; i < factorial_search_result.length; i++) {
              let nextInputIndex = i + 1;
              let nextInput = factorial_search_result[nextInputIndex];
              if (nextInput == FACTORIAL) {
                factorialSequence += 1;
                return;
              }
              let firstFactorialIndex = i - factorialSequence;
              let previousInputIndex = firstFactorialIndex - 1;
              let paranthesesCount = 0;
              while (previousInputIndex >= 0) {
                if (dataFormula[previousInputIndex] == "(") paranthesesCount--;
                if (dataFormula[previousInputIndex] == ")") paranthesesCount++;
                let isOperator =
                  dataFormula[previousInputIndex] == ["+", "-", "/", "^"];
                if (isOperator && paranthesesCount == 0) {
                  break;
                }

                number.unshift(dataFormula[previousInputIndex]);
                previousInputIndex--;
              }
              numberStr = number.join("");
            }
            let factorial = "factorial(";
            let closeParanthese = ")";
            let times = factorialSequence + 1;
            let toReplace = numberStr + FACTORIAL.repeat(times);
            let replacement =
              factorial.repeat(times) +
              numberStr +
              closeParanthese.repeat(times);
            factorialNumbers.push({
              toReplace: toReplace,
              replacement: replacement,
            });
            console.log(factorialNumbers)
            return factorialNumbers;
          }
          //changing and arranging factorial value in formula str
          let FACTORIALNUMBERS = getFactorialNumber(
            dataFormula,
            factorial_search_result
          );
          FACTORIALNUMBERS.forEach((factorial) => {
            formulaStr = formulaStr.replace(
              factorial.toReplace,
              factorial.replacement
            );
            console.log(FACTORIALNUMBERS)
            console.log(formulaStr)
          });

          //degree/radian calculation 
          // search function
          function search(array, keyword) {
            let result_array = [];

            // this searches  keyword in array and puts it's index in result_array
            array.forEach((element, index) => {
              if (keyword == element) {
                result_array.push(index);
              }
            });
            return result_array;
          }
        } else {
          alert("Input limit reached");
        }
      },
      false
    );
  }
}
print(operators);
print(numbers);
print(advFuncs);
print(mathFucns);
print(keys);
print(trigoFuncs);

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
  });
}
backSpace();

//factorial function
function factorial(num) {
  if (num % 1 != 0) {
    num = Math.round(num);
  }
  if (num === 0 || num === 1) return 1;
  for (let i = 0; i < num; i++) {
    result = result * i;
    if (result === Infinity) return Infinity;
  }
  return result;
}
