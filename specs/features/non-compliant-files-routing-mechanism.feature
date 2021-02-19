@non-compliant-files-routing-mechanism
Feature: non-compliant-files-routing-mechanism
  As a admin I need to validate the routing mechanism for non-compliant files in order to confirm that the solution works as expected

  Background:
    Given I am logged into the ui
    And I have navigated to the Draft NCFS Policy page

  # @success
  # @prototype
  # @TEST-238
  # Scenario: The default routing option for unprocessable and blocked files is accurate
  #   Given I am a new user
  #   And I have navigated to the Current NCFS Policy page
  #   Then I see the default set routing option for unprocessable files as ''
  #   Then I see the default set routing option for blocked files as ''

  @portal
  @functional
  @TEST-158
  Scenario Outline: User can update the non-compliant routes API URL
    When I enter a valid URL '<url>' into the API URL box and save
    And I publish the policy
    Then the API URL is updated to the new url '<url>'
    Examples:
      | url                                       |
      | icap-client-qa.uksouth.cloudapp.azure.com |

  @portal
  @functional
  @TEST-183
  Scenario Outline: User can change the outcome of unprocessable files
    When I change the route for unprocessable files to '<routeOption>' and save
    Then the route selection for unprocessable files is applied as '<updatedRouteOption>'
    Examples:
      | routeOption                  | updatedRouteOption |
      | relay-unprocessableFileTypes | Relay              |

  @portal
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
    Given The file '<file>' is not in download folder
    And I have set the routing option for Glasswall Blocked files to '<policyAction>'
    And I set the policy for file type '<fileType>' to '<contentFlag>' and '<flagType>'
    When I submit a non compliant file '<file>' through the icap server
    Then The file outcome for the submitted file '<file>' is '<fileOutcome>' with '<outcomeValue>'
    Examples:
      | policyAction                | fileType | contentFlag        | flagType | file       | fileOutcome | outcomeValue      |
      | relay-glasswallBlockedFiles | word     | InternalHyperlinks | disallow | file1.docx | relayed     | Allowed by Policy |
      #| block-glasswallBlockedFiles | word     | InternalHyperlinks | disallow | file1.docx | htmlReport  | Blocked by Policy |

  @functional
  @TEST-234
  Scenario Outline: A set routing policy for unprocessable files is correctly applied to submitted files
    Given The file '<file>' is not in download folder
    And I have set the routing option for unprocessable files to '<policyAction>'
    When I submit a non supported or unprocessable file '<file>' through the icap server
    Then The file outcome for the submitted file '<file>' is '<fileOutcome>' with '<outcomeValue>'
    Examples:
      | policyAction                 | file                  | fileOutcome | outcomeValue      |
      | relay-glasswallBlockedFiles  | structuralIssues.xlsx | relayed     | Allowed by Policy |
      #| block-glasswallBlockedFiles  | structuralIssues.xlsx | htmlReport  | Blocked by Policy |
      #| block-unprocessableFileTypes | icaptest.ps1          | htmlReport  | Unknown           |

