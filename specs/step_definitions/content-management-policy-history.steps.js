const {
    I,
    policyPage
} = inject();

let availablePolicyRecords;

Then('I am taken to the Policy History page', () => {
    policyPage.assertHistoryPolicyPage()
});

Then('the previous policy can now be located in the "Policy history" page', () => {
    policyPage.clickOnHistoryPolicyTab()
});

Given('I have navigated to the Policy History page', () => {
    I.goToContentManagementPolicy();
    I.goToPolicyHistory();
});

When('Items Shown is changed to {string}', (itemCount) => {
    policyPage.selectCountOfPolicies(itemCount);
    I.wait(3)
});

Then('Up to {int} previous policies are displayed', async (rowCount) => {
    //availablePolicyRecords = policyPage.getTotalNumberOfRecordsOfPolicy()
    await policyPage.isRecordCountAccurate(rowCount)
});