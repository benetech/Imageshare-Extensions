import Screenshot from '../screenshot.jpg';
import browser from 'get-browser';

export default (title, message) => browser.notifications.create('', {
    title: title,
    message: message,
    iconUrl: Screenshot,
	type: 'basic'
});