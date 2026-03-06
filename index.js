function appendToResult(value) { 
  // Find the calculator screen (input box)
  const resultField = document.getElementById("result");

  // Get the last character currently shown on the screen
  const lastChar = resultField.value.slice(-1);

  // ❌ Stop if user tries to enter two operators in a row (like ++ or */)
  if ("+-*/%".includes(value) && "+-*/%".includes(lastChar)) {
    return; // Do nothing
  }

  // ❌ Stop if user tries to enter two dots in a row (..)
  if (value === '.' && lastChar === '.') {
    return; // Do nothing
  }

  // ✅ Remove starting zero if a number is pressed (so 07 becomes 7)
  // Allow 0. to happen for decimals
  if (resultField.value === "0" && value !== ".") {
    resultField.value = value; // Replace 0 with the new number
  } 
  else {
    // ✅ Otherwise, simply add the new value to the screen
    resultField.value += value;
  }
}
function clearResult()
{
  document.getElementById("result").value = '0';
}

function deleteLastDigit() 
{
  // Get the calculator screen (where the numbers are shown)
  const resultField = document.getElementById("result");

  // Remove the last digit/symbol from the screen
  resultField.value = resultField.value.slice(0, -1);

  // If screen becomes empty after deleting, show 0 again
  if (resultField.value === "") 
  {
    resultField.value = "0";
  }
}
function calculateResult() 
{
  // Get the calculator screen (where the expression is shown)
  const resultField = document.getElementById("result");

  try 
  {
    // Replace 'x' with '*' and '÷' with '/' so JavaScript can calculate it
    let expression = resultField.value.replace(/x/g, '*').replace(/÷/g, '/');

    // Solve the expression and show the answer on the screen
    resultField.value = eval(expression);
  } 
  catch(error) 
  {
    // If something goes wrong, show "Error" instead of breaking the calculator
    resultField.value = 'Error';
  }
}
// Listen for any key pressed on the keyboard
document.addEventListener("keydown", function(event) {

  // Store the key that was pressed (example: "5", "+", "Enter")
  const key = event.key;
  // If the key pressed is a number (0–9), show it on the screen
  if (!isNaN(key)) 
  {
    appendToResult(key);
  }

  // If the key pressed is an operator or a dot, add it on the screen
  else if ("+-*/%.".includes(key)) 
  {
    appendToResult(key);
  }

  // If the Enter key is pressed, calculate the result
  else if (key === "Enter") 
  {
    event.preventDefault(); // Stops the page from refreshing when Enter is pressed
    calculateResult();
  }

  // If Backspace key is pressed, delete the last digit
  else if (key === "Backspace") 
  {
    deleteLastDigit();
  }

  // If Escape (Esc) key is pressed, clear the screen
  else if (key === "Escape") 
  {
    clearResult();
  }

});
