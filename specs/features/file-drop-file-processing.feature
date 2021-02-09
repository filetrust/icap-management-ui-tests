@file-drop-file-processing
Feature: file-drop-file-processing
    As a admin I need to validate the successful file processing by the File Drop service and error notification for unprocessed files in order to confirm that the solution works as expected


    Background:
        Given I am logged into the ui
        And I have navigated to the FileDrop page

    @functional
    @portal
    @TEST-230
    Scenario Outline: User can process a supported file through the file drop service
        When I click Select a file and choose a supported file '<supportedFile>'
        Then I can view more detailed results with file attributes '<fileName>', '<fileType>' and '<fileSize>'
        #And the File is processed with the process status displayed as '<processStatus>'
        Examples:
            | supportedFile                           | fileName              | fileType | fileSize | processStatus                |
            | src/data/multiset/issues.docx           | issues.docx           | docx     | 11603    | Your file has been processed |
            | src/data/multiset/structuralIssues.xlsx | structuralIssues.xlsx | xlsx     | 187294   | Your file has been processed |


    @functional
    @TEST-231
    @portal
    Scenario Outline: User cannot process a non-supported file or unprocessable file size through the file drop service
        When I click Select a file and choose non processable file '<file>'
        Then the expected validation error is displayed as '<error>'
        Examples:
            | file                           | error                            |
            | src/data/multiset/icaptest.ps1 | Please use a supported file type |


    @functional
    @TEST-downloadfile
    @portal
    Scenario Outline: User can download the protected file
        Given I have uploaded a file '<supportedFile>'
        When  I click on Download Protected File button
        Then the file '<file>' is downloaded
        #And The content is as expected
        Examples:
            | supportedFile                | file       |
            | src/data/multiset/file1.docx | file1.docx |