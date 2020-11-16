var moment = require('moment');
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

When(/^I open the date picker and select a (.*)$/, (timeInterval) => {
    requesthistoryPage.openDatePicker();
    requesthistoryPage.selectTimePeriod(timeInterval)
   });

Then(/^the date range is updated to be from (.*) hrs earlier to (.*)$/, (datetimeFrom, datetimeTo) => {
    requesthistoryPage.isTimeApplied(datetimeFrom, datetimeTo)
});

Then('the files processed for the selected period are displayed', async () => {
    displayedRange = await I.grabTextFrom(requesthistoryPage.calendar.reportRange)
    let col =1
    requesthistoryPage.isDataInRange(displayedRange, col);
});

When(/^I select a valid (.*) and (.*)$/, (datetimeFrom, datetimeTo) => {
    requesthistoryPage.setTimePeriod(datetimeFrom, datetimeTo);

});

Then(/^the selected custom range is applied to include (.*) and (.*)$/, (datetimeFrom, datetimeTo) => {
    requesthistoryPage.isCustomRangeApplied(datetimeFrom, datetimeTo);
});



When(/^I select a custom over 24 hours range from (.*) to (.*)$/, (datetimeFrom, datetimeTo) => {
    requesthistoryPage.setTimeFrom(datetimeFrom);
    requesthistoryPage.setTimeTo(datetimeTo);
});

Then('the expected {string} is displayed', () => {
    I.seeInSource('') //TODO
});


