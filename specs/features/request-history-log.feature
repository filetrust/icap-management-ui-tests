@request-history-log
Feature: request-history-log
  As a admin I need to validate the file requests history log view using a fileId and a combination of multiple filters
  in order to confirm that the solution works as expected

  Background:
    Given I am logged into the ui

  @success
  @prototype
  @TEST-166
  Scenario Outline: User can change the number of files displayed on the page
    Given I have navigated to the Request History page
    When I click on the Items Shown drop down and select a number of items as '<itemCount>' and apply
    Then the count of files displayed is as selected <fileCount> and will show in the items show dropdown
    Examples:
      | itemCount | fileCount |
      | 25        | 4         |


  @functional
  @TEST-179
  Scenario Outline: User can filter the transactions log view using a combination of multiple filters
    Given I have navigated to the Request History page
    When I click on the Add Filter button
    And add multiple filter selections as '<riskFilter>', '<typeFilter>', '<fileIdFilter>'
    Then the result list shows files with the applied filtertypes '<appliedFilters>', '<filterValues>'
    Examples:
      | riskFilter | typeFilter | fileIdFilter | appliedFilters | filterValues |
      | Safe       | docx        |              | Safe_docx       | SAFE_docx     |


  @functional
  @TEST-189
  Scenario Outline: User can remove applied filters
    Given I have navigated to the Request History page
    And '<filterOne>' and '<filterTwo>' are applied
    When I remove '<filterToRemove>'
    Then the result list shows files with the applied filtertypes '<appliedFilter>', '<filterValues>'
    Examples:
      | filterOne | filterTwo | filterToRemove | appliedFilter | filterValues |
      | docx      | Safe      | docx           | Safe          | SAFE         |
     
 @prototype
  @TEST-164
  Scenario Outline: User can filter the log using file id
    Given I have navigated to the Request History page
    When I click on the Add Filter button and add a file id filter as '<filter>'
    Then the result list only shows the filtered file as '<filteredFile>'
    Examples:
      | filter                                      | filteredFile                                |
      | 11aded86-a598-4c42-a8c8-094c01012ae0 | 11aded86-a598-4c42-a8c8-094c01012ae0 |
