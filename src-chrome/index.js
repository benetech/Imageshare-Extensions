console.log('Content script has loaded via Manifest V2.');

//For dev only REMOVE FOR PRODUCTION
chrome.storage.local.clear();

//Find user selection
function selection(){
  if (window.getSelection) {
         return window.getSelection().toString();
  }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'search'){
    let userSelection = selection();

    if (userSelection) {
      console.log('message received in index.js: ' + userSelection)
      //Send selection to background to run our search functions
      chrome.runtime.sendMessage({type: msg.type, subtype: msg.subtype,selection: userSelection});
      sendResponse("to popup.js from index.js")
    } else {
      console.log('no user selection found');
      sendResponse('run input')
      //prompt user to input search criteria
    }
  }
  return true; // keep the channel open
});
