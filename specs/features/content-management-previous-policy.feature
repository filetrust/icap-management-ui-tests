@content-management-previous-policy
Feature: content-management-previous-policy
    As a admin I need to view, validate the accuracy of and activate previous policy details in order to confirm that the solution works as expected

    Background:
        Given I am logged into the portal
        Given I have navigated to the Policy History page

   @functional
    @TEST-218
    Scenario: I can view previous Policy details
        When I click view on a previous policy
        Then the previous Policy is displayed

   @functional
    @TEST-219
    Scenario: I can activate a previous policy
        When I click activate on a previous policy
        And I confirm publish action
        Then the current policy is updated with the previous Policy
