window.addEventListener("DOMContentLoaded",
function () {
//Version 2: With combined buttons for selection or input

//GET search buttons
const stSearchButton = document.getElementById("standard-search");
const advSearchButton = document.getElementById("advanced-search");
const searchInput = document.getElementById("search");

//Is there a selection object present?
//Send a message to content script to get selection
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {type: 'search', subtype: 'standard'}, function(response) {
    //response may indicate no selection found
    // console.log(response);
    if (response === 'run input') {
      //switch views from 1 to 2
      document.getElementById("view-one").style.display = "none";
      document.getElementById("view-two").style.display = "block";
    }
  });
//If so populate to input value,
searchInput.value =
//Else leave blank and prompt to input a search term

//Define selection as input's value
let userSearch = searchInput.value;

//Run search from popup
stSearchButton.addEventListener("click",
 function () {
  console.log("Standard Search button clicked");



 })

advSearchButton.addEventListener("click",
 function () {
  console.log("Advanced Search button clicked");


 })



})
