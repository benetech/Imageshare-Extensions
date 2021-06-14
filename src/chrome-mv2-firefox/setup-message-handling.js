import browser from 'get-browser';
import { setMouseCursorReady } from '../common/util';
import { COMMAND, KEEP_CHANNEL_OPEN, TARGET } from '../common/constants';
import { findTermsHandler, getSelectionHandler, workingHandler } from '../common/handlers';

const onExtensionMessage = (msg, _sender, sendResponse) => {
  console.debug('Index receiving message', msg);

  if (msg.target !== TARGET.CONTENT) {
    return KEEP_CHANNEL_OPEN;
  }

  if (msg.command === COMMAND.GET_SELECTION) {
    getSelectionHandler(msg, sendResponse);
  }

  if (msg.command === COMMAND.WORKING) {
    workingHandler(msg, sendResponse);
  }

  if (msg.command === COMMAND.READY) {
    setMouseCursorReady();
  }

  if (msg.command === COMMAND.FIND_TERMS) {
    findTermsHandler(msg, sendResponse);
  }

  // keep the channel open
  return KEEP_CHANNEL_OPEN;
};

export default () => browser.runtime.onMessage.addListener(onExtensionMessage);