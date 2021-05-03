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

  //messages from popup.js
  if (msg.type === 'search'){
    let userSelection = selection();

    if (userSelection) {
      console.log('from index user selection is: ' + userSelection)
      //Send selection to background to run our search functions

      chrome.runtime.sendMessage({type: msg.type, subtype: msg.subtype,selection: userSelection});
      sendResponse("to popup.js from index.js")


    } else {
      console.log('no user selection found');
      sendResponse('run input')
      //prompt user to input search criteria
    }
  }

  if (msg.type === 'working') {
    document.body.style.cursor = "wait";
  }

  if (msg.type === 'reset') {
    document.body.style.cursor = "default";
  }

  return true; // keep the channel open
});
