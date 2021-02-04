@request-history-filtering-by-risk-outcome
Feature: request-history-filtering-by-risk-outcome
    As a admin I need to validate file requests history filtering by risk outcome in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
    
    @portal
    @functional
    @TEST-163
    Scenario Outline: User can filter the log by file risks
        Given I have navigated to the Request History page
        And There are existing transactions available
        When I click on the Add Filter button and add a risk filter as '<filter>'
        Then the result list only shows filtered files with the selected risk as '<filteredFile>'
        Examples:
            | filter            | filteredFile      |
            | Safe              | Safe              |
  