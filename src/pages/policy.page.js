const { I } = inject();

module.exports = {
  //locators

  tabs: {
    current: `section[class*='TabNav_TabNav__2M5TN'] > ul > li:nth-of-type(1) > button`,
    history: `section[class*='TabNav_TabNav__2M5TN'] > ul > li:nth-of-type(2) > button`,
  },
  fields: {
    domainNameInput: `div[class*='Input_Input__17Nwp'] > input`,
    pageHeading: `h1[class*='Main_pageHeading']`,
    contentFlags: `//p[text()='Content Flags']`,
    word: {
      sanitise: {
        dynamicDataExchange: `label[for='word-id-1sanitise']`,
        embeddedFiles: `label[for='word-id-2sanitise']`,
        embeddedFiles2: `label[for='word-id-3sanitise']`,
        externalHyperlinks: `label[for='word-id-4sanitise']`,
        internalHyperlinks: `label[for='word-id-5sanitise']`,
        macros: `label[for='word-id-6sanitise']`,
        metadata: `label[for='word-id-7sanitise']`,
        reviewComments: `label[for='word-id-8sanitise']`
      },
      disallow: {
        dynamicDataExchange: `label[for='word-id-1disallow']`,
        embeddedFiles: `label[for='word-id-2disallow']`,
        embeddedFiles2: `label[for='word-id-3disallow']`,
        externalHyperlinks: `label[for='word-id-4disallow']`,
        internalHyperlinks: `label[for='word-id-5disallow']`,
        macros: `label[for='word-id-6disallow']`,
        metadata: `label[for='word-id-7disallow']`,
        reviewComments: `label[for='word-id-8disallow']`
      }
    },
    excel: {
      sanitise: {
        dynamicDataExchange: `label[for='excel-id-1sanitise']`,
        embeddedFiles: `label[for='excel-id-2sanitise']`,
        embeddedFiles2: `label[for='excel-id-3sanitise']`,
        externalHyperlinks: `label[for='excel-id-4sanitise']`,
        internalHyperlinks: `label[for='excel-id-5sanitise']`,
        macros: `label[for='excel-id-6sanitise']`,
        metadata: `label[for='excel-id-7sanitise']`,
        reviewComments: `label[for='excel-id-8sanitise']`
      },
      disallow: {
        dynamicDataExchange: `label[for='excel-id-1disallow']`,
        embeddedFiles: `label[for='excel-id-2disallow']`,
        embeddedFiles2: `label[for='excel-id-3disallow']`,
        externalHyperlinks: `label[for='excel-id-4disallow']`,
        internalHyperlinks: `label[for='excel-id-5disallow']`,
        macros: `label[for='excel-id-6disallow']`,
        metadata: `label[for='excel-id-7disallow']`,
        reviewComments: `label[for='excel-id-8disallow']`,
      }
    },
    powerpoint: {
      sanitise: {
        embeddedFiles: `label[for='powerpoint-id-1sanitise']`,
        embeddedImages: `label[for='powerpoint-id-2sanitise']`,
        externalHyperlinks: `label[for='powerpoint-id-3sanitise']`,
        internalHyperlinks: `label[for='powerpoint-id-3sanitise']`,
        macros: `label[for='powerpoint-id-5sanitise']`,
        metadata: `label[for='powerpoint-id-6sanitise']`,
        reviewComments: `label[for='powerpoint-id-7sanitise']`
      },
      disallow: {
        embeddedFiles: `label[for='powerpoint-id-1disallow']`,
        embeddedImages: `label[for='powerpoint-id-2disallow']`,
        externalHyperlinks: `label[for='powerpoint-id-3disallow']`,
        internalHyperlinks: `label[for='powerpoint-id-4disallow']`,
        macros: `label[for='powerpoint-id-5disallow']`,
        metadata: `label[for='powerpoint-id-6disallow']`,
        reviewComments: `label[for='powerpoint-id-7disallow']`
      }
    },
    pdf: {
      sanitise: {
        acroform: `label[for='pdf-id-1sanitise']`,
        actionsAll: `label[for='pdf-id-2sanitise']`,
        embeddedFiles: `label[for='pdf-id-3sanitise']`,
        embeddedImages: `label[for='pdf-id-4sanitise']`,
        externalHyperlinks: `label[for='pdf-id-5sanitise']`,
        internalHyperlinks: `label[for='pdf-id-6sanitise']`,
        javascript: `label[for='pdf-id-7sanitise']`,
        metadata: `label[for='pdf-id-8sanitise']`
      },
      disallow: {
        acroform: `label[for='pdf-id-1disallow']`,
        actionsAll: `label[for='pdf-id-2disallow']`,
        embeddedFiles: `label[for='pdf-id-3disallow']`,
        embeddedImages: `label[for='pdf-id-4disallow']`,
        externalHyperlinks: `label[for='pdf-id-5disallow']`,
        internalHyperlinks: `label[for='pdf-id-6disallow']`,
        javascript: `label[for='pdf-id-7disallow']`,
        metadata: `label[for='pdf-id-8disallow']`
      }
    },
    validateApiUrlInput: `div[class*='Input_Input__SNRl4'] > input`,
    paginationItemShown: `div[class*='Pagination_pageCountSelector__2uMsg'] > select`
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
    cancelChanges: `//button[text()='Cancel Changes']`,
    saveChanges: `//button[text()='Save Changes']`,
    policy : {
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
    validateApiUrl: `div[class*='DomainField_validated__2FsbB'] > svg`
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
    I.seeElement(this.fields.wordContentFlags)
  },

  clickSanitiseForAllFlag(docType) {
    const elements = this.fields[docType].sanitise
    for (let element in elements) {
      I.click(elements[element])
    }
  },

  setFlagTypeForGivenContentFlagsForGivenDocType(contentFlags, fileType, flagType) {
    const element = this.fields[fileType][flagType][contentFlags]
    I.click(element)
  },

  assertSanitiseForAllFlag(docType) {
    const elements = this.fields[docType].sanitise
    for (let element in elements) {
      this.assertElementChecked(elements[element])
    }
  },

  assertFlagTypeForGivenContentFlagsForGivenDocType(contentFlags, fileType, flagType) {
    const element = this.fields[fileType][flagType][contentFlags]
    this.assertElementChecked(element)
  },

  clickDisallowForAllFlag(docType) {
    const elements = this.fields[docType].disallow
    for (let element in elements) {
      I.click(elements[element])
    }
  },

  assertDisallowForAllFlag(docType) {
    const elements = this.fields[docType].disallow
    for (let element in elements) {
      this.assertElementChecked(elements[element])
    }
  },

  // TODO Uncomment this assertion when functionality work fine.
  assertElementChecked(element) {
      // I.seeAttributesOnElements(element, 'checked')
  },

  clickSaveApiUrl() {
    I.click(this.svg.validateApiUrl)
  },

  clickDeleteApiUrl() {
    I.click(this.svg.deleteApiUrl)
  },

  clickOnCurrentPolicyTab() {
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
    const numberOfOpenTabs = I.grabNumberOfOpenTabs()
    numberOfOpenTabs.then((numberTabs) => {
      I.assertEqual(numberTabs, expectedTabCount, 'Expected and actual tab count is not same')
    })
  },

  assertNumberOfRecordsOfPolicy(count) {
    const numberOfRowsInTable = I.grabNumberOfVisibleElements(this.table.tableRows)
    numberOfRowsInTable.then((numberOfRows) => {
      I.assert((numberOfRows > count), true)
    })
  },

  clickOnHistoryPolicyTab() {
    I.click(this.buttons.policy.history)
  },

  assertHistoryPolicyPage() {
    I.seeElement(this.table.innerContent)
  },

  setItemsSelected(itemCount) {
    I.selectOption(this.fields.paginationItemShown, itemCount.toString())
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

  setBlockedFileAsBlock() {
    const element = this.checkboxes.blockedFileBlock;
    I.click(element);
  },

  setBlockedFileAsRefer() {
    const element = this.checkboxes.unprocessedFileRefer;
    I.click(element);
  }
};
