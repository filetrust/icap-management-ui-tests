@dashboard-requests-filtering-by-process-date
Feature: dashboard-requests-filtering-by-process-date
    As a admin I need to validate file requests filtering by a date period in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        Given I have navigated to the Dashboard page


    @TEST-151_custom
    Scenario Outline: I am able to filter the dashboard requests by time
        When I make a time selection with '<time>'
        And I set the '<dateStart>' and '<dateEnd>'
        And I click apply
        Then the requests for the selected '<time>' are displayed
        And the date range for the selected period is displayed in the Date/Time field as '<dateRange>'
        Examples:
            | time         | dateStart           | dateEnd             | dateRange                                 |
            | Custom Range | 2/10/2020 10:30 AM  | 2/10/2020 11:00 AM  | 02/10/2020 10:30 AM - 02/10/2020 11:00 AM |
#            | Custom Range | 21/10/2020 10:30 AM | 21/11/2020 11:00 AM | 21/10/2020 10:30 AM - 21/11/2020 11:00 AM |
#            | Custom Range | 21/09/2020 10:30 AM | 21/09/2020 11:00 AM | 21/09/2020 10:30 AM - 21/09/2020 11:00 AM |

    @smoke
    @TEST-151_time
    Scenario Outline: I am able to filter the dashboard requests by time
        When I make a time selection with '<timeInterval>'
        Then the requests for the selected '<timeInterval>' are displayed
        And the date range is displayed date from '<datetimeFrom>' hrs earlier to '<datetimeTo>'
        Examples:
            | timeInterval | datetimeFrom | datetimeTo   |
            | 1 Hour       | 1            | current time |
            | 12 Hours     | 12           | current time |
            | 24 Hours     | 24           | current time |
