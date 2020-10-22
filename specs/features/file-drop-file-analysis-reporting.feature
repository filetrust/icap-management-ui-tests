Feature: file-drop-file-analysis-reporting
    As a admin I need to validate the successful download of a PDF or XML analysis report in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui

    @TEST-178
    Scenario: I can download the full XML analysis report for a file
        Given I have navigated to the File Drop page and have processed a file
        When I click on XML
        Then the full XML report is downloaded


    @TEST-181
    Scenario: I can download the full PDF analysis report for a file
        Given I have navigated to the File Drop page and have processed a file
        When I click on PDF
        Then the full PDF report is downloaded
