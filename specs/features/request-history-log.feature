@request-history-log
Feature: request-history-log
  As a admin I need to validate the file requests history log view using a fileId and a combination of multiple filters
  in order to confirm that the solution works as expected

  Background:
    Given I am logged into the ui
    Given I have navigated to the Request History page


  @success
  @prototype
  @TEST-166
  Scenario Outline: User can change the number of files displayed on the page
    When I click on the Items Shown drop down and select a number of items as '<itemCount>' and apply
    Then the count of files displayed is as selected <fileCount> and will show in the items show dropdown
    Examples:
      | itemCount | fileCount |
      | 25        | 4         |

  @portal
  @functional
  @TEST-179
  Scenario Outline: User can filter the transactions log view using a combination of multiple filters
    Given There are transactions available in the transaction log
    When I click on the Add Filter button and add multiple filter selections as '<riskFilter>', '<typeFilter>'
    Then the result list shows files with the applied filtertypes '<fileType>','<fileRisk>'
    Examples:
      | riskFilter | typeFilter | fileType | fileRisk |
      | Safe       | docx       | Docx     | Safe     |

  #@portal
  #@functional
  @TEST-189
  Scenario Outline: User can remove applied filters and see the log updated
    Given There are transactions available in the transaction log
    And The filters '<filterOne>' and '<filterTwo>' are applied
    When I remove '<filterToRemove>'
    Then The transactions with '<filterValues>' are returned
    Examples:
      | filterOne | filterTwo | filterToRemove | filterValues |
      | docx      | Safe      | docx           | Safe         |

  @portal
  @functional
  @TEST-164
  Scenario Outline: User can filter the log using file id
    When I have selected a time range '<datetimeFrom>' and '<datetimeTo>'
    And I click on the Add Filter button and add a file id filter with Id '<fileId>'
    Then the result list only shows the filtered file with id '<fileId>'
    Examples:
      | fileId                               | datetimeFrom        | datetimeTo          |
      | 4fdbf181-a663-4e03-b316-eba3618a065f | 23/02/2021 15:18 PM | 23/02/2021 16:18 PM |
