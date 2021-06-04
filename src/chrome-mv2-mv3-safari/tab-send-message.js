import browser from 'get-browser';

export default (tabId, payload, options) => new Promise(resolve => {
  browser.tabs.sendMessage(tabId, payload, options, resolve);
});
