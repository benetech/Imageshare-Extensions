import browser from 'get-browser';
import { getActiveTabSetting } from './settings';

export const el = id => document.getElementById(id);
export const qs = q => document.querySelector(q);
export const qsa = q => document.querySelectorAll(q);

export const show = el => el.style.display = 'block';
export const hide = el => el.style.display = 'none';

export const withActiveTab = f => browser.tabs.query({
  active: true,
  currentWindow: true
}, tabs => f(tabs[0]));

export const openUrl = url => {
  getActiveTabSetting().then(active => browser.tabs.create({url: url, active: active}));
};

export const getUserSelection = () => {
  if (window.getSelection) {
    return window.getSelection().toString();
  }

  return '';
};

export const announce = text => {
  let container = el('imageshare-extension-announce');

  if (!container) {
    let container = document.createElement('div');
    container.id = 'imageshare-extension-announce';
    container.setAttribute('role', 'alert');
    container.classList.add('imageshare-sr-only');
    document.body.appendChild(container);
  }

  container.textContent = '';
  container.textContent = text;
};

export const setMouseCursorBusy = () => document.body.style.cursor = 'wait';
export const setMouseCursorReady = () => document.body.style.cursor = 'default';

export const getQueryUrl = selection => "https://imageshare.benetech.org/?page=search&q=" + encodeURIComponent(selection);

export const fetchJson = url => fetch(url, {
  method: 'GET',
  mode: 'cors'
}).then(response => response.json()).then(json => json.data);

export const parseSubjects = subjects => {
  // filters
  const isParent = subject => !subject.hasOwnProperty('relationships') || !subject.relationships.hasOwnProperty('parent');
  const isChild = subject => !isParent(subject);

  // create a id => name structure
  const toIdList = (list, subject) => {
    list.push({
      id: subject.id,
      attributes: {
        name: subject.attributes.name
      }
    });

    subject.children.forEach(c => list.push({
      id: c.id,
      attributes: {
        name: [subject.attributes.name, c.attributes.name].join(' - ')
      }
    }));

    return list;
  };

  // applicative functor sort
  const sortByName = f => (a, b) => {
    a = f(a).toUpperCase();
    b = f(b).toUpperCase();

    return a < b ? -1 : a > b ? 1 : 0;
  };

  // add children to a parent subject
  const amendChildren = children => parent => {
    parent.children = children
      .filter(c => c.relationships.parent.data.id === parent.id)
      .sort(sortByName(i => i.attributes.name));

    return parent;
  };

  const result =
    // all subjects
    subjects
    // only the parents
    .filter(isParent)
    // add the children, if any, sorted alphabetically by name
    .map(amendChildren(subjects.filter(isChild)))
    // map to id => name list
    .reduce(toIdList, [])
    // sort by parent name
    .sort(sortByName(i => i.attributes.name));

    return result;
};
