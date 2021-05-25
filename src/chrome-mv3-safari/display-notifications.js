import browser from 'get-browser';
import { withActiveTab } from '../common/util';
import { COMMAND, TARGET } from '../common/constants';

const screenShot = browser.runtime.getURL('icons/Imageshare-logo-no-text.png');

export const createNotification = (title, message) => {
	new Notification(title, {
		body: message,
		icon: screenShot
  });
};

export const displayNotification = (title, message) => {
	withActiveTab(tab => {
		browser.tabs.sendMessage(tab.id, {
			command: COMMAND.NOTIFICATION,
			target: TARGET.CONTENT,
			title: title,
			message: message,
			icon: screenShot,
		  });
	});
}