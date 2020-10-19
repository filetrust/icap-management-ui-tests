Feature: User Management View


    Background: Login

    @TEST-171
    Scenario: A user can add a new user to the ui
        Given user has logged into the ui
        And user has navigated to the Users page
        When User add a new user with a valid email address
            | name      | email                     |
            | tester1   | tester1@glasswalltest.co  |
            | tester2   | tester2@glasswalltest.co  |
        Then The new user record is saved

    @TEST-172
    Scenario: An admin user can delete another user from the page
        Given user has logged into the ui
        And user has navigated to the Users page
        When user deletes a existing user
            | name      | email                     |
            | tester2   | tester2@glasswalltest.co  |
        Then The user record is no longer available


    @TEST-185
    Scenario: A new user cannot be added with a invalid email
        Given user has logged into the ui
        And admin user has navigated to the Users page
        When user add a new user with a invalid email address
            | name          | email             |
            | InvalidUser1  | Invalid@email.com |
            | InvalidUser2  | Invalid           |
        Then the record is not saved
        And the expected validation error is displayed

    @TEST-186
    Scenario: A duplicate user cannot be added
        Given user has logged into the ui
        And user has navigated to the Users page
        When user add a new user with a valid email address already used
            | name      | email                     |
            | tester1   | tester1@glasswalltest.co  |
        Then the expected validation error is displayed
        And the record is not saved
