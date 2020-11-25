@content-management-policy-editing
Feature: Content Management Policy Editing

  As a admin I need to validate that policy content flags can be edited in order to confirm that the solution works as expected

  Background:
    Given I am logged into the portal
    Given I am on current policy screen

  @success
  @functional
  @smoke
  @TEST-213
  Scenario Outline: A user can cancel any updates that they have done to the policy by pressing cancel
    When I change one of the <ContentFlags> for required file types <FileType> to <ChangedFlagType>
    And I press the Cancel button
    Then The <ContentFlags> for file types <FileType> defaults to <CurrentFlagType>
    Examples:
      | FileType | ContentFlags  | CurrentFlagType | ChangedFlagType |
      | word     | embeddedFiles | disallow        | sanitise        |

  @success
  @functional
  @smoke
  @TEST-214
  Scenario Outline: I can edit policy content flags
    When I change one of the <ContentFlags> for required file types <FileType> to <FlagType>
    And I press the Save button
    Then The <ContentFlags> for required file types <FileType> is set to <FlagType>
    Examples:
      | FileType | ContentFlags       | FlagType |
      | word     | embeddedFiles      | sanitise |
      | excel    | externalHyperlinks | disallow |

  @success
  @functional
  @smoke
  @TEST-215
  Scenario Outline: A user is able to change all content flags for all file type in policy page
    When I change all the flag for <FileType> to <FlagType> on policy page
    Then All flags of the <FileType> is changed to <FlagType>
    Examples:
      | FileType | FlagType |
      | word     | sanitise |
      | pdf      | disallow |

  @TEST-216
  Scenario: The default Current Policy set is Sanitise
  #    Then I see all content flags set to Sanitise

  @TEST-
  Scenario: I can delete a draft policy
    Given i am on the adaptation Policy screen
    When i click the delete button
    And i confirm delete action on the pop up
    Then the Adaptation draft policy is replaced with the Current Adaptation Policy
    And the NCFS draft policy is replaced with the current NCFS policy

  @TEST-
  Scenario Outline: I can publish a draft Adaptation Policy policy
    Given i am on the adaptation Policy screen
    And i change and save one of the <ContentFlags> for required file types <FileType> to <FlagType>
    When i click Publish and confirm publish action on the confirmation popup
    Then the current policy is updated with the updated policy settings as <ContentFlags> for <FileType> to <FlagType>
    Examples:
      | FileType | ContentFlags  | FlagType |
      | word     | embeddedFiles | sanitise |


  @TEST-
  Scenario Outline: I can publish a draft Adaptation Policy policy
    Given i have updated the NCFS policy with options <blockedPolicyAction> and <NcfsDecision>
    And i have updated the Adaptation policy with <ContentFlags> for file type <FileType> to <FlagType>
    When i click Publish and confirm publish action on the confirmation popup
    Then the current policy is updated for both policies with the new settings <ContentFlags>, <FileType>, <FlagType>, <blockedPolicyAction> and <NcfsDecision>
    Examples:
      | FileType | ContentFlags  | FlagType | blockedPolicyAction | NcfsDecision |
      | word     | embeddedFiles | sanitise | Block               | Relay        |

