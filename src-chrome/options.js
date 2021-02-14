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

      // save criteria to local storage
      // storage cannot be accessed here so a message will need to be sent
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




