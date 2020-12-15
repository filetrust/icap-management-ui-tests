@content-management-policy-application-to-files
Feature: content-management-policy-application-to-files
    As a admin I need to validate that a set Content Management policy is correct applied to processed files 
    in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        Given I am on the draft Adaptation policy screen


    @functional
    @TEST-212
    Scenario Outline: Content Management policy is correctly applied to processed files
        Given I set a policy for file type '<fileType>' with '<contentFlag>' set to '<flagType>'
        When I process file '<fileType>' file '<file>' through the icap server
        Then The '<file>' processing outcome is as expected '<fileOutcome>'
        Examples:
            | fileType | contentFlag        | flagType | file                           | fileOutcome |
            | word     | EmbeddedFiles      | sanitise | MacroRunCalculator.docm        | Sanitised   |
            | pdf      | ExternalHyperlinks | disallow | Execute+Java+Script_JS_PDF.pdf | htmlReport  |

