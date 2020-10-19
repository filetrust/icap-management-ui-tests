const { I } = inject();

module.exports = {
  //locators
    tabs: {
        current: `section[class*='TabNav_TabNav__2M5TN'] > ul > li:nth-of-type(1) > button`,
        history: `section[class*='TabNav_TabNav__2M5TN'] > ul > li:nth-of-type(2) > button`,
    },
    checkboxes: {
        unprocessedFileRelay: "",
        unprocessedFileBlock: "",
        unprocessedFileRefer: "",
        blockedFileRelay: "",
        blockedFileBlock: "",
        blockedFileRefer: "",
    },
      containers: {
        wordContentFlags: `div[class*='Current_inner__1pjYU'] > section:nth-of-type(1) > div`,
        excelContentFlags: `div[class*='Current_inner__1pjYU'] > section:nth-of-type(2) > div`,
        powerPointContentFlags: `div[class*='Current_inner__1pjYU'] > section:nth-of-type(3) > div`,
        pdfContentFlags: `div[class*='Current_inner__1pjYU'] > section:nth-of-type(4) > div`,
      },
    fields: {
        domainNameInput: `div[class*='Input_Input__17Nwp'] > input`,
        pageHeading: `h1[class*='Main_pageHeading']`,
        word: {
            sanitise : {
                dynamicDataExchange : `label[for='word-id-1sanitise']`,
                embeddedFiles : `label[for='word-id-2sanitise']`,
                embeddedFiles2 : `label[for='word-id-3sanitise']`,
                externalHyperlinks : `label[for='word-id-4sanitise']`,
                internalHyperlinks : `label[for='word-id-5sanitise']`,
                macros : `label[for='word-id-6sanitise']`,
                metadata : `label[for='word-id-7sanitise']`,
                reviewComments : `label[for='word-id-8sanitise']`
            },
            disallow : {
                dynamicDataExchange : `label[for='word-id-1disallow']`,
                embeddedFiles : `label[for='word-id-2disallow']`,
                embeddedFiles2 : `label[for='word-id-3disallow']`,
                externalHyperlinks : `label[for='word-id-4disallow']`,
                internalHyperlinks : `label[for='word-id-5disallow']`,
                macros : `label[for='word-id-6disallow']`,
                metadata : `label[for='word-id-7disallow']`,
                reviewComments : `label[for='word-id-8disallow']`
            }
        },
        excel: {
            sanitise : {
                dynamicDataExchange : `label[for='excel-id-1sanitise']`,
                embeddedFiles : `label[for='excel-id-2sanitise']`,
                embeddedFiles2 : `label[for='excel-id-3sanitise']`,
                externalHyperlinks : `label[for='excel-id-4sanitise']`,
                internalHyperlinks : `label[for='excel-id-5sanitise']`,
                macros : `label[for='excel-id-6sanitise']`,
                metadata : `label[for='excel-id-7sanitise']`,
                reviewComments : `label[for='excel-id-8sanitise']`
            },
            disallow : {
                dynamicDataExchange : `label[for='excel-id-1disallow']`,
                embeddedFiles : `label[for='excel-id-2disallow']`,
                embeddedFiles2 : `label[for='excel-id-3disallow']`,
                internalHyperlinks : `label[for='excel-id-5disallow']`,
                macros : `label[for='excel-id-6disallow']`,
                metadata : `label[for='excel-id-7disallow']`,
                reviewComments : `label[for='excel-id-8disallow']`,
            }
        },
        powerpoint: {
            sanitise : {
                embeddedFiles : `label[for='powerpoint-id-1sanitise']`,
                embeddedImages : `label[for='powerpoint-id-2sanitise']`,
                externalHyperlinks : `label[for='powerpoint-id-3sanitise']`,
                internalHyperlinks : `label[for='powerpoint-id-3sanitise']`,
                macros : `label[for='powerpoint-id-5sanitise']`,
                metadata : `label[for='powerpoint-id-6sanitise']`,
                reviewComments : `label[for='powerpoint-id-7sanitise']`
            },
            disallow : {
                embeddedFiles : `label[for='powerpoint-id-1disallow']`,
                embeddedImages : `label[for='powerpoint-id-2disallow']`,
                externalHyperlinks : `label[for='powerpoint-id-3disallow']`,
                internalHyperlinks : `label[for='powerpoint-id-4disallow']`,
                macros : `label[for='powerpoint-id-5disallow']`,
                metadata : `label[for='powerpoint-id-6disallow']`,
                reviewComments : `label[for='powerpoint-id-7disallow']`
            }
        },
        pdf: {
            sanitise : {
                acroform : `label[for='pdf-id-1sanitise']`,
                actionsAll : `label[for='pdf-id-2sanitise']`,
                acroform : `label[for='pdf-id-3sanitise']`,
                embeddedImages : `label[for='pdf-id-4sanitise']`,
                externalHyperlinks : `label[for='pdf-id-5sanitise']`,
                internalHyperlinks : `label[for='pdf-id-6sanitise']`,
                javascript : `label[for='pdf-id-7sanitise']`,
                metadata : `label[for='pdf-id-8sanitise']`
            },
            disallow : {
                acroform : `label[for='pdf-id-1disallow']`,
                actionsAll : `label[for='pdf-id-2disallow']`,
                acroform : `label[for='pdf-id-3disallow']`,
                externalHyperlinks : `label[for='pdf-id-4disallow']`,
                internalHyperlinks : `label[for='pdf-id-5disallow']`,
                internalHyperlinks : `label[for='pdf-id-6disallow']`,
                javascript : `label[for='pdf-id-7disallow']`,
                metadata : `label[for='pdf-id-8disallow']`
            }
        },
        validateApiUrlInput: `div[class*='Input_Input__SNRl4'] > input`

    },
    buttons: {
        saveChange : `//button[text()='Save Changes']`,
        cancelChange : `//button[text()='Cancel Changes']`,
        policy : {
            current: `//button[text()='Current']`,
            history: `//button[text()='History']`
        },
        view: "",
        activate: "",
        gotoPage: "",
        previousPage: "",
        firstPage: "",
        nextPage: "",
        lastPage: "",
    },
    sections: {

    },
    links: {
        policy: `a[href='/policy']`
    },
    lists: {
    },
    text: {
        contentFlags: `//p[text()='Content Flags']`,
    },
    table: {
        innerContent: `div[class*='Tab_innerContent__1vzeV']`,
        viewPolicyFirst: `//tbody/tr[1]/th/button[text()='View']`,
        activatePolicyFirst: `//tbody/tr[1]/th/button[text()='Activate']`
    },
    svg: {
        deleteApiUrl: `svg[id=Layer_1]`,
        validateApiUrl: `div[class*='DomainField_validated__2FsbB'] > svg`
    },

    /*
   * MenuLinks
   * ***************************************************************
   */
    clickPolicyTab() {
        const element = this.links.policy;
        I.click(element);
    },

    clickSaveChanges() {
        I.click(this.buttons.saveChange)
    },

    clickCancelChanges() {
        I.click(this.buttons.cancelChange)
    },

    clickDeleteApiUrl() {
        I.click(this.svg.deleteApiUrl)
    },

    clickActivate() {
        I.click(this.table.activatePolicyFirst)
    },

    clickView() {
        I.click(this.table.viewPolicyFirst)
    },

    clickSaveApiUrl() {
        I.click(this.svg.validateApiUrl)
    },

    clickSanitiseForAllFlagForDoc(docType) {
        const elements = this.fields[docType].sanitise
        for (let element in elements) {
            I.click(elements[element])
        }
    },

    assertSanitiseForAllFlagForDoc(docType) {
        const elements = this.fields[docType].sanitise
        for (let element in elements) {
            I.seeAttributesOnElements(elements[element], 'checked')
        }
    },

    clickDisallowForAllFlagForDoc(docType) {
        const elements = this.fields[docType].disallow
        for (let element in elements) {
            I.click(elements[element])
        }
    },

    assertDisallowForAllFlagForDoc(docType) {
        const elements = this.fields[docType].disallow
        for (let element in elements) {
            I.seeAttributesOnElements(elements[element], 'checked')
        }
    },

    clickOnCurrentPolicyTab() {
        I.click(this.buttons.policy.current)
    },

    clickOnHistoryPolicyTab() {
        I.click(this.buttons.policy.history)
    },

    assertCurrentPolicyPage() {
        I.seeElement(this.text.contentFlags)
    },

    assertHistoryPolicyPage() {
        I.seeElement(this.table.innerContent)
    },

    enterTextInApiUrl(text) {
        I.fillField(this.fields.validateApiUrlInput, text)
    },

    assertNumberOfOpenTab(expectedTabCount) {
        const numberOfOpenTabs = I.grabNumberOfOpenTabs()
        numberOfOpenTabs.then((numberTabs) => {
            I.assertEqual(numberTabs, expectedTabCount, 'Expected and actual tab count is not same')
        })
    },

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

  /*
   * Policy History
   * ***************************************************************
   */


  // Pagination

  clickFirst() {
    const element = this.buttons.firstPage;
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

  setBlockedFileAsBlock() {
    const element = this.checkboxes.blockedFileBlock;
    I.click(element);
  },

  setUNprocessedFileRefer() {
    const element = this.checkboxes.unprocessedFileRefer;
    I.click(element);
  },
};
