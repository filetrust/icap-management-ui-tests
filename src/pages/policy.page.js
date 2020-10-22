const { I } = inject();

module.exports = {
  //locators

  tabs: {
    current: `section[class*='TabNav_TabNav__2M5TN'] > ul > li:nth-of-type(1) > button`,
    history: `section[class*='TabNav_TabNav__2M5TN'] > ul > li:nth-of-type(2) > button`,
  },
  fields: {
    domainNameInput: `div[class*='Input_Input__17Nwp'] > input`,
  },
  checkboxes: {
    unprocessedFileRelay: "",
    unprocessedFileBlock: "",
    unprocessedFileRefer: "",
    blockedFileRelay: "",
    blockedFileBlock: "",
    blockedFileRefer: "",
  },
  buttons: {
    cancelChanges: "",
    saveChanges: "",
    view: "",
    activate: "",
    gotoPage: "",
    previousPage: "",
    firstPage: "",
    nextPage: "",
    lastPage: "",
  },
  containers: {
    wordContentFlags: `div[class*='Current_inner__1pjYU'] > section:nth-of-type(1) > div`,
    excelContentFlags: `div[class*='Current_inner__1pjYU'] > section:nth-of-type(2) > div`,
    powerPointContentFlags: `div[class*='Current_inner__1pjYU'] > section:nth-of-type(3) > div`,
    pdfContentFlags: `div[class*='Current_inner__1pjYU'] > section:nth-of-type(4) > div`,
  },

  //Methods

  /*
   * Policy Setting
   * ***************************************************************
   */
  getContentFlagRule(type, rule) {
    return "label[for='" + type + "ContentManagement_" + rule + "']";
  },

  setContentFlagRule(type, rule) {
    const container = null;
    if (type == "Word") {
      container = this.containers.wordContentFlags;
    } else if (type == "Excel") {
      container = this.containers.excelContentFlags;
    } else if (type == "PowerPoint") {
      container = this.containers.powerPointContentFlags;
    } else if (type == "Pdf") {
      container = this.containers.pdfContentFlags;
    }
    I.click(container);
    const element = this.getContentFlagRule(type, rule);
    I.click(element);
  },

  clickCancelChanges() {
    const element = this.buttons.cancelChanges;
    I.click(element);
  },

  clickSaveChanges() {
    const element = this.buttons.saveChanges;
    I.click(element);
  },

  /*
   * Policy History
   * ***************************************************************
   */
  clickView() {
    const element = this.buttons.view;
    I.click(element);
  },

  clickActivate() {
    const element = this.buttons.activate;
    I.click(element);
  },

  // Pagination

  clickFirst() {
    const element = this.buttons.firstPage;
    I.click(element);
  },

  clickPrevious() {
    const element = this.buttons.previousPage;
    I.click(element);
  },

  clickLast() {
    const element = this.buttons.lastPage;
    I.click(element);
  },

  clickPrevious() {
    const element = this.buttons.nextPage;
    I.click(element);
  },

  setCustomPage(value) {
    const element = this.fields.customPaginatorGoTo;
    I.fillField(element, value);
  },

  clickGo() {
    const element = this.buttons.go;
    I.click(element);
  },

  /*
   * Non compliant Files
   * ***************************************************************
   */

  setUnprocessableFileAsRelay() {
    const element = this.checkboxes.unprocessedFileRelay;
    I.click(element);
  },

  setUnprocessableFileAsBlock() {
    const element = this.checkboxes.unprocessedFileBlock;
    I.click(element);
  },

  setUnprocessableFileAsRefer() {
    const element = this.checkboxes.unprocessedFileRefer;
    I.click(element);
  },

  setBlockedFileAsRelay() {
    const element = this.checkboxes.blockedFileRelay;
    I.click(element);
  },

  setBlockedFileAsRelay() {
    const element = this.checkboxes.blockedFileBlock;
    I.click(element);
  },

  setBlockedFileAsRelay() {
    const element = this.checkboxes.unprocessedFileRefer;
    I.click(element);
  },
};
