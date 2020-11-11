const homePage = require("../pages/home.page.js");
const loginPage = require("../pages/login.page.js");
const policyPage = require("../pages/policy.page.js");
const filedropPage = require("../pages/file-drop.page.js");

const assert = require('assert');

const env = require('../../credentials.js');
require('dotenv').config({path: '.env'});


module.exports = function () {
    return actor({
        onLoginPage: function () {
            this.amOnPage("http://localhost:3000/");
        },

        loginNoPwd: function () {
            this.onLoginPage();
            loginPage.clickLogIn();
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
            I.seeElement(filedropPage.buttons.fileSelectButton)
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
            homePage.clickPolicy();
            policyPage.clickHistoryTab();
        },

        uploadFile: function (file) {
            this.attachFile(filedropPage.buttons.fileInput, file);
            this.waitForElement(filedropPage.buttons.viewresult, 30);
       //     this.waitForElement(filedropPage.sections.analysisReportView,30)
        },
        clickViewResultButton(){
            I.click(filedropPage.buttons.viewresult);
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
        }
    });
};
