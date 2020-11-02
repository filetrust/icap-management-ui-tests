@content-management-previous-policy
Feature: content-management-previous-policy
    As a admin I need to view, validate the accuracy of and activate previous policy details in order to confirm that the solution works as expected

    Background:
        Given I am logged into the portal
        Given I am on current policy screen

    @TEST-156
    Scenario: I can view previous Policy details
        Given I am on the Policy History page
        When I click view on a previous policy
        Then the previous Policy is displayed

    @TEST-157
    Scenario: I can activate a previous policy
        Given I am on the Policy History page
        When I click activate on a previous policy
        Then the previous Policy is activated