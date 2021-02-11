console.log("Service-worker has loaded via background.js.");

// open Imageshare in new tab with selection search results
function openImageshare (newURL) {
    chrome.tabs.create({
      url: newURL,
         active: false

      },function (tab) {
          // for dev only, removed for production
          console.log("Tab Object: " + JSON.stringify(tab));
      }
    );
}

// Standard Imageshare Search
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
        const tabId = chrome.tabs.getCurrent();
        console.log("Tab ID: " + Object.keys(tabId));
        chrome.scripting.executeScript({
          target: {tabId: tabId},
          // 'found': false,
          // 'message': `No results found for ${selection}`,
          files: ['alerts.js']
        });

      } else {
        console.log(`${results.length} found for ${selection}`);
        const tabId = chrome.tabs.getCurrent();
        console.log("Tab ID: " + Object.keys(tabId));
        chrome.scripting.executeScript({
          target: {tabId: tabId},
          // 'found': true,
          // 'message': `${results.length} found for ${selection}`,
          files: ['alerts.js']
        });
        openImageshare(newURL);
    }
  })
    .catch(error => console.error('On GET data error', error));
}

// The onClicked callback function.
function onClickHandler(info, tab) {
    //Test receipt selection object
    console.log("Selection Object: " + JSON.stringify(info.selectionText));

    //Extract selection
    let selection = info.selectionText;
    let option = info.menuItemId;

    //Initiate standard search
    if (option === "standard selection"){
      console.log("Standard Option: search " + selection); //work
      runAPIstandard(selection);

    } if (option === "advanced selection") {
      console.log("Advanced Option: search " + selection); //works
      // runAPIadvanced(selection);

      // get advanced settings from user preferences, open Imageshare in new tab with selection plus advanced criteria search results
    } else {
        console.log("Error handling");
    }
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {

  // Create one menu item for each context type.
  // available contexts = "page","selection","link","editable","image","video","audio"
  var contexts = [ "selection", "link", "image", "video", "audio"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Imageshare Search";
    var id = "context" + context;

     // Create a parent item and two children.
    chrome.contextMenus.create({"title": title, "contexts":[context],"id": "parent " + context});
    chrome.contextMenus.create(
      {"title": "Run Standard Search", "contexts":[context], "parentId": "parent " + context, "id": "standard " + context});
    chrome.contextMenus.create(
      {"title": "Run Advanced Search", "contexts":[context], "parentId": "parent " + context, "id": "advanced " + context});
  }
});
