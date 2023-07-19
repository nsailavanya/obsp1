const keys = document.querySelectorAll('.key');
const input_field = document.querySelector('.display .input');
const output_field = document.querySelector('.display .output');

let input = "";

for (let key of keys) {

  const value = key.dataset.key;

  key.addEventListener('click', () => {

    if (value == "AC") {
      input = "";
      input_field.innerHTML = "";
      output_field.innerHTML = "";
    }
    
    else if (value == "DEL") {
      input = input.slice(0, -1);
      input_field.innerHTML = Display(input);
    } 
    
    else if (value == "=") {
      input = input.split("").map(i => (i == "%") ? "/100" : i).join("");
      const result = eval(input);
      output_field.innerHTML = Format(result);
    }
    
    else if (value == "()") {
      const open = input.indexOf("(");
      const close = input.indexOf(")");

      if (open == -1 || (open != -1 && close != -1 && open < close)) {
        input += "(";
      }
      else if (open != -1 && close == -1 || (open != -1 && close != -1 && open > close)) {
        input += ")";
      }

      input_field.innerHTML = Display(input);

    } 
    
    else {
      if (Validate(value)) {
        input += value;
        input_field.innerHTML = Display(input);
      }
    }
  });
}

function Display(input) {
  const operators = {"*": "x",
  "/": "÷",
  "+": "+",
  "-": "-",
  "(": "(",
  ")": ")",
  "%": "%"
  };

  const display = input.split("").map(i => operators[i] || i).join("");
  return display;
}

function Format(output) {
  let [num, decimal] = output.toString().split(".");
  num = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (decimal) {
     num+= `.${decimal}`;
  }

  return num;
}

function Validate(value) {
  const end = input.slice(-1);
  const operators = ["+", "-", "*", "/"];

  if (value == "." && end == ".") {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(end)) {
      return false;
    } 
    else {
      return true;
    }
  }

  return true;
}