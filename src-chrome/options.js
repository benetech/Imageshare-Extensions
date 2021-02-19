window.addEventListener("DOMContentLoaded",
  function () {

    //GET advanced search criteria lists and populate them to drop-down
    const subjList = document.getElementById("subject");
    const typeList = document.getElementById("type");
    const accList = document.getElementById("accommodation");
    const srcList = document.getElementById("source");

    // run API calls
    function getAdvOptions (_callback) {

      Promise.all([
        fetch(`https://imgsdev.wpengine.com/json-api/subjects/`, {
          method: 'GET'
        }).then(resp => resp.json()),
        fetch(`https://imgsdev.wpengine.com/json-api/types/`, {
          method: 'GET'
        }).then(resp => resp.json()),
        fetch(`https://imgsdev.wpengine.com/json-api/accommodations/`, {
          method: 'GET'
        }).then(resp => resp.json()),
        fetch(`https://imgsdev.wpengine.com/json-api/sources/`, {
          method: 'GET'
        }).then(resp => resp.json())
      ]).then(resp => {
          //response here is an array of objects
          // console.log("Array 0: " + JSON.stringify(resp[0]));
          // console.log("Array 1: " + JSON.stringify(resp[1]));
          // console.log("Array 2: " + JSON.stringify(resp[2]));
          console.log("Array 3: " + JSON.stringify(resp[3]));
          const subjects = resp[0];
          const types = resp[1];
          const accommodations = resp[2];
          //sources is coming back an empty obj
          const sources = resp[3];

          //save to storage
          chrome.storage.local.set({
            'criteria': {
              'subjects': subjects,
              'types': types,
              'accommodations': accommodations,
              'sources': sources
            }
          }, function () {console.log(`Criteria set to local storage`)})
        })
        .then(_callback())
   }

    function createOptions (optionsObj) {
      console.log("optionsObj: " + JSON.stringify(optionsObj));
      // run foreach on saved lists
          optionsObj.subjects.data.forEach(element => {
            const option = document.createElement('option');
              option.innerText = element.attributes.name;
              option.value = element.id;
              subjList.prepend(option);
          });
          optionsObj.types.data.forEach(element => {
            const option = document.createElement('option');
              option.innerText = element.attributes.name;
              option.value = element.id;
              typeList.prepend(option);
          });
          optionsObj.accommodations.data.forEach(element => {
            const option = document.createElement('option');
              option.innerText = element.attributes.name;
              option.value = element.id;
              accList.prepend(option);
          });
          optionsObj.sources.data.forEach(element => {
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
          const advOptions = result.criteria;;
          // const timeStamp = advOptions.timestamp;

          if (advOptions === undefined) {
            // run api calls and save to storage
            getAdvOptions(getStorage);

            // getStorage();
            /// NOTES: The seperate calls are over riding each other as all that has stayed in storage is our sources object.

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




