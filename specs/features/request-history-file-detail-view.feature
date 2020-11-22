@request-history-file-detail-view
Feature: request-history-file-detail-view
    As a admin I need to validate request histrory file details view for issue, sanitization and remedy items as well as applied content management policy
    in order to confirm that the solution works as expected

    @functional
    @smoke
    @TEST-169
    @Fail-Code
    #Does not take to correct id record
    Scenario: I am able to view more detail on a file
        Given I am logged into the portal
        And I have navigated to the Request History page
        When I click on a available file record with id ''
        Then the file detail view opens 
        And the file result details and content management policy sections are available