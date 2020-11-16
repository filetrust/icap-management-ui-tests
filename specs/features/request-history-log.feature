@request-history-log
Feature: request-history-log
    As a admin I need to validate the file requests history log view using a fileId and a combination of multiple filters
    in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui

   
    @smoke
    @TEST-166
    Scenario Outline: I am able to change the number of files displayed on the page
        Given I have navigated to the Request History page
        When I click on the Items Shown drop down and select a number of items as '<itemCount>' and apply
        Then the count of files displayed is as selected <fileCount> and will show in the items show dropdown
        Examples:
            | itemCount | fileCount |
            | 25        | 4         |
           
    
    @TEST-179
    Scenario Outline: Validate requests log view using a combination of multiple filters
        Given I have navigated to the Request History page
        When I click on the Add Filter button
        And add multiple filter selections as '<riskFilter>', '<typeFilter>', '<fileIdFilter>'
        Then the result list shows files with the applied filtertypes '<appliedFilters>'
        Examples:
            | riskFilter | typeFilter | fileIdFilter                         | appliedFilters       |
            | Safe       | png        |                                      | Safe_Png           |
        
    @functional
    @smoke
    @TEST-189
    Scenario Outline: I can remove individual filters
        Given I have navigated to the Request History page
        And '<filterOne>' and '<filterTwo>' are applied
        When I remove '<filterToRemove>'
        Then the result list shows files with the applied filtertypes '<appliedFilter>'
        Examples:
            | filterOne | filterTwo | filterToRemove | appliedFilter |
            | docx      | Safe      | docx           | Safe         |
            | png       | Safe      | Safe           | Png          |


    @filterfileid
    Scenario Outline: I can filter the log using file id
        Given I have navigated to the Request History page
        When I click on the Add Filter button and add a file id filter as '<filter>'
        Then the result list only shows the filtered file as '<filteredFile>'
        Examples:
            | filter                                      | filteredFile                                  |
            | 44444444 - 4444 - 4444 - 4444 - 44444444444 | 44444444 - 4444 - 4444 - 4444 - 44444444444   |
