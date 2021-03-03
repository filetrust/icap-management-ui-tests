const {
    I,
    requesthistoryPage, icapclient
} = inject();
const path = require('path');
let fileId;


Given("I have navigated to the Request History page", () => {
    I.goToRequestHistory();
});

Given('I process a file {string} through the icap server', async (file) => {
    const downloadedFile = path.join('output', 'downloads', file);
    I.cleanupFile(downloadedFile);
    const resp = icapclient.submitFile(file)
    fileId = icapclient.getFileId(resp);
    console.log(`I sent a file and received ${fileId}`);
});

Given('The transaction with {string} type and {string} risk is available in the transaction log', async (type, risk) => {
    requesthistoryPage.openDatePicker()
    requesthistoryPage.selectTimePeriod('1 Hour')
    requesthistoryPage.verifyFileRecordByTypeAndRisk(type, risk)
    fileId = await requesthistoryPage.getIdByTypeAndRisk(type, risk)
    console.log(`File ID is ${fileId}`)
});

Given('The transaction is available in the transaction log', async () => {
    I.login();
    I.viewTransactions('1 Hour')
    if (fileId !== null) {
        await requesthistoryPage.setFileId(fileId);
        I.waitForElement(requesthistoryPage.table.tableHeaders, 60)
       await requesthistoryPage.checkFileIdValues(fileId)
    }
});

When('I click on the transaction record to open the detail view', async () => {
    //await requesthistoryPage.openLatestTransactionRecord()
    await requesthistoryPage.openFileRecord(fileId)
});

When('I click on a available file record to open the detail view', async () => {
    await requesthistoryPage.openLatestTransactionRecord()
});

Then('The issues content is displayed on the details view', () => {
    requesthistoryPage.isFileDetailModalOpened()
});

Then('the file detail view opens', () => {
    requesthistoryPage.isFileDetailModalOpened()
});

Then('The file details view shows all required sections', async () => {
    await requesthistoryPage.checkRequiredSectionsAreAvailable();
});

Then("Expanding the content section shows the issue {string}", async (issue) => {
    await requesthistoryPage.isIssueItemsSectionShowsDescription(issue)
});

Then('the content management policy section is available', async () => {
    await requesthistoryPage.isCmpSectionAvailable();
});

Then('the file result details and the sanitisation issues content is displayed to show item {string}', async (issue) => {
    await requesthistoryPage.isSanitisationItemsShowsDescription(issue);
});

Then('The Remedy items content is displayed on the details view to show issue {string}', async (item) => {
    await requesthistoryPage.isRemedyItemsShowsDescription(item);
})
