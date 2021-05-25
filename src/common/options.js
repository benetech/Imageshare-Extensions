import { el, qs, fetchJson, parseSubjects } from './util';
import { getStoredApiOptions, storeApiOptions, getStoredUserSettings, storeUserSettings } from './settings';
import aria from './aria-listbox-expandable';

import './style.css';

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

const fetchApiData = endpoint => fetchJson(`https://imgsdev.wpengine.com/json-api/${endpoint}/`);

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

const optionsAreStale = options => {
  const staleThreshold = 1209600;
  const now = new Date().getTime();
  return now - options.timeStamp > staleThreshold;
};

const storeSettings = async () => {
  const subject = qs("ul#search-subject-list li[aria-selected='true']");
  const type = qs("ul#search-type-list li[aria-selected='true']");
  const accommodation = qs("ul#search-acc-list li[aria-selected='true']");
  const source = qs("ul#search-source-list li[aria-selected='true']");
  const setActiveTab = el('active-tab').checked;

  return storeUserSettings(subject, type, accommodation, source, setActiveTab)
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
  renderCustomDropdown('type', options.types, defaultType, item => parseInt(item.id) === userSettings.type);
  renderCustomDropdown('acc', options.accommodations, defaultAccommodation, item => parseInt(item.id) === userSettings.accommodation);
  renderCustomDropdown('source', options.sources, defaultSource, item => item.id === userSettings.source);
};

const setupMiscellaneousControls = userSettings => {
  const activeTab = el('active-tab');
  const saveButton = el('save-advanced-settings');

  activeTab.checked = userSettings.setActiveTab;

  saveButton.addEventListener('click', async function () {
    await storeSettings();
    el('settings-saved').removeAttribute('hidden');
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