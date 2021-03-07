window.addEventListener("DOMContentLoaded",
function () {

//GET search input
const stSearchButton = document.getElementById("standard-search");
const advSearchButton = document.getElementById("advanced-search");
// const searchInput = document.getElementById("search");
// let userSearch = searchInput.value;

//window here is a seperate extension window, so we need this run in the content script instead to pull from the active tabs DOM
function selection(){
  if (window.getSelection) {
         return window.getSelection();
  } else {
         return "not found";
  }
}

//Run standard search from popup input
stSearchButton.addEventListener("click",
 function (info) {
  console.log(info);
  console.log("selection: " + selection());
  //Send a message to background to run onClickHandler(info, tab)
 }
);

advSearchButton.addEventListener("click",
 function (info) {
  console.log(info);
  console.log("selection: " + selection());
  //Send a message to background to run onClickHandler(info, tab)
 }
);


})
