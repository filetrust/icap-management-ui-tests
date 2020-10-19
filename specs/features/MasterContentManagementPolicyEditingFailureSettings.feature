Feature: Master Content Management Policy Editing - Failure Settings Feature 581

    Background:
        Given the user has logged into the ui

    @TEST-158
    Scenario: A user can update the non-compliant routes API URL
        Given user has navigated to the Current Policy page
        And has entered a valid URL into the API URL box
        When the save button is selected
        Then the API URL is updated
        And a validation message is displayed

    @TEST-159
    Scenario: A user cannot update the non compliant routes API URL to an invalid url
        Given user has navigated to the Current Policy page
        And has entered an invalid URL into the API URL box
        When the save button is selected
        Then the API URL is not updated
        And an error message is displayed

    @TEST-160
    Scenario: A user can delete the API URL
        Given user has navigated to the Current Policy page
        When user click the delete button
        And the deletion confirm button is clicked
        Then the API URL line is deleted
        And a confirmation message is displayed

    @TEST-187
    Scenario Outline: A user can change the outcome of Glasswall Blocked files
        Given user has navigated to the Current Policy page
        When user changes the route for Glasswall Blocked Files to <Glasswall Blocked route>
        And the save button is selected
        Then the Glasswall Blocked file type route is updated
        And an Glasswall Blocked file is directed according to <Glasswall Blocked file outcome>
        Examples:
            | Glasswall Blocked route | Glasswall Blocked file outcome                          |
            | Relay                   | Unmodified file relayed                                 |
            | Block                   | Original file blocked, and error report recieved        |
            | Refer                   | The file is sent along the "non-compliant file service" |

    @TEST-183
    Scenario Outline: A user can change the outcome of Un-processable files
        Given user has navigated to the Current Policy page
        When user changes the route for un-processable file types to <un-processable route>
        And the save button is selected
        Then the un-processable file type route is updated
        And an un-processable file is directed according to <un-processable file outcome>
        Examples:
            | un-processable route | un-processable file outcome                             |
            | Relay                | Unmodified file relayed                                 |
            | Block                | Original file blocked, and error report recieved        |
            | Refer                | The file is sent along the "non-compliant file service" |


