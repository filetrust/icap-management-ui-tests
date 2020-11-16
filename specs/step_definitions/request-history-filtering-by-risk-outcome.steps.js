//<reference path="../../src/utils/steps.d.ts" />

const { I, requesthistoryPage } = inject();

When('I click on the Add Filter button and add a risk filter as {string}', (filter) => {
    requesthistoryPage.clickMoreFiltersButton();
    requesthistoryPage.clickAddFilterButton();
    requesthistoryPage.selectFileOutcome(filter);
});
Then('the result list only shows filtered files with the selected risk as {string}', (filteredFile) => {
    requesthistoryPage.checkFileOutcomeValues(filteredFile);
});