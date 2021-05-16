const parseSubjects =  (apiOutput) => {
  // all subjects
  const subjects = apiOutput.data;

  // filters
  const isParent = subject => !subject.hasOwnProperty('relationships') || !subject.relationships.hasOwnProperty('parent');
  const isChild = subject => !isParent(subject);

  // create a id => name structure
  const toIdList = (list, subject) => {
      list.push({
          id: subject.id,
          attributes: {
              name: subject.attributes.name
          }
      });

      subject.children.forEach(c => list.push({
          id: c.id,
          attributes: {
              name: [subject.attributes.name, c.attributes.name].join(' - ')
          }
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

  const result =
      // all subjects
      subjects
      // only the parents
      .filter(isParent)
      // add the children, if any, sorted alphabetically by name
      .map(amendChildren(subjects.filter(isChild)))
      // map to id => name list
      .reduce(toIdList, [])
      // sort by parent name
      .sort(sortByName(i => i.attributes.name));

      return result;
};

const el = id => document.getElementById(id);
const qs = q => document.querySelector(q);

const getSpinner = function (contentElement, spinnerElement, statusElement, loadingMessage, readyMessage) {
  return {
      loading: () => {
          statusElement.textContent = loadingMessage;
          spinnerElement.style.display = 'block';
      },
      finished: () => {
          statusElement.textContent = readyMessage;
          spinnerElement.style.display = 'none';
          contentElement.removeAttribute('hidden');
      }
  };
};

const fetchApiData = endpoint => fetch(`https://imgsdev.wpengine.com/json-api/${endpoint}/`, { method: 'GET' }).then(response => response.json());

const loadAvailableOptionsFromApi = async () => {
  const requests = [
      fetchApiData(`subjects`),
      fetchApiData(`types`),
      fetchApiData(`accommodations`),
      fetchApiData(`sources`)
  ];

  return Promise.all(requests)
      .then(responses => {
          return {
              subjects: responses[0],
              types: responses[1],
              accommodations: responses[2],
              sources: responses[3]
          }
      });
};

const getStoredApiOptions = async () => {
  return new Promise(resolve => {
      chrome.storage.sync.get(['options'], result => resolve(result.options));
  });
};

const storeApiOptions = async options => {
  return new Promise(resolve => {
      options.timeStamp = new Date().getTime();
      chrome.storage.sync.set({
          'options': options
      }, resolve);
  })
};

const optionsAreStale = options => {
  const staleThreshold = 1209600;
  const now = new Date().getTime();
  return now - options.timeStamp > staleThreshold;
};

const getStoredUserSettings = async () => {
  return new Promise(resolve => {
      chrome.storage.sync.get(['settings'], result => {
          if (result.settings === undefined) {
              return resolve({
                  subject: undefined,
                  type: undefined,
                  accommodation: undefined,
                  source: undefined
              })
          }
          resolve(result.settings);
      });
  });
};

const storeUserSettings = async () => {
  const subject = qs("ul#search-subject-list li[aria-selected='true']");
  const type = qs("ul#search-type-list li[aria-selected='true']");
  const accommodation = qs("ul#search-acc-list li[aria-selected='true']");
  const source = qs("ul#search-source-list li[aria-selected='true']");
  const setActiveTab = el('active-tab').checked;

  const timeStamp = new Date().getTime();

  return new Promise(resolve => {
      chrome.storage.sync.set({
          'settings': {
              'subject': subject ? subject.value : 0,
              'type': type ? type.value : 0,
              'accommodation': accommodation ? accommodation.value : 0,
              'source': source ? source.id : 0,
              'setActiveTab': setActiveTab,
              'timestamp': timeStamp
          }
      }, resolve);
  });
};

const renderCustomDropdown = (prefix, items, defaultSelectedItem, isSelectedItem) => {
  const button = el(`search-${prefix}-button`);
  const list = el(`search-${prefix}-list`);

  items.forEach(item => {
      const option = document.createElement('li');
      option.setAttribute('role', 'option');
      option.textContent = item.attributes.name;
      option.value = item.id;
      option.id = item.id;

      if (item.attributes.thumbnail) {
        const icon = document.createElement('img');
        icon.src = item.attributes.thumbnail;
        icon.alt = "";
        option.prepend(icon);
      }

      if (isSelectedItem(item)) {
          list.setAttribute('aria-activedescendant', item.id);

          option.setAttribute('class', 'focused');
          option.setAttribute('aria-selected', 'true');

          defaultSelectedItem.removeAttribute('aria-selected');
          defaultSelectedItem.classList.remove('focused');
      }

      list.append(option);
  });

  const exListbox = new aria.Listbox(list);
  const buttonContent = qs('#search-' + prefix + '-button .content');
  new aria.ListboxButton(button, exListbox, buttonContent);

  const selectedItem = qs('#search-' + prefix + '-list li[aria-selected="true"]');

  if (selectedItem !== null) {
    buttonContent.innerHTML = selectedItem.innerHTML;
  }
};

const renderCustomDropdowns = (options, userSettings) => {
  const defaultSubject = el('search-subject-0');
  const defaultType = el('search-type-0');
  const defaultAccommodation = el('search-acc-0');
  const defaultSource = el('search-source-');

  // Recursively parse subject parent/child linked datastructure
  const subjects = parseSubjects(options.subjects);

  renderCustomDropdown('subject', subjects, defaultSubject, item => parseInt(item.id) === userSettings.subject);
  renderCustomDropdown('type', options.types.data, defaultType, item => parseInt(item.id) === userSettings.type);
  renderCustomDropdown('acc', options.accommodations.data, defaultAccommodation, item => parseInt(item.id) === userSettings.accommodation);
  renderCustomDropdown('source', options.sources.data, defaultSource, item => item.id === userSettings.source);
};

const setupMiscellaneousControls = userSettings => {
  const activeTab = el('active-tab');
  const saveButton = el('save-advanced-settings');

  activeTab.checked = userSettings.setActiveTab;

  saveButton.addEventListener('click', async function () {
      await storeUserSettings();

      console.log(`Storage set`);
      const title = "Success!"
      var options = {
        body: 'Your advanced search criteria have been saved.',
        icon: './icons/Imageshare-logo-no-text-2000x2000.png'
        }
      var notification = new Notification(title, options);
      setTimeout(function(){ window.close() }, 2000);

  });
};

const init = async () => {
  const spinner = getSpinner(
      el('search-form'),
      el('loading-container'),
      el('loading-status'),
      'Loading...',
      'Content has loaded.'
  );

  spinner.loading();

  let options = await getStoredApiOptions();

  if (options === undefined || optionsAreStale(options)) {
      options = await loadAvailableOptionsFromApi();
      await storeApiOptions(options);
  }

  const userSettings = await getStoredUserSettings();

  renderCustomDropdowns(options, userSettings);

  setupMiscellaneousControls(userSettings);

  spinner.finished();
};

window.addEventListener("load", init);
