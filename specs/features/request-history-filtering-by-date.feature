@request-history-filtering-by-date
Feature: request-history-filtering-by-date
    As a admin I need to validate file requests history filtering by date in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        Given I have navigated to the Request History page

    @portal
    @functional
    @TEST-167
    Scenario Outline: User can filter the request log using a default time interval(1, 12 or 24 hrs)
        When I open the date picker and select a '<timeInterval>'
        Then the date range is updated to be from '<datetimeFrom>' hrs earlier to '<datetimeTo>'
        And the files processed for the selected period are displayed
        Examples:
            | timeInterval | datetimeFrom | datetimeTo   |
            | 1 Hour       | 1            | current time |
            | 12 Hours     | 12           | current time |
            | 24 Hours     | 24           | current time |

    @portal
    @functional
    @TEST-235
    Scenario Outline: User can filter the request log using a custom range and see all transactions within that range
        When I select a valid '<datetimeFrom>' and '<datetimeTo>'
        Then the selected custom range is applied to include '<datetimeFrom>' and '<datetimeTo>'
        And the files processed for the selected period are displayed
        Examples:
            | datetimeFrom        | datetimeTo          |
            | 11/02/2021 10:00 AM | 12/02/2021 10:00 AM |

    @portal
    @functional
    @TEST-184
    Scenario Outline: User cannot filter the date range to a time greater than 24 hours
        When I select a custom time of '<datetimeFrom>'
        Then I am unable to select '<datetimeTo>'
        Examples:
            | datetimeFrom       | datetimeTo          |
            | 20/10/2020 0:45 AM | 26/10/2020 13:45 PM |

    @portal
    @functional
    @TEST-242
    Scenario: The request log is sorted by timestamp, newest to oldest
        And There are existing transactions available
        Then the request log is sorted from newest timestamp to oldest timestamp

    @portal
    @functional
    @TEST-243
    Scenario: Transactions can be sorted by time
        Given There are existing transactions available
        When I click the arrow next to timestamp
        Then the arrow will invert
        And the transaction log will be sorted from oldest timestamp to newest timestamp


