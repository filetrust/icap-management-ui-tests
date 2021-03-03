const {
    I,
    analyticsPage
} = inject();


Given('I have navigated to the Dashboard page', () => {
    I.goToAnalytics();
});

Then('the requests for the selected {string} are displayed', () => {
//todo: write step definition after function implementation
});

Then(/^the date range for the selected period is displayed in the Date\/Time field as '(.*)'$/,  (dateRange) =>{
    analyticsPage.checkDateTimeFilterValues(dateRange);
});

When('I make a time selection with {string}',  (option) => {
   analyticsPage.selectTimeInterval(option);
});
When('I set the {string} and {string}',  async(datetimeStart, dateTimeEnd) =>{
    await analyticsPage.setCustomTimeRange(datetimeStart, dateTimeEnd);
});

Then('the date range is displayed date from {string} hrs earlier to {string}', (datetimeFrom, datetimeTo) => {
    analyticsPage.isTimeApplied(datetimeFrom, datetimeTo)
});