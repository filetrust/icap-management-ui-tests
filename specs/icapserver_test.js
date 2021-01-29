const { I, policyPage, filedropPage, requesthistoryPage, sharepoint } = inject();
const chai = require('chai');
const expect = chai.expect;

Feature('File Processing');


Scenario('I process a supported file using icap client tool for rebuild successfully', async () => {
    const file = 'issues.docx'
    const filePath = `output/downloads`
    I.handleDownloads();
    const resp = await I.submitFile(file)
    const icapCode = I.getIcapHeaderCode(resp)
    const respCode = await I.getResponseCode(resp)
    let fileId = await I.getFileId(resp)
    expect(icapCode).to.equal('200 OK')
    expect(respCode).to.equal('200 OK')
    I.say('Submitted file is sanitised as expected')
    // I.amInPath(filePath)
    // I.seeFile(file)
    // I.onLoginPage()
    // I.goToRequestHistory();
    //     requesthistoryPage.openDatePicker();
    //     requesthistoryPage.selectTimePeriod('1 Hour')
    //     await requesthistoryPage.checkFileOutcomeValueByFileId('sanitised', 'safe', fileId, true)
    
}).tag('@ip').tag('@fileprocess').tag('@functional');

Scenario('I process a non supported file using icap client tool', async () => {
    const file = 'icaptest.ps1'
    const filePath = `output/downloads`
    I.handleDownloads();
    const resp = await I.submitFile(file)
    const icapCode = I.getIcapHeaderCode(resp)
    if(icapCode === '204 Unmodified'){
    I.say('The responde is: '+icapCode)
    I.say('Submitted file is relayed')
    }else{
    const respCode = await I.getResponseCode(resp)
    //let fileId = await I.getFileId(resp)
    if (respCode === '403 Forbidden'){
        I.say('Submitted file is blocked')
    }else {
        I.say('Submitted file response is: '+respCode)
    }
}
}).tag('@ns').tag('@fileprocess').tag('@functional');