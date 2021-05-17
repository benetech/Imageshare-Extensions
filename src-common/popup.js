import { el, show, hide } from './util';

import './style.css';

const MESSAGE = {
  STANDARD_SEARCH: {
    type: 'search',
    subtype: 'advanced'
  },
  ADVANCED_SEARCH: {
    type: 'search',
    subtype: 'advanced'
  }
}

const RESPONSE = {
  RUN_INPUT: 'run input'
};

const firstForm = el('view-one');
const secondForm = el('view-two');

const showSecondForm = () => {
  hide(firstForm);
  show(secondForm);
};

const withActiveTab = f => chrome.tabs.query({
  active: true,
  currentWindow: true
}, tabs => f(tabs[0]));

const doStandardSearch = () => withActiveTab(tab => {
  chrome.tabs.sendMessage(tab.id, MESSAGE.STANDARD_SEARCH, response => {
    if (response === RESPONSE.RUN_INPUT) {
      showSecondForm();
    }
  })
});

const doAdvancedSearch = () => withActiveTab(tab => {
  chrome.tabs.sendMessage(tab.id, MESSAGE.ADVANCED_SEARCH, response => {
    if (response === RESPONSE.RUN_INPUT) {
      showSecondForm();
    }
  });
});

const doStandardInputSearch = () => chrome.runtime.sendMessage({
  type: 'input',
  subtype: 'standard',
  selection: el('search').value
});

const doAdvancedInputSearch = () => chrome.runtime.sendMessage({
  type: 'input',
  subtype: 'advanced',
  selection: el('search').value
});

const init = () => {
  el('standard-search').addEventListener('click', doStandardSearch);
  el('advanced-search').addEventListener('click', doAdvancedSearch);
  el('standard-search-input').addEventListener('click', doStandardInputSearch);
  el('advanced-search-input').addEventListener('click', doAdvancedInputSearch);

  console.debug('Popup handler loaded');
};

window.addEventListener('load', init);