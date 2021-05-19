console.log("Content script has loaded via Manifest V3.");


//For dev only REMOVE FOR PRODUCTION
chrome.storage.local.clear();

// Dark Mode Recognition
if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
  chrome.runtime.sendMessage({ scheme: "dark" })
}

//Notifications from Background
function notifyMe (msg) {
  const title = msg.title;
  var options = {
       body: msg.message,
       icon: msg.icon
       }

  // Let's check whether notification permissions have already been granted
    if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification(title, options);

    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification(title, options);

        }
      });
    }
}

//Find user selection
function selection(){
  if (window.getSelection) {
         return window.getSelection().toString();
  }
}


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'notification') {
    notifyMe(msg);
  }

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
