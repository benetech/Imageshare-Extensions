import browser from 'get-browser';
import { getUserSelection } from './util';

const SEARCH_MESSAGE = 'search';

//For dev only REMOVE FOR PRODUCTION
browser.storage.local.clear();

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === SEARCH_MESSAGE){
    const userSelection = getUserSelection();

    if (userSelection) {
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
  
  return true; // keep the channel open
});

