import Screenshot from '../icons/Imageshare-logo-no-text-2000x2000.png';
import browser from 'get-browser';

const extensionNotification = (title, message) => browser.notifications.create('', {
  title: title,
  message: message,
  iconUrl: Screenshot,
  type: 'basic'
});

export const displayNotification = (title, message) => {
  return chrome.runtime.sendMessage('', {
    type: 'notification',
    options: {
      title: 'Success!',
      message: 'Your advanced search criteria have been saved.',
    }
  });
};