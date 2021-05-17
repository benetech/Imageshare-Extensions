export const getActiveTabSetting = () => new Promise(resolve => {
    chrome.storage.sync.get(['active'], result => resolve(!!result.active));
});

export const getSettings = () => new Promise(resolve => {
  chrome.storage.sync.get(['settings'], result => resolve(result.settings));
});

export const getStoredApiOptions = async () => {
  return new Promise(resolve => {
      chrome.storage.sync.get(['options'], result => resolve(result.options));
  });
};

export const storeApiOptions = async options => {
  return new Promise(resolve => {
      options.timeStamp = new Date().getTime();
      chrome.storage.sync.set({
          'options': options
      }, resolve);
  })
};

export const getStoredUserSettings = async () => {
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

export const storeUserSettings = async (subject, type, accommodation, source, setActiveTab) => {
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
}