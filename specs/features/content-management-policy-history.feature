@content-management-policy-history
Feature: content-management-policy-history
    As a admin I need to view and search the policy history in order to confirm that the solution works as expected

    Background:
        Given I am logged into the portal

    @functional
    @portal
    @TEST-217
    Scenario Outline: User can change the number of previous polcy records displayed on a page
        Given I have navigated to the Policy History page
        When Items Shown is changed to '<itemCount>'
        Then Up to <rowCount> previous policies are displayed
        Examples:
            | itemCount | rowCount |
            | 25        | 25       |
            | 50        | 50       |
            | 100       | 100      |