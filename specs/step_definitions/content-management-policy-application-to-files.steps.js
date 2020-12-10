const {
    I, icapProxyPage, policyPage } = inject();

const assert = require('assert');

Given('I am logged into the portal', () => {
    I.login('', '')
});

Given('I am on the draft Adaptation policy screen', () => {
    I.goToContentManagementPolicy();
    I.goToDraftAdaptationPolicy()
});

Given('I set a policy for file type {string} with {string} set to {string}', (fileType, contentFlag, flagType) => {
    policyPage.setAndPublishPolicyFlag(fileType, contentFlag, flagType);
})

When(/^I process file (.*) file (.*) through the icap server$/, (fileType, file) => {
    I.onIcapProxyPage()
    icapProxyPage.downloadFile(fileType)
    I.wait(5)
})

Then('The {string} processing outcome is as expected {string}', (file, fileOutcome) => {
    if (fileOutcome === 'Sanitised') {
        const filePath = `output/downloads/${file.trim()}`
        I.checkFileInFileDropUrl(filePath)
        I.see('File is clean')
        I.say('The file is successfully processed and clean')
    } else if (fileOutcome === 'htmlReport') {
        icapProxyPage.checkIfHtmlReportReturned()
    }
})   
