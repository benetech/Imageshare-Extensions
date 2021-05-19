console.log("Background has loaded via background.js.");

// notifications
function notification (title, message) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: 'notification',
      title: title,
      message: message,
      icon: './icons/Imageshare-logo-no-text-2000x2000.png'
    }, function(response) {
      console.log('response', response);
    });
  });
}

// open Imageshare in new tab with selection search results
function openImageshare (newURL) {
  chrome.storage.sync.get(['active'],
  function(result) {
    chrome.tabs.create({
      url: newURL,
         active: result.active
      });
  });
}

// open Options in a new tab
function openOptions () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}

// run a standard search
function runAPIstandard (selection) {
  //Imageshare API
  const IMGS_API_URL = 'https://imgsdev.wpengine.com/json-api/resources/';
  const newURL = "https://imageshare.benetech.org/?page=search&q=" + selection;

  //Send a GET request to API to determine if selection matches search results
  fetch(`${IMGS_API_URL}filter/?query=${selection}`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(json => {
      // console.log('Response from Imageshare: ' + json.data);
      const results = json.data;

      if (results.length === 0) {
        console.log(`No results found for ${selection}`);
        notification(`No results found for ${selection}`, 'Please try another selection');

      } else if (results.length === 1) {
        console.log(`${results.length} found for ${selection}`);
        let resultURL = results[0].permalink;
        console.log(resultURL)
        openImageshare(resultURL);
        notification(`${results.length} result found for ${selection}`, 'Your Imageshare result has been opened for you in a new tab.');

      } else {
      console.log(`${results.length} found for ${selection}`);
      openImageshare(newURL);
      notification(`${results.length} results found for ${selection}`, 'Imageshare has been opened for you in the next tab. Your results are waiting for you there.');
    }
  })
    .catch(error => console.error('On GET data error', error));
}

// run an advanced search
function runAPIadvanced (selection, userSubject, userType, userAcc, userSrc) {
      //Imageshare API
      const IMGS_API_URL = 'https://imgsdev.wpengine.com/json-api/resources/';
      const newURL = "https://imageshare.benetech.org/?page=search&q=" + selection + "&subject=" + userSubject + "&type=" + userType + "&acc=" + userAcc + "&src=" + userSrc;

      //Send a GET request to API to determine if selection matches search results
      // *** ERROR: this fetch is only checking the selection, without the added criteria. Awating API's ability to manage this kind of call
      fetch(`${IMGS_API_URL}filter/?query=${selection}&subject=${userSubject}&type=${userType}&acc=${userAcc}&src=${userSrc}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          // console.log('Response from Imageshare: ' + json.data);
          const results = json.data;

          if (results.length === 0) {
            console.log(`No results found for ${selection}`);
            notification(`No results found for ${selection}`, 'Please try another selection or adjust your Advanced Search criteria via this extensions "OPTIONS" page');


          } else if (results.length === 1) {
            console.log(`${results.length} found for ${selection}`);
            let resultURL = results[0].permalink;
            openImageshare(resultURL);
            notification(`${results.length} result found for ${selection}`, 'Your Imageshare result has been opened for you in a new tab.');

        } else {
          console.log(`${results.length} found for ${selection}`);
          openImageshare(newURL);
          notification(`${results.length} results found for ${selection}`, 'Imageshare has been opened for you in the next tab. Your results are waiting for you there.');
        }
      })
        .catch(error => console.error('On GET data error', error));
}

// seperating standard from advanced calls
function subtypeHandling (data) {
    if (data.subtype=== "standard"){
      runAPIstandard(data.selection);

    } if (data.subtype === "advanced") {
      // get criteria
      chrome.storage.sync.get(['settings'],
        function(result) {
          const criteria = result.settings;

          // if criteria present then use, otherwise alert user and redirect to options
          if (criteria === undefined){
            //alert user to go to options and set criteria
            console.log(`You have not yet set criteria for advanced searching. Please go to options to enable Advanced Search`);
            notification('You have not yet set criteria for advanced searching.', 'The Imageshare "OPTIONS" page has been opened for you and is now your active tab. Please set your Advanced Search preferred search criteria.');
            openOptions();

          } else {
            console.log(JSON.stringify(criteria))
            runAPIadvanced(data.selection, criteria.subject, criteria.type, criteria.accommodation, criteria.source);
          }
        })
    }
}

// The onClicked callback function.
function onClickHandler(info, tab) {
    //Test receipt selection object
    console.log("Selection Object: " + JSON.stringify(info.selectionText));

    //Extract selection
    let selection = info.selectionText;
    let option = info.menuItemId;

    let data = {subtype: option, selection: selection}

    //Initiate search by subtype
    subtypeHandling(data);

}

chrome.contextMenus.onClicked.addListener(onClickHandler);



  // Create one menu item for each context type.
  // NOTE: available contexts = "page","selection","link","editable","image","video","audio". Code is set up ready for the future addition of contexts via the contexts veriable.
  var contexts = "selection";

    var context = contexts;
    var title = "Imageshare Search";

     // Create a parent item and two children.
    chrome.contextMenus.create({"title": title, "contexts":[context],"id": "parent " + context});
    chrome.contextMenus.create(
      {"title": "Run Standard Search", "contexts":[context], "parentId": "parent " + context, "id": "standard"});
    chrome.contextMenus.create(
      {"title": "Run Advanced Search", "contexts":[context], "parentId": "parent " + context, "id": "advanced"});


chrome.runtime.onMessage.addListener(function(data, sender, sendResponse) {

  // Search innitiated from popup.js
  if (data.type === 'search') {
    subtypeHandling(data);
  }

  // Search innitiated from popup.js input
  if (data.type === 'input') {
    subtypeHandling(data);
  }

  //dark mode icon toggle
  if (data.scheme === 'dark') {
    chrome.browserAction.setIcon({
      path : {
        "16": "./icons/Imageshare-logo-no-text-white.png",
        "48": "./icons/Imageshare-logo-no-text-white.png",
        "128": "./icons/Imageshare-logo-no-text-white.png",
        "512": "./icons/Imageshare-logo-no-text-white.png",
        "1024": "./icons/Imageshare-logo-no-text-white.png"
      }
    })
  }

  sendResponse();
});
