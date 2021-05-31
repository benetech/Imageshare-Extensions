import browser from 'get-browser';
import setupMessageHandling from 'setup-message-handling';
import { DARK_SCHEME, TARGET } from './constants';

const details = [PACKAGE_NAME, BUILD_TARGET, PACKAGE_VERSION, environment.name];

console.debug('Loading:', details.join(' • '));

if (environment.isDevelopment) {
  console.debug('Clearing storage');
  browser.storage.local.clear();
}

setupMessageHandling();

// Dark Mode Recognition
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  console.debug('Switching to dark theme.');

  chrome.runtime.sendMessage({
    target: TARGET.BACKGROUND,
    scheme: DARK_SCHEME
  })
}

console.debug('Content script ready:', details.join(' • '));