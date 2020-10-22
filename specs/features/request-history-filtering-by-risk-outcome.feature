Feature: request-history-filtering-by-risk-outcome
    As a admin I need to validate file requests history filtering by risk outcome in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui

    @TEST-163_164_165_180
    Scenario Outline: I am able to filter the risks log
        Given I have navigated to the Request History page
        When I click on the Add Filter button and add a filter selection as <filter>
        Then the result list shows all files as <filteredFile>
        Examples:
            | filter                | filteredFile |
            | fileOutcome_sanitised | sanitised    |
            | fileOutcome_dangerous | dangerous    |
            | fileOutcome_safe      | safe         |
            | fileOutcome_blocked   | blocked      |
            | fileOutcome_checked   | checked      |
