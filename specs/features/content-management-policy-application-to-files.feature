@content-management-policy-application-to-files
Feature: content-management-policy-application-to-files
    As a admin I need to validate that a set Content Management policy is correct applied to processed files
    in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        Given I am on the draft Adaptation policy screen


    @functional
    @TEST-212
    Scenario Outline: The current Content Management Policy is correctly applied to processed files
        Given The file '<file>' is not in download folder
        And I set a policy for file type '<fileType>' with '<contentFlag>' set to '<flagType>'
        When I process file '<file>' through the icap server using Icap client
        Then The '<file>' with file type '<fileExtension>' processing outcome is as expected '<fileOutcome>' and '<outcomeValue>'
        Examples:
            | fileType | contentFlag        | flagType | file                           | fileOutcome | fileExtension | outcomeValue      |
            | word     | InternalHyperlinks | sanitise | issues.docx                    | Sanitised   | Docx          | Safe              |
            | pdf      | ExternalHyperlinks | disallow | Execute+Java+Script_JS_PDF.pdf | htmlReport  | Pdf           | Blocked by Policy |