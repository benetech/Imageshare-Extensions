import browser from 'get-browser';
import { getUserSelection, setMouseCursorBusy, setMouseCursorReady, getQueryUrl, announce, qsa } from '../common/util';
import { COMMAND, KEEP_CHANNEL_OPEN, TARGET } from '../common/constants';
import { findTerms } from '../common/find-terms';

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
      qsa('a.imageshare-term').forEach(node => node.addEventListener('click', function () {
        this.setAttribute('aria-label', 'Imageshare search: "' + this.textContent + '"');
        document.location.href = getQueryUrl(this.textContent);
      }))
    });
  }

  if (msg.command === COMMAND.VIEW_TERM) {
    document.location.href = getQueryUrl(msg.term);
  }

  // keep the channel open
  return KEEP_CHANNEL_OPEN;
};

export default () => browser.runtime.onMessage.addListener(onExtensionMessage);