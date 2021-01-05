const { I, requesthistoryPage } = inject();

Given('I have navigated to the Request History page', () => {
    I.goToRequestHistory();
});
When('I click on the Add Filter button and add a file type filter as {string}', (filter) => {
    requesthistoryPage.clickMoreFiltersButton();
    requesthistoryPage.clickAddFilterButton();
    requesthistoryPage.selectFileType(filter);
});
Then('the result list shows files with the selected types as {string}', async (filteredType) => {
    let col = 3;
    await requesthistoryPage.checkResultFileTypesAreAccurate(filteredType, col);
    
});