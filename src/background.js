console.log("Service-worker has loaded via background.js.");

// The onClicked callback function.
function onClickHandler(info, tab) {

    // console.log("item " + info.menuItemId + " was clicked");
    // console.log("info: " + JSON.stringify(info));
    // console.log("tab: " + JSON.stringify(tab));
    console.log("Selection Object: " + JSON.stringify(info.selectionText));

    let selection = info.selectionText;
    let optionClicked = info.menuItemId;
    let newURL = "https://imageshare.benetech.org/?page=search&q=" + selection;

    if (optionClicked === "standard selection"){
      console.log("Standard Option: search " + selection); //works
      // open Imageshare in new tab with selection search results
      chrome.tabs.create(
        {
          url: newURL,
          active: false
        }
      );


    }
    else
    if (optionClicked === "advanced selection") {
      console.log("Advanced Option: search " + selection); //works
      // get advanced settings from user preferences, open Imageshare in new tab with selection plus advanced criteria search results
    }
    else {
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

    // Testing menu item creation
    // console.log("'" + context + "' item:" + id);
  }


  // Intentionally create an invalid item, to show off error checking in the
  // create callback.
  // console.log("About to try creating an invalid item - an error about " +
  //     "duplicate item child1 should show up");
  // chrome.contextMenus.create({"title": "ErrorTests", "id": "child1 selection"}, function() {
  //   if (chrome.extension.lastError) {
  //     console.log("Got expected error: " + chrome.extension.lastError.message);
  //   }
  // });
});
