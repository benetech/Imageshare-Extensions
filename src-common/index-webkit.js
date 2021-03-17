const NOTIFICATION_MESSAGE = 'notification';
const SEARCH_MESSAGE = 'search';

const RESPONSE_SEARCH_ISSUED = '__search_issued__';
const RESPONSE_SELECTION_EXPECTED = '__selection_expected__';

const PERMISSION_GRANTED = 'granted';
const PERMISSION_DENIED = 'denied';

import browser from 'get-browser';
import notification from 'show-notification';
import { getUserSelection } from './util';

const displayNotification = message => {
  	// Let's check whether notification permissions have already been granted
    if (Notification.permission === PERMISSION_GRANTED) {
		// If it's okay let's create a notification
		notification(message.title, message.message);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== PERMISSION_DENIED) {
		Notification.requestPermission().then(permission => {
        	// If the user accepts, let's create a notification
        	if (permission === PERMISSION_GRANTED) {
				notification(message.title, message.message);
        	}
      	});
    }
};

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.debug('[index.js] incoming message', message);

	if (message.type && message.type === NOTIFICATION_MESSAGE) {
		displayNotification(msg);
	}

	if (message.type && message.type === SEARCH_MESSAGE) {
		const selection = getUserSelection();

		if (selection !== null && selection.length) {
			browser.runtime.sendMessage({
				type: msg.type,
				subtype: msg.subtype,
				selection: userSelection
			});

			sendResponse(RESPONSE_SEARCH_ISSUED);
		} else {
			sendResponse(RESPONSE_SELECTION_EXPECTED);
		}
	}
  
  	return true; // keep the channel open
});
