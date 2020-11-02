@request-history-filtering-by-date
Feature: request-history-filtering-by-date
    As a admin I need to validate file requests history filtering by date in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        Given I have navigated to the Request History page

    @TEST-167_168
    Scenario Outline: I can filter the request log using the time interval
        When I click dateTime and select a <timeInterval>
        Then the start date range is updated to <datetimeFrom> with the end date range as <datetimeTo>
        And the files processed for the selected period are displayed
        Examples:
            | timeInterval | datetimeFrom     | datetimeTo   |
            | 1 Hour       | 1 hour earlier   | current time |
            | 12 Hours     | 12 hours earlier | current time |
            | 24 Hours     | 24 hours earlier | current time |


    @datepicker
    Scenario Outline: I can filter the request log using the date picker
        When I select a valid <datetimeFrom> and <datetimeTo>
        Then the files processed for the selected period are displayed
        Examples:
            | datetimeFrom        | datetimeTo          |
            | 1 hour earlier      | current time        |
            | 6 hours earlier     | current time        |
            | 24 hours earlier    | current time        |
            | 2020-10-26T00:45:28 | 2020-10-26T13:45:28 |



    @TEST-184
    Scenario Outline: I cannot filter the date range to a time greater than 24 hours
        When I select a custom over 24 hours range from <datetimeFrom> to <datetimeTo>
        Then the expected "validationError" is displayed
        Examples:
            | datetimeFrom        | datetimeTo          |
            | 2020-10-20T00:45:28 | 2020-10-26T13:45:28 |



