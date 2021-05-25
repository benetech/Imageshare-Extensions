import Screenshot from '../../icons/Imageshare-logo-no-text.png';
import browser from 'get-browser';

export const displayNotification = (title, message) => browser.notifications.create('', {
  title: title,
  message: message,
  iconUrl: Screenshot,
  type: 'basic'
});