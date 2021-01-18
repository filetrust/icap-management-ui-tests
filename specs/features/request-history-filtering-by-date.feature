@request-history-filtering-by-date
Feature: request-history-filtering-by-date
    As a admin I need to validate file requests history filtering by date in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        Given I have navigated to the Request History page

    @functional
    @smoke
    @TEST-167
    @success
    Scenario Outline: I can filter the request log using the time interval
        When I open the date picker and select a '<timeInterval>'
        Then the date range is updated to be from '<datetimeFrom>' hrs earlier to '<datetimeTo>'
        And the files processed for the selected period are displayed
        Examples:
            | timeInterval | datetimeFrom | datetimeTo   |
            | 1 Hour       | 1            | current time |
            | 12 Hours     | 12           | current time |
            | 24 Hours     | 24           | current time |

    @functional
    @TEST-235
    Scenario Outline: I can filter the request log using a custom range
        When I select a valid '<datetimeFrom>' and '<datetimeTo>'
        Then the selected custom range is applied to include '<datetimeFrom>' and '<datetimeTo>'
        And the files processed for the selected period are displayed
        Examples:
            | datetimeFrom       | datetimeTo          |
            | 11/11/2020 0:21 AM | 11/11/2020 9:08 AM  |
            | 11/11/2020 4:26 AM | 11/11/2020 16:26 PM |
            | 25/10/2020 0:45 AM | 25/10/2020 0:45 AM  |


    @TEST-184
    Scenario Outline: I cannot filter the date range to a time greater than 24 hours
        When I select a custom time of '<datetimeFrom>'
        Then I am unable to select '<datetimeTo>'
        Examples:
            | datetimeFrom       | datetimeTo          |
            | 20/10/2020 0:45 AM | 26/10/2020 13:45 PM |

    @TEST-242
    Scenario: The request log is sorted by timestamp, newest to oldest
        Then the request log is sorted from newest timestamp to oldest timestamp


    @TEST-243
    Scenario: I can change the sort of the request log by pressing the arrow next to timestamp
        When I click the arrow next to timestamp
        Then the arrow will invert
        And the transaction log will be sorted from oldest timestamp to newest timestamp


