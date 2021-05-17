import { LIGHT_ICON_PATHS, IMGS_API_URL } from './constants';
import { getActiveTabSetting, getSettings } from './settings';
import { fetchJson } from './util';
import { displayNotification } from 'display-notification';
import createContextMenu from 'create-context-menu';
import browser from 'get-browser';

const DARK_SCHEME = 'dark';

const MESSAGE_TYPE = {
  SEARCH: 'search',
  INPUT: 'input',
  NOTIFICATION: 'notification'
};

const PAYLOAD_TYPE = {
  STANDARD: 'imageshare-standard-search',
  ADVANCED: 'imageshare-advanced-search'
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
        console.debug(`No pre-existing criteria, notifying user.`);
        displayNotification('No advanced search criteria.', 'Extension options opened as active browser tab. Please configure search criteria.');
        openOptionsPage();
      } else {
        doAdvancedSearch(data.selection, criteria.subject, criteria.type, criteria.accommodation, criteria.source);
      }
    });
  }
};

const onContextMenuClick = (info, _tab) => {
  const selection = info.selectionText;
  const option = info.menuItemId;

  console.debug(`Menu item ${option} clicked with selection "${selection}"`);

  // Initiate search by subtype
  handleMessagePayload({subtype: option, selection: selection});
};

const onExtensionMessage = function(data, _sender, sendResponse) {
  console.debug('Extension received message', data);

  // User Settings Notification
  if (data.type === MESSAGE_TYPE.NOTIFICATION) {
    displayNotification(data.title, data.message);
  }

  // Search initiated from popup.js
  if (data.type === MESSAGE_TYPE.SEARCH) {
    handleMessagePayload(data);
    //send response reset
  }

  // Search initiated from popup.js input
  if (data.type === MESSAGE_TYPE.INPUT) {
    handleMessagePayload(data);
    //send response reset
  }

  // Adjust icon for dark color scheme contrast
  if (data.scheme === DARK_SCHEME) {
    browser.browserAction.setIcon({ path : LIGHT_ICON_PATHS });
  }

  sendResponse();
};

//message handling

const init = () => {
  createContextMenu();
  browser.contextMenus.onClicked.addListener(onContextMenuClick);
  browser.runtime.onMessage.addListener(onExtensionMessage);

  console.debug('Background script loaded.');
};

window.addEventListener('load', init);