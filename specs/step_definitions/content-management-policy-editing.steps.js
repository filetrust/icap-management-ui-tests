const { setPolicyFlag } = require("../../src/pages/policy.page");
const assert = require('assert').strict;

const {
    I,
    policyPage,
   } = inject();

let setFlag;

Given('I am logged into the portal', () => {
    I.login('','')
});

Given('I am on the policy screen', () => {
    I.goToContentManagementPolicy();
});

Given('I am on draft Adaptation policy screen', () => {
    I.goToDraftAdaptationPolicy()
    //pause()
});

Given('the current policy for {string} is set to {string} and {string}', (FileType, ContentFlag, CurrentFlagType) => {
    setFlag = policyPage.getPolicyFlag(FileType, ContentFlag, CurrentFlagType);
    I.say('The current policy flag element is: '+setFlag)
});

When('I change one of the contentFlags {string} for {string} to {string}', (FileType, ContentFlag, DraftFlagType) => {
    policyPage.setPolicyFlag(FileType, ContentFlag, DraftFlagType)
});

Then('The contentFlag {string} for required file types {string} is set to {string}', (contentFlag, fileType, flagType) => {
    policyPage.assertFlagTypeForGivenContentFlagsForGivenDocType(contentFlag, fileType, flagType)
});

When('I click on Current Policy in the navigation panel', () => {
    policyPage.clickOnCurrentPolicyTab()
});

Then('I am taken to the current policy page', () => {
    policyPage.assertCurrentPolicyPage()
});

When('I press the Cancel button', () => {
    policyPage.clickCancelChanges()
});

When('I press the Save button', () => {
    policyPage.clickSaveChanges()
});

When('I change all the flag for {string} to {string} on policy page', (fileType, flagType) => {
    if ( flagType === 'sanitise') {
        policyPage.clickSanitiseForAllFlag(fileType)
        policyPage.clickSaveChanges()
    } else if (flagType === 'disallow') {
        policyPage.clickDisallowForAllFlag(fileType)
        policyPage.clickSaveChanges()
    }
});

When('All flags of the {string} is changed to {string}', (fileType, flagType) => {
    if ( flagType === 'sanitise') {
        policyPage.assertSanitiseForAllFlag(fileType)
    } else if (flagType === 'disallow') {
        policyPage.assertDisallowForAllFlag(fileType)
    }
});

When('I click the delete button', () => {
    policyPage.clickDeleteApiUrl()
});

When('I have entered an invalid URL into the "API URL" box', () => {
    policyPage.enterTextInApiUrl("INVALID TEXT")
});

When('I have entered an valid URL into the "API URL" box', () => {
    policyPage.enterTextInApiUrl("validsolutions.com")
});

When('the save button is selected', () => {
    policyPage.clickSaveApiUrl()
});

Then('The contentFlag {string} for {string} remains {string}', (FileType, ContentFlag, CurrentFlagType) => {
    I.goToCurrentAdaptationPolicy();
   const flagEl = policyPage.getPolicyFlag(FileType, ContentFlag, CurrentFlagType);
    assert(flagEl==setFlag)
   I.seeElement(setFlag)
});