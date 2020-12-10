@dashboard-requests-filtering-by-process-date
Feature: dashboard-requests-filtering-by-process-date
    As a admin I need to validate file requests filtering by a date period in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        Given I have navigated to the Dashboard page

    @success
    @prototype
    @TEST-151
    Scenario Outline: I am able to filter the dashboard requests by time
        When I make a time selection with '<time>'
        And I set the '<dateStart>' and '<dateEnd>'
        Then the requests for the selected '<time>' are displayed
        And the date range for the selected period is displayed in the Date/Time field as '<dateRange>'
        Examples:
            | time         | dateStart           | dateEnd             | dateRange                                 |
            | Custom Range | 2/10/2020 10:30 AM  | 2/10/2020 11:00 AM  | 02/10/2020 10:30 AM - 02/10/2020 11:00 AM |

    @success
    @prototype
    @TEST-152
    Scenario Outline: I am able to filter the dashboard requests by time
        When I make a time selection with '<timeInterval>'
        Then the requests for the selected '<timeInterval>' are displayed
        And the date range is displayed date from '<datetimeFrom>' hrs earlier to '<datetimeTo>'
        Examples:
            | timeInterval | datetimeFrom | datetimeTo   |
            | 1 Hour       | 1            | current time |
            | 12 Hours     | 12           | current time |
            | 24 Hours     | 24           | current time |
