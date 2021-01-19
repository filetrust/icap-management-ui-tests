const {
    I,
    requesthistoryPage
} = inject();

Given("I am logged into the ui", () => {
    I.loginNoPwd();

});

Given("I have navigated to the Request History page", () => {
    I.goToRequestHistory();
    //pause();
});

When('I click on a available file record with id {string}', (fileId) => {
    //requesthistoryPage.filterByFileId(fileId)
    requesthistoryPage.openAFileRecord()
});

Then('the file detail view opens', () => {
    I.wait(5)
    requesthistoryPage.isFileDetailModalOpened()   
});

Then('the content management policy section is available', () => {
    //requesthistoryPage.isCmpSectionAvailable();
});

Then('the file result details and the sanitisation issues content is displayed to show item {string}', (issue) => {
    //requesthistoryPage.isSanitisationItemsSectionAvailable();
});