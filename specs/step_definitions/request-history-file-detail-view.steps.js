const {
    I,
    requesthistoryPage
} = inject();

Given("I am logged into the ui", () => {
    I.loginNoPwd();
});

Given("I have navigated to the Request History page", () => {
    I.goToRequestHistory();
});

When('I select a valid {string} and {string}', async (datetimeFrom, datetimeTo) => {
    requesthistoryPage.openDatePicker();
    await requesthistoryPage.setTimePeriod(datetimeFrom, datetimeTo);
});

When('I click on a available file record with id {string}', (fileId) => {
    requesthistoryPage.openFileRecord(fileId)
});

Then('the file detail view opens', () => {
    requesthistoryPage.isFileDetailModalOpened()
});

Then('the content management policy section is available', async () => {
    await requesthistoryPage.isCmpSectionAvailable();
});

Then('the file result details and the sanitisation issues content is displayed to show item {string}', async (issue) => {
    await requesthistoryPage.isSanitisationItemsSectionAvailable(issue);
});