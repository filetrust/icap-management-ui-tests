const {
    I,
    policyPage
} = inject();

let availablePolicyRecords;

Given('I am on the Policy History page', () => {
    policyPage.clickOnHistoryPolicyTab()
});

Then('I am taken to the Policy History page', () => {
    policyPage.assertHistoryPolicyPage()
});

Then('the previous policy can now be located in the "Policy history" page', () => {
    policyPage.clickOnHistoryPolicyTab()
});

Then('the user is taken to the Policy History page', () => {
    policyPage.assertHistoryPolicyPage()
});

Given('I have navigated to the Policy History page', () => {
    policyPage.clickOnHistoryPolicyTab()
});

When(/^Items Shown is changed to (.*)$/, (itemCount) => {
    availablePolicyRecords = policyPage.getTotalNumberOfRecordsOfPolicy()
    policyPage.selectCountOfPolicies(itemCount)
});

Then('Up to {int} previous policies are displayed', (itemCount) => {
    policyPage.assertPoliciesItemShownCount(itemCount, availablePolicyRecords)
});