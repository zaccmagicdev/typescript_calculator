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
const calcBackspace = document.getElementById(
  'calculator__backspace',
) as HTMLButtonElement;
let calcValue = '';
calcScreen!.value = '0';

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
    calcValue += button.textContent;
    calcScreen!.value = calcValue;
  });
});

calcResultButton.addEventListener('click', (e) => {
  e.preventDefault();
  //fixing a processing error with math.js for how my program works
  calcValue = calcValue.replace(/=/g, '');
  calcValue = calcValue.replace('π', Math.PI.toString());

  if (calcValue !== '') {
    const currentEquation = calcValue;
    const result = evaluate(calcValue);

    calcScreen!.value = result.toString();
    calcValue = result;

    const getAnswerButton = document.createElement('button');
    getAnswerButton.textContent = 'Add result';
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
    });

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

calcBackspace.addEventListener('click', (e) => {
  e.preventDefault();
  if (calcValue !== '') {
    calcValue = calcValue.substring(0, calcValue.length - 1);
    calcScreen!.value = calcValue;
  } else {
    return;
  }
});
