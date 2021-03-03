
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
        const subjects = resp[0];
        const types = resp[1];
        const accommodations = resp[2];
        const sources = resp[3];
        const timeStamp = new Date().getTime()

        // console.log("Time:" + timeStamp);

        //save to storage
        chrome.storage.local.set({
          'criteria': {
            'subjects': subjects,
            'types': types,
            'accommodations': accommodations,
            'sources': sources,
            'updated': timeStamp
          }
        }, function () {console.log(`Criteria set to local storage`)})
      })
      .then(_callback())
 }

  function addOptions(list, target) {
    list.forEach(item => {
      const option = document.createElement('option');
      option.innerText = item.attributes.name;
      option.value = item.id;
      target.prepend(option);
    });
  }

  function createOptions (optionsObj) {
    // console.log("optionsObj: " + JSON.stringify(optionsObj));

    // run foreach on saved lists
        addOptions(optionsObj.subjects.data, subjList);
        addOptions(optionsObj.types.data, typeList);
        addOptions(optionsObj.accommodations.data, accList);
        addOptions(optionsObj.sources.data, srcList);
  }

  //check storage for advnaced search criteria lists
  function getStorage () {
    chrome.storage.local.get(['criteria'],
      function(result) {
        // console.log("Storage check from options.js: " + JSON.stringify(result.criteria));
        const advOptions = result.criteria;
        const now = new Date().getTime();

        // if there is nothing in storage
        // run api calls and save to storage
        if (advOptions === undefined) {
          getAdvOptions(getStorage);

        }
        if (advOptions !== undefined){
          const timeStamp = advOptions.updated;
          const apiWait = timeStamp + 1209600;
          // console.log(apiWait);

          // if it's been longer than 2 weeks since last update
          // run api calls and save to storage
          if (apiWait < now) {
            getAdvOptions(getStorage);

          // otherwise create our dropdown options with stored data
          } else {
            // console.log(apiWait + " is not < " + now + " so createOptions with storage")
            createOptions(advOptions);
          }
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
     const timeStamp = new Date().getTime();

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
    }, function () {
       console.log(`Storage set`);
       const title = "Success!"
       var options = {
        body: 'Your advanced search criteria have been saved.',
        icon: '/screenshot.jpg'
        }
       var notification = new Notification(title, options);
       })
  }
 );


}
)
