const { I } = inject();

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
  modal:{
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
    modal_cancel: `//button[text()='Cancel']`,
    modal_delete: `//button[text()='Delete']`,
    modal_publish: `//button[text()='Publish']`,
    cancelChanges: `//button[contains(.,'Cancel Changes']`,
    saveChanges: `//button[contains(.,'Save Changes')]`, 
    publish: `//button[text()='Publish']`,
    delete: `//button[text()='Delete']`,
    policy: {
      current: `//button[text()='Current']`,
      history: `//button[text()='History']`
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
    I.click(element);
  },

  clickAdaptationPolicy() {
    const element = this.tabs.adaptation_policy;
    I.click(element);
  },

  clickNcfsPolicyTab() {
    const element = this.tabs.ncfs_policy;
    I.click(element);
  },

  deletePolicy(){
    this.clickDelete();
    const modalEl = this.modal.deleteDraftPolicy;
    I.waitForElement(modalEl)
    within(modalEl, () =>{
      I.clickElement(this.buttons.modal_delete)
    })
  },

  cancelPolicyDeletion(){
    const modalEl = this.modal.deleteDraftPolicy;
    I.waitForElement(modalEl)
    within(modalEl, () =>{
      I.clickElement(this.buttons.modal_cancel)
    })
  },

  async publishPolicy(){
    const element = this.buttons.publish;
    const elPublish = await I.grabNumberOfVisibleElements(element);
    I.say(elPublish)
      if(elPublish.length>0){
       I.click(element);
       I.wait(5)
    const modalEl = this.modal.publishDraftPolicy;
    I.waitForElement(modalEl)
    within(modalEl, () =>{
      I.clickElement(this.buttons.modal_publish)
    })
  }else{
    I.say('The Publish button is not available')
  }
  },

  async clickPublish(){
    const element = this.buttons.publish;
    const elPublish = await I.grabNumberOfVisibleElements(element);
    I.say(elPublish)
      if(elPublish.length>0){
       I.click(element);
       I.wait(5)
    }else{
      I.say('The Publish button is not available')
    }
  },

  clickDelete(){
    const element = this.buttons.delete
    I.clickElement(element);
  },

  cancelPolicyPublishing(){
    const modalEl = this.modal.publishDraftPolicy;
    I.waitForElement(modalEl)
    within(modalEl, () =>{
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

  assertCurrentPolicyPage() {
    I.seeElement(this.fields.contentFlags)
  },

  clickSanitiseForAllFlag(docType) {
    const elements = this.fields.label[docType].sanitise
    for (let element in elements) {
      I.click(elements[element])
    }
  },

  setFlagTypeForGivenContentFlagsForGivenDocType(contentFlags, fileType, flagType) {
    const element = this.fields.label[fileType][flagType][contentFlags]
    I.click(element)
  },

  async setPolicyFlag(fileType, contentFlag, flagType) {
   try { 
     const element = `label[for='` + fileType + contentFlag + flagType + `']`
    I.clickElement(element)
    const save =this.buttons.saveChanges;
    const elSave = await I.grabNumberOfVisibleElements(save);
    I.say(elSave)
      if(elSave.length>0){
       I.clickElement(save);
       I.wait(5)
      }else if (!elSave || elSave.length === 0){
        I.say('The required policy is already selected')
      }
    } catch (e) {
      I.say('Unable to set policy flag')
      console.warn(e);
    }
  },


  //`label[for='wordEmbeddedFilesdisallow']`

  // getPolicyFlag(fileType, contentFlag, policy){
  //   const element = `input[id='`+fileType +contentFlag +policy`']`
  //   let selected = I.seeAttributesOnElements(element, { checked: true })
  //   let deselected = I.seeAttributesOnElements(element, { checked: false })
  //   if(selected) {
  //     I.say('The current policy flag status for '+ fileType +contentFlag +' is ' +policy)
  //   }else if(deselected) {
  //     I.say('The current policy flag status for '+ fileType +contentFlag +' is ' +policy)

  //   }
  //   return element;
  // },

  assertSanitiseForAllFlag(docType) {
    const elements = this.fields.input[docType].sanitise
    for (let element in elements) {
      this.assertElementChecked(elements[element])
    }
  },

  assertFlagTypeForGivenContentFlagsForGivenDocType(contentFlags, fileType, flagType) {
    const element = this.fields.input[fileType][flagType][contentFlags]
    this.assertElementChecked(element)
  },

  clickDisallowForAllFlag(docType) {
    const elements = this.fields.label[docType].disallow
    for (let element in elements) {
      I.click(elements[element])
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
    I.click(this.buttons.policy.current)
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
    I.click(element);
  },

  clickActivate() {
    const element = this.buttons.activatePolicyFirst;
    I.click(element);
  },

  clickHistoryTab() {
    const element = this.tabs.history;
    I.click(element);
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

  clickNext() {
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
    const element = this.fields.unprocessedFileRelay;
    I.click(element);
  },

  setUnprocessableFileAsBlock() {
    const element = this.fields.unprocessedFileBlock;
    I.click(element);
  },

  setUnprocessableFileAsRefer() {
    const element = this.fields.unprocessedFileRefer;
    I.click(element);
  },

  setBlockedFileAsRelay() {
    const element = this.fields.blockedFileRelay;
    I.click(element);
  },

  setBlockedFileAsBlock() {
    const element = this.fields.blockedFileBlock;
    I.click(element);
  },

  setBlockedFileAsRefer() {
    const element = this.fields.blockedFileRefer;
    I.click(element);
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

  }
};
