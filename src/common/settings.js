import browser from 'get-browser';

export const hasAdvancedSearchCriteriaDefined = settings => {
  return settings.subject !== undefined ||
         settings.type !== undefined ||
         settings.accommodation !== undefined ||
         settings.source !== undefined
    ;
};

export const getStoredApiOptions = async () => {
  return new Promise(resolve => {
      browser.storage.local.get(['options'], result => resolve(result.options));
  });
};

export const storeApiOptions = async options => {
  return new Promise(resolve => {
      options.timeStamp = new Date().getTime();
      browser.storage.local.set({
        'options': options
      }, resolve);
  })
};

export const getStoredUserSettings = async () => {
  return new Promise(resolve => {
    browser.storage.local.get(['settings'], result => {

      if (result.settings === undefined) {
        return resolve({
          subject: undefined,
          type: undefined,
          accommodation: undefined,
          source: undefined,
          setActiveTab: true,
          createKeywordLinks: false
        });
      }

      resolve(result.settings);
    });
  });
};

export const getActiveTabSetting = () => new Promise(resolve => {
  getStoredUserSettings().then(settings => resolve(!!settings.setActiveTab));
});

export const getCreateKeywordLinksSetting = () => new Promise(resolve => {
  getStoredUserSettings().then(settings => resolve(!!settings.createKeywordLinks));
});

export const storeUserSettings = async (subject, type, accommodation, source, setActiveTab, createKeywordLinks) => {
  const normalise = v => v === 0 ? undefined : v;

  const payload = {
    'settings': {
      'subject': subject ? normalise(subject.value) : undefined,
      'type': type ? normalise(type.value) : undefined,
      'accommodation': accommodation ? normalise(accommodation.value) : undefined,
      'source': source ? source.id : undefined,
      'setActiveTab': !!setActiveTab,
      'createKeywordLinks': !!createKeywordLinks,
      'timestamp': new Date().getTime()
    }
  };

  return new Promise(resolve => {
    browser.storage.local.set(payload, resolve);
  });
}