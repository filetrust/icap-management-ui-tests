const {
    I,
    policyPage
} = inject();

Given('the user clicks on Policy History in the navigation panel', () => {
    I.goToPolicy()
    policyPage.clickOnHistoryPolicyTab()
});

When('Given I am on the Policy History page', () => {
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

// TODO Uncomment this assertion when application has more records.
Given(/^I have navigated to the Policy History page and there are more than (.*) policies in the history$/, (count) => {

    policyPage.clickOnHistoryPolicyTab()
    // policyPage.assertNumberOfRecordsOfPolicy(count)
});

When(/^Items Shown is changed to (.*)$/, (itemCount) => {
    policyPage.setItemsSelected(itemCount)
});

// TODO implement this when app has records
Then(/^up to (.*) previous policies are displayed$/, (fileCount) => {
});