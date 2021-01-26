@request-history-file-detail-view
Feature: request-history-file-detail-view
    As a admin I need to validate request histrory file details view for issue, sanitization and remedy items as well as applied content management policy
    in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        Given I have navigated to the Request History page

    @functional
    @TEST-169
    Scenario Outline: User can view more details on a previously processed file
        When I select a valid '<datetimeFrom>' and '<datetimeTo>'
        And  I click on a available file record with id '<fileId>'
        Then the file detail view opens
        And the file result details and the sanitisation issues content is displayed to show item '<issue>'
        Examples:
            | fileId                               | issue    | datetimeFrom        | datetimeTo          |
            | 11aded86-a598-4c42-a8c8-094c01012ae0 | 97976586 | 18/01/2021 19:00 PM | 18/01/2021 23:59 PM |

    @functional
    @TEST-169_2
    Scenario Outline: User can view structural issues on a file
        Given I process a file '<file>' through the icap server
        And The transaction is available in the transaction log
        When I click on the transaction record to open the detail view
        Then The issues content is displayed on the details view 
        And Expanding the content section shows the issue "<issue>"
        Examples:
            | file                  | issue                                      |
            | structuralIssues.xlsx | End of stream 'wsSortMap1.xml' not reached |

    @functional
    @TEST-169_3
    Scenario Outline: User can view Sanitisation and Remedy items removed on a file
        Given I process a file '<file>' through the icap server
        And The transaction is available in the transaction log
        When I click on the transaction record to open the detail view
        Then the file result details and the sanitisation issues content is displayed to show item '<issue>'
        And The Remedy items content is displayed on the details view to show issue '<item>'
        Examples:
            | file             | issue                          | item                                                     |
            | EmbeddedFile.pdf | Embedded file content present. | First XREF table entry malformed and will be regenerated |

    @functional
    @TEST-169_4
    Scenario Outline: User can view the details of the content management policy applied on a file
        Given I process a file '<file>' through the icap server
        And The transaction is available in the transaction log
        When I click on the transaction record to open the detail view
        Then the content management policy section is available
        Examples:
            | file        |
            | issues.docx |
