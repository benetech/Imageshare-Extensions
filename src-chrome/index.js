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
    } else {
      console.log('no user selection found');
      //prompt user to input search criteria
    }


  }

  sendResponse({note: "to popup.js from index.js"})
  return true; // keep the channel open
});
