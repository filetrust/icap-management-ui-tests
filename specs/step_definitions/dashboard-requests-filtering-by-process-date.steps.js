const {
    I,
    analyticsPage
} = inject();

let datetimeValue = analyticsPage.inputs.dateFilter;

let filterValue;
Given('I am logged into the ui', () => {
    I.loginNoPwd();
});

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
When('I set the {string} and {string}',  (datetimeStart, dateTimeEnd) =>{
    analyticsPage.setCustomTimeRange(datetimeStart, dateTimeEnd);
});
When('I click apply',  () => {
    I.click(analyticsPage.calendar.applyBtn);
});
Then(/^the date range for the selected period is displayed in the Date\/Time field as dateRange for current time$/,  () => {

});