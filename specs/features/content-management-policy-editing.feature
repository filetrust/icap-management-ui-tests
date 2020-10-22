Feature: Content Management Policy Editing
    As a admin I need to validate that policy content flags can be edited in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        Given I am on current policy screen


    @TEST-153
    Scenario: A user selecting the "Current Policy" in the navigation panel will be taken to the current policy page
        When the user clicks on Current Policy in the navigation panel
        Then the user is taken to the current policy page


    @TEST-188
    Scenario: A user can cancel any updates that they have done to the policy by pressing cancel
        When user has updated sections of the current policy
        When the user presses the Cancel button
        Then the changes are undone
        And the Current policy defaults to the latest saved policy


    @TEST-155
    Scenario Outline: I can edit policy content flags
        When I change one of the <ContentFlags> for required file types <fileType> and save
        Then the changes are saved
        And the previous policy can now be located in the Policy history page
        Examples:
            | fileType   | ContentFlags    | FlagType |
            | Word       | Embedded Files  | Sanitise |
            | Excel      | Review Comments | Disallow |
            | Powerpoint | Embedded Images | Disallow |
            | PDF        | Acroform        | Sanitise |
