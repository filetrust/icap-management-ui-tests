const {
    I,
    requesthistoryPage
} = inject();

Given("I am logged into the ui", () => {
    I.loginNoPwd();

});

Given("I have navigated to the Request History page", () => {
    I.goToRequestHistory();
    pause();
});

When(/^I search for a file with id (.*) and click on the file record$/, (fileId) => {
    requesthistoryPage.filterByFileId(fileId)
    requesthistoryPage.openFileRecord(fileId)
});

Then('the file detail view opens with the ID displayed at the top', (fileId) => {
    I.seeElement(requesthistoryPage.modal.fileDetailModal)
    requesthistoryPage.checkFileDetailViewId(fileId)

});

Then('the issue items, sanitisation items, remedy items, and content management policy sections are available', () => {
    I.seeElement(requesthistoryPage.modal.issueItemsBanner)
    I.seeElement(requesthistoryPage.modal.remedyItemsBanner)
    I.seeElement(requesthistoryPage.modal.sanitisationItemsBanner)
    I.seeElement(requesthistoryPage.modal.cmpDetailsBanner)
});
