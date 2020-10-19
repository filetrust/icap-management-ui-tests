Feature: User Settings

    Background:
        Given the user has logged into the ui

    @TEST-
    Scenario: A user is able to log out of the ui
        When the user hovers over their profile
        And selects Log Out
        Then the user is taken to the Login Screen

    @TEST-
    Scenario: A user is able to update their password
        Given the user hovers over their profile
        And selects Change Password
        When the user fills in Current Password, New Password, Confirm New Password
        And clicks Save
        And the user logs out
        Then the next time the user logs in the Password they have to use is the new Password
        