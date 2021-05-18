import browser from 'get-browser';
import { getUserSelection, setMouseCursorBusy, setMouseCursorReady } from '../common/util';

const onExtensionMessage = (msg, _sender, sendResponse) => {
  // messages from popup.js

  if (msg.type === MESSAGE.SEARCH){
    const userSelection = getUserSelection();

    if (userSelection.trim().length) {
      console.debug('message received in index.js: ' + userSelection)
      //Send selection to background to run our search functions
      browser.runtime.sendMessage({
        type: msg.type,
        subtype: msg.subtype,
        selection: userSelection
      });

      sendResponse("to popup.js from index.js")
    } else {
      console.debug('no user selection found');
      // prompt user to input search criteria
      sendResponse('run input')
    }
  }

  if (msg.type === MSG.WORKING) {
    setMouseCursorBusy();
  }

  if (msg.type === MSG.READY) {
    setMouseCursorReady();
  }

  return true; // keep the channel open
};

export default () => {
  browser.runtime.onMessage.addListener(onExtensionMessage);
}