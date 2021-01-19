const {I, policyPage, filedropPage, sharepoint}= inject();
const faker = require('faker');
let currentUrl = null;

let randomId = faker.random.number()

Given('I have navigated to the Draft NCFS Policy page', async () => {
    I.goToContentManagementPolicy();
    I.goToDraftNcfsPolicy();

});
Given('I am a new user', () => {
  //  I.loginNoPwd();
});
Given('I have navigated to the Current NCFS Policy page', async () => {
    await I.goToCurrentNcfsPolicy()
});
Then(`I see the default set routing option for unprocessable files as ''`,  () =>{
    I.scrollTo(policyPage.blockedFileRefer);
    I.dontSeeCheckboxIsChecked(policyPage.radiobuttons.unprocessedFileBlock);
    I.dontSeeCheckboxIsChecked(policyPage.radiobuttons.unprocessedFileRelay);
    I.dontSeeCheckboxIsChecked(policyPage.radiobuttons.unprocessedFileRefer);
});
Then(`I see the default set routing option for blocked files as ''`,  () => {
    I.scrollTo(policyPage.blockedFileRefer);
    I.dontSeeCheckboxIsChecked(policyPage.radiobuttons.blockedFileBlock);
    I.dontSeeCheckboxIsChecked(policyPage.radiobuttons.blockedFileRefer);
    I.dontSeeCheckboxIsChecked(policyPage.radiobuttons.blockedFileRelay);
});

When('I enter a valid URL {string} into the API URL box and save',  (url) =>{
    let id = randomId
    newUrl= url+id
    policyPage.enterTextInApiUrl(newUrl);
});

When('I publish the policy', async () => {
    await policyPage.publishPolicy();
});

Then('the API URL is updated to the new url {string}',  (message) => {
    I.goToCurrentNcfsPolicy()
    url = newUrl
    I.seeInField(policyPage.fields.apiUrlInput, url);

});
When('I change the route for blocked files to {string} and save', async (routeOption) => {
    await policyPage.setRouteFlag(routeOption);

});
When('I change the route for unprocessable files to {string} and save', async (routeOption) => {
   await policyPage.setRouteFlag(routeOption);
});
Then('the route selection for blocked files is applied as {string}',  (updatedRouteOption) => {
    policyPage.assertCheckedBlockedRadioButton(updatedRouteOption);
});
Then('the route selection for unprocessable files is applied as {string}',  (updatedRouteOption) => {
  policyPage.assertCheckedUnprocessableRadioButton(updatedRouteOption);
});

Given('I have set the routing option for Glasswall Blocked files to {string}', async (blockedPolicyAction) => {
    await policyPage.setAndPublishRouteFlag(blockedPolicyAction);
});

When('I download a non compliant file {string} through the icap server', async (file) => {
I.setHost()
 await I.goToSharepoint()
 I.wait(5)
 I.seeInTitle("Communication site - ui-uploads - All Documents");
 //sharepoint.goToDocuments();
 sharepoint.selectFile(file);
 sharepoint.downloadFile()
 
});

When('I submit a non supported or unprocessable file {string} through the icap server', (file) => {
   I.handleDownloads();
   I.processFile(file.trim());
   });

Given('I set the policy for file type {string} to {string} and {string}', async (FileType, ContentFlag, FlagType) => {
    I.goToDraftAdaptationPolicy();
    await policyPage.setAndPublishPolicyFlag(FileType, ContentFlag, FlagType);
});

Then('the response code received is {string}', (responseCode) => {
    

});
Then('the file outcome for the submitted file {string} is {string}', (file, fileOutcome) => {
    if (fileOutcome === 'relayed') {
        const filePath = `output/downloads/${file.trim()}`
        I.checkFileInFileDropUrl(filePath)
        I.dontSee('File is clean')
        I.say('The file is relayed unprocessed as expected')
    } else if (fileOutcome === 'htmlReport') {
      sharepoint.checkIfHtmlReportReturned()
    }
});
Given('I have set the routing option for unprocessable files to {string}', async (policyAction) => {
    await policyPage.setAndPublishRouteFlag(policyAction);
});
When('I download a non supported or unprocessable file {string} through the icap server', async (file) => {
await I.goToSharepoint()
 I.wait(5)
 I.seeInTitle("Communication site - ui-uploads - All Documents");
 //sharepoint.goToDocuments();
 sharepoint.selectFile(file);
 sharepoint.downloadFile()
});
