@file-drop-file-analysis-reporting
Feature: file-drop-file-analysis-reporting
    As a admin I need to validate the successful download of a PDF or XML analysis report in order to confirm that the solution works as expected

    Background:
        Given I am on the FileDrop page

    @functional
    @portal
    @filedrop
    @TEST-225
    Scenario Outline: User can download the full XML analysis report for a file
        Given I have uploaded a file '<supportedFile>'
        When  I click on Download XML Report button
        Then the XML report '<xmlFile>' is downloaded
        #And The content is as expected
        Examples:
            | supportedFile                | xmlFile   |
            | src/data/multiset/file1.docx | file1.xml |

    @functional
    @portal
    @TEST-226
    @filedrop
    Scenario Outline: User can download the full PDF analysis report for a file
        Given I have uploaded a file '<supportedFile>'
        When  I click on PDF button
        Then the pdf report '<pdfFile>' is downloaded
        Examples:
            | supportedFile                | pdfFile   |
            | src/data/multiset/file1.docx | file1.xml |
