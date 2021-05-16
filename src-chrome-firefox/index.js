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

  //messages from popup.js
  if(msg.type === 'selection') {
    let userSelection = selection()

    if (userSelection) {
      sendResponse(userSelection)
    }
    else {
      sendResponse(false)
    }
  }

  if (msg.type === 'search-only') {
    //send search request to background for run
    chrome.runtime.sendMessage({type: 'search', subtype: msg.subtype, selection: msg.selection});

    sendResponse("Search request recieved by index and sent to background")
  }

  return true; // keep the channel open
});
