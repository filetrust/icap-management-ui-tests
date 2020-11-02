@request-history-file-detail-view
Feature: request-history-file-detail-view
    As a admin I need to validate request histrory file details view for issue, sanitization and remedy items as well as applied content management policy
    in order to confirm that the solution works as expected


    @TEST-169
    Scenario: I am able to view more detail on a file
        Given I am logged into the portal
        And I have navigated to the Request History page
        When I search for a file with id '66666666 - 6666 - 6666 - 6666 - 66666666666' and click on the file record
        Then the file detail view opens with the '66666666 - 6666 - 6666 - 6666 - 66666666666' displayed at the top
        And the issue items, sanitisation items, remedy items, and content management policy sections are available