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
      copy.innerHTML = "Content has loaded.";
      spinner.style.display = "none";
    }

    //show current settings
    const fieldset = document.getElementById('user-presets');

    function showSettings () {
      console.log(fieldset);
      fieldset.style.display = "block";
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
        .then(setTimeout(_callback, 5000));
   }

   function populateSettings (itemName, userObj) {

    let dd = document.createElement('dd');
    dd.className = 'user-setting';
    dd.innerText = itemName;
    dd.value = itemName;
    userObj.after(dd);


  }

   function addOptions(list, target, criteriaId, userObj) {

    list.forEach(item => {
      const option = document.createElement('li');
      option.role = "option";
      option.innerText = item.attributes.name;
      option.value = item.id;
      option.id = item.id;

      target.append(option);

      //criteriaId is a number and item.id is a string
      ///MAYBE here for creating user settings dds?
      if (criteriaId == item.id) {
        let focusItem = document.getElementById(criteriaId);
        focusItem.setAttribute("class", "focused");
        focusItem.setAttribute("aria-selected", "true");

        //add criteriaId to user settings view
        populateSettings(item.attributes.name, userObj);
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

  function addSubjOptions (list, target, criteriaId, userObj) {
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

        //add criteriaId to user settings view
        populateSettings(item.name, userObj);
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

      // If user settings are present -> make active item in dropdown and show user-presets fieldset and add the user setting to current setting list
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

        //GET current setting list elements
        const userSub = document.getElementById('user-sub');
        const userTyp = document.getElementById('user-typ');
        const userAcc = document.getElementById('user-acc');
        const userSrc = document.getElementById('user-src');

        // run foreach on saved lists with defaults
        addSubjOptions(subjectsParsed, subjList, userSettings.subject, userSub);
        addOptions(optionsObj.types.data, typeList, userSettings.type, userTyp );
        addOptions(optionsObj.accommodations.data, accList, userSettings.accommodation, userAcc);
        addOptions(optionsObj.sources.data, srcList, userSettings.source, userSrc);

        //show user-preset and populate
        showSettings();

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
            if (apiWait <= now) {
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
      // var el = document.querySelector("div.user-panel.main input[name='login']");
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
         chrome.runtime.sendMessage('', {
          type: 'notification',
          options: {
            title: 'Success!',
            message: 'Your advanced search criteria have been saved.',
            iconUrl: './icons/Imageshare-logo-no-text-3000x2000.png',
            type: 'basic'
          }
        });

        //  window.close()
         })
    }
   );


  }
)
