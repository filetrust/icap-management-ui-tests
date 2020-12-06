const { output } = require("codeceptjs");
const I = actor();

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
    validateApiUrlInput: `div[class*='Input_Input__'] > input`,
    blockedFileRelay: "//label[@for='relay-Glasswall-Blocked-Files']",
    blockedFileBlock: "//label[@for='block-Glasswall-Blocked-Files']",
    blockedFileRefer: "//label[@for='refer-Glasswall-Blocked-Files']",
    unprocessedFileRelay: "//label[@for='relay-Un-Processable-File-Types']",
    unprocessedFileBlock: "//label[@for='block-Un-Processable-File-Types']",
    unprocessedFileRefer: "//label[@for='refer-Un-Processable-File-Types']",
  },
  modal: {
    deleteDraftPolicy: `div[class*='ConfirmDraftDeleteModal_modalContainer__']`,
    publishDraftPolicy: `div[class*='ConfirmDraftPublishModal_modalContainer__']`,
  },
  radiobuttons: {
    unprocessedFileRelay: "#relay-Un-Processable-File-Types",
    unprocessedFileBlock: "#block-Un-Processable-File-Types",
    unprocessedFileRefer: "#refer-Un-Processable-File-Types",
    blockedFileRelay: "#relay-Glasswall-Blocked-Files",
    blockedFileBlock: "#block-Glasswall-Blocked-Files",
    blockedFileRefer: "#refer-Glasswall-Blocked-Files",
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
    view: "",
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
    tableRows: `tbody.MuiTableBody-root > tr`
  },
  svg: {
    deleteApiUrl: `svg[id=Layer_1]`,
    validateApiUrl: `table[class*='DomainField_table__'] > tbody > tr > td:nth-child(2) > svg:nth-child(1)`
  },
  headers: {
    blockedFiles: `section[class*='PolicyForNonCompliantFiles_wrapBlocksToggle__'] > h3:nth-child(3)`,
  },
  options: {
    countOfPolicies: "div[class*='Pagination_pageCountSelector__'] > select"
  },




  //Methods

  /*
   * Draft Policy Setting
   * ***************************************************************
   */

  clickDraftTab() {
    const element = this.tabs.draft;
    I.clickElement(element);
  },

  clickAdaptationPolicy() {
    const element = this.tabs.adaptation_policy;
    I.clickElement(element);
  },

  clickNcfsPolicyTab() {
    const element = this.tabs.ncfs_policy;
    I.clickElement(element);
  },

  // deletePolicy() {
  //   this.clickDelete();
  //   const modalEl = this.modal.deleteDraftPolicy;
  //   I.waitForElement(modalEl)
  //   within(modalEl, () => {
  //     I.clickElement(this.buttons.modal_delete)
  //   })
  // },

  cancelPolicyDeletion() {
    const modalEl = this.modal.deleteDraftPolicy;
    I.waitForElement(modalEl)
    within(modalEl, () => {
      I.clickElement(this.buttons.modal_cancel)
    })
  },

  publishPolicy() {
    const element = this.buttons.publish;
    I.clickElement(element);
    I.wait(5)
    modal.accept()
  },

  deletePolicy() {
    const element = this.buttons.delete;
    I.clickElement(element);
    I.wait(5)
    modal.confirmDelete()
  },

  async clickPublish() {
    const element = this.buttons.publish;
    const elPublish = await I.grabNumberOfVisibleElements(element);
    I.say(elPublish)
    if (elPublish.length > 0) {
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
      I.goToDraftAdaptationPolicy()
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
    //const el = `input[id='` + fileType + contentFlag + flagType + `']`
    try {
      I.goToDraftAdaptationPolicy()
      I.clickElement(flag);
      I.clickElement(this.buttons.saveChanges)
      I.wait(3)
      this.publishPolicy()
      I.wait(5)
    } catch (e) {
      I.say('Unable to set policy flag')
      console.warn(e);
    }
  },

  async selectFlag(fileType, contentFlag, flagType) {

    try {
      //const flag = `label[for='` + fileType + contentFlag + flagType + `']`
      // const el = `input[id='` + fileType + contentFlag + flagType + `']`
      //   if (await this.getSelectedPolicyFlag(el) === true ){
      I.goToDraftAdaptationPolicy()
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
    I.goToCurrentAdaptationPolicy()
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
    // I.goToCurrentAdaptationPolicy()
    // let selected = await I.grabAttributeFrom(element, { checked: true })
    // try {
    //     if (selected){
    //       output.print('The required policy is already published')
    //   }else {
    //       I.goToDraftAdaptationPolicy()
    //       I.clickElement(flag);
    this.selectAnyFlag(fileType, contentFlag, flagType)
    I.clickElement(this.buttons.saveChanges)
    I.wait(3)
    this.publishPolicy()
    I.wait(5)
    //   } } catch (e) {
    // I.say('Unable to set policy flag')
    // console.warn(e); }
  },


  assertSanitiseForAllFlag(docType) {
    const elements = this.fields.input[docType].sanitise
    for (let element in elements) {
      this.assertElementChecked(elements[element])
    }
  },

  assertCurrentFlagAs(fileType, contentFlag, flagType) {
    I.goToCurrentAdaptationPolicy();
    const element = `input[id='` + fileType + contentFlag + flagType + `']`
    this.assertElementChecked(element)
  },

  assertCurrentFlagIs(element) {
    I.goToCurrentAdaptationPolicy();
    this.assertElementChecked(element)
  },

  assertDraftFlagAs(fileType, contentFlag, flagType) {
    I.goToDraftAdaptationPolicy();
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
    I.fillField(this.fields.validateApiUrlInput, text)
  },



  /*
   * Policy History
   * ***************************************************************
   */
  clickView() {
    const element = this.buttons.viewPolicyFirst;
    I.clickElement(element);
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
    return numberOfRecordsOfPolicy
  },

  selectCountOfPolicies(itemCount) {
    const element = this.options.countOfPolicies;
    I.selectOption(element, itemCount);
  },

  assertPoliciesItemShownCount(itemCount, availableRecords) {
    availableRecords.then((records) => {
      if (records > itemCount) {
        I.seeNumberOfElements(this.table.tableRows, itemCount)
      } else {
        I.seeNumberOfElements(this.table.tableRows, records)
      }
    })
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

  setUnprocessableFileAsRelay() {
    const element = this.fields.unprocessedFileRelay;
    I.clickElement(element);
  },

  setUnprocessableFileAsBlock() {
    const element = this.fields.unprocessedFileBlock;
    I.clickElement(element);
  },

  setUnprocessableFileAsRefer() {
    const element = this.fields.unprocessedFileRefer;
    I.clickElement(element);
  },

  setBlockedFileAsRelay() {
    const element = this.fields.blockedFileRelay;
    I.clickElement(element);
  },

  setBlockedFileAsBlock() {
    const element = this.fields.blockedFileBlock;
    I.clickElement(element);
  },

  setBlockedFileAsRefer() {
    const element = this.fields.blockedFileRefer;
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

  checkUnprocessableRouteRadio(unprocessableRoute) {
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

  clickNcfsPolicy() {
    const element = this.tabs.ncfs_policy;
    I.clickElement(element);
  }
}
