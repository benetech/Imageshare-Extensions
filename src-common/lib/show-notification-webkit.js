import Screenshot from '../screenshot.jpg';

export default (title, message) => {
   	new Notification(title, {
		body: message,
		icon: Screenshot
   });
}