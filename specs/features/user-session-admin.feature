@user-session-admin
Feature: user-session-admin
    As a admin I need to validate that user can successfully logout or change a password in order to confirm that the solution works as expected


    @functional
    @TEST-login
    Scenario Outline: I am able to log into the ui
        Given I am on the login screen
        When I enter login details '<username>' and '<password>'
        And I click login
        Then The home screen is displayed
        Examples:
            | username             | password    |
            | user@testuksouth.com | Password123 |


    @functional
    @TEST-236
    Scenario: I am able to log out of the ui
        Given I am logged into the ui
        When I hover over my profile and select Log Out
        Then I am taken to the Login Screen

    @success
    @prototype
    @TEST-237
    Scenario Outline: I am able to update my password
        Given I am logged into the ui
        Given I hover over my profile and select Change Password
        When I fill in '<CurrentPassword>', '<NewPassword>', '<ConfirmNewPassword>', and click Save
        And I log out
        Then the next time I log in, the Password I have to use is '<NewPassword>'
        Examples:
            | CurrentPassword | NewPassword   | ConfirmNewPassword |
            | OldPassword1?   | NewPassword2) | NewPassword2)      |