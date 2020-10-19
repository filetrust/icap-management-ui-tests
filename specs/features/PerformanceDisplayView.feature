Feature:

    Background:
        Given the user has logged into the ui


    @TEST-150
    Scenario: A user is able to navigate to the dashboard
        When the user clicks on Dashboard in the navigation panel
        Then the user is taken to the Dashboard page

    @TEST-151
    Scenario Outline: A user is able to filter the dashboard requests by time
        Given user has navigated to the Dashboard page
        When user makes a time selection with <time>
        And click apply button
        Then the requests for the selected <time> are displayed
        And the date range for the selected period is displayed in the Date/Time field as <dateRange>
        Examples:
            | time     | dateRange |
            | 12 Hours |           |
            | 12 Hours |           |
            | 12 Hours |           |


    @TEST-152
    Scenario Outline: A user is able to update the time frame for dashboard requests
        Given user has navigated to the Dashboard page
        And user had a time selection previously applied
        When user makes a new time <time> selection
        And click apply button
        Then the requests for the selected <time> are displayed
        And the date range for the selected period is displayed in the Date/Time field as <dateRange>
        Examples:
            | time     | dateRange |
            | 12 Hours |           |
            | 12 Hours |           |
            | 12 Hours |           |
<<<<<<< HEAD
=======

    @TEST-192
    Scenario: A user can remove file-outcomes from the filters on the charts
        Given user has navigated to the Dashboard page
        When the user clicks on <fileOutcome> on <chart>
        Then the chart is updated to remove <fileOutcome>
        Examples:
            | chart         | fileOutcome   |
            | pie chart     | Safe          |
            | pie chart     | Blocked       |
            | line graph    | Safe          |
            | line graph    | Blocked       |
>>>>>>> 1f7712e36ee68382788a092d039604d070443ab9
