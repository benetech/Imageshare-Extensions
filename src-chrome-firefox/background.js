console.log("Background has loaded via background.js.");

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
        chrome.notifications.create('', {
          title: `No results found for ${selection}`,
          message: 'Please try another selection',
          iconUrl: './icons/Imageshare-logo-no-text.png',
          type: 'basic'
        });

      } else if (results.length === 1) {
        console.log(`${results.length} found for ${selection}`);
        let resultURL = results[0].permalink;
        console.log(resultURL)
        openImageshare(resultURL);
        chrome.notifications.create('', {
          title: `${results.length} result found for ${selection}`,
          message: 'Your Imageshare result has been opened for you in a new tab.',
          iconUrl: '/screenshot.jpg',
          type: 'basic'
        });
      } else {
      console.log(`${results.length} found for ${selection}`);
      openImageshare(newURL);
      chrome.notifications.create('', {
        title: `${results.length} results found for ${selection}`,
        message: 'Imageshare has been opened for you in the next tab. Your results are waiting for you there.',
        iconUrl: './icons/Imageshare-logo-no-text.png',
        type: 'basic'
      });
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
            chrome.notifications.create('', {
              title: `No results found for ${selection}`,
              message: 'Please try another selection or adjust your Advanced Search criteria via this extensions "OPTIONS" page',
              iconUrl: './icons/Imageshare-logo-no-text.png',
              type: 'basic'
            });


          } else if (results.length === 1) {
              console.log(`${results.length} found for ${selection}`);
              let resultURL = results[0].permalink;
              console.log(resultURL)
              openImageshare(resultURL);
              chrome.notifications.create('', {
                title: `${results.length} result found for ${selection}`,
                message: 'Your Imageshare result has been opened for you in a new tab.',
                iconUrl: '/screenshot.jpg',
                type: 'basic'
              });
          } else {

          console.log(`${results.length} found for ${selection}`);
          openImageshare(newURL);
          chrome.notifications.create('', {
            title: `${results.length} results found for ${selection}`,
            message: 'Imageshare has been opened for you in the next tab. Your results are waiting for you there.',
            iconUrl: './icons/Imageshare-logo-no-text.png',
            type: 'basic'
          });
        }
      })
        .catch(error => console.error('On GET data error', error));
}

// seperating standard from advanced calls
function subtypeHandling (data) {
  if (data.subtype === 'standard') {
    runAPIstandard(data.selection);

  } else if (data.subtype === 'advanced') {
    // get criteria
    chrome.storage.sync.get(['settings'],
      function(result) {
        const criteria = result.settings;

        // if criteria present then use, otherwise alert user and redirect to options
        if (criteria === undefined){
          //alert user to go to options and set criteria
          console.log(`You have not yet set criteria for advanced searching. Please go to options to enable Advanced Search`);

          chrome.notifications.create('', {
            title: 'You have not yet set criteria for advanced searching.',
            message: 'Please navigate to this extensions "OPTIONS" page to set your Advance Search preferred search criteria. Extensions > Imageshearch - More Actions > Options',
            iconUrl: './icons/Imageshare-logo-no-text.png',
            type: 'basic'
          });

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

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {

  // Create one menu item for each context type.
  // NOTE: available contexts = "page","selection","link","editable","image","video","audio". Code is set up ready for the future addition of contexts via the contexts veriable.
  var contexts = "selection";

    var context = contexts;
    var title = "Imageshare Search";
    // var id = "context" + context;

     // Create a parent item and two children.
    chrome.contextMenus.create({"title": title, "contexts":[context],"id": "parent " + context});
    chrome.contextMenus.create(
      {"title": "Run Standard Search", "contexts":[context], "parentId": "parent " + context, "id": "standard"});
    chrome.contextMenus.create(
      {"title": "Run Advanced Search", "contexts":[context], "parentId": "parent " + context, "id": "advanced"});

  // Firefox only bookmark menu edit
  // if firefox
  const getBrowser = () => {
    function onCreated () {
      if (browser.runtime.lastError || chrome.runtime.lastError) {
        console.log("error creating item:" + browser.runtime.lastError);
      } else {
        console.log("item created successfully");

        // create listener for this item that launches Options page onClick
        browser.menus.onClicked.addListener(() => {
          if (browser.runtime.openOptionsPage) {
            browser.runtime.openOptionsPage();
          } else {
            window.open(browser.runtime.getURL('options.html'));
          }
        })
      }
    }

    if (browser === undefined) {
      return
    }
    if (browser !== undefined) {
      // create bookmark context menu item Options
      browser.menus.create({
        id: "Options",
        type: "normal",
        title: "Options",
        contexts: ["browser_action"],
      }, onCreated);

    }
    else {throw new ReferenceError('Unable to obtain browser object')}

  }; getBrowser();

});



//message handling
chrome.runtime.onMessage.addListener(function(data, sender, sendResponse) {
  // User Settings Notification
  if (data.type === 'notification') {
    console.log("message received " + JSON.stringify(data.options));
    chrome.notifications.create('', data.options);
  }

  // Search innitiated from popup.js
  if (data.type === 'search') {
    subtypeHandling(data);
  }

  // Search innitiated from popup.js input
  if (data.type === 'input') {
    subtypeHandling(data);
  }

  sendResponse();
});
