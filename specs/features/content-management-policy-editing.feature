@content-management-policy-editing
Feature: Content Management Policy Editing

  As a admin I need to validate that policy content flags can be edited in order to confirm that the solution works as expected

  Background:
    Given I am logged into the portal
    And I am on the policy screen
    And I am on the draft adaptation Policy screen

  @functional
  @TEST-213
  Scenario Outline: I can cancel any updates done to the draft policy
    Given the current policy for '<FileType>' is set to '<ContentFlag>' and '<CurrentFlagType>'
    When I change the contentFlag for '<FileType>' to '<ContentFlag>' and '<DraftFlagType>'
    And I press the Cancel button
    Then the current policy is not updated
    Examples:
      | FileType   | ContentFlag | DraftFlagType | CurrentFlagType |
      | powerpoint | Metadata    | sanitise      | disallow        |


  @functional
  @TEST-214
  Scenario Outline: I can edit policy content flags
    Given the current policy for '<FileType>' is set to '<ContentFlag>' and '<CurrentFlagType>'
    When I change the contentFlag for '<FileType>' to '<ContentFlag>' and '<DraftFlagType>'
    And I press the Save button
    Then the draft policy for '<FileType>' is saved as '<ContentFlag>' and '<DraftFlagType>'
    Examples:
      | FileType | ContentFlag        | DraftFlagType | CurrentFlagType |
      | excel    | InternalHyperlinks | sanitise      | disallow        |

  @functional
  @TEST-239
  Scenario Outline: I can delete a draft policy
    Given the current policy for '<FileType>' is set to '<ContentFlag>' and '<CurrentFlagType>'
    When I change the contentFlag for '<FileType>' to '<ContentFlag>' and '<DraftFlagType>'
    And I press the Save button
    And I click the delete button and confirm delete action on the pop up
    Then the current policy is not updated
    Examples:
      | FileType | ContentFlag        | DraftFlagType | CurrentFlagType |
      | excel    | ExternalHyperlinks | sanitise      | disallow        |

  @functional
  @TEST-240
  Scenario Outline: I can publish a draft Adaptation Policy
    Given the current policy for '<FileType>' is set to '<ContentFlag>' and '<CurrentFlagType>'
    When I change the contentFlag for '<FileType>' to '<ContentFlag>' and '<DraftFlagType>'
    And I save and publish
    Then The current policy flag is set as '<FileType>' '<ContentFlag>' and '<DraftFlagType>'
    Examples:
      | FileType | ContentFlag | DraftFlagType | CurrentFlagType |
      | pdf      | Acroform    | disallow      | sanitise        |

  @functional
  @TEST-241
  Scenario Outline: I can update and publish both Adaptation and NCFS policies at the same time
    Given I am on the draft adaptation Policy screen
    And the current policy for '<FileType>' is set to '<ContentFlag>' and '<CurrentFlagType>'
    When I have updated the NCFS policy url with '<url>'
    And I am on the draft adaptation Policy screen
    And I change the contentFlag for '<FileType>' to '<ContentFlag>' and '<FlagType>'
    Then the current policy is updated with the new settings '<FileType>', '<ContentFlag>', '<FlagType>', and '<url>'
    Examples:
      | FileType | ContentFlag    | FlagType | url                                       | CurrentFlagType | CurrentUrl       |
      | word     | EmbeddedImages | sanitise | icap-client-qa.uksouth.cloudapp.azure.com | disallow        | testPrecondition |
