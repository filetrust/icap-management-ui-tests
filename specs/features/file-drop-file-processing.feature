Feature: file-drop-file-processing
    As a admin I need to validate the successful file processing by the File Drop service and error notification for unprocessed files in order to confirm that the solution works as expected


    Background:
        Given I am logged into the ui
        And I have navigated to the FileDrop page

    @TEST-176
    Scenario: I can load a file into the file drop service
        When I click Select a file and choose a supported file
        Then the File is processed by the file drop service
        And I can view more detailed results

    @TEST-182
    Scenario: An error message is produced when file drop is unable to process a file
        When I click Select a non processable file into file drop
        Then the expected validation error is displayed

    @TEST-
    Scenario: I can download successfully processed files
        When I click on Download Processed File
        Then I have the file is successfully downloaded
        And I can successfully open the downloaded file