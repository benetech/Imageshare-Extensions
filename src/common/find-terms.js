import browser from 'get-browser';
import findAndReplaceDOMText from 'findandreplacedomtext';
import { qsa, fetchJson } from '../common/util';
import { IMGS_TERMS_ENDPOINT } from './constants';

const getStoredSearchTerms = () => {
  return new Promise(resolve => {
    browser.storage.local.get(['terms'], result => resolve(result.terms));
  });
};

const storedSearchTermsAreStale = terms => {
  const ONE_DAY = 86_400_000;

  const now = (new Date()).getTime();

  return (now - terms.timestamp) > ONE_DAY;
};

const storeSearchTerms = terms => {
  return new Promise(resolve => {
    browser.storage.local.set({ terms: {
      data: terms,
      timestamp: (new Date()).getTime()
    } }, () => resolve(terms))
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
    if (terms === undefined || storedSearchTermsAreStale(terms)) {
      return fetchSearchTermsFromApi().then(storeSearchTerms);
    }

    return terms.data;
  })
};

export const findTerms = (terms, wrapLinks) => {
  // generating a huge OR-regex is way way way faster than generating a regex for each word.

  const finder = findAndReplaceDOMText(document.body, {
    find: new RegExp('\\b(' + terms.join('|') + ')\\b', 'gi'),
    wrap: wrapLinks ? 'button' : 'span',
    wrapClass: 'imageshare-term',
    filterElements: filterElements
  });

  const nodes = qsa('.imageshare-term');

  const map = {};

  nodes.forEach(node => map[node.textContent.toLowerCase()] = true);

  if (!wrapLinks) {
    finder.revert();
  }

  return Promise.resolve(Object.keys(map));
};