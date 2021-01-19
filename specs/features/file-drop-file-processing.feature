@file-drop-file-processing
Feature: file-drop-file-processing
    As a admin I need to validate the successful file processing by the File Drop service and error notification for unprocessed files in order to confirm that the solution works as expected


    Background:
        Given I am logged into the ui
        And I have navigated to the FileDrop page

    @success
    @prototype
    @TEST-230
    Scenario Outline: User can process a supported file through the file drop service
        When I click Select a file and choose a supported file <supportedFile>
        Then the File is processed with the process status displayed as <processStatus>
        And I can view more detailed results with file attributes <fileName> and <fileType>
        Examples:
            | supportedFile                        | fileName              | fileType | processStatus                |
            | src/data/input/issues.docx           | issues.docx           | docx     | Your file has been processed |
            | src/data/input/structuralIssues.xlsx | structuralIssues.xlsx | xlsx     | Your file has been processed |


    @success
    @prototype
    @TEST-231
    Scenario Outline: User cannot process a non-supported file or unprocessable file size through the file drop service
        When I click Select a file and choose non processable file '<file>'
        Then the expected validation error is displayed as '<error>'
        Examples:
            | file                        | error                                                                  |
            | src/data/input/icaptest.ps1 | Please use a supported file type                                       |
            | src/data/input/test2.pdf    | This free service is currently limited to a maximum file size of 3.5MB |

