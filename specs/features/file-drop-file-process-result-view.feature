@file-drop-file-process-result-view
Feature: file-drop-file-process-result-view
    As a admin I need to validate the processed file result view in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        And I have navigated to the File Drop page

    @TEST-177
    Scenario Outline: I can download the full analysis report of a processed file
        Given I have processed a supported file <supportedFile>
        When I view result and click on Download Analysis Report
        Then The full analysis report is downloaded and available as <analysisReport>
        Examples:
            | supportedFile              | analysisReport  |
            | src/data/input/issues.docx | issues.docx.xml |

    @sanitisation
    Scenario Outline: I can see the result of a repaired file with the issues removed
        When I process a supported sanitisation file <activeContentFile> with remedy items
        Then the notification message is displayed as <successfulProcess>
        And I see the list of sanitised active contents with expected <activeContent>
        And I see the list of objects and structures repaired with expected <repairedObject>
        Examples:
            | activeContentFile         | activeContent                              | repairedObject      | successfulProcess                    |
            | src/data/input/file1.docx | Internal Hyperlinks present in CT_Bookmark | APP segment removed | Your Safe, Regenerated File Is Ready |

    @noremedy
    Scenario Outline: I can see the result of a unrepaired file with the list of structural issues not removed
        When I process a supported file <fileWithIssues> with structural Issues
        Then the notification message is displayed as <unsuccessfulError>
        And I see the list of objects and structures not repaired <nonrepairedObject>
        Examples:
            | fileWithIssues           | nonrepairedObject    | unsuccessfulError                               |
            | src/data/input/file2.pdf | Non-conforming image | Unable to protect file due to structural issues |

    @fileDownload
    Scenario Outline: I can download successfully processed files
        Given I have processed a supported file <supportedFile>
        When I view result and click on Download Processed File
        Then I have the file successfully downloaded as <downloadedFileName>
        And I can successfully open the downloaded file
        Examples:
            | supportedFile              | downloadedFileName |
            | src/data/input/issues.docx | issues.docx        |