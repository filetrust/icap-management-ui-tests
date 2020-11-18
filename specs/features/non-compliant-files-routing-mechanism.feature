@non-compliant-files-routing-mechanism
Feature: non-compliant-files-routing-mechanism
    As a admin I need to validate the routing mechanism for non-compliant files in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        And I have navigated to the Current Policy page

    @smoke
    Scenario: The default routing option for unprocessable and blocked files is accurate
        Given I am a new user
        And I have navigated to the Current Policy page
        Then I see the default set routing option for unprocessable files as ''
        Then I see the default set routing option for blocked files as ''


    @smoke
    @TEST-158_159
    Scenario Outline: I can only update the non-compliant routes API URL with a valid one
        When I enter a valid URL '<url>' into the API URL box
        And I click save
        Then the API URL is updated and the validation message '<message>' is displayed
        Examples:
            | url                      | message |
            | glasswallsolutions.com   | success |
            | invalidurl               | error   |

    @smoke
    @TEST-183
    Scenario Outline: I can change the outcome of unprocessable files
        When I change the route for unprocessable files to '<routeOption>' and save
        Then the route selection for unprocessable files is applied as '<updatedRouteOption>'
        Examples:
            | routeOption | updatedRouteOption |
            | Relay       | Relay              |
            | Block       | Block              |
            | Refer       | Refer              |

    @smoke
    @TEST-187
    Scenario Outline: I can change the outcome of Glasswall Blocked files
        When I change the route for blocked files to '<routeOption>' and save
        Then the route selection for blocked files is applied as '<updatedRouteOption>'
        Examples:
            | routeOption | updatedRouteOption |
            | Relay       | Relay              |
            | Block       | Block              |
            | Refer       | Refer              |

    @smoke
    @TEST-233
    Scenario Outline: A set routing policy for Glasswall blocked files is correctly applied
        Given I have set the routing option for Glasswall Blocked files to '<blockedPolicyAction>'
        And the non-compliant file service has been defined as '<NcfsDecision>'
        When I submit a non compliant file '<file>' through the icap server
        And the file outcome status is blocked
        Then the response code received is '<responseCode>'
        And the file outcome for the submitted file is '<fileOutcome>'
        Examples:
            | blockedPolicyAction | NcfsDecision | file                                | responseCode | fileOutcome        |
            | Relay               | NA           | src/data/input/types/safe_file.xlsx | 204          | Unmodified         |
            | Block               | NA           | src/data/input/file2.pdf            | 403          | HtmlReport         |
#            | Refer               | relay        | file | 204          | Unmodified         |
#            | Refer               | replace      | file | ''           | alternativeContent |
#            | Refer               | block        | file | 403          | HtmlReport         |

    @smoke
    @TEST-234
    Scenario Outline: A set routing policy for unprocessable files is correctly applied
        Given I have set the routing option for unprocessable files to '<fileTypePolicyAction>'
        And the non-compliant file service has been defined as '<NcfsDecision>'
        When I submit a unprocessable file '<file>' through the icap server
        Then the response code received is '<responseCode>'
        And the file outcome for the submitted file is '<fileOutcome>'
        Examples:
            | fileTypePolicyAction | NcfsDecision | file | responseCode | fileOutcome        |
            | Relay                | NA           | file | 204          | Unmodified         |
            | Block                | NA           | file | 403          | HtmlReport         |
            # | Refer                | relay        | file | 204          | Unmodified         |
            # | Refer                | replace      | file | ''           | alternativeContent |
            # | Refer                | block        | file | 403          | HtmlReport         |


