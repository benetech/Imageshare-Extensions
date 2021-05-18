import browser from 'get-browser';
import { MESSAGE } from '../common/constants';
import { getUserSelection } from '../common/util';

const PERMISSION_GRANTED = 'granted';
const PERMISSION_DENIED = 'denied';

const handleNotification = payload => {
  const title = payload.title;

  const options = {
    body: payload.message,
    icon: payload.icon
  };
  
  // Let's check whether notification permissions have already been granted
  if (Notification.permission === PERMISSION_GRANTED) {
    // If it's okay let's create a notification
    return new Notification(title, options);
  }

  // Otherwise, we need to ask the user for permission
  if (Notification.permission !== PERMISSION_DENIED) {
    Notification.requestPermission().then(permission => {
      // If the user accepts, let's create a notification
      if (permission === PERMISSION_GRANTED) {
        new Notification(title, options);
      }
    });
  }
};

const onExtensionMessage = (msg, _sender, sendResponse) => {
  if (msg.type === MESSAGE.NOTIFICATION) {
    handleNotification(msg);
  }

  else if (msg.type === MESSAGE.SEARCH){
    const userSelection = getUserSelection();

    if (userSelection.trim().length) {
      console.log('message received in index.js: ' + userSelection)
      //Send selection to background to run our search functions
      browser.runtime.sendMessage({type: msg.type, subtype: msg.subtype,selection: userSelection});
      sendResponse("to popup.js from index.js")
    } else {
      console.log('no user selection found');
      sendResponse('run input')
      //prompt user to input search criteria
    }
  }

  sendResponse();

  return true; // keep the channel open
}

export default () => browser.runtime.onMessage.addListener(onExtensionMessage);