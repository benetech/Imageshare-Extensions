import browser from 'get-browser';
import setupMessageHandling from 'setup-message-handling';
// import { DARK_SCHEME, TARGET } from './constants';

console.debug(`Loading Imageshare extension in ${environment.name} mode`);

if (environment.isDevelopment) {
  browser.storage.local.clear();
}

setupMessageHandling();

  // // Dark Mode Recognition
  // if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //   chrome.runtime.sendMessage({
  //     target: TARGET.BACKGROUND,
  //     scheme: DARK_SCHEME
  //   })
  // }

console.debug(['Content script active', BUILD_TARGET, PACKAGE_NAME, PACKAGE_VERSION].join(' / '));