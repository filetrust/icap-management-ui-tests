const {
    I,
    requesthistoryPage
} = inject();
const path = require('path');
let fileId;

Given("I am logged into the ui", () => {
    I.loginNoPwd();
});

Given("I have navigated to the Request History page", () => {
    I.goToRequestHistory();
});

Given('I process a file {string} through the icap server', async (file) => {
    const downloadedFile = path.join('output', 'downloads', file);
    await I.cleanupFile(downloadedFile);
    fileId = await I.sendFileICAP(file);
    await I.say(`I sent a file and received ${fileId}`);
});

Given('The transaction with {string} type and {string} risk is available in the transaction log', async (type, risk) => {
    requesthistoryPage.openDatePicker()
    requesthistoryPage.selectTimePeriod('1 Hour')
    requesthistoryPage.verifyFileRecordByTypeAndRisk(type, risk)
    fileId = await requesthistoryPage.getIdByTypeAndRisk(type, risk)
    console.log(`File ID is ${fileId}`)
});

Given('The transaction is available in the transaction log', () => {
    requesthistoryPage.openFileRecord(fileId)
});

When('I click on the transaction record to open the detail view', () => {
    requesthistoryPage.openFileRecord(fileId)
});

When('I select a valid {string} and {string}', async (datetimeFrom, datetimeTo) => {
    requesthistoryPage.openDatePicker();
    await requesthistoryPage.setTimePeriod(datetimeFrom, datetimeTo);
});

When('I click on a available file record with id {string}', (fileId) => {
    requesthistoryPage.openFileRecord(fileId)
});

Then('The issues content section is displayed on the details view', () => {
    requesthistoryPage.isFileDetailModalOpened()
});

Then('the file detail view opens', () => {
    requesthistoryPage.isFileDetailModalOpened()
});

Then("Expanding the content section shows the issue {string}", async (issue) => {
    await requesthistoryPage.isIssueItemsSectionShowsDescription(issue)
});

Then('the content management policy section is available', async () => {
    await requesthistoryPage.isCmpSectionAvailable();
});

Then('the file result details and the sanitisation issues content is displayed to show item {string}', async (issue) => {
    await requesthistoryPage.isSanitisationItemsSectionAvailable(issue);
});




