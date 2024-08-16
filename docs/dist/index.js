import {evaluate} from "../snowpack/pkg/mathjs.js";
const calcScreen = document.querySelector("#calculator__screen");
const calcButton = document.querySelectorAll(".calculator__button");
const calcResultButton = document.getElementById("calculator__result");
const calcClearButton = document.getElementById("calculator__clear");
const calcHistoryTab = document.getElementById("calculator__history-tab");
const calcHistoryList = document.querySelector(".calculator__history");
const calcBackspace = document.getElementById("calculator__backspace");
let calcValue = "";
const endRegex = /\D/g;
const duplicateRegex = /(\D)\1+/gm;
calcHistoryTab.addEventListener("change", () => {
  calcHistoryTab.checked ? calcHistoryList?.classList.add("calculator__history_shown") : calcHistoryList?.classList.remove("calculator__history_shown");
});
calcButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    calcValue += button.textContent;
    calcScreen.value = calcValue;
  });
});
calcResultButton.addEventListener("click", (e) => {
  e.preventDefault();
  calcValue = calcValue.replace("π", Math.PI.toString());
  calcValue = calcValue.replace("=", "");
  if (calcValue.charAt(calcValue.length - 1).match(endRegex) || calcValue.match(duplicateRegex)) {
    calcValue = "";
  }
  if (calcValue !== "") {
    const currentEquation = calcValue;
    const result = evaluate(calcValue);
    calcScreen.value = result.toString();
    calcValue = result;
    const getAnswerButton = document.createElement("button");
    getAnswerButton.className = "calculator__history__append-button";
    getAnswerButton.textContent = "Add result";
    const entry = document.createElement("li");
    const entryContent = {
      equation: currentEquation,
      answer: calcValue
    };
    getAnswerButton.addEventListener("click", () => {
      calcScreen.value = entryContent.answer;
      calcValue = entryContent.answer;
      calcHistoryList?.classList.remove("calculator__history_shown");
      calcHistoryTab.checked = false;
    });
    entry.textContent = `${entryContent.equation} = ${entryContent.answer}`;
    entry.append(getAnswerButton);
    calcHistoryList?.append(entry);
  } else {
    calcValue = "";
    calcScreen.value = "0";
  }
});
calcClearButton.addEventListener("click", (e) => {
  e.preventDefault();
  calcValue = "";
  calcScreen.value = "0";
});
console.log(calcBackspace);
calcBackspace.addEventListener("click", (e) => {
  e.preventDefault();
  if (calcValue !== "") {
    calcValue = calcValue.replace("←", "");
    calcValue = calcValue.substring(0, calcValue.length - 1);
    calcScreen.value = calcValue;
  } else {
    return;
  }
});
