import browser from 'get-browser';
import { createNotification } from 'display-notifications';
import { COMMAND, TARGET, KEEP_CHANNEL_OPEN } from '../common/constants';
import { getUserSelection, setMouseCursorBusy, setMouseCursorReady, getQueryUrl, announce } from '../common/util';
import { findTerms } from '../common/find-terms';

const PERMISSION_GRANTED = 'granted';
const PERMISSION_DENIED = 'denied';

const handleNotification = payload => {
  // Let's check whether notification permissions have already been granted
  if (Notification.permission === PERMISSION_GRANTED) {
    // If it's okay let's create a notification
    return createNotification(payload.title, payload.message);
  }

  // Otherwise, we need to ask the user for permission
  if (Notification.permission !== PERMISSION_DENIED) {
    Notification.requestPermission().then(permission => {
      // If the user accepts, let's create a notification
      if (permission === PERMISSION_GRANTED) {
        return createNotification(payload.title, payload.message);
      }
    });
  }
};

const onExtensionMessage = (msg, _sender, sendResponse) => {
  console.debug('Index receiving message', msg);

  if (msg.target !== TARGET.CONTENT) {
    return KEEP_CHANNEL_OPEN;
  }

  if (msg.command === COMMAND.GET_SELECTION) {
    const selection = getUserSelection().trim();

    if (selection.length) {
      sendResponse(selection)
    }

    sendResponse(null);
  }

  if (msg.command === COMMAND.NOTIFICATION) {
    handleNotification(msg);
  }

  if (msg.command === COMMAND.SEARCH) {
    browser.runtime.sendMessage({
      command: COMMAND.BACKGROUND_SEARCH,
      type: msg.type,
      selection: msg.selection
    });
  }

  if (msg.command === COMMAND.FIND_TERMS) {
    findTerms(msg.terms, msg.createLinks)
    .then(sendResponse)
    .then(() => {
      qsa('a.imageshare-term').forEach(node => {
        node.setAttribute('aria-label', 'Imageshare search: "' + node.textContent + '"');
        node.setAttribute('href', getQueryUrl(node.textContent));
        getActiveTabSetting.then(active => !active && node.setAttribute('target', '_blank'));
      });
    });
  }

  if (msg.command === COMMAND.WORKING) {
    setMouseCursorBusy();
    announce("Imageshare - working...");
  }

  if (msg.command === COMMAND.READY) {
    setMouseCursorReady();
  }

  // keep the channel open
  return KEEP_CHANNEL_OPEN;
}

export default () => browser.runtime.onMessage.addListener(onExtensionMessage);