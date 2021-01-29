const {
    I,
    filedropPage
} = inject();


Given("I am logged into the ui", () => {
    I.login();
    I.wait(5);
});

Given("I have navigated to the File Drop page", () => {
    I.goToFileDrop();
});

Given(/^I have processed a supported file (.*)$/, (supportedFile) => {
    I.uploadFile(supportedFile);
});

When('I view result and click on Download Analysis Report', () => {
    filedropPage.clickViewResult();
    I.handleDownloads();
    filedropPage.clickDownloadAnalysisReport();
});

Then(/^The full analysis report is downloaded and available as (.*)$/, (analysisReport) => {
    I.amInPath('output/downloads');
    I.seeFileNameMatching(analysisReport);
});

When(/^I process a supported sanitisation file (.*) with remedy items$/, (activeContentFile) => {
    I.uploadFile(activeContentFile);
    I.wait(5);
});

Then('the notification message is displayed as {string}', (processStatus) => {
    filedropPage.checkMessageDisplayed(processStatus.trim());
});

Then(/^I see the list of sanitised active contents with expected(.*)$/, (activeContent) => {
    I.see(activeContent.trim(), filedropPage.sections.activeContentView)
});

Then(/^I see the list of objects and structures repaired with expected(.*)$/, (repairedObject) => {
    I.see(repairedObject.trim())
});

When(/^I process a supported file (.*) with structural Issues$/, (fileWithIssues) => {
    I.uploadFile(fileWithIssues);
    I.wait(5);
})

Then(/^I see the list of objects and structures not repaired(.*)$/, (nonrepairedObject) => {
    I.see(nonrepairedObject.trim())
});

When('I view result and click on Download Processed File', () => {
    filedropPage.clickViewResult();
    I.handleDownloads();
    filedropPage.clickDownloadFile();

});

Then(/^I have the file successfully downloaded as (.*)$/, (downloadedFileName) => {
    I.amInPath('output/downloads');
    I.seeFileNameMatching(downloadedFileName);
});