const {
    I,
    dashboardPage,
    homePage
} = inject();

let totalNumber;

Given('I have navigated to the Dashboard page', () => {
    I.goToAnalytics();
    totalNumber = dashboardPage.getTotalFileNumber();
});
When('I process a {string}', (fileType) => {
    I.uploadFileByType(fileType);
    I.wait(3);
});
Then('the Total Files processed will increase by 1', () => {
    I.seeInField(dashboardPage.sections.totalfilesprocessed, totalNumber + 1);
});
Then('{string} on the graphs will increase by 1', (fileOutcome) => {
//todo: step should be re-written, because there is no way to get values from 'canvas' tag
});