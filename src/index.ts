//imports
import { evaluate } from 'mathjs';

//variable declarations
const calcScreen = document.querySelector<HTMLInputElement>(
  '#calculator__screen',
);
const calcButton = document.querySelectorAll<HTMLButtonElement>(
  '.calculator__button',
);
const calcResultButton = document.getElementById(
  'calculator__result',
) as HTMLButtonElement;
const calcClearButton = document.getElementById(
  'calculator__clear',
) as HTMLButtonElement;
const calcHistoryTab = document.getElementById(
  'calculator__history-tab',
) as HTMLInputElement;
const calcHistoryList = document.querySelector<HTMLUListElement>(
  '.calculator__history',
);
const calcBackspace = document.getElementById(
  'calculator__backspace',
) as HTMLButtonElement;
let calcValue = '';

const endRegex = /\D/g;
const duplicateRegex = /(\D)\1+/gm;
//using a custom type for appending values, thanks TS!!
type HistoryEntry = {
  equation: string;
  answer: string;
};

//event listeners
calcHistoryTab.addEventListener('change', () => {
  calcHistoryTab.checked
    ? calcHistoryList?.classList.add('calculator__history_shown')
    : calcHistoryList?.classList.remove('calculator__history_shown');
});

calcButton.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    calcValue += button.textContent;
    calcScreen!.value = calcValue;
  });
});
calcResultButton.addEventListener('click', (e) => {
  e.preventDefault();
  //fixing a processing error with math.js for how my program works
  //and fixing additional parsing errors such as operation symbols being at the end
  calcValue = calcValue.replace('π', Math.PI.toString());
  calcValue = calcValue.replace('=', '');
 if( calcValue.charAt(calcValue.length - 1).match(endRegex) || calcValue.match(duplicateRegex)){
  (calcValue = '');
 }

  //calcValue cannot be empty otherwise math.js with throw an error
  if (calcValue !== '') {
    const currentEquation = calcValue;
    const result = evaluate(calcValue);

    calcScreen!.value = result.toString();
    calcValue = result;

    const getAnswerButton = document.createElement('button');
    getAnswerButton.className = "calculator__history__append-button"
    getAnswerButton.textContent = 'Add result';
    const entry = document.createElement('li');

    //creating an instance for making an entry to the list
    const entryContent: HistoryEntry = {
      equation: currentEquation,
      answer: calcValue,
    };

    //event listener for retreiving a value for the screen
    getAnswerButton.addEventListener('click', () => {
      calcScreen!.value = entryContent.answer;
      calcValue = entryContent.answer;
      calcHistoryList?.classList.remove('calculator__history_shown');
      calcHistoryTab!.checked = false;
    });

    //li value itself
    entry.textContent = `${entryContent.equation} = ${entryContent.answer}`;
    entry!.append(getAnswerButton);
    calcHistoryList?.append(entry);

  } else {
    calcValue = '';
    calcScreen!.value = '0';
  }
});

calcClearButton.addEventListener('click', (e) => {
  e.preventDefault();
  calcValue = '';
  calcScreen!.value = '0';
});

console.log(calcBackspace)

calcBackspace.addEventListener('click', (e) => {
  e.preventDefault();
  if (calcValue !== '') {
    calcValue = calcValue.replace('←', '');
    calcValue = calcValue.substring(0, calcValue.length - 1);
    calcScreen!.value = calcValue;
  } else {
    return;
  }
});
