@request-history-file-detail-view
Feature: request-history-file-detail-view
    As a admin I need to validate request histrory file details view for issue, sanitization and remedy items as well as applied content management policy
    in order to confirm that the solution works as expected

Background:
        Given I am logged into the ui
        Given I have navigated to the Request History page

    @functional
    @TEST-169
    Scenario Outline: I am able to view more detail on a file
        When I click on a available file record with id '<fileId>'
        Then the file detail view opens
        And the file result details and the sanitisation issues content is displayed to show item '<issue>'
        Examples:
            | fileId                               | issue    |
            | 11aded86-a598-4c42-a8c8-094c01012ae0 | 97976586 |

    @functional
    @TEST-169_b
    Scenario Outline: I am able to view more detail on a file
        When I click on a available file record with id '<fileId>'
        Then the content management policy section is available
        Examples:
            | fileId                               |
            | 11aded86-a598-4c42-a8c8-094c01012ae0 |