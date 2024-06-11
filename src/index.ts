//variable declarations
import { evaluate } from 'mathjs';

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

let calcValue = '';
calcScreen!.value = '0';
const exp = /[+-/*.]+/;

type HistoryEntry = {
  equation: string;
  answer: string;
};

calcHistoryTab.addEventListener('change', () => {
  calcHistoryTab.checked
    ? calcHistoryList?.classList.add('calculator__history_shown')
    : calcHistoryList?.classList.remove('calculator__history_shown');
});

calcButton.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    //switch(){}
    calcValue += button.textContent;
    calcScreen!.value = calcValue;
  });
});

calcResultButton.addEventListener('click', (e) => {
  e.preventDefault();
  calcValue = calcValue.replace(/=/g, '');
  const currentEquation = calcValue;
  if (exp.test(calcValue.charAt(calcValue.length - 1))) {
    calcValue = calcValue.substring(0, calcValue.length - 1);
  } else {
    const result = evaluate(calcValue);
    calcScreen!.value = result.toString();
    //make value global
    calcValue = result;
  }
  const getAnswerButton = document.createElement('button');
  const entry = document.createElement('li');
  const entryContent: HistoryEntry = {
    equation: currentEquation,
    answer: calcValue,
  };

  getAnswerButton.addEventListener('click', () => {
    calcScreen!.value = entryContent.answer;
    calcValue = entryContent.answer;
    calcHistoryList?.classList.remove('calculator__history_shown');
    calcHistoryTab!.checked = false;
  })

  entry.textContent = `${entryContent.equation} = ${entryContent.answer}`;
  calcHistoryList?.append(entry);
  calcHistoryList?.appendChild(getAnswerButton);
});

calcClearButton.addEventListener('click', (e) => {
  e.preventDefault();
  calcValue = '';
  calcScreen!.value = '0';
});
