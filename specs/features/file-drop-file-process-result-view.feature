@file-drop-file-process-result-view
Feature: file-drop-file-process-result-view
    As a admin I need to validate the processed file result view in order to confirm that the solution works as expected

    Background:
        Given I am on the FileDrop page


    #@functional
    @portal
    @filedrop
    @TEST-228
    Scenario Outline: User can see the result of a repaired file with the issues removed
        When I process a supported sanitisation file '<activeContentFile>' with remedy items
        Then I see the list of sanitised active contents with expected issue '<activeContent>'
        And I see the list of objects and structures repaired with expected item '<repairedObject>'
        Examples:
            | activeContentFile            | activeContent                              | repairedObject      |
            | src/data/multiset/file1.docx | Internal Hyperlinks present in CT_Bookmark | APP segment removed |

    #@functional
    @portal
    @filedrop
    @TEST-229
    Scenario Outline: User can see the result of a unrepaired file with the list of structural issues not removed
        When I process a supported file '<fileWithIssues>' with structural Issues
        Then I see the list of objects and structures not repaired '<nonrepairedObject>'
        Examples:
            | fileWithIssues              | nonrepairedObject    |
            | src/data/multiset/file2.pdf | Non-conforming image |
