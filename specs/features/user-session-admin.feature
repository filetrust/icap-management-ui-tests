@user-session-admin
Feature: user-session-admin
    As a admin I need to validate that user can successfully logout or change a password in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui

    @TEST-
    Scenario: I am able to log out of the ui
        When I hover over my profile and select Log Out
        Then I am taken to the Login Screen

    @TEST-
    Scenario Outline: I am able to update my password
        Given I hover over my profile and select Change Password
        When I fill in '<CurrentPassword>', '<NewPassword>', '<ConfirmNewPassword>', and click Save
        And I log out
        Then the next time I log in, the Password I have to use is '<NewPassword>'
        Examples:
            | CurrentPassword | NewPassword   | ConfirmNewPassword |
            | OldPassword1?   | NewPassword2) | NewPassword2)      |