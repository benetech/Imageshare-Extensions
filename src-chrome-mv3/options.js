
window.addEventListener("DOMContentLoaded",
  function () {

    //GET advanced search criteria lists and populate them to drop-down
    const subjList = document.getElementById("subject");
    const typeList = document.getElementById("type");
    const accList = document.getElementById("accommodation");
    const srcList = document.getElementById("source");

    fetch(`https://imgsdev.wpengine.com/json-api/subjects/`, {
      method: 'GET',
    }).then(response => response.json())
      .then (json => {
      const subjects = json.data

      subjects.forEach(element => {
        const option = document.createElement('option');
          option.innerText = element.attributes.name;
          option.value = element.id;
          subjList.prepend(option);
      });
    })

    fetch(`https://imgsdev.wpengine.com/json-api/types/`, {
      method: 'GET',
    }).then(response => response.json())
      .then (json => {
      const types = json.data

      types.forEach(element => {
        const option = document.createElement('option');
          option.innerText = element.attributes.name;
          option.value = element.id;
          typeList.prepend(option);
      });
    })

    fetch(`https://imgsdev.wpengine.com/json-api/accommodations/`, {
      method: 'GET',
    }).then(response => response.json())
      .then (json => {
      const accommodations = json.data

      accommodations.forEach(element => {
        const option = document.createElement('option');
          option.innerText = element.attributes.name;
          option.value = element.id;
          accList.prepend(option);
      });
    })

    fetch(`https://imgsdev.wpengine.com/json-api/sources/`, {
      method: 'GET',
    }).then(response => response.json())
      .then (json => {
      const sources = json.data

      sources.forEach(element => {
        const option = document.createElement('option');
          option.innerText = element.attributes.name;
          option.value = element.id;
          srcList.prepend(option);
      });
    })

    //GET search input
    const stSearchButton = document.getElementById("standard-search");
    const searchInput = document.getElementById("search");

    //Code duplicated in Background.js
    //Recommend creating a shared access version for cleaner code

    function openImageshare (newURL) {
      chrome.tabs.create({
        url: newURL,
           active: false
        });
    }

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

              } else {
              console.log(`${results.length} found for ${selection}`);
              openImageshare(newURL);
            }
          })
            .catch(error => console.error('On GET data error', error));
    }

    //Advance search function
    //Consider combining search functions for cleaner code

    function runAPIadvanced (selection, userSubject, userType, userAcc, userSrc) {
      //Imageshare API
      const IMGS_API_URL = 'https://imgsdev.wpengine.com/json-api/resources/';
      const newURL = "https://imageshare.benetech.org/?page=search&q=" + selection + "&subject=" + userSubject + "&type=" + userType + "&acc=" + userAcc + "&src=" + userSrc;

      //Send a GET request to API to determine if selection matches search results
      fetch(`${IMGS_API_URL}filter/?query=${selection}&subject=${userSubject}&type=${userType}&acc=${userAcc}&src=${userSrc}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          // console.log('Response from Imageshare: ' + json.data);
          const results = json.data;

          if (results.length === 0) {
            console.log(`No results found for ${selection}`);

          } else {
          console.log(`${results.length} found for ${selection}`);
          openImageshare(newURL);
        }
      })
        .catch(error => console.error('On GET data error', error));
}

    // Run standard search from popup input
    stSearchButton.addEventListener("click",
     function () {
        let userSearch = searchInput.value;
        console.log(userSearch);
        runAPIstandard(userSearch);
     }
    );

    // Advanced Search
    const advSearchButton = document.getElementById("advanced-search")

    advSearchButton.addEventListener("click",
    function () {
       let userSearch = searchInput.value;
       const userSubject = subjList.value;
       const userType = typeList.value;
       const userAcc = accList.value;
       const userSrc = srcList.value;

       console.log(userSearch + "advanced");
       runAPIadvanced(userSearch, userSubject, userType, userAcc, userSrc);
    }
   );


  }
)



