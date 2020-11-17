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

When('I make a new time {string} selection and click apply', (timeInterval) => {
    analyticsPage.chooseTimeInterval(timeInterval);
});
Given('a previous time selection is applied', () => {
    I.seeInField(datetimeValue, filterValue);
});
Then(/^the date range for the selected period is displayed in the Date\/Time field as '(.*)'$/,  (dateRange) =>{
    analyticsPage.checkDateTimeFilterValues(dateRange);
});
When(/^I make a time selection with '(.*)' and click apply$/, function (timeInterval) {
        analyticsPage.chooseTimeInterval(timeInterval);
});