window.addEventListener("DOMContentLoaded",
  function () {

    //GET advanced search criteria lists and populate them to drop-down
    const subjList = document.getElementById("subject");
    const typeList = document.getElementById("type");
    const accList = document.getElementById("accommodation");
    const srcList = document.getElementById("source");

    // run API calls
    function getAdvOptions () {

      // Promise.all([
      //   fetch(`https://imgsdev.wpengine.com/json-api/subjects/`, {
      //     method: 'GET'
      //   }).then(resp => resp.json()),
      //   fetch(`https://imgsdev.wpengine.com/json-api/types/`, {
      //     method: 'GET'
      //   }).then(resp => resp.json()),
      //   fetch(`https://imgsdev.wpengine.com/json-api/accommodations/`, {
      //     method: 'GET'
      //   }).then(resp => resp.json()),
      //   fetch(`https://imgsdev.wpengine.com/json-api/sources/`, {
      //     method: 'GET',
      //   })
      // ]).then(resp => resp.json())
      //   .then(json => {
      //     const subjects = json.data
      //     console.log("consolidated fetch running: " + JSON.stringify(subjects));
      //     //save to storage
      //   })

      fetch(`https://imgsdev.wpengine.com/json-api/subjects/`, {
        method: 'GET',
      }).then(response => response.json())
        .then (json => {
        const subjects = json.data

        chrome.storage.local.set({
          'criteria': {
            'subjects': subjects,
          }
        }, function () {console.log(`Subjects set to local storage`)})
      })
      fetch(`https://imgsdev.wpengine.com/json-api/types/`, {
        method: 'GET',
      }).then(response => response.json())
        .then (json => {
        const types = json.data

        chrome.storage.local.set({
          'criteria': {
            'types': types,
          }
        }, function () {console.log(`Types set to local storage`)})
      })
      fetch(`https://imgsdev.wpengine.com/json-api/accommodations/`, {
        method: 'GET',
      }).then(response => response.json())
        .then (json => {
        const accommodations = json.data

        chrome.storage.local.set({
          'criteria': {
            'accommodations': accommodations,
          }
        }, function () {console.log(`Accommodations set to local storage`)})
      })
      fetch(`https://imgsdev.wpengine.com/json-api/sources/`, {
        method: 'GET',
      }).then(response => response.json())
        .then (json => {
        const sources = json.data

        chrome.storage.local.set({
          'criteria': {
            'sources': sources,
          }
        }, function () {console.log(`Sources set to local storage`)})
      })
  }

    function createOptions (optionsObj) {
      // run foreach on saved lists
          optionsObj.subjects.forEach(element => {
            const option = document.createElement('option');
              option.innerText = element.attributes.name;
              option.value = element.id;
              subjList.prepend(option);
          });
          optionsObj.types.forEach(element => {
            const option = document.createElement('option');
              option.innerText = element.attributes.name;
              option.value = element.id;
              typeList.prepend(option);
          });
          optionsObj.accommodations.forEach(element => {
            const option = document.createElement('option');
              option.innerText = element.attributes.name;
              option.value = element.id;
              accList.prepend(option);
          });
          optionsObj.sources.forEach(element => {
            const option = document.createElement('option');
              option.innerText = element.attributes.name;
              option.value = element.id;
              srcList.prepend(option);
          });
    }

    //check storage for advnaced search criteria lists
    function getStorage () {
      chrome.storage.local.get(['criteria'],
        function(result) {
          console.log("Storage check from options.js: " + JSON.stringify(result.criteria));
          const advOptions = result.criteria;
          // const timeStamp = advOptions.timestamp;

          if (advOptions === undefined) {
            // run api calls and save to storage
            getAdvOptions();

            getStorage();
            /// NOTES: get storage apears to be running too quickly before all our apis are called and stored. Also the seperate calls may be over riding each other as all that has stayed in storage is our TYPES object.

          } else {
            createOptions(advOptions);
          }
      })
    }

    getStorage();
    //GET search input
    // const stSearchButton = document.getElementById("standard-search");
    // const searchInput = document.getElementById("search");

    // Run standard search from popup input
    // stSearchButton.addEventListener("click",
    //  function () {
    //     let userSearch = searchInput.value;
    //     console.log(userSearch);
    //     runAPIstandard(userSearch);
    //  }
    // );

    // Advanced Search
    const advSaveButton = document.getElementById("advanced-criteria-save")

    advSaveButton.addEventListener("click",
    function () {
      //  let userSearch = searchInput.value;
       const userSubject = subjList.value;
       const userType = typeList.value;
       const userAcc = accList.value;
       const userSrc = srcList.value;
       const timeStamp = Date.now();

      console.log("Save clicked");
      //  runAPIadvanced(userSearch, userSubject, userType, userAcc, userSrc);

      // save user criteria to local storage
      chrome.storage.sync.set({
        'settings': {
          'subject': userSubject,
          'type': userType,
          'accommodation': userAcc,
          'source': userSrc,
          'timestamp': timeStamp
        }
      }, function () {console.log(`Storage set`)})
    }
   );


  }
)




