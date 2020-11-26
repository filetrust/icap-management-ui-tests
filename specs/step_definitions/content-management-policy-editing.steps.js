const { setPolicyFlag } = require("../../src/pages/policy.page");
const assert = require('assert').strict;

const {
    I,
    policyPage,
    loginPage,
    homePage,
    env
} = inject();

const setFlag = null;

Given('I am logged into the portal', () => {
    I.login('','')
});

Given('I am on the policy screen', () => {
    I.goToContentManagementPolicy();
});

Given('I am on draft Adaptation policy screen', () => {
    I.goToDraftAdaptationPolicy()
});

Given(/^the current policy for (.*) is set to (.*) and (.*)$/, (FileType, ContentFlag, CurrentFlagType) => {
    setFlag = policyPage.getPolicyFlag(FileType, ContentFlag, CurrentFlagType);
    I.say('The current policy flag element is: '+setFlag)
});

When(/^I change the contentFlag (.*) for (.*) to (.*)$/, (FileType, ContentFlag, DraftFlagType) => {
    policyPage.setPolicyFlag(FileType, ContentFlag, DraftFlagType)
});

Then(/^The (.*) for required file types (.*) is set to (.*)$/, (contentFlag, fileType, flagType) => {
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

When(/^I change all the flag for (.*) to (.*) on policy page$/, (fileType, flagType) => {
    if ( flagType === 'sanitise') {
        policyPage.clickSanitiseForAllFlag(fileType)
        policyPage.clickSaveChanges()
    } else if (flagType === 'disallow') {
        policyPage.clickDisallowForAllFlag(fileType)
        policyPage.clickSaveChanges()
    }
});

When(/^All flags of the (.*) is changed to (.*)$/, (fileType, flagType) => {
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

Then(/^The contentFlag (.*) for (.*) remains (.*)$/, (FileType, ContentFlag, CurrentFlagType) => {
    I.goToCurrentAdaptationPolicy();
   const flagEl = policyPage.getPolicyFlag(FileType, ContentFlag, CurrentFlagType);
    assert(flagEl==setFlag)
   I.seeElement(setFlag)
});