@dashboard-requests-metrics-display
Feature: dashboard-requests-metrics-display
    As a admin I need to validate the accuracy of dashboard metrics for processed files in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        And I have navigated to the Analytics page

    @prototype
    @TEST-223
    @Fail-app
    #  Element "div[data-test-id='lineChart'] > div > div > svg" was not found by text|CSS|XPath
    Scenario Outline: User can see the count of files processed by risk updated for every file processed
        Given I have confirmed the current risks counts for '<risk>'
        When I process a '<file>' through the icap server
        Then the risk sector '<risk>' is available and shows the count updated by <increasedValue>
        Examples:
            | risk              | file             | increasedValue |
            | Safe              | safe_file.xlsx   | 1              |
            | Blocked By Policy | blocked_file.doc | 1              |
     
   
    @Fail-app
    @prototype
    @TEST-224
    #Not all steps are done because of unfinished implementation
    Scenario Outline: The count of files requests processed is updated based on processing status
        Given I have confirmed the concurrent counts of total files requests processed
        When I process a '<file>' through the icap server with an outcome as '<fileOutcome>'
        Then the Total Files processed is increased by '<TFUpdateByValue>'
        And the Total icap requests is increased by '<TRUpdateByValue>'
        And the max files per second processed is increased by '<MFUpdateByValue>'
        Examples:
            | file              | fileOutcome       | TFUpdateByValue | TRUpdateByValue | MFUpdateByValue |
            | safe_file.xlsx    | Safe              | 1               | 1               | 1               |
            | issues.docx       | Allowed By Policy | 0               | 1               | 0               |
  

#the count of maximum files processed per second is updated for processed files