window.addEventListener("DOMContentLoaded",
  function () {

    //load handling
    const spinner = document.getElementById('loading-container');
    const copy    = spinner.getElementsByClassName('loadingMsg');

    function showSpinner () {
      copy.innerHTML = "loading...";
      spinner.style.display = "block";
    }
    function hideSpinner () {
      spinner.style.display = "none";
      copy.innerHTML = "Content has loaded.";
    }

    //GET advanced search criteria lists and populate them to drop-down
    const subjList = document.getElementById("subject");
    const typeList = document.getElementById("type");
    const accList = document.getElementById("accommodation");
    const srcList = document.getElementById("source");

    const activeTab = document.getElementById('active-tab');

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

   function addOptions(list, target, criteriaId) {
    list.forEach(item => {
      const option = document.createElement('option');

      option.innerText = item.attributes.name;
      option.value = item.id;
      option.id = item.id;
      if (criteriaId === item.id) {
        option.selected = "selected";
      }

      target.append(option);

      if (item.attributes.thumbnail) {
        let iconItem = document.getElementById(item.id);
        const icon = document.createElement('img');
        icon.src = item.attributes.thumbnail;
        icon.alt = "";
        iconItem.prepend(icon);
      }
    });
  }

  function addSubjOptions (list, target, criteriaId) {
    list.forEach(item => {
      const option = document.createElement('option');
      option.innerText = item.name;
      option.value = item.id;
      option.id = item.id;
      if (criteriaId === item.id) {
        option.selected = "selected";
      }

      target.append(option);

    });
  }

  function parseSubjects (apiOutput) {
    // all subjects
    const subjects = apiOutput.data;

    // filters
    const isParent = subject => !subject.hasOwnProperty('relationships') || !subject.relationships.hasOwnProperty('parent');
    const isChild = subject => !isParent(subject);

    // create a id => name structure
    const toIdList = (list, subject) => {
      list.push({
        id: subject.id,
        name: subject.attributes.name
      });

      subject.children.forEach(c => list.push({
        id: c.id,
        name: [subject.attributes.name, c.attributes.name].join(' - ')
      }));

      return list;
    };

    // applicative functor sort
    const sortByName = f => (a, b) => {
      a = f(a).toUpperCase();
      b = f(b).toUpperCase();
      return a < b ? -1 : a > b ? 1 : 0;
    };

    // add children to a parent subject
    const amendChildren = children => parent => {
      parent.children = children
        .filter(c => c.relationships.parent.data.id === parent.id)
        .sort(sortByName(i => i.attributes.name));
      return parent;
    };

    let result =
      // all subjects
      subjects
      // only the parents
      .filter(isParent)
      // add the children, if any, sorted alphabetically by name
      .map(amendChildren(subjects.filter(isChild)))
      // map to id => name list
      .reduce(toIdList, [])
      // sort by parent name
      .sort(sortByName(i => i.name));

    return result;
  }

  function createOptions (optionsObj) {
    //get the users pre-existing settings and populate options with their choices in dropdown
    chrome.storage.sync.get(['settings'],
    function(result) {
      const userSettings = result.settings;

    //parse subjects list
    let subjectsParsed = parseSubjects(optionsObj.subjects);
    console.log("inside createOptions fx: ")
    console.log(subjectsParsed);


      if (userSettings !== undefined) {
        // run foreach on saved lists with defaults
        addSubjOptions(subjectsParsed, subjList, userSettings.subject);
        addOptions(optionsObj.types.data, typeList, userSettings.type);
        addOptions(optionsObj.accommodations.data, accList, userSettings.accommodation);
        addOptions(optionsObj.sources.data, srcList, userSettings.source);
      } else {
        // run foreach on saved lists without defaults
        addSubjOptions(subjectsParsed, subjList);
        addOptions(optionsObj.types.data, typeList);
        addOptions(optionsObj.accommodations.data, accList);
        addOptions(optionsObj.sources.data, srcList);
      }
    });
    hideSpinner();
  }

    //check storage for advnaced search criteria lists
    function getStorage () {
      chrome.storage.local.get(['criteria'],
        function(result) {

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

            // if it's been longer than 2 weeks since last update
            // run api calls and save to storage
            if (apiWait < now) {
              getAdvOptions(getStorage);

            // otherwise create our dropdown options with stored data
            } else {
              createOptions(advOptions);
            }
          }
      })
    }

    getStorage();
    showSpinner();


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

       const activeChoice = activeTab.checked;

      //  runAPIadvanced(userSearch, userSubject, userType, userAcc, userSrc);

      // save user criteria to local storage
      chrome.storage.sync.set({
        'active': activeChoice
      })
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
         chrome.runtime.sendMessage('', {
          type: 'notification',
          options: {
            title: 'Success!',
            message: 'Your advanced search criteria have been saved.',
            iconUrl: '/screenshot.jpg',
            type: 'basic'
          }
        });

         window.close()
         })
    }
   );


  }
)
