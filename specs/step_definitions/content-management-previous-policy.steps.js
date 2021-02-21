const { output } = require('codeceptjs');

const { I, policyPage, modal } = inject();
Given('I have navigated to the Policy History page', () => {
    I.goToContentManagementPolicy();
    I.goToPolicyHistory();
});

When('I click activate on a previous policy', () => {
    policyPage.clickActivateFirstPolicy()
});

When('I confirm publish action', () => {
    modal.acceptActivate();
});

When('I click view on a previous policy', () => {
    policyPage.clickViewFirstPolicy()
});

Then('the previous Policy is displayed', () => {
    I.seeElement(modal.root)
});


Then('the current policy is updated with the previous Policy', async () => {
    const history_timestamp = await policyPage.getPolicyHistoryTimeStamp(1, 1);
    I.goToCurrentAdaptationPolicy();
    const current_timestamp = await policyPage.getCurrentPolicyTimeStamp();
    output.print(current_timestamp)
    policyPage.checkPreviousPolicyApplied(current_timestamp, history_timestamp)
});

