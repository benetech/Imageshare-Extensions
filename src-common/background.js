import { ICON_PATHS, IMGS_API_URL } from './constants';
import { getActiveTabSetting, getSettings } from './settings';
import { fetchJson } from './util';
import { displayNotification } from 'display-notification';
import browser from 'get-browser';

const DARK_SCHEME = 'dark';

const MESSAGE_TYPE = {
  SEARCH: 'search',
  INPUT: 'input',
  NOTIFICATION: 'notification'
};

const PAYLOAD_TYPE = {
  STANDARD: 'standard',
  ADVANCED: 'advanced'
};

const openImageshare = url => getActiveTabSetting().then(active => browser.tabs.create({url: url, active: active}));

const openOptionsPage = () => {
  if (browser.runtime.openOptionsPage) {
    browser.runtime.openOptionsPage();
  } else {
    window.open(browser.runtime.getURL('options.html'));
  }
};

const getStandardSearchApiQueryResults = selection => fetchJson(`${IMGS_API_URL}filter/?query=${selection}`);

const getAdvancedSearchApiQueryResults = (selection, userSubject, userType, userAcc, userSrc) => {
  return fetchJson(`${IMGS_API_URL}filter/?query=${selection}&subject=${userSubject}&type=${userType}&acc=${userAcc}&src=${userSrc}`);
}

const doStandardSearch = selection => {
  getStandardSearchApiQueryResults(selection)
    .then(results => {
      if (results.length === 0) {
        console.debug(`No results found for "${selection}"`);
        return displayNotification(`No results found for ${selection}`, 'Please try another selection');
      }

      if (results.length === 1) {
        console.debug(`One result found for ${selection}`);
        openImageshare(results[0].permalink);
        return displayNotification(`${results.length} result found for ${selection}`, 'Your Imageshare result has been opened for you in a new tab.');
      }

      console.debug(`${results.length} found for ${selection}`);
      openImageshare('https://imageshare.benetech.org/?page=search&q=' + selection);
      displayNotification(`${results.length} results found for ${selection}`, 'Imageshare has been opened for you in the next tab. Your results are waiting for you there.');
    })
    .catch(e => console.error('Unable to fetch standard search query results from API', e));
};

const doAdvancedSearch = (selection, userSubject, userType, userAcc, userSrc) => {
  getAdvancedSearchApiQueryResults(selection, userSubject, userType, userAcc, userSrc)
    .then(results => {
      if (results.length === 0) {
        console.debug(`No results found for "${selection}"`);
        return displayNotification(`No results found for ${selection}`, 'Please try another selection or adjust your Advanced Search criteria via this extensions "OPTIONS" page');
      }

      if (results.length === 1) {
        console.debug(`One result found for ${selection}`);

        const resultURL = results[0].permalink;
        openImageshare(resultURL);

        return displayNotification(`${results.length} result found for ${selection}`, 'Your Imageshare result has been opened for you in a new tab.');
      }

      console.debug(`${results.length} found for ${selection}`);
      openImageshare("https://imageshare.benetech.org/?page=search&q=" + selection + "&subject=" + userSubject + "&type=" + userType + "&acc=" + userAcc + "&src=" + userSrc);
      displayNotification(`${results.length} results found for ${selection}`, 'Imageshare has been opened for you in the next tab. Your results are waiting for you there.');
    })
    .catch(e => console.error('Unable to fetch advanced search query results from API', e));
};

// seperating standard from advanced calls
const handleMessagePayload = data => {
  if (data.subtype === PAYLOAD_TYPE.STANDARD) {
    return doStandardSearch(data.selection);
  }

  if (data.subtype === PAYLOAD_TYPE.ADVANCED) {
    // get criteria
    getSettings().then(criteria => {
      // if criteria present then use, otherwise alert user and redirect to options
      if (criteria === undefined){
        //alert user to go to options and set criteria
        console.debug(`You have not yet set criteria.`);
        displayNotification('You have not yet set criteria for advanced searching.', 'The Imageshare "OPTIONS" page has been opened for you and is now your active tab. Please set your Advanced Search preferred search criteria.');
        openOptionsPage();
      } else {
        doAdvancedSearch(data.selection, criteria.subject, criteria.type, criteria.accommodation, criteria.source);
      }
    });
  }
};

const onContextMenuClick = (info, _tab) => {
  //Test receipt selection object
  console.debug("Selection Object: " + JSON.stringify(info.selectionText));

  //Extract selection
  const selection = info.selectionText;
  const option = info.menuItemId;

  const data = {subtype: option, selection: selection}

  //Initiate search by subtype
  handleMessagePayload(data);
};

const createFirefoxBookmarkMenuItem = () => {
  // Firefox only bookmark menu edit

  const onBookmarkCreation = () => {
    if (browser.runtime.lastError) {
      return console.debug('error creating item:' + browser.runtime.lastError);
    }

    console.debug('item created successfully');

    // create listener for this item that launches Options page onClick
    browser.menus.onClicked.addListener(() => {
      if (browser.runtime.openOptionsPage) {
        browser.runtime.openOptionsPage();
      } else {
        window.open(browser.runtime.getURL('options.html'));
      }
    })
  };

  try {
    // create bookmark context menu item Options
    browser.menus.create({
      id: 'Options',
      type: 'normal',
      title: 'Options',
      contexts: ['browser_action'],
    }, onBookmarkCreation);
  } catch (e) {
    // browser object is not available
  }
};

const setupContextMenu = () => {
  // Create one menu item for each context type.
  // NOTE: available contexts = "page","selection","link","editable","image","video","audio". Code is set up ready for the future addition of contexts via the contexts veriable.
  const context = 'selection';
  const title = 'Imageshare Search';

  const menuId = `parent ${context}`;

  // Create a parent item and two children.
  browser.contextMenus.create({
    title: title,
    contexts: [context],
    id: menuId
  });

  browser.contextMenus.create({
    title: 'Standard Search',
    contexts: [context],
    parentId: menuId,
    id: 'standard'
  });

  browser.contextMenus.create({
    title: 'Advanced Search',
    contexts:[context],
    parentId: menuId,
    id: 'advanced'
  });

  createFirefoxBookmarkMenuItem();
};

const onExtensionMessage = function(data, _sender, sendResponse) {
  // User Settings Notification
  if (data.type === MESSAGE_TYPE.NOTIFICATION) {
    console.debug("message received " + JSON.stringify(data.options));
    displayNotification(data.title, data.message);
  }

  // Search innitiated from popup.js
  if (data.type === MESSAGE_TYPE.SEARCH) {
    handleMessagePayload(data);
    //send response reset
  }

  // Search innitiated from popup.js input
  if (data.type === MESSAGE_TYPE.INPUT) {
    handleMessagePayload(data);
    //send response reset
  }

  //dark mode icon toggle
  if (data.scheme === DARK_SCHEME) {
    browser.browserAction.setIcon({ path : ICON_PATHS });
  }

  sendResponse();
};

//message handling

const init = () => {
  browser.runtime.onInstalled.addListener(setupContextMenu);
  browser.contextMenus.onClicked.addListener(onContextMenuClick);
  browser.runtime.onMessage.addListener(onExtensionMessage);

  console.debug("Background script loaded.");
};

window.addEventListener("load", init);