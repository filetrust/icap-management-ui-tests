const {
    I,
    requesthistoryPage
} = inject();

let displayedRange;
let selectedRange;

Given("I am logged into the ui", () => {
    I.loginNoPwd();
});

Given("I have navigated to the Request History page", () => {
    I.goToRequestHistory();
});

When('I open the date picker and select a {string}', (timeInterval) => {
    requesthistoryPage.openDatePicker();
    requesthistoryPage.selectTimePeriod(timeInterval)
   });

Then('the date range is updated to be from {string} hrs earlier to {string}', (datetimeFrom, datetimeTo) => {
    requesthistoryPage.isTimeApplied(datetimeFrom, datetimeTo)
});

Then('the files processed for the selected period are displayed', async () => {
    displayedRange = await I.grabTextFrom(requesthistoryPage.calendar.reportRange)
    let col =1
    await requesthistoryPage.isDataInRange(displayedRange, col);
});

When('I select a valid {string} and {string}', async (datetimeFrom, datetimeTo) => {
    requesthistoryPage.openDatePicker();
    await requesthistoryPage.setTimePeriod(datetimeFrom, datetimeTo);
});

Then('the selected custom range is applied to include {string} and {string}', (datetimeFrom, datetimeTo) => {
    requesthistoryPage.isCustomRangeApplied(datetimeFrom, datetimeTo);
});

When('I select a custom time of {string}', async (datetimeFrom) => {
    requesthistoryPage.openDatePicker();
    await requesthistoryPage.setTimeFrom(datetimeFrom);
});

Then('I am unable to select {string}', async (datetimeTo) => {
    await requesthistoryPage.unableSetTimeTo(datetimeTo)
});

Then('the request log is sorted from newest timestamp to oldest timestamp', async () => {
    await I.checkRowsTimestamp()
});
