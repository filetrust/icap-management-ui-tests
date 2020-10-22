Feature: request-history-file-detail-view
    As a admin I need to validate request histrory file details view for issue, sanitization and remedy items as well as applied content management policy
    in order to confirm that the solution works as expected

    Feature Description

    @TEST-169
    Scenario: I am able to view more detail on a file
        Given I have navigated to the Request History page
        When I click on a file
        Then a box with the file ID at the top will be displayed
        And issue items, sanitisation items, remedy items, and the content management policy details are available to be viewed
