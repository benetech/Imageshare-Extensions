console.log('Background script has loaded via background.js.');
// hot reload cannot be run on service worker
// import "crx-hotreload";

// The onClicked callback function.
function onClickHandler(info, tab) {

    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));

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
      {"title": "Run Standard Search", "contexts":[context], "parentId": "parent " + context, "id": "child1 " + context});
    chrome.contextMenus.create(
      {"title": "Run Advanced Search", "contexts":[context], "parentId": "parent " + context, "id": "child2 " + context});

    // Testing menu item creation
    // console.log("'" + context + "' item:" + id);
  }


});
