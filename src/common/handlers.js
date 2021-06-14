import { findTerms } from "./find-terms";
import { announce, getUserSelection, qsa, setMouseCursorBusy } from "./util";
import browser from 'get-browser';
import { COMMAND, TARGET } from "./constants";

export const findTermsHandler = (msg, sendResponse) => {
  findTerms(msg.terms, msg.createLinks)
  .then(sendResponse)
  .then(() => {
    qsa('button.imageshare-term').forEach(node => {
      node.setAttribute('aria-label', '"' + node.textContent + '" - Imageshare search');
      node.addEventListener('click', function () {
        const payload = {
          command: COMMAND.VIEW_TERM,
          target: TARGET.BACKGROUND,
          term: node.textContent
        };

        browser.runtime.sendMessage(payload);
      });
    });
  });
}

export const getSelectionHandler = (_msg, sendResponse) => {
  const selection = getUserSelection().trim();

  if (selection.length) {
    sendResponse(selection)
  }

  sendResponse(null);
};

export const workingHandler = (_msg, sendResponse) => {
  setMouseCursorBusy();
  announce("Imageshare - working...");
  sendResponse();
}