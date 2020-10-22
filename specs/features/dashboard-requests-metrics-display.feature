Feature: dashboard-requests-metrics-display
    As a admin I need to validate the accuracy of dashboard metrics for processed files in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        And I have navigated to the Dashboard page

    @TEST-
    Scenario Outline: Processing a file increases the count for the number of files processed
        When I process a <file>
        Then the Total Files processed will increase by 1
        And <fileOutcome> on the graphs will increase by 1
        Example:
            | file              | fileOutcome   |
            | Safe_file         | Safe          |
            | Blocked_file      | Blocked       |
            | Dangerous_file    | Dangerous     |
            | Unclassified_file | Uncalssified  |


