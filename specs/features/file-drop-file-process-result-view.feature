Feature: file-drop-file-process-result-view
    As a admin I need to validate the processed file result view in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        Given I have navigated to the File Drop page and processed a file

    @TEST-177
    Scenario: I can view the details of a file that has been processed by the file drop service
        When I click on View Results
        Then I can see the full analysis report
        And I see the button to download the file

