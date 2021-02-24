const {
    I,
    analyticsPage,
    homePage
} = inject();

let totalFilesNumber;
let icapRequests;
let maxFilesPerSec;
let riskMetricsCount;

Given('I have navigated to the Dashboard page', () => {
    I.goToAnalytics();
});

Given('I have confirmed the concurrent counts of total files requests processed', () => {
    totalFilesNumber = analyticsPage.getTotalFileProcessed();
    icapRequests = analyticsPage.getTotalIcapRequests();
    maxFilesPerSec = analyticsPage.getMaxFileProcessed();
});

Given('I have confirmed the current risks counts for {string}', (risk) => {
    riskMetricsCount = analyticsPage.getRiskMetricsCount(risk)
});

When('I process a {string} through the icap server', (file) => {
    I.uploadFileByType(file);
    I.wait(3);
});

Then('the Total Files processed is increased by {int}', (TFUpdateByValue) => {
    I.seeInField(analyticsPage.sections.totalFilesProcessed, totalFilesNumber + TFUpdateByValue);
});

Then('the Total icap requests is reflected as {int}', (TRUpdateByValue) => {
    I.seeInField(analyticsPage.sections.countIcapRequests, icapRequests + TRUpdateByValue);
});

Then('the max files per second processed is increased by {int}', (MFUpdateByValue) => {
    I.seeInField(analyticsPage.sections.maxFilesProcessed, maxFilesPerSec + MFUpdateByValue);
});

Then('the risk sector {string} is available and shows the count updated by {int}', (risk, increasedValue) => {
    I.seeInField(analyticsPage.getRiskSector(risk), riskMetricsCount + increasedValue)

});
Given('I have navigated to the Analytics page',  () => {
        I.goToAnalytics();
});

Then(/^the Total Files processed is increased by '(.*)'$/, function () {

});
Then(/^the Total icap requests is increased by '(.*)'$/, function () {

});
Then(/^the max files per second processed is increased by '(.*)'$/, function () {

});