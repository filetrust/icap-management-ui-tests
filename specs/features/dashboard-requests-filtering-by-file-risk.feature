@dashboard-requests-filtering-by-file-risk
Feature: dashboard-requests-filtering-by-file-risk
    As a admin I need to validate file requests filtering by risk in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui
        And I have navigated to the analytics page

    @prototype
    @TEST-192
    @Fail-App
    #Assertion error (filtered risks displayed)
    Scenario Outline: I can filter the risk legend
        When I tick select from the '<chart>' legend a file risk '<fileRisk>'
        Then the '<chart>' is updated to only show the filtered risk '<filteredRisk>'
        Examples:
            | chart      | fileRisk          | filteredRisk      |
            | pie        | Safe              | Safe              |
            | line graph | Allowed By NCFS   | Allowed By NCFS   |
        


