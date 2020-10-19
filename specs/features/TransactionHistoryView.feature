Feature: Transaction / ICAP History View

    Background:
        Given the user has logged into the ui


    @TEST-162
    Scenario: A user is able to navigate to the request history page
        When the user selects Request History in the navigation panel
        Then they are taken to the Request History Page

    @TEST-163_164_165_180
    Scenario Outline: A user is able to filter the risks log
        Given user has navigated to the Request History page
        When the user has clicked on the Add Filter button
        And add a filter selection as <filter>
        Then the result list shows all files as <filteredFile>
        Examples:
            | filter                | filteredFile |
            | fileOutcome_sanitised | sanitised    |
            | fileOutcome_dangerous | safe         |
            | FileID_123            | 123          |
            | FileType_docx         | docx         |
            | FileType_Word         | Word         |


    @TEST-166
    Scenario Outline: A user is able to change the number of files displayed on the page
        Given user has navigated to the Request History page
        When user has clicked on the Items Shown drop down
        And user select a number of items as <itemCount> and apply
        Then the count of files displayed is as selected <fileCount>
        And a 25 will show in the Items Shown dropdown box
        Examples:
            | itemCount | fileCount |
            | 25        | 25        |
            | 100       | 100       |


    @TEST-167_168
    Scenario Outline: A user is able to change the date range of the files displayed
        Given user has navigated to the Request History page
        When user has clicked on Date/Time
        And user select a custom range as <customRange> and apply
        Then the files processed for the selected period are displayed
        And the date range for the selected period is displayed in the Date/Time field as <dateRange>
        Examples:
            | customRange | dateRange |
            | 12 hours    |           |
            | 3  hours    |           |


    @TEST-169
    Scenario: A user is able to view more detail on a file
        Given user has navigated to the Request History page
        When user clicks on a file
        Then a box with the file ID at the top will be displayed
        And issue items, sanitisation items, remedy items, and the content management policy details are available to be viewed


    @TEST-179
    Scenario Outline: Validate requests log view using a combination of multiple filters
        Given user has navigated to the Request History page
        When the user has clicked on the Add Filter button
        And add multiple filter selections as <filterOne>, <filterTwo>, <filterThree> and apply
        Then the result list shows files with the applied filtertypes <filteredFile>
        Examples:
            | filterOne             | filterTwo | filterThree | filteredFile |
            | fileOutcome_sanitised |           |             |              |
            | fileOutcome_dangerous |           |             |              |
            | C            |           |             |              |
            | FileType_docx         |           |             |              |
            | FileType_Word         |           |             |              |

    @TEST-184
    Scenario Outline: A user cannot filter the date range to a time greater than 24 hours
        Given user has navigated to the Request History page
        When user has clicked on Date/Time
        And user select a custom range as <customRange> and apply
        Then the expected validation error is displayed
        And the date range is not updated
        Examples:
            | customRange | dateRange |
            | 25 hours    |           |

    @TEST-189
    Scenario: A user can remove individual filters
        Given user has navigated to the Request History page
        And has a <filterOne> and <filterTwo> applied
        When user removes <filterOne>
        Then the filter is updated
        And the result list shows files with the applied filtertypes <filteredFile>
        Examples:  
            | filterOne     | filterTwo             | filteredFile |
            | FileType_docx | fileOutcome_sanitised |              |
            | FileType_Word | FileType_Word         |              |

    @TEST-190
    Scenario Outline: A user is able to update the time frame for request history
        Given user has navigated to the Request History page
        And user had a time selection previously applied
        When user makes a new time <time> selection
        And click apply button
        Then the files processed for time <time> are displayed
        And the date range for the selected period is displayed in the Date/Time field as <dateRamge>
        Examples:
            | time     | dateRange |
            | 12 Hours |           |
            | 12 Hours |           |
            | 12 Hours |           |

