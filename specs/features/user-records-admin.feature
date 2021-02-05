@user-records-admin
Feature: user-records-admin
    As a admin I need to validate successful user record addition, editing and deletion in order to confirm that the solution works as expected

    Background: Login
       Given I have logged into the ui and navigated to the Users page

    # @prototype
    # @TEST-171
    # @Fail-app
    # Scenario Outline: I can add a new user to the ui
    #     When I add a new user with a valid '<email>'
    #     Then The new user record is saved
    #     Examples:
    #         | username    |firstname    |lastname| email                    |
    #         | tester1 |autotest|  |tester1@glasswalltest.co
    #         | tester2 | | |tester2@glasswalltest.co

    @prototype
    @TEST-172
    @Fail-app
    Scenario Outline: I can delete another user from the page
        When I delete an existing user '<name>'
        Then The user record is no longer available
        Examples:
            | name    | email                    |
            | tester2 | tester2@glasswalltest.co |

    @prototype
    @TEST-185
    @Fail-app
    Scenario Outline: A new user cannot be added with a invalid email
        When I add a new user with a invalid '<email>'
        Then the record is not saved and the expected validation error is displayed
        Examples:
            | name         | email             |
            | InvalidUser1 | Invalid@email.com |
            | InvalidUser2 | Invalid           |

    @prototype
    @TEST-186
    @Fail-app
    Scenario Outline: A duplicate user cannot be added
        When I add a new user with '<email>' that is already used
        Then the expected validation error is displayed and the record is not saved
        Examples:
            | name    | email                    |
            | tester1 | tester1@glasswalltest.co |

    @prototype
    @TEST-191
    @Fail-app
    Scenario: I cannot delete my own account
        When I observe my account
        Then there will be no delete button next to my account

    Scenario: I can update a user record