const assert = require('assert').strict;
const { I, icapProxyPage, policyPage, requesthistoryPage } = inject();
let isLocal;
//isLocal = true; // TODO: uncomment to run locally using  ICAP client in Docker

Given('I am logged into the portal', () => {
    I.login('', '')
});

Given('I am on the draft Adaptation policy screen', () => {
    I.goToContentManagementPolicy();
    I.goToDraftAdaptationPolicy()
});

Given('I set a policy for file type {string} with {string} set to {string}', async (fileType, contentFlag, flagType) => {
    await policyPage.setAndPublishPolicyFlag(fileType, contentFlag, flagType);
})

When('I process file {string} file {string} through the icap server', (fileType, file) => {
    if (isLocal) {
        const icapDir = '../p-ui-wireframes/'
        const testsDir = '../icap-management-ui-tests/'
        const inputDir = '../files/lfi1'
        const outputDir = '../files/lfo1'
        I.sendFileICAP(file, icapDir, testsDir, inputDir, outputDir)
    } else {
        I.onIcapProxyPage()
        icapProxyPage.downloadFile(fileType)
    }
})

Then('The {string} processing outcome is as expected {string}', async (file, fileOutcome) => {
    if (isLocal) {
        // verify file content
        I.amInPath(`/../files/lfo1/`)
        I.seeFile(`${file}`)
        I.seeInThisFile('', 'utf8') // TODO: set file content after fixing ICAP client
        // request history for last two minutes
        I.goToRequestHistory();
        requesthistoryPage.openDatePicker();
        requesthistoryPage.selectTimePeriod('1 Hour')
        requesthistoryPage.openDatePicker()
        requesthistoryPage.selectCustomPriod()
        await requesthistoryPage.setTimeFromEarleirOn(2)
        // verify file in request history
        const rowsQuantity = await I.getRowsQuantity()
        if (rowsQuantity !== 1) {
            assert.fail(`Row quantity is ${rowsQuantity}`)
        };
        await requesthistoryPage.checkFileTypeValues('Docx')
        await requesthistoryPage.checkFileOutcomeValues('Safe')
    } else {
        if (fileOutcome === 'Sanitised') {
            const filePath = `output/downloads/${file.trim()}`
            I.checkFileInFileDropUrl(filePath)
            I.see('File is clean')
            I.say('The file is successfully processed and clean')
        } else if (fileOutcome === 'htmlReport') {
            await icapProxyPage.checkIfHtmlReportReturned()
        }
    }
})
