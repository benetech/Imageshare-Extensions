import Screenshot from '../../icons/Imageshare-logo-no-text-2000x2000.png';
import browser from 'get-browser';

export const displayNotification = (title, message) => browser.notifications.create('', {
  title: title,
  message: message,
  iconUrl: Screenshot,
  type: 'basic'
});

export const sendNotificationMessage = (title, message) => {
  return browser.runtime.sendMessage('', {
    type: 'notification',
    options: {
      title: title,
      message: message,
    }
  });
};

export const backgroundNotification = sendNotificationMessage;
