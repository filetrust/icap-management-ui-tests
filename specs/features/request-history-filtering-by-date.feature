Feature: request-history-filtering-by-date
    As a admin I need to validate file requests history filtering by date in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui


    @TEST-167_168
    Scenario Outline: I am able to change the date range of the files displayed
        Given I have navigated to the Request History page
        When I click on Date/Time and select a custom range as <customRange>
        Then the files processed for the selected period are displayed and <dateRange> is displayed in the Date/Time field
        Examples:
            | customRange | dateRange |
            | 12 hours    |           |
            | 3  hours    |           |



    @TEST-184
    Scenario Outline: I cannot filter the date range to a time greater than 24 hours
        Given I have navigated to the Request History page
        When I has click on Date/Time and select a custom range as <customRange> and apply
        Then the expected validation error is displayed and the date range is not updated
        Examples:
            | customRange | dateRange |
            | 25 hours    |           |

    @TEST-190
    Scenario Outline: I am able to update the time frame for request history
        Given I have navigated to the Request History page and a previous time selection is applied
        When I make a new time <time> selection and click apply button
        Then the files processed for time <time> are displayed and the <dateRange> for the selected period is displayed in the Date/Time field
        Examples:
            | time     | dateRange |
            | 12 Hours |           |
            | 12 Hours |           |
            | 12 Hours |           |
