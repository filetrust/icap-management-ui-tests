@non-compliant-files-routing-mechanism
Feature: non-compliant-files-routing-mechanism
    As a admin I need to validate the routing mechanism for non-compliant files in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui

    @TEST-158
    Scenario: I can update the non-compliant routes API URL
        Given I have navigated to the Current Policy page and have entered a valid URL into the API URL box
        When I click save
        Then the API URL is updated and a validation message is displayed

    @TEST-159
    Scenario: I cannot update the non compliant routes API URL to an invalid url
        Given I have navigated to the Current Policy page and have entered an invalid URL into the API URL box
        When I click save
        Then the API URL is not updated and an error message is displayed

    @TEST-187
    Scenario Outline: I can change the outcome of Glasswall Blocked files
        Given I have navigated to the Current Policy page
        When I change the route for Glasswall Blocked Files to <Glasswall Blocked route> and save
        Then the Glasswall Blocked file type route is updated
        And an Glasswall Blocked file is directed according to <Glasswall Blocked file outcome>
        Examples:
            | Glasswall Blocked route | Glasswall Blocked file outcome                          |
            | Relay                   | Unmodified file relayed                                 |
            | Block                   | Original file blocked, and error report recieved        |
            | Refer                   | The file is sent along the "non-compliant file service" |

    @TEST-183
    Scenario Outline: I can change the outcome of Un-processable files
        Given I have navigated to the Current Policy page
        When I change the route for un-processable file types to <un-processable route> and save
        Then the un-processable file type route is updated
        And an un-processable file is directed according to <un-processable file outcome>
        Examples:
            | un-processable route | un-processable file outcome                             |
            | Relay                | Unmodified file relayed                                 |
            | Block                | Original file blocked, and error report recieved        |
            | Refer                | The file is sent along the "non-compliant file service" |
