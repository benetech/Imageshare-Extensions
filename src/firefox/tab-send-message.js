import browser from 'get-browser';

export default (tabId, payload, options) => browser.tabs.sendMessage(tabId, payload, options);