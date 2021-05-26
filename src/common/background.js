import { COMMAND, TARGET, LIGHT_ICON_PATHS, IMGS_API_URL, DARK_SCHEME, SEARCH } from './constants';
import { getActiveTabSetting, getSettings } from './settings';
import { fetchJson, withActiveTab } from './util';
import { displayNotification } from 'display-notifications';
import browser from 'get-browser';
import startupBackgroundScript from 'startup-background-script';

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
  return getStandardSearchApiQueryResults(selection)
    .then(results => {
      if (results.length === 0) {
        console.debug(`No results found for "${selection}"`);
        return displayNotification(`No results`, `"${selection}" yielded no Imageshare entries.`);
      }

      if (results.length === 1) {
        console.debug(`One result found for ${selection}`);
        openImageshare(results[0].permalink);
        return displayNotification(`One match found`, 'It has been opened in a new tab.');
      }

      console.debug(`${results.length} found for ${selection}`);
      openImageshare('https://imageshare.benetech.org/?page=search&q=' + selection);
      displayNotification(`${results.length} matches for ${selection}`, 'These matches have been opened in a new tab.');
    })
    .catch(e => console.error('Unable to fetch standard search query results from API', e));
};

const doAdvancedSearch = (selection, userSubject, userType, userAcc, userSrc) => {
  return getAdvancedSearchApiQueryResults(selection, userSubject, userType, userAcc, userSrc)
    .then(results => {
      if (results.length === 0) {
        console.debug(`No results found for "${selection}"`);
        return displayNotification(`No results found for ${selection}`, 'Try another selection or adjust your search criteria.');
      }

      if (results.length === 1) {
        console.debug(`One result found for ${selection}`);

        const resultURL = results[0].permalink;
        openImageshare(resultURL);

        return displayNotification(`One match found`, 'It has been opened in a new tab.');
      }

      console.debug(`${results.length} found for ${selection}`);
      openImageshare("https://imageshare.benetech.org/?page=search&q=" + selection + "&subject=" + userSubject + "&type=" + userType + "&acc=" + userAcc + "&src=" + userSrc);
      displayNotification(`${results.length} matches for ${selection}`, 'These matches have been opened in a new tab.');
    })
    .catch(e => console.error('Unable to fetch advanced search query results from API', e));
};

// seperating standard from advanced calls
const handleMessagePayload = data => {
  if (data.type === SEARCH.STANDARD) {
    return doStandardSearch(data.selection);
  }

  if (data.type === SEARCH.ADVANCED) {
    // get criteria
    return getSettings().then(criteria => {
      // if criteria present then use, otherwise alert user and redirect to options
      if (criteria === undefined){
        //alert user to go to options and set criteria
        console.debug(`No pre-existing criteria, notifying user.`);
        displayNotification('No advanced search criteria set.', 'Configure advanced search criteria on options page.');
        openOptionsPage();
      } else {
        doAdvancedSearch(data.selection, criteria.subject, criteria.type, criteria.accommodation, criteria.source);
      }
    });
  }
};

const working = () => {
  withActiveTab(tab => {
    browser.tabs.sendMessage(tab.id, {
      command: COMMAND.WORKING,
      target: TARGET.CONTENT
    });
  });
};

const ready = () => {
  withActiveTab(tab => {
    browser.tabs.sendMessage(tab.id, {
      command: COMMAND.READY,
      target: TARGET.CONTENT
    });
  })
};

const onContextMenuClick = (info, _tab) => {
  const selection = info.selectionText;
  const option = info.menuItemId;

  const optionToCommandMap = {
    'imageshare-standard-search' : SEARCH.STANDARD,
    'imageshare-advanced-search' : SEARCH.ADVANCED
  };

  console.debug(`Menu item ${option} clicked with selection "${selection}"`);

  // Initiate search by subtype
  working();

  handleMessagePayload({
    command: COMMAND.BACKGROUND_SEARCH,
    type: optionToCommandMap[option], 
    selection: selection
  }).then(ready);
};

const onExtensionMessage = (msg, _sender, sendResponse) => {
  console.debug('Background receiving message', msg);

  if (msg.target !== TARGET.BACKGROUND) {
    sendResponse();
  }

  // User Settings Notification
  if (msg.command && msg.command === COMMAND.NOTIFICATION) {
    displayNotification(msg.title, msg.message);
  }

  // Search initiated from popup.js
  if (msg.command && msg.command === COMMAND.SEARCH) {
    working();
    handleMessagePayload(msg).then(ready)
  }

  // Adjust icon for dark color scheme contrast
  if (msg.scheme && msg.scheme === DARK_SCHEME) {
    console.debug('Setting dark color scheme icons');
    browser.browserAction.setIcon({
      path: LIGHT_ICON_PATHS
    });
  }

  sendResponse();
};

startupBackgroundScript(onContextMenuClick, onExtensionMessage);