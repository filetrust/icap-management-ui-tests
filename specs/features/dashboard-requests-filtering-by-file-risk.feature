Feature: dashboard-requests-filtering-by-file-risk
    As a admin I need to validate file requests filtering by risk in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui


    @TEST-192
    Scenario Outline: I can remove file-outcomes from the filters on the charts
        Given I have navigated to the Dashboard page
        When I click on <fileOutcome> on <chart>
        Then the chart is updated to remove <fileOutcome>
        Examples:
            | chart      | fileOutcome  |
            | pie chart  | Safe         |
            | pie chart  | Blocked      |
            | pie chart  | Dangerous    |
            | pie chart  | Unclassified |
            | line graph | Safe         |
            | line graph | Blocked      |
            | line graph | Dangerous    |
            | line graph | Checked      |
            | line graph | Unclassified |

