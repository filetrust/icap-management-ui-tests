const {
    I,
    filedropPage
} = inject();


Given("I have navigated to the File Drop page", () => {
    I.goToFileDrop();
});

Given('I have processed a supported file {string}', (supportedFile) => {
    I.uploadFile(supportedFile);
});

When('I view result and click on Download Analysis Report', () => {
    I.handleDownloads();
    filedropPage.clickDownloadAnalysisReport();
});

Then('The full analysis report is downloaded and available as {string}', (analysisReport) => {
    I.amInPath('output/downloads');
    I.seeFileNameMatching(analysisReport);
});

When('I process a supported sanitisation file {string} with remedy items', (activeContentFile) => {
    I.uploadFile(activeContentFile);
    I.wait(5);
});

Then('the notification message is displayed as {string}', async(processStatus) => {
    await filedropPage.checkMessageDisplayed(processStatus.trim());
});

Then('I see the list of sanitised active contents with expected issue {string}', (activeContent) => {
    filedropPage.isRequiredContentRefDisplayed(activeContent)
});

Then('I see the list of objects and structures repaired with expected item {string}', (repairedObject) => {
    filedropPage.isRequiredContentRefDisplayed(repairedObject)
});

When('I process a supported file {string} with structural Issues', (fileWithIssues) => {
    I.uploadFile(fileWithIssues);
    I.wait(5);
});

Then('I see the list of objects and structures not repaired {string}', (nonrepairedObject) => {
    filedropPage.isRequiredContentRefDisplayed(nonrepairedObject)
});

When('I view result and click on Download Processed File', () => {
    //filedropPage.clickDownloadFile();

});

Then('I have the file successfully downloaded as {string}', (downloadedFileName) => {
    I.amInPath('output/downloads');
    I.seeFileNameMatching(downloadedFileName);
});