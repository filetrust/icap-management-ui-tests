@non-compliant-files-routing-mechanism
Feature: non-compliant-files-routing-mechanism
  As a admin I need to validate the routing mechanism for non-compliant files in order to confirm that the solution works as expected

  Background:
    Given I am logged into the ui
    And I have navigated to the Draft NCFS Policy page

  @success
  @prototype
  @TEST-238
  Scenario: The default routing option for unprocessable and blocked files is accurate
    Given I am a new user
    And I have navigated to the Current NCFS Policy page
    Then I see the default set routing option for unprocessable files as ''
    Then I see the default set routing option for blocked files as ''


  @functional
  @TEST-158
  Scenario Outline: User can update the non-compliant routes API URL
    When I enter a valid URL '<url>' into the API URL box and save
    And I publish the policy
    Then the API URL is updated to the new url '<url>'
    Examples:
      | url                                       |
      | icap-client-qa.uksouth.cloudapp.azure.com |

  @functional
  @TEST-183
  Scenario Outline: User can change the outcome of unprocessable files
    When I change the route for unprocessable files to '<routeOption>' and save
    Then the route selection for unprocessable files is applied as '<updatedRouteOption>'
    Examples:
      | routeOption                  | updatedRouteOption |
      | relay-unprocessableFileTypes | Relay              |


  @functional
  @TEST-187
  Scenario Outline: User can change the outcome of Glasswall Blocked files
    When I change the route for blocked files to '<routeOption>' and save
    Then the route selection for blocked files is applied as '<updatedRouteOption>'
    Examples:
      | routeOption                 | updatedRouteOption |
      | block-glasswallBlockedFiles | Block              |


  @functional
  @TEST-233
  Scenario Outline: A set routing policy for Glasswall blocked files is correctly applied to submitted files
    Given I have set the routing option for Glasswall Blocked files to '<blockedPolicyAction>'
    And I set the policy for file type '<fileType>' to '<contentFlag>' and '<flagType>'
    When I download a non compliant file '<file>' through the icap server
    Then the file outcome for the submitted file '<file>' is '<fileOutcome>'
    Examples:
      | blockedPolicyAction         | fileType | contentFlag   | flagType | file        | fileOutcome |
      | relay-glasswallBlockedFiles | word     | EmbeddedFiles | disallow | issues.docx | relayed     |
  #| block-glasswallBlockedFiles | png      | EmbeddedFiles | disallow | Clean.png   | htmlReport |


  @functional
  @TEST-234
  Scenario Outline: A set routing policy for unprocessable files is correctly applied to submitted files
    Given I have set the routing option for unprocessable files to '<policyAction>'
    When I submit a non supported or unprocessable file '<file>' through the icap server
    Then The file '<file>' processing outcome is as expected '<fileOutcome>' and '<outcomeValue>'
    Examples:
      | policyAction                 | file                  | fileOutcome | outcomeValue      |
      #| relay-unprocessableFileTypes | structuralIssues.xlsx | relayed     | Allowed by Policy |
      | block-unprocessableFileTypes | icaptest.ps1          | htmlReport  | Blocked by Policy |

