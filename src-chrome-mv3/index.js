console.log("Content script has loaded via Manifest V3.");


//For dev only REMOVE FOR PRODUCTION
chrome.storage.local.clear();

//Notifications from Background
function notifyMe (msg) {
  console.log("msg: " + JSON.stringify(msg));
  // Let's check whether notification permissions have already been granted
  if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  notifyMe(msg).then(sendResponse);
  return true; // keep the channel open
});
