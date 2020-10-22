const { I } = inject();

module.exports = {
  //Locators

  fields: {
    inputFilterFileID: `div[id='inputFilterTransactionID'] > input`,
    customPaginatorGoTo: `input[class*='custom-paginator-goto']`,
  },
  buttons: {
    addFilter: `button[class*='Button_button__1V1sR']`,
    fileTypeMenu: "",
    fileOutcomeMenu: "",
    fileOutcomeFilterSafe: "",
    fileOutcomeFilterDangerous: "",
    fileOutcomeFilterBlocked: "",
    fileOutcomeFilterChecked: "",
    fileOutcomeFilterUnclassified: "",
    fileTypeMenuAdd: "",
    fileIdAdd: "",
    gotoPage: "",
    previousPage: "",
    firstPage: "",
    nextPage: "",
    lastPage: "",
  },
  checkboxes: {
    fileTypeDoc: "",
    fileTypeDot: "",
    fileTypeDocx: "",
    fileTypeDocm: "",
    fileTypeXlsx: "",
    fileTypeXls: "",
    fileTypeXlsm: "",
    fileTypePpt: "",
    fileTypePptx: "",
    fileTypeJpeg: "",
    fileTypePng: "",
    fileTypeGif: "",
    fileTypePdf: "",
  },
  calendar: {
    dateTimePicker: "",
  },
  popup: {
    filterFileId: `div[id='filterMenuPopup'] > ul > li:nth-of-type(2) > button`,
    filterType: `div[id='filterMenuPopup'] > ul > li:nth-of-type(5) > button`,
    filterFileOutcomes: `div[id='filterMenuPopup'] > ul > li:nth-of-type(3) > button`,
    filterMenu: `div[id='filterMenuPopup']`,
  },
  modal: {
    modalHeader: `section[class*='FileInfo_FileInfo__1Z457'] > header`,
    cmpDetailsBanner: `div[class*='FileInfo_inner__1NnWT'] > div:nth-of-type(5) > div > label`,
    issueItemsBanner: `div[class*='FileInfo_inner__1NnWT'] > div:nth-of-type(2)`,
    sanitisationItemsBanner: `div[class*='FileInfo_inner__1NnWT'] > div:nth-of-type(3)`,
    remedyItemsBanner: `div[class*='FileInfo_inner__1NnWT'] > div:nth-of-type(4)`,
  },

  //Methods

  /*
   * Datetimepicker
   * ***************************************************************
   */
  async getDatetimepicker() {
    const element = this.calendar.dateTimePicker;
    return await I.grabAttributeFrom(element, jsonValue());
  },

  setDatetimepicker(value) {
    const element = this.calendar.dateTimePicker;
    I.fillField(element, value);
  },

  /*
   * AddingFilter
   * ***************************************************************
   */
  clickAddFilterButton() {
    const element = this.buttons.addFilter;
    I.click(element);
  },

  setFileOutcome(outcome) {
    const outcomeType = null;
    const outcomeMenu = this.popup.filterFileOutcomes;
    I.click(outcomeMenu);
    if (outcome = "safe") {
      outcomeType = this.buttons.fileOutcomeFilterSafe;
    } else if (outcome = "dangerous") {
      outcomeType = this.buttons.fileOutcomeFilterDangerous;
    } else if (outcome = "blocked") {
      outcomeType = this.buttons.fileOutcomeFilterBlocked;
    } else if (outcome = "checked") {
      outcomeType = this.buttons.fileOutcomeFilterChecked;
    } else if (outcome = "unclassified") {
      outcomeType = this.buttons.fileOutcomeFilterUnclassified;
    }
    I.click(outcomeType);
  },

  clickFileTypeAdd() {
    const element = this.buttons.fileTypeMenuAdd;
    I.click(element);
  },

  setFileId(value) {
    const element = this.fields.inputFilterFileID;
    I.fillField(element, value);
  },

  /*
   * Pagination
   * ***************************************************************
   */
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
};
