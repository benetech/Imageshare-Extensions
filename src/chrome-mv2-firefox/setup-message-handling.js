import browser from 'get-browser';
import { getUserSelection, setMouseCursorBusy, setMouseCursorReady, getQueryUrl, announce, qsa } from '../common/util';
import { COMMAND, KEEP_CHANNEL_OPEN, TARGET } from '../common/constants';
import { findTerms } from '../common/find-terms';
import { getActiveTabSetting } from '../common/settings';

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

  if (msg.command === COMMAND.WORKING) {
    setMouseCursorBusy();
    announce("Imageshare - working...");
  }

  if (msg.command === COMMAND.READY) {
    setMouseCursorReady();
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

  // keep the channel open
  return KEEP_CHANNEL_OPEN;
};

export default () => browser.runtime.onMessage.addListener(onExtensionMessage);