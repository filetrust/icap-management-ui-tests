'use strict';
const homePage = require("../pages/home.page.js");
const loginPage = require("../pages/login.page.js");
const policyPage = require("../pages/policy.page.js");
const filedropPage = require("../pages/file-drop.page.js");
const { output } = require("codeceptjs");
const I = actor();


module.exports = function() {
  return actor({
    onLoginPage: function () {
        //this.amOnPage('http://localhost:8080/')
      //this.amOnPage('http://management-ui.northeurope.cloudapp.azure.com')
      this.amOnPage(`http://management-ui-qa.uksouth.cloudapp.azure.com`)
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

  goToDraftAdaptationPolicy: function () {
      policyPage.clickDraftTab();
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

  sendFileICAP: async function (fileName, inputDir, outputDir) {
    const inputPath = `${process.cwd()}/${inputDir}`
    const outputPath = `${process.cwd()}/${outputDir}`
    const logsName = `${outputDir}dockerLogs.log`
    const icapClient = 'icap-client-main.uksouth.cloudapp.azure.com'
    // use NodeJS child process to run a bash command in sync way
    // create a file for logs
    const cp = require('child_process')
    const fs = require('fs')
    await I.cleanupFile(`${logsName}`);
    await I.createFile(`${logsName}`)
    // run icap client in docker
    output.print('Sending file...')
    await cp.execSync(`docker run --name=qa-icap-client --rm -v ${inputPath}:/opt -v ${outputPath}:/home glasswallsolutions/c-icap-client:manual-v1 -s 'gw_rebuild' -i ${icapClient} -f '/opt/${fileName}' -o /home/${fileName} -v &> ${logsName}`)
    output.print('File is sent...')
    // read logs from file
    let logsOutput = fs.readFileSync(`${logsName}`);
    // get file id from logs
    let fileId = logsOutput
        .toString()
        .split('X-Adaptation-File-Id: ')[1]
        .split("\n")[0];
    return fileId;
  },
  });
}
