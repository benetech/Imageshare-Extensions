import { el, qs, withActiveTab } from './util';
import { getSearchTerms } from './find-terms';
import { COMMAND, SEARCH, TARGET } from './constants';
import browser from 'get-browser';
import sendTabMessage from 'tab-send-message';

import './style.css';

const getUserSearchTerm = () => el('search').value;
const setUserSearchTerm = term => el('search').value = term;

const showNoSelectionDOM = () => {
  qs('form[role="search"]').classList.add('no-selection');
};

const getUserSelection = () => {
  return new Promise(resolve => {
    withActiveTab(tab => {
      const payload = {
        command: COMMAND.GET_SELECTION,
        target: TARGET.CONTENT
      };
  
      browser.tabs.sendMessage(tab.id, payload, resolve);
    });
  });
};

const doStandardSearch = () => {
  const payload = {
    command: COMMAND.SEARCH,
    target: TARGET.BACKGROUND,
    type: SEARCH.STANDARD,
    selection: getUserSearchTerm()
  };

  browser.runtime.sendMessage(payload, response => console.debug('standard search response', response));
};

const doAdvancedSearch = () => {
  const payload = {
    command: COMMAND.SEARCH,
    target: TARGET.BACKGROUND,
    type: SEARCH.ADVANCED,
    selection: getUserSearchTerm()
  };

  browser.runtime.sendMessage(payload, response => console.debug('advanced search response', response));
};

const doFindTerms = function () {
  const self = this;
  self.setAttribute('disabled', '');

  getSearchTerms().then(terms => {
    const payload = {
      command: COMMAND.FIND_TERMS,
      target: TARGET.CONTENT,
      terms: terms
    };

    withActiveTab(tab => sendTabMessage(tab.id, payload, undefined).then(() => {
      self.removeAttribute('disabled');
    }));
  });
};

const init = () => {
  el('standard-search').addEventListener('click', doStandardSearch);
  el('advanced-search').addEventListener('click', doAdvancedSearch);
  el('find-terms').addEventListener('click', doFindTerms);

  getUserSelection().then(selection => {
    if (selection === null) {
      return showNoSelectionDOM();
    }
    
    setUserSearchTerm(selection);
  });

  console.debug('Popup handler loaded');
};

window.addEventListener('load', init);