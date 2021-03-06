import { COMMAND, TARGET, LIGHT_ICON_PATHS, IMGS_API_URL, DARK_SCHEME, SEARCH } from './constants';
import { getStoredUserSettings, hasAdvancedSearchCriteriaDefined } from './settings';
import { fetchJson, getQueryUrl, openUrl, withActiveTab } from './util';
import { displayNotification } from 'display-notifications';
import browser from 'get-browser';
import startupBackgroundScript from 'startup-background-script';
import browserAction from 'get-browser-action';

const normaliseSearchParameter = p => {
  if ((p === undefined) || (p == '0')) {
    return '';
  }

  return encodeURIComponent(p)
};

const openOptionsPage = () => {
  if (browser.runtime.openOptionsPage) {
    browser.runtime.openOptionsPage();
  } else {
    window.open(browser.runtime.getURL('options.html'));
  }
};

const getStandardSearchApiQueryResults = selection => fetchJson(`${IMGS_API_URL}filter/?query=${selection}`);

const getAdvancedSearchApiQueryResults = (selection, subject, type, accommodation, source) => {
  return fetchJson(`${IMGS_API_URL}filter/?query=${selection}&subject=${subject}&type=${type}&acc=${accommodation}&src=${source}`);
}

const shortenedSearchTerm = term => {
  if (term.length > 10) {
    return term.substr(0, 9) + '…';
  }

  return term;
};

const doStandardSearch = term => {
  return getStandardSearchApiQueryResults(term)
    .then(results => {
      browserAction.setBadgeText({ text: results.length.toString() });

      const shortTerm = shortenedSearchTerm(term);

      if (results.length === 0) {
        console.debug(`No results found for "${shortTerm}"`);
        return displayNotification(`No results for "${shortTerm}"`, 'Try another search term.');
      }

      if (results.length === 1) {
        console.debug(`One result found for "${shortTerm}"`);
        openUrl(results[0].permalink);
        return displayNotification(`One match found`, 'It has been opened in a new tab.');
      }

      console.debug(`${results.length} results found for "${shortTerm}"`);
      openUrl('https://imageshare.benetech.org/?page=search&q=' + term);
      displayNotification(`${results.length} matches for "${shortTerm}"`, 'They have been opened in a new tab.');
    })
    .catch(e => console.error('Unable to fetch standard search query results from API', e));
};

const doAdvancedSearch = (selection, userSubject, userType, userAcc, userSrc) => {
  const subject = normaliseSearchParameter(userSubject);
  const type = normaliseSearchParameter(userType);
  const accommodation = normaliseSearchParameter(userAcc);
  const source = normaliseSearchParameter(userSrc);

  selection = encodeURIComponent(selection);

  return getAdvancedSearchApiQueryResults(term, subject, type, accommodation, source)
    .then(results => {
      browserAction.setBadgeText({ text: results.length.toString() });

      shortTerm = shortenedSearchTerm(term);

      if (results.length === 0) {
        console.debug(`No results found for "${shortTerm}"`);
        return displayNotification(`No results for "${shortTerm}"`, 'Try another term or adjust search criteria.');
      }

      if (results.length === 1) {
        console.debug(`One result found for "${shortTerm}"`);

        const resultURL = results[0].permalink;
        openUrl(resultURL);

        return displayNotification(`One match found`, 'It has been opened in a new tab.');
      }

      console.debug(`${results.length} results found for "${shortTerm}"`);
      openUrl("https://imageshare.benetech.org/?page=search&q=" + term + "&subject=" + subject + "&type=" + type + "&acc=" + accommodation + "&src=" + source);
      displayNotification(`${results.length} matches for "${shortTerm}"`, 'They have been opened in a new tab.');
    })
    .catch(e => console.error('Unable to fetch advanced search query results from API', e));
};

// seperating standard from advanced calls
const handleMessagePayload = data => {
  if (data.type === SEARCH.STANDARD) {
    return doStandardSearch(data.selection);
  }

  if (data.type === SEARCH.ADVANCED) {

    return getStoredUserSettings().then(criteria => {
      // if criteria present then use, otherwise alert user and redirect to options
      if (!hasAdvancedSearchCriteriaDefined(criteria)) {
        //alert user to go to options and set criteria
        console.debug(`No pre-existing criteria, notifying user.`);
        displayNotification('No advanced search criteria set.', 'Configure these criteria on the options page.');
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

  if (msg.command === COMMAND.VIEW_TERM) {
    openUrl(getQueryUrl(msg.term));
    sendResponse();
  }

  // User Settings Notification
  if (msg.command && msg.command === COMMAND.NOTIFICATION) {
    displayNotification(msg.title, msg.message);
    sendResponse();
  }

  // Search initiated from popup.js
  if (msg.command && msg.command === COMMAND.SEARCH) {
    working();
    handleMessagePayload(msg).then(ready).then(sendResponse)
  }

  // Adjust icon for dark color scheme contrast
  if (msg.scheme && msg.scheme === DARK_SCHEME) {
    console.debug('Setting dark color scheme icons');
    browserAction.setIcon({
      path: LIGHT_ICON_PATHS
    });
    sendResponse();
  }

  return true;
};

startupBackgroundScript(onContextMenuClick, onExtensionMessage);