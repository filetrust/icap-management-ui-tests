Feature: content-management-policy-application-to-files
    As a admin I need to validate that a set Content Management policy is correct applied to processed files in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui

    @TEST-
    Scenario Outline: I can process a file and the file is sanitised when content management policy is set to Sanitise
        Given I have applied the sanitise content management policy
        When I process <File>
        Then <File> is returned with <FileHash>
        Example:
            | File | FileHash |

    @TEST-
    Scenario: I cannot process a file if the content management policy is set to Disallow
        Given I have applied the Disallow content management policy
        When I process a file
        Then the file is not returned and the expected validation message is returned