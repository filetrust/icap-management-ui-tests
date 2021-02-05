const { I, policyPage, filedropPage, requesthistoryPage, sharepoint } = inject();
const faker = require('faker');
const chai = require('chai');
const expect = chai.expect;

let currentUrl = null;

let randomId = faker.random.number()
let fileId;
let resp;

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
Then(`I see the default set routing option for unprocessable files as ''`, () => {
    I.scrollTo(policyPage.blockedFileRefer);
    I.seeCheckboxIsChecked(policyPage.radiobuttons.unprocessedFileBlock);
});
Then(`I see the default set routing option for blocked files as ''`, () => {
    I.scrollTo(policyPage.blockedFileRefer);
    I.seeCheckboxIsChecked(policyPage.radiobuttons.blockedFileBlock);
});

When('I enter a valid URL {string} into the API URL box and save', (url) => {
    let id = randomId
    newUrl = url + id
    policyPage.enterTextInApiUrl(newUrl);
});

When('I publish the policy', async () => {
    await policyPage.publishPolicy();
});

Then('the API URL is updated to the new url {string}', (message) => {
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
Then('the route selection for blocked files is applied as {string}', (updatedRouteOption) => {
    policyPage.assertCheckedBlockedRadioButton(updatedRouteOption);
});
Then('the route selection for unprocessable files is applied as {string}', (updatedRouteOption) => {
    policyPage.assertCheckedUnprocessableRadioButton(updatedRouteOption);
});

Given('I have set the routing option for Glasswall Blocked files to {string}', async (blockedPolicyAction) => {
    await policyPage.setAndPublishRouteFlag(blockedPolicyAction);
});

When('I download a non compliant file {string} through the icap server', async (file) => {
    //I.setHost()
    //I.downloadFile(file)
    await I.goToSharepoint()
    I.wait(15)
    I.seeInTitle("Communication site - ui-uploads - All Documents");
    // //sharepoint.goToDocuments();
    sharepoint.selectFile(file);
    sharepoint.downloadFile()
    I.usePuppeteerTo('get response', async ({ page }) => {
        await page.on("response", async response => {
            console.log(response.headers());

            fileId = response.headers()
                .toString()
                .split('X-Adaptation-File-Id: ')[1]
                .split("\n")[0];;
            console.log('The fileId is ' + fileId)
            //response.abort()
        });
    });
});

When('I submit a non supported or unprocessable file {string} through the icap server', async (file) => {
    I.handleDownloads();
    resp = await I.submitFile(file)
});

When('I submit a non compliant file {string} through the icap server', async (file) => {
    I.handleDownloads();
    resp = await I.submitFile(file)
});

Then('The file outcome for the submitted file {string} is {string} with {string}', async (file, fileOutcome, outcomeValue) => {
    const icapCode = await I.getIcapHeaderCode(resp)
    if (fileOutcome === 'relayed') {
        if (icapCode === '204 Unmodified') {
            I.say('Success, Response code is 204 as expected')
        } else {
            I.say('Failed, Response code is ' + icapCode)
        }
    } else if (fileOutcome === 'htmlReport') {
        fileId = await I.getFileId(resp)
        const respCode = await I.getResponseCode(resp)
        if (respCode === '403 Forbidden') {
            I.say('Success, Response code is 403 as expected')
        } else {
            I.say('Failed, Response code is ' + respCode)
        }
        I.viewTransactions('1 Hour')
        await requesthistoryPage.checkFileOutcomeValueByFileId(outcomeValue, fileId, true)
    }
});

Given('I set the policy for file type {string} to {string} and {string}', async (FileType, ContentFlag, FlagType) => {
    await I.goToDraftAdaptationPolicy();
    await policyPage.setAndPublishPolicyFlag(FileType, ContentFlag, FlagType);
});



Given('I have set the routing option for unprocessable files to {string}', async (policyAction) => {
    // await policyPage.setAndPublishRouteFlag(policyAction);
});

When('I download a non supported or unprocessable file {string} through the icap server', async (file) => {
    await I.downloadFile(file)
    I.wait(5)
    //await I.goToSharepoint()
    // I.wait(5)
    // I.seeInTitle("Communication site - ui-uploads - All Documents");
    // sharepoint.selectFile(file);
    // sharepoint.downloadFile()
});

