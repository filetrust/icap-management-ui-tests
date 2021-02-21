const {
    I,
    policyPage,
} = inject();
const faker = require('faker');

let selectedEl = null;
let randomId = faker.random.number()

Given('I am logged into the portal', () => {
    I.login()
});

Given('I am on the policy screen', () => {
    I.goToContentManagementPolicy();
});

Given('I am on the draft adaptation Policy screen', () => {
    I.goToDraftAdaptationPolicy()
    //pause()
});

/*
* T213
* ***************************************************************
*/
Given('the current policy for {string} is set to {string} and {string}', async (FileType, ContentFlag, CurrentFlagType) => {
    await policyPage.setAndPublishPolicyFlag(FileType, ContentFlag, CurrentFlagType);
    selectedEl = await policyPage.getFlagElement(FileType, ContentFlag, CurrentFlagType)
});

When('I change the contentFlag for {string} to {string} and {string}', async (FileType, ContentFlag, FlagType) => {
    await policyPage.setPolicyFlag(FileType, ContentFlag, FlagType);
});

When('I press the Cancel button', () => {
    policyPage.clickCancelChanges()
});

Then('the current policy is not updated', () => {
    policyPage.assertCurrentFlagIs(selectedEl)
});

/*
* T214
* ***************************************************************
*/
When('I press the Save button', () => {
    policyPage.clickSaveChanges()
});

Then('the draft policy for {string} is saved as {string} and {string}', (FileType, ContentFlag, DraftFlagType) => {
    policyPage.assertDraftFlagAs(FileType, ContentFlag, DraftFlagType)
});

/*
* T215
* ***************************************************************
*/
When('I change all the flags to {string} on policy page', () => {
    //I.setFlags()
    policyPage.clickAllFlag()
    policyPage.clickSaveChanges()
});

Then('All the flags are set to {string}', (flagType) => {
    policyPage.assertSanitiseForAllFlag(flagType)
});

/*
* T239
* ***************************************************************
*/
When('I click the delete button and confirm delete action on the pop up', () => {
    policyPage.deletePolicy()
});

Then('The policy flag is set as {string} {string} and {string}', (FileType, ContentFlag, CurrentFlagType) => {
    policyPage.assertCurrentFlagAs(FileType, ContentFlag, CurrentFlagType)
});

/*
* T240
* ***************************************************************
*/
When('I save and publish', async () => {
    policyPage.clickSaveChanges();
    await policyPage.publishPolicy();
});

Then('The current policy flag is set as {string} {string} and {string}', (FileType, ContentFlag, DraftFlagType) => {
    policyPage.assertCurrentFlagAs(FileType, ContentFlag, DraftFlagType)
});

/*
* T213
* ***************************************************************
*/
Then('the current policy for {string} is saved as {string} and {string}', (FileType, ContentFlag, DraftFlagType) => {
    policyPage.assertDraftFlagAs(FileType, ContentFlag, DraftFlagType)
});

/*
* T241
* ***************************************************************
*/
Given('the current NCFS policy url is {string}', async (url) => {
    await I.goToDraftNcfsPolicy();
    await policyPage.updateUrlIfNeeded(url);
});

When('I update the contentFlag for {string} to {string} and {string}', async (FileType, ContentFlag, FlagType) => {
    await policyPage.setAndPublishPolicyFlag(FileType, ContentFlag, FlagType);
});


When('I have updated the NCFS policy url with {string}', async (url) => {
    await I.goToDraftNcfsPolicy();
    let id = randomId
    newUrl = url + id
    policyPage.enterTextInApiUrl(newUrl);
    I.wait(5)
});

Then('the current policy is updated with the new settings {string}, {string}, {string}, and {string}', (FileType, ContentFlag, FlagType, url) => {
    url = newUrl
    I.goToCurrentNcfsPolicy()
    I.seeInField(policyPage.fields.apiUrlInput, url);
    policyPage.goToCurrentAdaptationPolicy()
    policyPage.assertCurrentFlagAs(FileType, ContentFlag, FlagType)
});
