@dashboard-requests-filtering-by-process-date
Feature: dashboard-requests-filtering-by-process-date
    As a admin I need to validate file requests filtering by a date period in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        Given I have navigated to the Dashboard page


    @TEST-151
    Scenario Outline: I am able to filter the dashboard requests by time
        When I make a time selection with '<time>' and click apply
        Then the requests for the selected '<time>' are displayed
        And the date range for the selected period is displayed in the Date/Time field as '<dateRange>'
        Examples:
            | time         | dateRange                           |
#            | 1 Hour       | 21/09/2020 10:00 AM - 21/09/2020 11:00 AM |
#            | 12 Hours     | 20/09/2020 23:00 - 21/09/2020 11:00 |
#            | 24 Hours     | 20/09/2020 10:00 - 22/09/2020 11:00 |
            | Custom Range | 21/09/2020 10:30 - 21/09/2020 11:00 |

    @TEST-151
    Scenario Outline: I am able to filter the dashboard requests by time
        When I make a time selection with '<time>' and click apply
        Then the requests for the selected '<time>' are displayed
        And the date range for the selected period is displayed in the Date/Time field as dateRange for current time
        Examples:
                | time     |
                | 1 Hour   |
                | 12 Hours |
                | 24 Hours |
