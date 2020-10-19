Feature: FileDropView

    Background:
        Given the user has logged into the ui


    @TEST-175
    Scenario: A user can navigate to the File Drop Service page
        When the user clicks on File Drop on the navigation bar
        Then the user is taken to the File Drop Service page

    @TEST-176
    Scenario: A user can load a file into the file drop service
        Given the user has navigated to the FileDrop page
        When the user clicks Select a file
        And chooses a file
        Then the File is processed by the file drop service
        And the user is show the file outcome
        And the user can view more detailed results


    @TEST-177
    Scenario: A user can view the details of a file that has been processed by the file drop service
        Given the user has navigated to the File Drop page
        And has processed a file
        When the user clicks on View Results
        Then the user will be able to see the full analysis report

    @TEST-178
    Scenario: A user is able to download the full XML analysis report for a file
        Given the user has navigated to the File Drop page
        And has processed a file
        When the user clicks on XML
        Then the full XML report is downloaded

    @TEST-181
    Scenario: A user is able to download the full PDF analysis report for a file
        Given the user has navigated to the File Drop page
        And has processed a file
        When the user clicks on PDF
        Then the full PDF report is downloaded

    @TEST-182
    Scenario: An error message is produced when file drop is unable to process a file
        Given the user has navigated to the File Drop page
        When the user clicks Select a file
        And the user chooses a that is not processable
        Then the expected validation error is displayed