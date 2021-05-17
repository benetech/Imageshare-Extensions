window.addEventListener("DOMContentLoaded",
function () {
//Version 2: With combined buttons for selection or input

//GET search buttons
const stSearchButton = document.getElementById("standard-search");
const advSearchButton = document.getElementById("advanced-search");
const searchInput = document.getElementById("search");
const span = document.getElementById("required");

//GET user input
let userSearch = searchInput.value;
console.log(`userSearch in input BEFORE selection added as value: ${userSearch} `)

//Is there a selection object present?
//Send a message to index to get selection
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {type: 'selection'}, function(response) {

    console.log(response)
    //response may indicate no selection found
    if (response === false) {

      //Else leave blank and prompt to input a search term
      //switch views from 1 to 2
      // [].forEach.call(els, function (el) {...});
      [].forEach.call(document.getElementsByClassName("view-one"), function(item) {item.style.display = "none";});
      [].forEach.call(document.getElementsByClassName("view-two"), function(item) {item.style.display = "block";});
    } else {
      //If so populate to input value
      searchInput.value = response
      userSearch = searchInput.value;
      console.log(`userSearch in input AFTERS selection added as value: ${userSearch}`)
    }
  });
});


// //Define selection as input's value
// let userSearch = searchInput.value;
// console.log(`userSearch in input after selection added as value: ${userSearch} `) //empty???

//Run search from popup
stSearchButton.addEventListener("click",
 function () {
  console.log("Standard Search button clicked");

  //check input for new value
  userSearch = searchInput.value;

  //send search request and selection to index
  if (userSearch.length > 0) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: 'search-only', subtype: 'standard', selection: userSearch}, function(response) {
      console.log(response)

    });
  });
} else {
  //highlight and box "no selection found" and alert for SRs
  searchInput.classList.add("no-entry");
  span.style.display = "block";
}
 })

advSearchButton.addEventListener("click",
 function () {
  console.log("Advanced Search button clicked");

  //check input for new value
  userSearch = searchInput.value;

  //send search request and selection to index
  if (userSearch.length > 0) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: 'search-only', subtype: 'advanced', selection: userSearch}, function(response) {
      console.log(response)

    });
  });
} else {
  //highlight and box "no selection found" and alert for SRs
  searchInput.classList.add("no-entry");
  span.style.display = "block";
}
 });
})
