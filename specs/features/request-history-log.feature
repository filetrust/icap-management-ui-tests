@request-history-log
Feature: request-history-log
    As a admin I need to validate the file requests history log view using a fileId and a combination of multiple filters
    in order to confirm that the solution works as expected

    @TEST-166
    Scenario Outline: I am able to change the number of files displayed on the page
        Given I have navigated to the Request History page
        When I click on the Items Shown drop down and select a number of items as <itemCount> and apply
        Then the count of files displayed is as selected <fileCount> and will show in the items show dropdown
        Examples:
            | itemCount | fileCount |
            | 25        | 25        |
            | 100       | 100       |

    @TEST-179
    Scenario Outline: Validate requests log view using a combination of multiple filters
        Given I have navigated to the Request History page
        When I click on the Add Filter button
        And add multiple filter selections as '<filterOne>', '<filterTwo>', '<filterThree>'
        Then the result list shows files with the applied filtertypes '<filteredFile>'
        Examples:
            | filterOne             | filterTwo        | filterThree   | filteredFile       |
            | fileOutcome_sanitised | fileType_docx    | fileId_123    | sanitised_docx_123 |
            | fileOutcome_dangerous | fileType_ppt     |               | dangerous_ppt      |
            | FileID_123            | fileOutcome_safe | fileType_xlsx | 123_safe_xlsx      |

    @TEST-189
    Scenario Outline: I can remove individual filters
        Given I have navigated to the Request History page
        And '<filterOne>' and '<filterTwo>' are applied
        When I remove '<filterOne>'
        Then the result list shows files with the applied filtertypes '<filteredFile>'
        Examples:
            | filterOne        | filterTwo             | filteredFile |
            | FileType_docx    | fileOutcome_sanitised | sanitised    |
            | FileOutcome_Safe | FileType_docx         | docx         |

    @TEST-163_164_165_180
    Scenario Outline: I can filter the log using file id
        Given I have navigated to the Request History page
        When I click on the Add Filter button and add a file id filter as '<filter>'
        Then the result list only shows the filtered file as '<filteredFile>'
        Examples:
            | filter     | filteredFile |
            | fileId_123 | 123          |
