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
When('add multiple filter selections as {string}, {string}, {string}', (riskFilter, typeFilter, fileIdFilter) => {
    requesthistoryPage.selectFileOutcome(riskFilter);

    requesthistoryPage.clickAddFilterButton();
    requesthistoryPage.selectFileType(typeFilter);

 //   requesthistoryPage.clickAddFilterButton();
//    requesthistoryPage.setFileId(fileIdFilter);
});
Then('the result list shows files with the applied filtertypes {string}', (appliedFilter) => {
    requesthistoryPage.checkFilters(appliedFilter);
    requesthistoryPage.verifyResultIsAccurate(appliedFilter)
});

Given('{string} and {string} are applied', (typeFilter, riskFilter) => {
    requesthistoryPage.applyMultipleFilters(riskFilter, typeFilter);
});
When('I remove {string}', (filterName) => {
    requesthistoryPage.removeAppliedFilter(filterName);
});

When('I click on the Add Filter button and add a file id filter as {string}', (filter) => {
    requesthistoryPage.setFileId(filter);
});

Then('the result list only shows the filtered file as {string}', (filteredFile) => {
    requesthistoryPage.checkFileIdValues(filteredFiles);
});