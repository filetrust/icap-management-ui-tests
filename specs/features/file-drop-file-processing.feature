@file-drop-file-processing
Feature: file-drop-file-processing
    As a admin I need to validate the successful file processing by the File Drop service and error notification for unprocessed files in order to confirm that the solution works as expected


    Background:
        Given I am logged into the ui
        And I have navigated to the FileDrop page

    
    @smoke
    @TEST-230
    Scenario Outline: I can process a file through the file drop service
        When I click Select a file and choose a supported file <supportedFile>
        Then the File is processed with the process status displayed as <processStatus>
        And I can view more detailed results with file attributes <fileName> and <fileType>
        Examples:
            | supportedFile                        | fileName              | fileType | processStatus                |
            | src/data/input/issues.docx           | issues.docx           | docx     | Your file has been processed |
            | src/data/input/structuralIssues.xlsx | structuralIssues.xlsx | xlsx     | Your file has been processed |

    
    @smoke
    @TEST-231
    @Fail-Code
    #test2.pdf is not bigger than 3.5mb
    Scenario Outline: An error message is produced when file drop is unable to process a file
        When I click Select a file and choose non processable file <file>
        Then the expected validation error is displayed as <error>
        Examples:
            | file                        | error                                                                  |
            | src/data/input/icaptest.ps1 | Please use a supported file type                                       |
            | src/data/input/test2.pdf    | This free service is currently limited to a maximum file size of 3.5MB |

    @TEST-232
    Scenario: A file processed through file drop is sanitised independent of set UI policy