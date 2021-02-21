const path = require('path');
const { I, requesthistoryPage } = inject();
let fileId;
isLocal = true;

Given('The file {string} is not in download folder', async (file) => {
    const downloadedFile = path.join('output', 'downloads', file);
    console.log(`downloadedFile: ${downloadedFile}`)
    I.cleanupFile(downloadedFile);

});

Given('I am logged into the portal', () => {
    I.login()
});

Given('I am on the draft Adaptation policy screen', () => {
    I.goToContentManagementPolicy();
    I.goToDraftAdaptationPolicy()
});

Given('The NCFS routing is set to Block for supported files', async () => {
    await I.setGwBlockFilesToBlock();
});


Given('I set a policy for file type {string} with {string} set to {string}', async (fileType, contentFlag, flagType) => {
    await I.setRequiredContentFlag(fileType, contentFlag, flagType);
})

When('I process file {string} through the icap server using Icap client', async (file) => {
    fileId = await I.sendFileICAP(file)
    await I.say(`I sent a file and received ${fileId}`);
})

Then('The {string} with file type {string} processing outcome is as expected {string} and {string}', async (file, fileExtension, fileOutcome, outcomeValue) => {
    I.goToRequestHistory()
    //I.searchFileById(fileId)
    requesthistoryPage.openDatePicker();
    requesthistoryPage.selectTimePeriod('1 Hour')
    await requesthistoryPage.checkFileTypeValueByFileId(fileExtension, fileId, true)
    await requesthistoryPage.checkFileOutcomeValueByFileId(outcomeValue, fileId, true)
})
