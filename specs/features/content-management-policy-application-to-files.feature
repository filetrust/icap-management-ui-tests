Feature: content-management-policy-application-to-files
    As a admin I need to validate that a set Content Management policy is correct applied to processed files in order to confirm that the solution works as expected

    Background:
        Given I am logged into the portal

    @TEST-
    Scenario Outline: I can process a file and the file is sanitised when content management policy is set to Sanitise
        Given I have applied the <FlagType> content management policy to <ContentFlags>  for <File>
        When I process <InputFileHash>
        Then <InputFileHash> is returned with <OuputFileHash>
        Examples:
            | File      | ContentFlags    | FlagType    | InputFileHash | OutputFileHash |
            | word      | embeddedFiles   | sanitise    |               |               |

    @TEST-
    Scenario Outline: I cannot process a file if the content management policy is set to Disallow
        Given I have applied the <FlagType> content management policy to <ContentFlags>  for <File>
        When I process <InputFileHash>
        Then the file is not returned and the expected validation message is returned
        Examples:
            | File      | ContentFlags    | FlagType    | InputFileHash |
            | excel     | reviewComments  | disallow    |               |