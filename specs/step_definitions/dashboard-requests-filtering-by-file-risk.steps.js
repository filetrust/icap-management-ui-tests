const {
    I,
    analyticsPage
} = inject();

Given("I am logged into the ui", () => {
    I.login();
});

Given("I have navigated to the analytics page", () => {
    I.goToAnalytics();
});

When('I tick select from the {string} legend a file risk {string}', (chart, fileRisk) => {
    analyticsPage.filterByRisk(chart, fileRisk)
});

Then('the {string} is updated to only show the filtered risk {string}', (chart, filteredRisk) => {
    analyticsPage.assertFilteredRisk(chart, filteredRisk)
});
