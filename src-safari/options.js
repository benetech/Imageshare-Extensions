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
    const subjList = document.getElementById("search-subject-list");
    const typeList = document.getElementById("search-type-list");
    const accList = document.getElementById("search-acc-list");
    const srcList = document.getElementById("search-source-list");

    //GET default aria-activedescendants
    const subjDefault = document.getElementById("search-subject-0");
    const typeDefault = document.getElementById("search-type-0");
    const accDefault = document.getElementById("search-acc-0");
    const srcDefault = document.getElementById("search-source-");

    //GET active tab radio button
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
        .then(setTimeout(_callback, 5000))
   }

   function addOptions(list, target, criteriaId) {
    list.forEach(item => {
      const option = document.createElement('li');
      option.role = "option";
      option.innerText = item.attributes.name;
      option.value = item.id;
      option.id = item.id;

      target.append(option);

      //criteriaId is a number and item.id is a string
      if (criteriaId == item.id) {
        console.log(`inside if statement`);
        let focusItem = document.getElementById(criteriaId);
        focusItem.setAttribute("class", "focused"); //no working
        focusItem.setAttribute("aria-selected", "true"); //working
      }

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
      const option = document.createElement('li');
      option.role = "option";
      option.innerText = item.name;
      option.value = item.id;
      option.id = item.id;

      target.append(option);

      if (criteriaId == item.id) {
        console.log(`inside if statement`);
        let focusItem = document.getElementById(item.id);
        focusItem.setAttribute("class", "focused");
        focusItem.setAttribute("aria-selected", "true");
      }

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
      console.log(userSettings);

    //parse subjects list
    let subjectsParsed = parseSubjects(optionsObj.subjects);
    console.log("inside createOptions fx: ")
    console.log(subjectsParsed);

      if (userSettings !== undefined) {
        // set new activedescendant
        subjList.setAttribute("aria-activedescendant", userSettings.subject);
        typeList.setAttribute("aria-activedescendant", userSettings.type);
        accList.setAttribute("aria-activedescendant", userSettings.accommodation);
        srcList.setAttribute("aria-activedescendant", userSettings.source);

        // remove old descendant attributes
        subjDefault.removeAttribute("aria-selected")
        typeDefault.removeAttribute("aria-selected")
        accDefault.removeAttribute("aria-selected")
        srcDefault.removeAttribute("aria-selected")

        subjDefault.removeAttribute("class")
        typeDefault.removeAttribute("class")
        accDefault.removeAttribute("class")
        srcDefault.removeAttribute("class")

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
        console.log(optionsObj.sources.data);
        addOptions(optionsObj.sources.data, srcList);
      }

    //create listboxes
    var custom_listboxes = ['search-type', 'search-acc', 'search-subject', 'search-source'];

    for (var i = 0, j = custom_listboxes.length; i < j; i++) {
      var prefix = custom_listboxes[i];
      var button = document.getElementById(prefix + '-button');
      var exListbox = new aria.Listbox(document.getElementById(prefix + '-list'));
      var buttonContent = document.querySelector('#' + prefix + '-button .content');
      var listboxButton = new aria.ListboxButton(button, exListbox, buttonContent);
    }

    });
            hideSpinner();
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
            if (apiWait <= now) {
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
    showSpinner();


    // Advanced Search
    const advSaveButton = document.getElementById("advanced-criteria-save")

    advSaveButton.addEventListener("click",
    function () {
      //  let userSearch = searchInput.value;
      const userSubject = document.querySelector("ul#search-subject-list li[aria-selected='true']").value;
      const userType = document.querySelector("ul#search-type-list li[aria-selected='true']").value;
      const userAcc = document.querySelector("ul#search-acc-list li[aria-selected='true']").value;
      const userSrc = document.querySelector("ul#search-source-list li[aria-selected='true']").id;

       const timeStamp = new Date().getTime();

       const activeChoice = activeTab.checked;

      //  runAPIadvanced(userSearch, userSubject, userType, userAcc, userSrc);

      // save user criteria to local storage
      chrome.storage.sync.set({
        'active': activeChoice
      });
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
          icon: './icons/Imageshare-logo-no-text.png'
          }
         var notification = new Notification(title, options);

        //  window.close()
         })
    }
   );


  }
)
