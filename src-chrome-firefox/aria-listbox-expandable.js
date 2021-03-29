/**
 * ARIA Collapsible Dropdown Listbox Example
 * @function onload
 * @desc Initialize the listbox example once the page has loaded
 */



var aria = aria || {};

aria.ListboxButton = function (button, listbox, buttonContent) {
  this.button = button;
  this.buttonContent = buttonContent;
  this.listbox = listbox;
  this.registerEvents();
};

aria.ListboxButton.prototype.registerEvents = function () {
  this.button.addEventListener('click', this.showListbox.bind(this));
  this.button.addEventListener('keyup', this.checkShow.bind(this));
  this.listbox.listboxNode.addEventListener('click', this.hideListbox.bind(this));
  this.listbox.listboxNode.addEventListener('blur', this.hideListbox.bind(this));
  this.listbox.listboxNode.addEventListener('keydown', this.checkHide.bind(this));
  this.listbox.setHandleFocusChange(this.onFocusChange.bind(this));
};

aria.ListboxButton.prototype.checkShow = function (evt) {
  var key = evt.which || evt.keyCode;

  switch (key) {
    case aria.KeyCode.UP:
    case aria.KeyCode.DOWN:
      evt.preventDefault();
      this.showListbox();
      this.listbox.checkKeyPress(evt);
      break;
  }
};

aria.ListboxButton.prototype.checkHide = function (evt) {
  var key = evt.which || evt.keyCode;

  switch (key) {
    case aria.KeyCode.RETURN:
    case aria.KeyCode.ESC:
      evt.preventDefault();
      this.hideListbox();
      this.button.focus();
      break;
  }
};

aria.ListboxButton.prototype.showListbox = function (evt) {
  aria.Utils.removeClass(this.listbox.listboxNode, 'hidden');
  this.button.setAttribute('aria-expanded', 'true');
  if (evt && (evt.which == 1 || !evt.keyCode)) {
      this.listbox.focusFirst = true;
  }
  this.listbox.listboxNode.focus();
};

aria.ListboxButton.prototype.hideListbox = function () {
  aria.Utils.addClass(this.listbox.listboxNode, 'hidden');
  this.button.removeAttribute('aria-expanded');
};

aria.ListboxButton.prototype.onFocusChange = function (focusedItem) {
  this.buttonContent.innerHTML = focusedItem.innerHTML;
};
