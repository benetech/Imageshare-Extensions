window.addEventListener("DOMContentLoaded",
function () {
//Version 2: With combined buttons for selection or input

//GET search buttons
const stSearchButton = document.getElementById("standard-search");
const advSearchButton = document.getElementById("advanced-search");
const searchInput = document.getElementById("search");

//Is there a selection object present?
//Send a message to index to get selection
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {type: 'selection'}, function(response) {

    //response may indicate no selection found
    if (response === false) {

      //Else leave blank and prompt to input a search term
      //switch views from 1 to 2
      //Don't forget to edit HTML accordingly
      document.getElementById("view-one").style.display = "none";
      document.getElementById("view-two").style.display = "block";
    } else {
      //If so populate to input value
      searchInput.value = response
    }
  });
});


//Define selection as input's value
let userSearch = searchInput.value;

//Run search from popup
stSearchButton.addEventListener("click",
 function () {
  console.log("Standard Search button clicked");

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: 'search-only', subtype: 'standard', selection: userSearch}, function(response) {
      console.log(response)

    });
  });


 })

advSearchButton.addEventListener("click",
 function () {
  console.log("Advanced Search button clicked");

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: 'search-only', subtype: 'advanced', selection: userSearch}, function(response) {
      console.log(response)

    });
  });

 });



})
