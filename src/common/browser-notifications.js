import Screenshot from '../../icons/Imageshare-logo-no-text-2000x2000.png';

export const displayNotification = (title, message) => {
	new Notification(title, {
		body: message,
		icon: Screenshot
  });
};