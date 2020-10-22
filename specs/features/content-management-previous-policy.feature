Feature: content-management-previous-policy
  As a admin I need to view, validate the accuracy of and activate previous policy details in order to confirm that the solution works as expected

  Background:
    Given the user has logged into the ui


  @TEST-154
  Scenario: Selecting the "Policy History" in the navigation panel will be take me to the policy history page
    Given I have navigated to the Policy page
    When I click on Policy History in the navigation panel
    Then I am taken to the Policy History page


  @TEST-156
  Scenario: I can view previous Policy details
    When I click on Policy History in the navigation panel
    When I click view on a previous policy
    Then the previous Policy is displayed

  @TEST-157
  Scenario: I can activate a previous policy
    When I click on Policy History in the navigation panel
    When I click activate on a previous policy
    Then the previous Policy is activated