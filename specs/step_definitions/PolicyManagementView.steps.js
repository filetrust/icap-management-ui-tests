const {
    I,
    env,
    policyPage
} = inject();

/*****************************************
 * Navigation
 ******************************************/
Given('the user has logged into the ui', () => {
    I.loginAs(env.qa.url, env.qa.email, env.qa.password)
    I.wait(2)
});

Given('I am on policy screen', () => {
    I.goToPolicy()
    I.wait(2)
});

When('the user change all the flag for world to sanitise on policy page', () => {
    policyPage.clickSanitiseForAllFlagForDoc("word")
    policyPage.clickSaveChanges()
});

When('the user change all the flag for world to sanitise on policy page without saving', () => {
    policyPage.clickSanitiseForAllFlagForDoc("word")
});

Then('all flags of the world is changed to sanitise', () => {
    // policyPage.assertSanitiseForAllFlagForDoc("word")
});

When('the user change all the flag for world to disallow on policy page', () => {
    policyPage.clickDisallowForAllFlagForDoc("word")
    policyPage.clickSaveChanges()
});

Then('all flags of the world is changed to disallow', () => {
    // policyPage.assertDisallowForAllFlagForDoc("word")
});

When('the user change all the flag for excel to sanitise on policy page', () => {
    policyPage.clickSanitiseForAllFlagForDoc("excel")
    policyPage.clickSaveChanges()
});

Then('all flags of the excel is changed to sanitise', () => {
    // policyPage.assertSanitiseForAllFlagForDoc("excel")
});

When('the user change all the flag for excel to disallow on policy page', () => {
    policyPage.clickDisallowForAllFlagForDoc("excel")
    policyPage.clickSaveChanges()
});

Then('all flags of the excel is changed to disallow', () => {
    // policyPage.assertDisallowForAllFlagForDoc("excel")
});

When('the user change all the flag for powerpoint to sanitise on policy page', () => {
    policyPage.clickSanitiseForAllFlagForDoc("powerpoint")
    policyPage.clickSaveChanges()
});

Then('all flags of the powerpoint is changed to sanitise', () => {
    // policyPage.assertSanitiseForAllFlagForDoc("powerpoint")
});

When('the user change all the flag for powerpoint to disallow on policy page', () => {
    policyPage.clickDisallowForAllFlagForDoc("powerpoint")
    policyPage.clickSaveChanges()
});

Then('all flags of the powerpoint is changed to disallow', () => {
    // policyPage.assertDisallowForAllFlagForDoc("powerpoint")
});

When('the user change all the flag for pdf to sanitise on policy page', () => {
    policyPage.clickSanitiseForAllFlagForDoc("pdf")
    policyPage.clickSaveChanges()
});

Then('all flags of the pdf is changed to sanitise', () => {
    // policyPage.assertSanitiseForAllFlagForDoc("pdf")
});

When('the user change all the flag for pdf to disallow on policy page', () => {
    policyPage.clickDisallowForAllFlagForDoc("pdf")
    policyPage.clickSaveChanges()
});

Then('all flags of the pdf is changed to disallow', () => {
    // policyPage.assertDisallowForAllFlagForDoc("pdf")
});

When('the user clicks on Current Policy in the navigation panel', () => {
    I.goToPolicy()
    I.wait(1)
    policyPage.clickOnCurrentPolicyTab()
});

Then('the user is taken to the current policy page', () => {
    policyPage.assertCurrentPolicyPage()
});

Given('the user clicks on Policy History in the navigation panel', () => {
    I.goToPolicy()
    I.wait(1)
    policyPage.clickOnHistoryPolicyTab()
});

Given('I clicks on Policy History tab', () => {
    policyPage.clickOnHistoryPolicyTab()
});

Then('the user is taken to the Policy History page', () => {
    policyPage.assertHistoryPolicyPage()
});

Then('the previous policy can now be located in the "Policy history" page', () => {
    policyPage.clickOnHistoryPolicyTab()
});

When('the user presses the Cancel button', () => {
    policyPage.clickCancelChanges()
});

Then('the user is taken to the Policy History page', () => {
    policyPage.assertHistoryPolicyPage()
});

When('user click the delete button', () => {
    policyPage.clickDeleteApiUrl()
});

When('I have entered an invalid URL into the "API URL" box', () => {
    policyPage.enterTextInApiUrl("INVALID TEXT")
});

When('I have entered an valid URL into the "API URL" box', () => {
    policyPage.enterTextInApiUrl("validsolutions.com")
});

When('the save button is selected', () => {
    policyPage.clickSaveApiUrl()
});

When('the activate button is clicked', () => {
    policyPage.clickActivate()
});

When('I click view', () => {
    policyPage.clickView()
});

Then('the previous Policy is displayed', () => {
    policyPage.assertNumberOfOpenTab(2)
});





