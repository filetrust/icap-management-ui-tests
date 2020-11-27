@content-management-policy-editing
Feature: Content Management Policy Editing

  As a admin I need to validate that policy content flags can be edited in order to confirm that the solution works as expected

  Background:
    Given I am logged into the portal
    Given I am on the policy screen


  @TEST-213
  Scenario Outline: I can cancel any updates done to the draft policy
    Given I am on draft Adaptation policy screen
    And the current policy for '<FileType>' is set to '<ContentFlag>' and '<CurrentFlagType>'
    When I change the contentFlag '<ContentFlag>' for '<FileType>' to '<DraftFlagType>'
    And I press the Cancel button
    Then The contentFlag '<ContentFlag>' for '<FileType>' remains '<CurrentFlagType>'
    Examples:
      | FileType | ContentFlag   | DraftFlagType | CurrentFlagType |
      | word     | EmbeddedFiles | disallow      | sanitise        |


  @TEST-214
  Scenario Outline: I can edit policy content flags
    Given I am on draft Adaptation policy screen
    When I change one of the contentFlags '<ContentFlag>' for required file types '<FileType>' to '<FlagType>'
    And I press the Save button
    Then The contentFlag '<ContentFlag>' for required file types '<FileType>' is set to '<FlagType>'
    Examples:
      | FileType | ContentFlag        | FlagType |
      | word     | EmbeddedFiles      | sanitise |
      | excel    | ExternalHyperlinks | disallow |


  @TEST-215
  Scenario Outline: A user is able to change all content flags for all file type in policy page
    When I change all the flag for '<FileType>' to '<FlagType>' on policy page
    Then All flags of the '<FileType>' is changed to '<FlagType>'
    Examples:
      | FileType | FlagType |
      | word     | sanitise |
      | pdf      | disallow |


  @TEST-216
  Scenario: The default Current Policy set is Sanitise
  #    Then I see all content flags set to Sanitise

  @TEST-239
  Scenario: I can delete a draft policy
    Given I am on the adaptation Policy screen
    When I click the delete button
    And I confirm delete action on the pop up
    Then the Adaptation draft policy is replaced with the Current Adaptation Policy
    And the NCFS draft policy is replaced with the current NCFS policy

  @TEST-240
  Scenario Outline: I can publish a draft Adaptation Policy
    Given I am on the adaptation Policy screen
    And I change and save one of the '<ContentFlag>' for required file types '<FileType>' to '<FlagType>'
    When I click Publish and confirm publish action on the confirmation popup
    Then the current policy is updated with the updated policy settings as '<ContentFlag>' for '<FileType>' to '<FlagType>'
    Examples:
      | FileType | ContentFlag   | FlagType |
      | word     | EmbeddedFiles | sanitise |


  @TEST-241
  Scenario Outline: I can update and publish both Adaptation and NCFS policies at the same time
    Given i have updated the NCFS policy with options '<blockedPolicyAction>' and '<NcfsDecision>'
    And i have updated the Adaptation policy with '<ContentFlag>' for file type '<FileType>' to '<FlagType>'
    When i click Publish and confirm publish action on the confirmation popup
    Then the current policy is updated for both policies with the new settings '<ContentFlag>', '<FileType>', '<FlagType>', '<blockedPolicyAction>' and '<NcfsDecision>'
    Examples:
      | FileType | ContentFlag   | FlagType | blockedPolicyAction | NcfsDecision |
      | word     | EmbeddedFiles | sanitise | Block               | Relay        |

