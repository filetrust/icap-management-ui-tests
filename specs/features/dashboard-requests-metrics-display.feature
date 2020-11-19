@dashboard-requests-metrics-display
Feature: dashboard-requests-metrics-display
    As a admin I need to validate the accuracy of dashboard metrics for processed files in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        And I have navigated to the Analytics page


    @TEST-223
    @Fail-Code
    # No Steps Matching "I have navigated to the Analytics page"
    Scenario Outline: The file risk count is updated for every file processed based on the outcome
        Given I have confirmed the current risks counts for '<risk>'
        When I process a '<file>' through the icap server
        Then the risk sector '<risk>' is available and shows the count updated by '<increasedValue>'
        Examples:
            | risk              | file             | increasedValue |
            | Safe              | safe_file.xlsx   | 1              |
            | Blocked By Policy | blocked_file.doc | 1              |
            | Allowed By Policy | issues.docx      | 1              |
    # | Allowed By NCFS   | Unclassified_file | 1              |
    # | Blocked By NCFS   | Malicious_file    | 1              |


    @TEST-224
    @Fail-Code
    # No Steps Matching "I have navigated to the Analytics page"
    Scenario Outline: The count of files requests processed is updated based on processing status
        Given I have confirmed the concurrent counts of total files requests processed
        When I process a '<file>' through the icap server with an outcome as '<fileOutcome>'
        Then the Total Files processed is increased by '<TFUpdateByValue>'
        And the Total icap requests is increased by '<TRUpdateByValue>'
        And the max files per second processed is increased by '<MFUpdateByValue>'
        Examples:
            | file              | fileOutcome       | TFUpdateByValue | TRUpdateByValue | MFUpdateByValue |
            | safe_file.xlsx    | Safe              | 1               | 1               | 1               |
            | blocked_file.doc  | Blocked By Policy | 0               | 1               | 0               |
            | issues.docx       | Allowed By Policy | 0               | 1               | 0               |
            | Unclassified_file | Unclassified      | 0               | 1               | 1               |

