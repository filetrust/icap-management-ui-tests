Feature: Policy Management View

    Background:
        Given the user has logged into the ui


    @TEST-Change-content-flag-for-word
    Scenario: A user is able to change the content flags to sanitise for word in policy page
        Given I am on policy screen
        When the user change all the flag for world to sanitise on policy page
        Then all flags of the world is changed to sanitise
        When the user change all the flag for world to disallow on policy page
        Then all flags of the world is changed to disallow

    @TEST-Change-content-flag-for-excel
    Scenario: A user is able to change the content flags to sanitise for excel in policy page
        Given I am on policy screen
        When the user change all the flag for excel to sanitise on policy page
        Then all flags of the excel is changed to sanitise
        When the user change all the flag for excel to disallow on policy page
        Then all flags of the excel is changed to disallow

    @TEST-Change-content-flag-for-powerpoint
    Scenario: A user is able to change the content flags to sanitise for powerpoint in policy page
        Given I am on policy screen
        When the user change all the flag for powerpoint to sanitise on policy page
        Then all flags of the powerpoint is changed to sanitise
        When the user change all the flag for powerpoint to disallow on policy page
        Then all flags of the powerpoint is changed to disallow

    @TEST-Change-content-flag-for-pdf
    Scenario: A user is able to change the content flags to sanitise for pdf in policy page
        Given I am on policy screen
        When the user change all the flag for pdf to sanitise on policy page
        Then all flags of the pdf is changed to sanitise
        When the user change all the flag for pdf to disallow on policy page
        Then all flags of the pdf is changed to disallow


    @TEST-153
    Scenario: A user selecting the "Current Policy" in the navigation panel will be taken to the current policy page
        When the user clicks on Current Policy in the navigation panel
        Then the user is taken to the current policy page

    @TEST-154
    Scenario: A user selecting the "Policy History" in the navigation panel will be taken to the policy history page
        When the user clicks on Policy History in the navigation panel
        Then the user is taken to the Policy History page

    @TEST-155
    Scenario: A user is able to change part of the policy from Allow to Sanitise and the policy can be saved with all changes
        Given the user has logged into the ui
        And has navigated to the "Current Policy" page
        And has changed one of the "Content Flags" from "Allow" to "Sanitise"
        When the "Save Changes" button is clicked
        Then the changes are saved
        And the previous policy can now be located in the "Policy history" page

    @TEST-156
    Scenario: A user can view previous Policy details
        Given I am on policy screen
        Given I clicks on Policy History tab
        When I click view
        Then the previous Policy is displayed

    @TEST-157
    Scenario:A user can activate a previous policy
        When the activate button is clicked
        Then the previous Policy is activated
        And the successful activation message is displayed

    @TEST-157-up-to-step-2
    Scenario:A user can activate a previous policy
        When the user clicks on Policy History in the navigation panel
        When the activate button is clicked

    @TEST-158
    Scenario: A user can update the non-compliant routes API URL
        Given user has navigated to the "Current Policy" page
        And has entered a valid URL into the "API URL" box
        When the save button is selected
        Then the "API URL" is updated
        And a validation message is displayed

    @TEST-158-up-to-step-3
    Scenario: A user cannot update the non compliant routes API URL to an invalid url
        Given I am on policy screen
        When I have entered an valid URL into the "API URL" box
        When the save button is selected

    @TEST-159
    Scenario: A user cannot update the non compliant routes API URL to an invalid url
        Given user has navigated to the "Current Policy" page
        And has entered an invalid URL into the "API URL" box
        When the save button is selected
        Then the "API URL" is not updated
        And an error message is displayed

    @TEST-159-up-to-step-4
    Scenario: A user cannot update the non compliant routes API URL to an invalid url
        Given I am on policy screen
        When I have entered an invalid URL into the "API URL" box
        When the save button is selected

    @TEST-160
    Scenario: A user can delete the API URL
        Given user has navigated to the "Current Policy" page
        When user click the delete button
        And the deletion confirm button is clicked
        Then the "API URL" line is deleted
        And a confirmation message is displayed

    @TEST-160-up-to-2-step
    Scenario: A user can delete the API URL
        Given I am on policy screen
        When user click the delete button

    @TEST-161
    Scenario: A user can change the number of items displayed on a page
        Given user has navigated to the "Policy History" page
        And there are more than 10 policies in the history
        When "Items Shown" is changed to 25
        Then up to 25 previous policies are displayed

    @TEST-183
    Scenario Outline: A user can change the outcome of Un-processable files
        Given user has navigated to the "Current Policy" page
        When user changes the route for un-processable file types to <un-processable route>
        And the save button is selected
        Then the un-processable file type route is updated
        And an un-processable file is directed according to <un-processable file outcome>
        Examples:
            | un-processable route | un-processable file outcome                             |
            | Relay                | Unmodified file relayed                                 |
            | Block                | Original file blocked, and error report recieved        |
            | Refer                | The file is sent along the "non-compliant file service" |

    @TEST-187
    Scenario Outline: A user can change the outcome of Glasswall Blocked files
        Given user has navigated to the "Current Policy" page
        When user changes the route for Glasswall Blocked Files to <Glasswall Blocked route>
        And the save button is selected
        Then the Glasswall Blocked file type route is updated
        And an Glasswall Blocked file is directed according to <Glasswall Blocked file outcome>
        Examples:
            | Glasswall Blocked route | Glasswall Blocked file outcome                          |
            | Relay                   | Unmodified file relayed                                 |
            | Block                   | Original file blocked, and error report recieved        |
            | Refer                   | The file is sent along the "non-compliant file service" |

    @TEST-188
    Scenario: A user can cancel any updates that they have done to the policy by pressing cancel
        Given user has navigated to the "Current Policy" page
        And user has updated sections of the current policy
        When the user presses the "Cancel button"
        Then the changes are undone
        And the Current policy defaults to the latest saved policy

    @TEST-Change-188-except-last-step
    Scenario: A user can cancel any updates that they have done to the policy by pressing cancel
        Given I am on policy screen
        When the user change all the flag for world to sanitise on policy page without saving
        Then all flags of the world is changed to sanitise
        When the user presses the Cancel button
        Then all flags of the world is changed to disallow