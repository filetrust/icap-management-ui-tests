@file-drop-file-analysis-reporting
Feature: file-drop-file-analysis-reporting
    As a admin I need to validate the successful download of a PDF or XML analysis report in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        And I have navigated to the File Drop page

    @smoke
    @TEST-225
    @Fail-code
    # Returning Okay, but then says "The file does not exist"
    Scenario Outline: I can download the full XML analysis report for a file
        Given I have uploaded a file '<supportedFile>'
        When  I view result and click on XML button
        Then the XML report <xmlFile> is downloaded
        Examples:
            | supportedFile             | xmlFile   |
            | src/data/input/file1.docx | file1.xml |

    @smoke
    @TEST-226
    @Fail-code
    # Returning Okay, but then says "The file does not exist"
    # Missing assertion of pdf
    Scenario Outline: I can download the full PDF analysis report for a file
        Given I have uploaded a file '<supportedFile>'
        When  I view result and click on PDF button
        Then the pdf report <pdfFile> is downloaded
        Examples:
            | supportedFile            | pdfFile   |
            | src/data/input/file2.pdf | file2.pdf |
