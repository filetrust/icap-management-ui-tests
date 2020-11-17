@content-management-policy-application-to-files
Feature: content-management-policy-application-to-files
    As a admin I need to validate that a set Content Management policy is correct applied to processed files in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        Given I am on current policy screen

    @TEST-
    Scenario Outline: Content Management policy is correctly applied to processed files
        Given I set a policy with the <contentFlags> set to <flagType> for a file type <fileType>
        When I process file <fileType> file <file> through the icap server
        Then The <file> processing outcome is <fileOutcome>
        Examples:
            | contentFlags          | flagType   | fileType   |     file                                                                    | fileOutcome |
            | embeddedFiles         | sanitise   | word       |    MacroRunCalculator.docm                                                  | sanitised   |
            | hyperlink             | disallow   | jpg        |    Complete+works+of+shakespeare+hidden+zip_Polyglot_image.jpg              | htmlReport  |
            | reviewComments        | sanitise   | excel      |    Opens+calculator+app_macro_MS+excel+2003+and+later.xlsm                  | sanitised   |
            | metadata              | disallow   | powerpoint |    External+Hyperlink+to+google_Hyperlink_MS+Powerpoint+2003+and+later.pptx | htmlReport  |
            | internalHyperlinks    | sanitise   | pdf        |    Execute+Java+Script_JS_PDF.pdf                                           | sanitised   |