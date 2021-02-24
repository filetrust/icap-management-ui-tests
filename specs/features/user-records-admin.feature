@user-records-admin
Feature: user-records-admin
    As a admin I need to validate successful user record addition, editing and deletion in order to confirm that the solution works as expected

    Background: Login
        Given I have logged into the ui and navigated to the Users page

    @functional
    @TEST-171
    @portal
    Scenario Outline: I can add a new user to the ui
        When I add a new user with details username '<username>', firstname '<firstname>', lastname '<lastname>' and email '<email>'
        And I click Save Changes
        Then The new user record is saved with a green tick
        Examples:
            | username | firstname  | lastname   | email                    |
            | tester1  | autotestfn | autotestln | tester1@glasswalltest.co |

    @functional
    @TEST-185
    @portal
    Scenario Outline: A new user cannot be added with a invalid email
        When I add a new user with details username '<username>', firstname '<firstname>', lastname '<lastname>' and email '<email>'
        And I click Save Changes
        Then the record is not saved and the expected validation error is displayed
        Examples:
            | username   | firstname    | lastname     | email        |
            | autotester | autotesterfn | autotesterln | autotester1@ |

    @functional
    @TEST-186
    @portal
    Scenario Outline: A duplicate user cannot be added
        Given A user record with the email '<email>' already exist
        When I add a new user record with username '<username>', firstname '<firstname>', lastname '<lastname>' and the existing email '<email>'
        And I click Save Changes
        Then the expected validation error is displayed and the record is not saved
        Examples:
            | username      | firstname       | lastname        | email                      |
            | dupautotester | dupautotesterfn | dupautotesterln | dupautotester1@icaptest.co |

    @functional
    @TEST-191
    @portal
    Scenario: I cannot delete my own account
        When I observe my account
        Then there will be no delete button next to my account

    @functional
    @TEST-172
    @portal
    Scenario Outline: I can delete another user from the page
        Given A user exist with the email address '<email>'
        When I delete the existing user with email '<email>'
        And I click Save Changes
        Then The user record with email '<email>' is no longer available
        Examples:
            | email                           |
            | recordtodelete@glasswalltest.co |


    @functional
    @portal
    @TEST-142
    Scenario Outline: A existing user record can be updated
        Given A user record exist with username '<username>', firstname '<firstname>', lastname '<lastname>' and email '<email>'
        When I click the edit on the user record and update the firstname to '<newfirstname>'
        Then The updated user record is saved
        Examples:
            | username     | firstname  | lastname   | email                          | newfirstname |
            | usertoupdate | fntoupdate | lntoupdate | emailtoupdate@glasswalltest.co | newfname     |