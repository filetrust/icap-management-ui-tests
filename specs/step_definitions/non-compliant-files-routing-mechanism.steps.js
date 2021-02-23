const { I, policyPage, requesthistoryPage, icapclient } = inject();
const { assert } = require('chai');
const faker = require('faker');

let randomId = faker.random.number();
let fileId;
let resp;
let newUrl;

Given('I have navigated to the Draft NCFS Policy page', async () => {
    I.goToContentManagementPolicy();
    await I.goToDraftNcfsPolicy();

});
Given('I am a new user', () => {
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
    newUrl = url + randomId
    policyPage.enterTextInApiUrl(newUrl);
});

When('I publish the policy', async () => {
    await policyPage.publishPolicy();
});

Then('the API URL is updated to the new url {string}', async(url) => {
    await I.goToCurrentNcfsPolicy()
    url = newUrl
    policyPage.confirmApiIsUpdated(url);
    

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

When('I submit a non supported or unprocessable file {string} through the icap server', (file) => {
    resp = icapclient.submitFile(file)
});

When('I submit a non compliant file {string} through the icap server', (file) => {
    resp = icapclient.submitFile(file)
});

Then('The file outcome for the submitted file {string} is {string} with {string}', async (file, fileOutcome, outcomeValue) => {
    const outputPath = './output/downloads'
    const icapCode = I.getIcapHeaderCode(resp)
    if (fileOutcome === 'relayed') {
        if (icapCode === '204 Unmodified') {
            console.log('Success, Response code is 204 as expected')
            I.confirmFileiSNotAvailable(`${outputPath}/${file}`)
        } else {
            assert.fail('Failed, Response code is ' + icapCode)
        }
    } else if (fileOutcome === 'htmlReport') {
        fileId = I.getFileId(resp)
        const respCode = I.getResponseCode(resp)
        if (respCode === '403 Forbidden') {
            console.log('Success, Response code is 403 as expected')
        } else {
            assert.fail('Failed, Response code is ' + respCode)
        } I.checkFileOutputIsHtmlReport(`${outputPath}/${file}`)
        I.viewTransactions('1 Hour')
        await requesthistoryPage.checkFileOutcomeValueByFileId(outcomeValue, fileId, true)
    }
});

Given('I set the policy for file type {string} to {string} and {string}', async (FileType, ContentFlag, FlagType) => {
    await I.goToDraftAdaptationPolicy();
    await policyPage.setAndPublishPolicyFlag(FileType, ContentFlag, FlagType);
});

Given('I have set the routing option for unprocessable files to {string}', async (policyAction) => {
    await policyPage.setAndPublishRouteFlag(policyAction);
});

