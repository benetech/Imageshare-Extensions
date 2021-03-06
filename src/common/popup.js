import { el, qs, withActiveTab } from './util';
import { getSearchTerms } from './find-terms';
import { COMMAND, SEARCH, TARGET } from './constants';
import browser from 'get-browser';
import sendTabMessage from 'tab-send-message';

import './popup.css';
import { getCreateKeywordLinksSetting } from './settings';

const getUserSearchTerm = () => el('search').value;
const setUserSearchTerm = term => el('search').value = term;

const showNoSearchTermDOM = () => {
  qs('.search-term.field-group').classList.add('validation-error');
  const searchField = el('search');
  searchField.setAttribute('aria-describedby', 'no-search-keyword');
  searchField.setAttribute('aria-invalid', true);
  searchField.focus();
};

const hideNoSearchTermDOM = () => {
  qs('.search-term.field-group').classList.remove('validation-error');
  const searchField = el('search');
  searchField.removeAttribute('aria-describedby');
  searchField.removeAttribute('aria-invalid');
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

const withSearchTerm = fn => () => {
  const term = getUserSearchTerm();

  if (term.trim() === '') {
    return showNoSearchTermDOM();
  }

  hideNoSearchTermDOM();
  fn(term);
};

const doStandardSearch = term => {
  el('search-buttons').classList.add('searching');

  const payload = {
    command: COMMAND.SEARCH,
    target: TARGET.BACKGROUND,
    type: SEARCH.STANDARD,
    selection: term
  };

  browser.runtime.sendMessage(payload, _ => el('search-buttons').classList.remove('searching'));
};

const doAdvancedSearch = term => {
  el('search-buttons').classList.add('searching');

  const payload = {
    command: COMMAND.SEARCH,
    target: TARGET.BACKGROUND,
    type: SEARCH.ADVANCED,
    selection: term
  };

  browser.runtime.sendMessage(payload, _ => el('search-buttons').classList.remove('searching'));
};

const renderFoundTerms = terms => {
  const container = el('search-results');

  container.dataset.results = !!terms.length;

  if (terms.length === 0) {
    return;
  }

  const label = qs('#search-results label');
  const select = qs('#search-results select');
  const viewResults = el('view-term');

  label.textContent = terms.length + ' keywords found in page.';
  label.focus();

  terms.sort().forEach(term => {
    const node = document.createElement('option');
    node.value = term;
    node.textContent = term;
    select.appendChild(node);
  });

  viewResults.addEventListener('click', () => {
    const selectedOption = select.selectedOptions[0];

    const payload = {
      command: COMMAND.VIEW_TERM,
      target: TARGET.BACKGROUND,
      term: selectedOption.value
    };

    browser.runtime.sendMessage(payload);
  });
};

const doFindTerms = function () {
  const self = this;
  self.setAttribute('disabled', '');

  getCreateKeywordLinksSetting().then(createLinks => {
    getSearchTerms().then(terms => {
      const payload = {
        command: COMMAND.FIND_TERMS,
        target: TARGET.CONTENT,
        terms: terms,
        createLinks: createLinks
      };

      withActiveTab(tab => sendTabMessage(tab.id, payload, undefined).then(terms => {
        renderFoundTerms(terms);
        self.removeAttribute('disabled');
      }));
    });
  });
};

const init = () => {
  el('standard-search').addEventListener('click', withSearchTerm(doStandardSearch));
  el('advanced-search').addEventListener('click', withSearchTerm(doAdvancedSearch));
  el('find-terms').addEventListener('click', doFindTerms);

  getUserSelection().then(selection => {
    if (selection !== null) {
      setUserSearchTerm(selection);
    }
  });

  console.debug('Popup handler loaded');
};

window.addEventListener('load', init);