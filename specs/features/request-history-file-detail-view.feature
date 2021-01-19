@request-history-file-detail-view
Feature: request-history-file-detail-view
    As a admin I need to validate request histrory file details view for issue, sanitization and remedy items as well as applied content management policy
    in order to confirm that the solution works as expected

Background:
        Given I am logged into the ui
        Given I have navigated to the Request History page

    @functional
    @TEST-169
    Scenario Outline: User can view more details on a file including processed sanitisation
        When I select a valid '<datetimeFrom>' and '<datetimeTo>'
        And I click on a available file record with id '<fileId>'
        Then the file detail view opens
        And the file result details and the sanitisation issues content is displayed to show item '<issue>'
        Examples:
            | fileId                               | issue    | datetimeFrom        | datetimeTo          |
            | 11aded86-a598-4c42-a8c8-094c01012ae0 | 97976586 | 18/01/2021 19:00 PM | 18/01/2021 23:59 PM |

    @functional
    @TEST-169
    Scenario Outline: User can view structural issues on a file
        When I select a valid '<datetimeFrom>' and '<datetimeTo>'
        And I click on a available file record with id '<fileId>'
        Then the file detail view opens
        And the file result details and the issues content is displayed to show issue '<issue>'
        Examples:
            | fileId                               | issue    | datetimeFrom        | datetimeTo          |
            | 11aded86-a598-4c42-a8c8-094c01012ae0 |          | 18/01/2021 19:00 PM | 18/01/2021 23:59 PM |

    @functional
    @TEST-169
    Scenario Outline: User can view remedy items removed on a file
        When I select a valid '<datetimeFrom>' and '<datetimeTo>'
        And I click on a available file record with id '<fileId>'
        Then the file detail view opens
        And the file result details and the remedy content is displayed to show item '<item>'
        Examples:
            | fileId                               | item    | datetimeFrom        | datetimeTo          |
            | 11aded86-a598-4c42-a8c8-094c01012ae0 |         | 18/01/2021 19:00 PM | 18/01/2021 23:59 PM |

    @functional
    @TEST-169_b
    Scenario Outline: User can view the details of the content management policy applied on a file
        When I select a valid '<datetimeFrom>' and '<datetimeTo>'
        And I click on a available file record with id '<fileId>'
        Then the content management policy section is available
        Examples:
            | fileId                               | datetimeFrom        | datetimeTo          |
            | 11aded86-a598-4c42-a8c8-094c01012ae0 | 18/01/2021 19:00 PM | 18/01/2021 23:59 PM |