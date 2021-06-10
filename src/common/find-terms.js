import browser from 'get-browser';
import findAndReplaceDOMText from 'findandreplacedomtext';
import { qsa, fetchJson } from '../common/util';
import { IMGS_TERMS_ENDPOINT } from './constants';

const getStoredSearchTerms = () => {
  return new Promise(resolve => {
    browser.storage.local.get(['terms'], result => resolve(result.terms));
  });
};

const storeSearchTerms = terms => {
  return new Promise(resolve => {
    browser.storage.local.set({ terms: terms }, () => resolve(terms))
  });
};

const fetchSearchTermsFromApi = () => fetchJson(IMGS_TERMS_ENDPOINT);

const filterElements = el => {
  if (!el.closest) {
    return false;
  }

  const interactiveParent = el.closest('button, input, a, select, textarea, object, area, label, details');

  return interactiveParent === null;
};

export const getSearchTerms = () => {
  return getStoredSearchTerms().then(terms => {
    if (terms === undefined) {
      return fetchSearchTermsFromApi().then(storeSearchTerms);
    }

    return terms;
  })
};

export const findTerms = terms => {
  // generating a huge OR-regex is way way way faster than generating a regex for each word.

  const finder = findAndReplaceDOMText(document.body, {
    find: new RegExp('\\b(' + terms.join('|') + ')\\b', 'gi'),
    wrap: 'span',
    wrapClass: 'imageshare-term',
    filterElements: filterElements
  });

  const nodes = qsa('span.imageshare-term');

  const map = {};

  nodes.forEach(node => map[node.textContent.toLowerCase()] = true);

  finder.revert();

  return Promise.resolve(Object.keys(map));
};