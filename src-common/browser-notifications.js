import Screenshot from '../screenshot.jpg';

export const displayNotification = (title, message) => {
	new Notification(title, {
		body: message,
		icon: Screenshot
  });
};