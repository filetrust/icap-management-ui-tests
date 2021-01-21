//<reference path="../../src/utils/steps.d.ts" />


const { I, requesthistoryPage } = inject();

Given('I have navigated to the Request History page', () => {
    I.goToRequestHistory();
});
When('I click on the Items Shown drop down and select a number of items as {string} and apply', (itemCount) => {
    requesthistoryPage.selectCountOfFiles(itemCount);
});
Then('the count of files displayed is as selected {int} and will show in the items show dropdown', (fileCount) => {
    I.seeNumberOfElements(requesthistoryPage.table.fileTableBodyRow, fileCount)
});
When('I click on the Add Filter button', () => {
    requesthistoryPage.clickMoreFiltersButton();
    requesthistoryPage.clickAddFilterButton();
});
When('add multiple filter selections as {string}, {string}, {string}', (riskFilter, typeFilter) => {
    requesthistoryPage.selectFileOutcome(riskFilter);

    requesthistoryPage.clickAddFilterButton();
    requesthistoryPage.selectFileType(typeFilter);
});
Then('the result list shows files with the applied filtertypes {string}, {string}', async (appliedFilter, filterValues) => {
    requesthistoryPage.checkFilters(appliedFilter, filterValues);
    await requesthistoryPage.verifyResultIsAccurate(appliedFilter)
});

Given('{string} and {string} are applied', (typeFilter, riskFilter) => {
    requesthistoryPage.applyMultipleFilters(riskFilter, typeFilter);
});
When('I remove {string}', (filterName) => {
    requesthistoryPage.removeAppliedFilter(filterName);
});

When('I have selected a time range {string} and {string}', async (datetimeFrom, datetimeTo) => {
    requesthistoryPage.openDatePicker();
    await requesthistoryPage.setTimePeriod(datetimeFrom, datetimeTo);
});


When('I click on the Add Filter button and add a file id filter with Id {string}', (fileId) => {
    requesthistoryPage.setFileId(fileId);
    I.waitForElement(requesthistoryPage.table.tableHeaders,60)
});

Then('the result list only shows the filtered file with id {string}', (fileId) => {
    I.wait(5)
    requesthistoryPage.checkFileIdValues(fileId);
});