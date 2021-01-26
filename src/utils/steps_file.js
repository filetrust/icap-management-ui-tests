'use strict';
const homePage = require("../pages/home.page.js");
const loginPage = require("../pages/login.page.js");
const policyPage = require("../pages/policy.page.js");
const filedropPage = require("../pages/file-drop.page.js");
const { output } = require("codeceptjs");
const I = actor();
const assert = require('assert').strict;
const icapClient = '78.159.113.47'

module.exports = function() {
  return actor({
    onLoginPage: function () {
        //this.amOnPage('http://localhost:8080/')
      this.amOnPage('http://78.159.113.47:31829/')
      //this.amOnPage(`http://management-ui-qa.uksouth.cloudapp.azure.com`)
  },

  loginNoPwd: function () {
      this.onLoginPage();
      loginPage.clickLogIn();
      this.waitForElement(homePage.sections.menu);
  },

  login: function (email, password) {
      this.onLoginPage();
      loginPage.loginWith(email, password);
      this.waitForElement(homePage.sections.menu);
  },

  enterLoginDetails: function (user,password) {
    loginPage.loginWith(user,password);
},

  enterValidCredential: function () {
      loginPage.loginWith(env.qa.email, env.qa.password);
  },
  enterInvalidPassword: function () {
      loginPage.setPassword(faker.random.number());
  },

  goToPasswordResetPage: function () {
      this.click(loginPage.clickForgotPasswordLink());
  },

  goToAnalytics: function () {
      homePage.clickAnalytics();
  },

  goToFileDrop: function () {
      homePage.clickFileDrop();
      this.waitForElement(filedropPage.buttons.fileSelectButton)
  },

  goToUsers: function () {
      homePage.clickUsers();
  },

  goToRequestHistory: function () {
      homePage.clickRequestsHistory();
  },

  goToContentManagementPolicy: function () {
      homePage.clickPolicy();
  },

  goToPolicyHistory: function () {
      policyPage.clickHistoryTab();
  },

  goToDraftAdaptationPolicy: async function () {
      await policyPage.clickDraftTab();
     policyPage.clickAdaptationPolicy();
  },

  goToCurrentAdaptationPolicy: function () {
      policyPage.clickCurrentPolicyTab();
      policyPage.clickAdaptationPolicy();
  },

  goToDraftNcfsPolicy: async function () {
      policyPage.clickDraftTab();
      await policyPage.clickNcfsPolicy();
  },

  goToCurrentNcfsPolicy: async function () {
      policyPage.clickCurrentPolicyTab();
      await policyPage.clickNcfsPolicy();
  },

  uploadFile: function (file) {
      this.attachFile(filedropPage.buttons.fileInput, file)
      this.wait(7)
  },

  uploadSpFile: function (fileInput, file) {
    this.attachFile(fileInput, file)
    this.wait(7)
},

  checkFileInFileDrop: function (file) {
      this.loginNoPwd()
      this.goToFileDrop()
      this.uploadFile(file)
      filedropPage.clickViewResult();
  },

  checkFileInFileDropUrl: function (file) {
      this.amOnPage(`https://file-drop.co.uk/`)
      this.uploadFile(file)
      filedropPage.clickViewResult();
  },
  
  uploadFileWithNoSanitiseData: function (file) {
      this.attachFile(filedropPage.buttons.fileInput, file)
  },

  uploadFileByType: function (fileType) {
      let path = null;
      switch (fileType) {
          case ('Safe_file'):
              path = 'src/data/input/types/safe_file.xlsx';
              break;
          case ('Blocked_file'):
              path = 'src/data/input/types/blocked_file.doc';
              break;
          //todo: add file
          case ('Dangerous_file'):
              path = 'src/data/input/types/dangerous_file.doc';
              break;
          case ('Unclassified_file'):
              path = 'src/data/input/unsupported_icaptest.ps1';
              break;
          default:
              throw 'There is not such file type.'
      }
      this.uploadFile(path);
  },

  fail(message) {
      assert.fail(message);
  },

  onIcapProxyPage: function () {
      this.amOnPage("https://engineering.glasswallsolutions.com.glasswall-icap.com/docs/products/cloud-sdk/sample-files/");
      this.wait(5)
  },

  sendFileICAP: async function (fileName) {
    const cp = require('child_process')
    const fs = require('fs')
    const path = require('path');

    const inputDir = path.join('src', 'data', 'input');
    const outputDir = path.join('output', 'downloads');
    const inputPath = path.join(process.cwd(), inputDir);
    const outputPath =  path.join(process.cwd(), outputDir);
    const icapLogs = path.join('output', 'icap.log')
    
    // use NodeJS child process to run a bash command in sync way
    output.print('Sending file...')
    console.log(`Command to send the file: c-icap-client -i ${icapClient} -p 1344 -s gw_rebuild  -f "${inputPath}/${fileName}" -o "${outputPath}/${fileName}" -v 2> ${icapLogs}`)
    let fileId;
    await cp.execSync(`c-icap-client -i ${icapClient} -p 1344 -s gw_rebuild  -f "${inputPath}/${fileName}" -o "${outputPath}/${fileName}" -v 2> ${icapLogs}`).toString()
    const icapOutput = fs.readFileSync(`${icapLogs}`);
    output.print('icapLogs: '+icapOutput)
    fileId = icapOutput
        .toString()
        .split('X-Adaptation-File-Id: ')[1]
        .split("\n")[0];
    output.print('File is sent...')
    return fileId;
  },

  submitFile: async function (fileName) {
    const cp = require('child_process')
    const fs = require('fs')
    const path = require('path');
    const inputDir = path.join('src', 'data', 'input');
    const outputDir = path.join('output', 'downloads');
    const inputPath = path.join(process.cwd(), inputDir);
    const outputPath =  path.join(process.cwd(), outputDir);
    const icapLogs = path.join('output', 'icap.log')

     // icap-client-qa.uksouth.cloudapp.azure.com
    
    // use NodeJS child process to run a bash command in sync way
    output.print('Sending file...')
    console.log(`Command to send the file: c-icap-client -i ${icapClient} -p 1344  -s gw_rebuild  -f "${inputPath}/${fileName}" -o "${outputPath}/${fileName}" -v 2> ${icapLogs}`)
   
    await cp.execSync(`c-icap-client -i ${icapClient} -p 1344  -s gw_rebuild  -f "${inputPath}/${fileName}" -o "${outputPath}/${fileName}" -v 2> ${icapLogs}`).toString()
    const icapOutput = fs.readFileSync(`${icapLogs}`);
    output.print('icapLogs: '+icapOutput)
    output.print('File is sent...')
    return icapOutput;
  },

  getIcapHeaderCode: function (icapResp) {
    let icapCode = icapResp
    .toString()
    .split('ICAP/1.0 ')[1]
    .split("\n")[0];
    output.print('The icap header code is: '+ icapCode)
    return icapCode;
  },

  getResponseCode: function (icapResp) {
   let responseCode = icapResp
    .toString()
    .split('HTTP/1.0 ')[1]
    .split("\n")[0];
    output.print('The responde code is: '+ responseCode)
    return responseCode;
  },

  getFileId: function (icapResp) { 
    let fileId;
    fileId = icapResp
        .toString()
        .split('X-Adaptation-File-Id: ')[1]
        .split("\n")[0];
    output.print('The file id: '+fileId)
    return fileId;
  },

  });
}
