@file-drop-file-process-result-view
Feature: file-drop-file-process-result-view
    As a admin I need to validate the processed file result view in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        And I have navigated to the File Drop page

   
    @smoke
    @TEST-227
    Scenario Outline: I can download the full analysis report of a processed file
        Given I have processed a supported file <supportedFile>
        When I view result and click on Download Analysis Report
        Then The full analysis report is downloaded and available as <analysisReport>
        Examples:
            | supportedFile              | analysisReport  |
            | src/data/input/issues.docx | issues.docx.xml |

    
    @smoke
    @TEST-228
    Scenario Outline: I can see the result of a repaired file with the issues removed
        When I process a supported sanitisation file <activeContentFile> with remedy items
        Then the notification message is displayed as <processStatus>
        And I see the list of sanitised active contents with expected <activeContent>
        And I see the list of objects and structures repaired with expected <repairedObject>
        Examples:
            | activeContentFile         | activeContent                              | repairedObject      | processStatus                |
            | src/data/input/file1.docx | Internal Hyperlinks present in CT_Bookmark | APP segment removed | Your file has been processed |

    
    @smoke
    @TEST-229
    Scenario Outline: I can see the result of a unrepaired file with the list of structural issues not removed
        When I process a supported file <fileWithIssues> with structural Issues
        Then the notification message is displayed as <processStatus>
        And I see the list of objects and structures not repaired <nonrepairedObject>
        Examples:
            | fileWithIssues           | nonrepairedObject    | processStatus                |
            | src/data/input/file2.pdf | Non-conforming image | Your file has been processed |
