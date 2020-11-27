@request-history-filtering-by-file-type
Feature: request-history-filtering-by-file-type
    As a admin I need to validate file requests history filtering by file extension in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui

    @success
    @functional
    @smoke
    @TEST-180
    Scenario Outline: filter the log by file type
        Given I have navigated to the Request History page
        When I click on the Add Filter button and add a file type filter as '<filter>'
        Then the result list shows files with the selected types as '<filteredFile>'
        Examples:
            | filter | filteredFile |
            | docx   | Docx         |
            




