@request-history-filtering-by-date
Feature: request-history-filtering-by-date
    As a admin I need to validate file requests history filtering by date in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        Given I have navigated to the Request History page

    @functional
    @smoke
    @TEST-167
    Scenario Outline: I can filter the request log using the time interval
        When I open the date picker and select a <timeInterval>
        Then the date range is updated to be from <datetimeFrom> hrs earlier to <datetimeTo>
        And the files processed for the selected period are displayed
        Examples:
            | timeInterval | datetimeFrom | datetimeTo   |
            | 1 Hour       | 1            | current time |
            | 12 Hours     | 12           | current time |
            | 24 Hours     | 24           | current time |


    # @TEST-2354
    # Scenario Outline: I can filter the request log using a custom range
    #     When I select a valid <datetimeFrom> and <datetimeTo>
    #     Then the selected custom range is applied to include <datetimeFrom> and <datetimeTo>
    #     And the files processed for the selected period are displayed
    #     Examples:
    #         | datetimeFrom       | datetimeTo         |
    #         | 11/11/2020 00:21 AM | 11/11/2020 09:08 AM |
    # # | 11/11/2020 4:26 AM | 11/11/2020 16:26 PM |
    # # | 25/10/2020 0:45 AM | 25/10/2020 0:45 AM |


    # @TEST-184
    # Scenario Outline: I cannot filter the date range to a time greater than 24 hours
    #     When I select a custom over 24 hours range from <datetimeFrom> to <datetimeTo>
    #     Then the expected "validationError" is displayed
    #     Examples:
    #         | datetimeFrom        | datetimeTo          |
    #         | 2020-10-20T00:45:28 | 2020-10-26T13:45:28 |



