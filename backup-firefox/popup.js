window.addEventListener("DOMContentLoaded",
function () {

//GET search buttons
const stSearchButton = document.getElementById("standard-search");
const advSearchButton = document.getElementById("advanced-search");
const stInputButton = document.getElementById("standard-search-input");
const advInputButton = document.getElementById("advanced-search-input");

//Run search from popup with selection
stSearchButton.addEventListener("click",
 function () {
  console.log("Standard Search button clicked");
  //Send a message to content script to get selection
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {type: 'search', subtype: 'standard'}, function(response) {
      //response may indicate no selection found
      // console.log(response);
      if (response === 'run input') {
        //switch views from 1 to 2
        document.getElementById("view-one").style.display = "none";
        document.getElementById("view-two").style.display = "block";
      }
    });
  });

 }
);

advSearchButton.addEventListener("click",
 function () {
  console.log("Advanced Search button clicked");

  //Send a message to content script to get selection
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {type: 'search', subtype: 'advanced'}, function(response) {
      //response may indicate no selection found
      // console.log(response);
      if (response === 'run input') {
        //switch views from 1 to 2
        document.getElementById("view-one").style.display = "none";
        document.getElementById("view-two").style.display = "block";
      }
    });
  });

 }
);

// Run search from popup with input
stInputButton.addEventListener("click",
 function () {
  console.log("Standard Search button clicked");
  const searchInput = document.getElementById("search");
  let userSearch = searchInput.value;
  //Send a message to background to run
  console.log(userSearch);
  browser.runtime.sendMessage({type: 'input', subtype: 'standard', selection: userSearch})

 }
);

advInputButton.addEventListener("click",
 function () {
  console.log("Advanced Search button clicked");
  const searchInput = document.getElementById("search");
  let userSearch = searchInput.value;
  //Send a message to background to run
  console.log(userSearch);
  browser.runtime.sendMessage({type: 'input', subtype: 'advanced', selection: userSearch})
 }
);
})
