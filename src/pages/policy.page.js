const {
    I
} = inject();

module.exports = {

    //Locators

    fields: {
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
        }
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
}