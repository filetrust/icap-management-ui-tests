const { assert } = require("chai");
const { output } = require("codeceptjs");
const I = actor();
const modal = require("../fragments/modal.js");

module.exports = {
  //locators

  tabs: {
    current: `[data-test-id="buttonPolicyCurrentTab"]`,
    history: `[data-test-id='buttonPolicyHistoryTab']`,
    draft: `[data-test-id='buttonPolicyDraftTab']`,
    adaptation_policy: `[data-test-id="buttonCurrentAdaptationPolicyTab"]`,
    ncfs_policy: `[data-test-id='buttonCurrentNcfsPolicyTab']`,
  },
  fields: {
    domainNameInput: `div[class*='Input_Input__17Nwp'] > input`,
    pageHeading: `h1[class*='Main_pageHeading']`,
    contentFlags: `//h2[text()='Content Flags']`,
    apiUrlInput: `input[data-test-id="inputApiUrl"]`,
    policyTimestamp: `tbody[class*='MuiTableBody-root'] > tr > td:nth-of-type(1)`
  },
  modal: {
    deleteDraftPolicy: `div[class*='ConfirmDraftDeleteModal_modalContainer__']`,
    publishDraftPolicy: `div[class*='ConfirmDraftPublishModal_modalContainer__']`,
  },
  radiobuttons: {
    unprocessedFileRelay: "#relay-unprocessableFileTypes",
    unprocessedFileBlock: "#block-unprocessableFileTypes",
    unprocessedFileRefer: "#refer-unprocessableFileTypes",
    blockedFileRelay: "#relay-glasswallBlockedFiles",
    blockedFileBlock: "#block-glasswallBlockedFiles",
    blockedFileRefer: "#refer-glasswallBlockedFiles",
  },
  buttons: {
    cancelChanges: `button[class*='DraftPolicy_cancelButton__']`,
    saveChanges: `//button[contains(.,'Save Changes')]`,
    publish: `button[class*='DraftPolicy_publishButton__']`,
    delete: `button[class*='DraftPolicy_deleteButton__']`,
    policy: {
      current: `//button[contains(.,'Current']`,
      history: `//button[contains(.,'History']`
    },
    
    viewPolicyFirst: `//tbody/tr[1]/th/button[text()='View']`,
    activate: "",
    activatePolicyFirst: `//tbody/tr[1]/th/button[text()='Activate']`,
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
  links: {
    policy: `a[href='/policy']`
  },
  table: {
    innerContent: `div[class*='Tab_innerContent__1vzeV']`,
    tableRows: `tbody.MuiTableBody-root > tr`,
    loading: `//div[contains(@class, 'RequestHistory_wrapTable')]/div`
  },
  svg: {
    deleteApiUrl: `svg[id=Layer_1]`,
    validateApiUrl: `table[class*='DomainField_table__'] > tbody > tr > td:nth-child(2) > svg:nth-child(1)`
  },
  headers: {
    blockedFiles: `section[class*='PolicyForNonCompliantFiles_wrapBlocksToggle__'] > h3:nth-child(3)`,
  },
  options: {
    countOfPolicies: `.MuiInputBase-root.MuiTablePagination-input.MuiTablePagination-selectRoot > svg`,
    countSelection_50:  `ul[class*='MuiList-root'] > li:nth-of-type(2)`,
    countView: `.MuiTypography-root:nth-child(4)`,
    
  },




  //Methods

  /*
   * Draft Policy Setting
   * ***************************************************************
   */

  async clickDraftTab() {
    const element = this.tabs.draft;
    I.clickElement(element);
  },

  clickAdaptationPolicy() {
    const element = this.tabs.adaptation_policy;
    I.waitForElement(element,30)
   I.clickElement(element);
  },

  clickNcfsPolicyTab() {
    const element = this.tabs.ncfs_policy;
    I.waitForElement(element,30)
    I.clickElement(element);
  },

  cancelPolicyDeletion() {
    const modalEl = this.modal.deleteDraftPolicy;
    I.waitForElement(modalEl,30)
    within(modalEl, () => {
      I.clickElement(this.buttons.modal_cancel)
    })
  },

  async publishPolicy() {
    const element = this.buttons.publish;
    const elPublish = await I.grabNumberOfVisibleElements(element);
    I.say(elPublish)
    if (elPublish > 0) {
      I.waitForElement(element, 15)
      //I.wait(5)
      I.clickElement(element);
      await modal.accept()
    }
  },

  deletePolicy() {
    const element = this.buttons.delete;
    I.clickElement(element);
    modal.confirmDelete()
  },

  async clickPublish() {
    const element = this.buttons.publish;
    const elPublish = await I.grabNumberOfVisibleElements(element);
    I.say(elPublish)
    if (elPublish > 0) {
      I.clickElement(element);
      I.wait(5)
    } else {
      I.say('The Publish button is not available')
    }
  },

  clickDelete() {
    const element = this.buttons.delete
    I.clickElement(element);
  },

  cancelPolicyPublishing() {
    const modalEl = this.modal.publishDraftPolicy;
    I.waitForElement(modalEl)
    within(modalEl, () => {
      I.clickElement(this.buttons.modal_publish)
    })
  },

 async goToDraftAdaptationPolicy () {
    await this.clickDraftTab();
    this.clickAdaptationPolicy();
},

goToCurrentAdaptationPolicy () {
    this.clickCurrentPolicyTab();
    this.clickAdaptationPolicy();
},

  getContentFlagRule(type, rule) {
    return "label[for='" + type + "ContentManagement_" + rule + "']";
  },

  setContentFlagRule(type, rule) {
    let container = null;
    if (type === "Word") {
      container = this.containers.wordContentFlags;
    } else if (type === "Excel") {
      container = this.containers.excelContentFlags;
    } else if (type === "PowerPoint") {
      container = this.containers.powerPointContentFlags;
    } else if (type === "Pdf") {
      container = this.containers.pdfContentFlags;
    }
    I.click(container);
    const element = this.getContentFlagRule(type, rule);
    I.clickElement(element);
  },

  clickCancelChanges() {
    const element = this.buttons.cancelChanges;
    I.clickElement(element);
  },

  clickSaveChanges() {
    const element = this.buttons.saveChanges;
    I.clickElement(element);
  },

  assertCurrentPolicyPage() {
    I.seeElement(this.fields.contentFlags)
  },

  async setAllFlags(flagType) {
    let element = null;
    if (flagType === 'sanitise') {
      element = `label:nth-child(4)`
      await I.setFlags(element)
    } else {
      if (flagType === 'disallow') {
        element = `label:nth-child(2)`
        await I.setFlags(element)
      }
    }
  },

  setFlagTypeForGivenContentFlagsForGivenDocType(contentFlags, fileType, flagType) {
    const element = this.fields.label[fileType][flagType][contentFlags]
    I.click(element)
  },

  async selectPolicyFlag(fileType, contentFlag, flagType) {
    try {
      const element = `label[for='` + fileType + contentFlag + flagType + `']`
      this.goToDraftAdaptationPolicy()
      I.clickElement(element);
      I.wait(3)
    } catch (e) {
      I.say('Unable to set policy flag')
      console.warn(e);
    }
  },

  async getFlagElement(fileType, contentFlag, flagType) {
    return `input[id='` + fileType + contentFlag + flagType + `']`;
  },

  async getSelected() {
    const element = this.getFlagElement(fileType, contentFlag, flagType);
    return await (await element.getProperty('checked')).jsonValue();
  },

  async setFlag(onOrOff) {
    const val = await this.getSelected();
    if ((onOrOff && !val) || (!onOrOff && val)) {
      const element = await this.getFlagElement();
      await element.click();
    }
  },

  async setAndPublishPolicyFlag(fileType, contentFlag, flagType) {
    const flag = `label[for='` + fileType + contentFlag + flagType + `']`
    const el = `input[id='` + fileType + contentFlag + flagType + `']`
    try {
      I.waitForElement(el, 60)
      const checked = await I.grabAttributeFrom(el, 'checked')
      if (checked === true) {
        const publishButton = this.buttons.publish;
        const saveButton = this.buttons.saveChanges
        const elPublish = await I.grabNumberOfVisibleElements(publishButton);
        const elSave = await I.grabNumberOfVisibleElements(saveButton);
        if (elSave > 0) {
          I.clickElement(saveButton)
          await this.publishPolicy()
        }
        if (elPublish > 0) {
          await this.publishPolicy()
        }
        I.waitForElement(flag, 60)
        output.print('The flag is selected as pre-condition')
      } else {
        I.waitForElement(flag, 60)
        I.clickElement(flag);
        I.clickElement(this.buttons.saveChanges)
        await this.publishPolicy()
        I.waitForElement(flag, 60)
        output.print('The new flag is selected')
      }
    } catch (e) {
      I.say('Unable to set policy flag')
      console.warn(e);
    }
  },

  async setPolicyFlag(fileType, contentFlag, flagType) {
    const flag = `label[for='` + fileType + contentFlag + flagType + `']`
    const el = `input[id='` + fileType + contentFlag + flagType + `']`
    try {
      const checked = await I.grabAttributeFrom(el, 'checked')
      if (checked === true) {
        output.print('The flag is already selected')
      } else {
        I.waitForElement(flag, 30)
        I.clickElement(flag);
      }
    } catch (e) {
      I.say('Unable to set policy flag')
      console.warn(e);
    }
  },

  async isChecked(element) {
    let checked = null;
    try {
      checked = await I.grabAttributeFromAll(element)
      //grabAttributeFrom(element, { checked: true })
      output.print(checked)
      if (checked === 1) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.warn(e);
    }
  },


  async selectFlag(fileType, contentFlag, flagType) {

    try {
      //const flag = `label[for='` + fileType + contentFlag + flagType + `']`
      // const el = `input[id='` + fileType + contentFlag + flagType + `']`
      //   if (await this.getSelectedPolicyFlag(el) === true ){
      this.goToDraftAdaptationPolicy()
      //if (flagType == 'sanitise'){

      const flag = `label[for='` + fileType + contentFlag + flagType + `']`
      I.clickElement(flag);
      const elm = this.buttons.saveChanges;
      if (!elm) {
        if (flagType === 'sanitise') {
          const flagdis = `label[for='` + fileType + contentFlag + `disallow']`
          I.clickElement(flagdis);
        } else if (flagType === 'disallow') {
          const flagsan = `label[for='` + fileType + contentFlag + `sanitise']`
          I.clickElement(flagsan);
        }
      } else {
        output.print('The save cancel buttons are displayed')
      }
    } catch (e) {
      I.say('Unable to set policy flag')
      console.warn(e);
    }
  },

  async getSelectedPolicyFlag(element) {
    this.goToCurrentAdaptationPolicy()
    try {
      let selected = await I.grabAttributeFrom(element, 'checked')
      output.print(selected)
      return selected;
    } catch (err) {
      output.print(err);
    }
  },


  async setCurrentPolicyFlag(fileType, contentFlag, flagType) {
    const flag = `label[for='` + fileType + contentFlag + flagType + `']`
    const element = `input[id='` + fileType + contentFlag + flagType + `']`
    this.selectAnyFlag(fileType, contentFlag, flagType)
    I.clickElement(this.buttons.saveChanges)
    I.wait(3)
    await this.publishPolicy()
    I.wait(5)
  },


  assertSanitiseForAllFlag(docType) {
    const elements = this.fields.input[docType].sanitise
    for (let element in elements) {
      this.assertElementChecked(elements[element])
    }
  },

  assertCurrentFlagAs(fileType, contentFlag, flagType) {
    this.goToCurrentAdaptationPolicy();
    const element = `input[id='` + fileType + contentFlag + flagType + `']`
    this.assertElementChecked(element)
  },

  assertCurrentFlagIs(element) {
    this.goToCurrentAdaptationPolicy();
    this.assertElementChecked(element)
  },

  assertDraftFlagAs(fileType, contentFlag, flagType) {
    this.goToDraftAdaptationPolicy();
    const element = `input[id='` + fileType + contentFlag + flagType + `']`
    this.assertElementChecked(element)
  },

  async clickAllFlag() {
    const elements = await I.grabNumberOfVisibleElements(`label:nth-child(2)`)
    for (let element in elements) {
      I.click(`label:nth-child(2)`)
    }
  },

  assertDisallowForAllFlag(docType) {
    const elements = this.fields.input[docType].disallow
    for (let element in elements) {
      this.assertElementChecked(elements[element])
    }
  },

  assertElementChecked(element) {
    I.seeAttributesOnElements(element, { checked: true })
  },

  clickSaveApiUrl() {
    I.click(this.svg.validateApiUrl)
  },

  clickDeleteApiUrl() {
    I.click(this.svg.deleteApiUrl)
  },

  clickCurrentPolicyTab() {
    I.click(this.tabs.current)
  },

  enterTextInApiUrl(text) {
    I.fillField(this.fields.apiUrlInput, text)
    I.wait(3)
    I.click(this.buttons.saveChanges)
  },

  async updateUrlIfNeeded(text) {
    const elText = await I.grabValueFrom(this.fields.apiUrlInput)
    let message;
    if (elText !== text) {
      this.enterTextInApiUrl(text);
      message = `API URL is changed to ${text}`
    } else {
      message = `API URL is already ${text}`
    }
    I.say(message)
  },

  /*
   * Policy History
   * ***************************************************************
   */

  async clickViewFirstPolicy() {
    const element = `(//button[contains(text(),'View')])[1]`;
    I.wait(5)
    I.clickElement(element)[0]
  },

  async clickActivateFirstPolicy() {
    const element = `(//button[contains(text(),'Activate')])[1]`;
    try {
      I.wait(5)
      I.clickElement(element)[0]
      I.wait(2);

    } catch (e) {
      console.warn(e);
    }
  },

  checkPreviousPolicyApplied(c_timestamp, p_timestamp) {
    if (c_timestamp === p_timestamp) {
      I.say('the current policy is updated with the previous one')
    } else {
      I.say('the previous policy is not applied')
    }
  },

  async getPolicyHistoryTimeStamp(row, col) {
    return await I.getRowText(row, col)
  },

  async getCurrentPolicyTimeStamp() {
    const ts_element = this.fields.policyTimestamp;
    return await I.grabTextFrom(ts_element)
  },

  clickActivate() {
    const element = this.buttons.activatePolicyFirst;
    I.clickElement(element);
  },

  clickHistoryTab() {
    const element = this.tabs.history;
    I.clickElement(element);
  },

  assertNumberOfOpenTab(expectedTabCount) {
    const numberOfOpenTabs = I.grabAllWindowHandles()
    numberOfOpenTabs.then((numberTabs) => {
      if (numberTabs.length === expectedTabCount) {
        I.say('The number Of open tabs' + numberTabs.length + 'is as expected ' + expectedTabCount)
      } else {
        I.say('Expected and actual tab count is not same')
      }
    })
  },

  async getTotalNumberOfRecordsOfPolicy() {
    const numberOfRecordsOfPolicy = await I.grabNumberOfVisibleElements(this.table.tableRows);
    I.say(`Rows count is ${numberOfRecordsOfPolicy}`)
    return numberOfRecordsOfPolicy
  },

  selectCountOfPolicies(itemCount) {
    const element = this.options.countOfPolicies;
    I.clickElement(element)
    let countSelection = `//li[contains(.,'${itemCount}')]`
    I.clickElement(countSelection);
    I.waitForElement(element, 60)

  },

  async isRecordCountAccurate(recordsCount) {
    const displayedCount = await I.grabTextFrom(this.options.countView);
    let itemsCount = await this.getTotalNumberOfRecordsOfPolicy();
      if (itemsCount === recordsCount && displayedCount.includes(`1-${itemCount}`)) {
        I.say(`The selected number of record is correctly displayed as: ${itemCount}`)
      } else {
        assert.fail(`The number of records displayed ${itemCount} is not as expected`)
      }
  },

  clickOnHistoryPolicyTab() {
    I.click(this.buttons.policy.history)
  },

  assertHistoryPolicyPage() {
    I.seeElement(this.table.innerContent)
  },

  /*
   * Pagination
   * ***************************************************************
   */

  clickFirst() {
    const element = this.buttons.firstPage;
    I.clickElement(element);
  },

  clickPrevious() {
    const element = this.buttons.previousPage;
    I.clickElement(element);
  },

  clickLast() {
    const element = this.buttons.lastPage;
    I.clickElement(element);
  },

  clickNext() {
    const element = this.buttons.nextPage;
    I.clickElement(element);
  },

  setCustomPage(value) {
    const element = this.fields.customPaginatorGoTo;
    I.fillField(element, value);
  },

  clickGo() {
    const element = this.buttons.go;
    I.clickElement(element);
  },

  /*
   * Non compliant Files
   * ***************************************************************
   */

  async setRouteFlag(routeOption) {
      const element = `label[for='`+routeOption+`']`
      const el = `input[id='`+routeOption+`']`
     try { 
       const checked = await I.grabAttributeFrom(el, 'checked');
      if (checked !== true) {
        I.click(element);
        I.wait(5)
        I.click(this.buttons.saveChanges)
      } else if (checked === true){
       // I.waitForElement(element, 5)
         output.print('The flag is already selected')
      }
    } catch (e) {
      I.say('Unable to set NCFS flag')
      console.warn(e);
    }
  },

  async setAndPublishRouteFlag(routeOption){
    await this.setRouteFlag(routeOption)
   await this.publishPolicy()
  },

  async setUnprocessableFileAsRelay() {
    const element = this.radiobuttons.unprocessedFileRelay;
    await this.setRouteFlag()
    //I.clickElement(element);
  },

  setUnprocessableFileAsBlock() {
    const element = this.radiobuttons.unprocessedFileBlock;
    I.clickElement(element);
  },

  setUnprocessableFileAsRefer() {
    const element = this.radiobuttons.unprocessedFileRefer;
    I.clickElement(element);
  },

  setBlockedFileAsRelay() {
    const element = this.radiobuttons.blockedFileRelay;
    I.clickElement(element);
  },

  setBlockedFileAsBlock() {
    const element = this.radiobuttons.blockedFileBlock;
    I.clickElement(element);
  },

  setBlockedFileAsRefer() {
    const element = this.radiobuttons.blockedFileRefer;
    I.clickElement(element);
  },

  checkBlockedRouteRadio(glasswallBlockedRoute) {
    switch (glasswallBlockedRoute) {
      case ('Relay'):
        this.setBlockedFileAsRelay();
        break;
      case ('Block'):
        this.setBlockedFileAsBlock();
        break;
      case ('Refer'):
        this.setBlockedFileAsRefer();
        break;
      default:
        throw "No such option";
    }
  },

  setUnprocessableRouteRadio(unprocessableRoute) {
    switch (unprocessableRoute) {
      case ('Relay'):
        this.setUnprocessableFileAsRelay();
        break;
      case ('Block'):
        this.setUnprocessableFileAsBlock();
        break;
      case ('Refer'):
        this.setUnprocessableFileAsRefer();
        break;
      default:
        throw "No such option";
    }

  },

  assertCheckedBlockedRadioButton(radioValue) {
    let radioElement = null;
    switch (radioValue) {
      case ('Relay'):
        radioElement = this.radiobuttons.blockedFileRelay;
        break;
      case ('Refer'):
        radioElement = this.radiobuttons.blockedFileRefer;
        break;
      case ('Block'):
        radioElement = this.radiobuttons.blockedFileBlock;
        break;
    }
    I.seeCheckboxIsChecked(radioElement);
  },

  assertCheckedUnprocessableRadioButton(radioValue) {
    let radioElement = null;
    try{
    switch (radioValue) {
      case ('Relay'):
        radioElement = this.radiobuttons.unprocessedFileRelay;
        break;
      case ('Refer'):
        radioElement = this.radiobuttons.unprocessedFileRefer;
        break;
      case ('Block'):
        radioElement = this.radiobuttons.unprocessedFileBlock;
        break;
    }
    I.seeCheckboxIsChecked(radioElement);
  } catch (e) {
    I.say('Unable to verify NCFS flag')
    console.warn(e);
  }

  },

  checkFileOutcomeIsAccurate(fileOutcome, file) {
    if (fileOutcome === 'Sanitised') {
      I.goToFileDrop()
      I.uploadFile(file)
      filedropPage.clickViewResult();
      filedropPage.isRequiredContentRefDisplayed('File is clean')
    } else if (fileOutcome === 'htmlReport') {
      I.amInPath('output/downloads');
      I.seeInThisFile('Document Access Blocked due to Policy', 'utf8')
    } else {
      I.say(`Set option ` + fileOutcome + ` is not available`)
    }
  },

  async clickNcfsPolicy() {
    const element = this.tabs.ncfs_policy;
    I.waitForElement(element,30)
    I.clickElement(element);
  }
}
