const { I, policyPage, requesthistoryPage, icapclient } = inject();
const { assert } = require('chai');
const faker = require('faker');
const chai = require('chai');
const expect = chai.expect;

let randomId = faker.random.number();
let fileId;
let resp;
let newUrl;

Given('I have navigated to the Draft NCFS Policy page',() => {
    I.goToContentManagementPolicy();
    I.goToDraftNcfsPolicy();
});

Given('I am on the reference NCFS screen',() => {
    I.goToDraftReferenceNcfsPolicy();
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
    I.goToCurrentNcfsPolicy()
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

Given('I have set a valid API Url {string} with the routing option to {string}', async (api, policyAction) => {
    await policyPage.setNewApiUrl(api)
    await policyPage.setAndPublishRouteFlag(policyAction);
});

When('I set the Reference NCFS action to {string}', async (ncfsAction) => {
    I.goToDraftReferenceNcfsPolicy();
    await policyPage.setAndPublishReferenceNcfsFlag(ncfsAction);
});

When('I submit a non supported file {string} through the icap server', (file) => {
    resp = icapclient.submitFile(file)
});

When('I submit a non compliant file {string} through the icap server', (file) => {
    resp = icapclient.submitFile(file)
});

Then('The file outcome for the submitted file {string} is {string} with {string}', async (file, fileOutcome, outcomeValue) => {
    const outputPath = `./src/data/fileOutput`;
    const icapCode = icapclient.getIcapHeaderCode(resp)
    if (fileOutcome === 'relayed') {
        if (icapCode === '204 Unmodified') {
            console.log('Success, Response code is 204 as expected')
            I.confirmFileiSNotAvailable(`${outputPath}/${file}`)
        } else {
            assert.fail(`Failed, Response code is ${icapCode}; Expected: 204 Unmodified`)
        }
    } else if (fileOutcome === 'htmlReport') {
        fileId = icapclient.getFileId(resp)
        const respCode = icapclient.getResponseCode(resp)
        if (respCode === '403 Forbidden') {
            console.log('Success, Response code is 403 as expected')
        } else {
            assert.fail(`Failed, Response code is ${respCode}; Expected: 403 Forbidden`)
        } 
        const htmlHeader = icapclient.getHtmlReportHeader(`${outputPath}/${file}`)
        //const htmlMsg = icapclient.getHtmlReportMessage(`${outputPath}/${file}`)
        console.log(`Html Header: ${htmlHeader}` )
        expect(htmlHeader).to.equal('Document Access Blocked due to Policy') 
        //console.log(`Html Header: ${htmlMsg}` )
        //expect(htmlMsg).to.equal('The file does not comply with the current policy') 
        I.viewTransactions('1 Hour')
        await requesthistoryPage.checkFileOutcomeValueByFileId(outcomeValue, fileId, true)
    }
});

Given('I set the policy for file type {string} to {string} and {string}', async (FileType, ContentFlag, FlagType) => {
    I.goToDraftAdaptationPolicy();
    await policyPage.setAndPublishPolicyFlag(FileType, ContentFlag, FlagType);
});

Given('I have set the routing option for unprocessable files to {string}', async (policyAction) => {
    await policyPage.setAndPublishRouteFlag(policyAction);
});

