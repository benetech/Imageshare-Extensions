import Screenshot from '../../icons/Imageshare-logo-no-text-2000x2000.png';
import browser from 'get-browser';

export const displayNotification = (title, message) => {
	new Notification(title, {
		body: message,
		icon: Screenshot
  });
};

export const sendNotificationMessage = displayNotification;

export const backgroundNotification = (title, message) => {
	browser.tabs.query({active: true, currentWindow: true}, tabs => {
		browser.tabs.sendMessage(tabs[0].id, {
		  type: 'notification',
		  title: title,
		  message: message,
		  icon: Screenshot,
		}, response => {
		  console.debug('response', response);
    });
  });
}