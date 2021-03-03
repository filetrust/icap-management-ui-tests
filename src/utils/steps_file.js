'use strict';
const homePage = require("../pages/home.page.js");
const usersPage = require("../pages/users.page.js");
const loginPage = require("../pages/login.page.js");
const policyPage = require("../pages/policy.page.js");
const filedropPage = require("../pages/file-drop.page.js");
const requesthistoryPage = require("../pages/request-history.page.js");
const { output } = require("codeceptjs");
const I = actor();
const assert = require('assert').strict;
const fs = require('fs')
const fileDropUrl = process.env.FILEDROP_URL_NEU;

module.exports = function () {
    return actor({
        onLoginPage: function () {
            this.amOnPage(process.env.UI_URL_T02)
        },

        loginAs: function (email, password) {
            this.onLoginPage();
            loginPage.loginWith(email, password);
            this.waitForElement(homePage.sections.menu);
        },

        login: function () {
            this.onLoginPage();
            loginPage.loginWith(process.env.USER, process.env.PASSWORD);
            this.wait(5)
        },

        enterLoginDetails: function (user, password) {
            this.fillField(loginPage.fields.userid, user);
            this.fillField(loginPage.fields.password, password);
        },

        enterValidCredential: function () {
            loginPage.loginWith(process.env.USER, process.env.PASSWORD);

        },
        enterInvalidPassword: function () {
            loginPage.setPassword(faker.random.number());
        },

        goToPasswordResetPage: function () {
            this.click(loginPage.clickForgotPasswordLink());
        },

        logout: function () {
            homePage.clickAccountToggle();
            homePage.clickLogout();
        },

        goToAnalytics: function () {
            homePage.clickAnalytics();
        },

        goToFileDrop: function () {
            this.amOnPage(fileDropUrl)
            this.waitForElement(filedropPage.buttons.fileSelectButton)
        },

        goToUsers: function () {
            homePage.clickUsers();
        },

        addAUser: async function (userName, fName, lName, userEmail) {
            await usersPage.addUser(userName, fName, lName, userEmail)
            usersPage.confirmUserDetailsAvailable(userEmail)
        },

        goToRequestHistory: function () {
            homePage.clickRequestsHistory();
            this.waitForElement(requesthistoryPage.table.tableHeaders, 60)
        },

        goToContentManagementPolicy: function () {
            homePage.clickPolicy();
        },

        goToPolicyHistory: function () {
            policyPage.clickHistoryTab();
        },

        goToDraftAdaptationPolicy: async function () {
            policyPage.clickDraftTab();
            policyPage.clickAdaptationPolicy();
        },

        goToCurrentAdaptationPolicy: function () {
            policyPage.clickCurrentPolicyTab();
            policyPage.clickAdaptationPolicy();
        },

        goToDraftNcfsPolicy: async function () {
            policyPage.clickDraftTab();
            policyPage.clickNcfsPolicy();
        },

        goToCurrentNcfsPolicy: async function () {
            policyPage.clickCurrentPolicyTab();
            policyPage.clickNcfsPolicy();
        },

        viewTransactions: function (period) {
            this.goToRequestHistory()
            this.waitForElement(requesthistoryPage.table.tableHeaders, 60)
            requesthistoryPage.openDatePicker();
            requesthistoryPage.selectTimePeriod(period)
        },

        setGwBlockFilesToBlock: async function () {
            this.goToDraftNcfsPolicy();
            await policyPage.setRouteFlag(`block-glasswallBlockedFiles`);
            await policyPage.publishPolicy();
        },

        setRequiredContentFlag: async function (fileType, contentFlag, flagType) {
            this.goToDraftAdaptationPolicy();
            await policyPage.setAndPublishPolicyFlag(fileType, contentFlag, flagType);
        },

        searchFileById: async function (id) {
            await requesthistoryPage.setFileId(id);
            this.waitForElement(requesthistoryPage.table.tableHeaders, 60)
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
            this.login()
            this.goToFileDrop()
            this.uploadFile(file)
        },

        checkFileInFileDropUrl: function (file) {
            this.amOnPage(fileDropUrl)
            this.uploadFile(file)
        },

        uploadFileWithNoSanitiseData: function (file) {
            this.attachFile(filedropPage.buttons.fileInput, file)
        },

        clearField: function (locator) {
            this.doubleClick(locator);
            this.pressKey('Backspace');
        },

        onIcapProxyPage: function () {
            this.amOnPage("https://engineering.glasswallsolutions.com.glasswall-icap.com/docs/products/cloud-sdk/sample-files/");
            this.wait(5)
        },

        clickElement: function (element) {
            this.waitForElement(element, 60)
            this.click(element);
        },

        fillInField: function (element, data) {
            this.waitForElement(element, 60)
            this.fillField(element, data);
        },

        goToDraftReferenceNcfsPolicy: function () {
            policyPage.clickDraftTab();
            policyPage.clickRefenceNcfs();
        },

        goToCurrentReferenceNcfs: async function () {
            policyPage.clickCurrentPolicyTab();
            policyPage.clickRefenceNcfs();
        },

        cleanupFile(file) {
            try {
                const exists = fs.existsSync(file);
                if (exists) {
                    fs.unlinkSync(file)
                    console.log(`Remove downloaded file - ${file}`);
                } else {
                    console.log(`File was already removed - ${file}`);
                }
            } catch (error) {
                console.error(error);
            }
        },

        checkFileOutputIsHtmlReport: function (file) {
            try {
                const exists = fs.existsSync(file);
                if (exists) {
                    const fileContent = fs.readFileSync(file)
                    if (fileContent.includes('Document Access Blocked due to Policy')) {
                        output.print('File output is a html report with title: "Document Access Blocked due to Policy"')
                    } else {
                        assert.fail('File output is not a html report')
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },

        confirmFileiSNotAvailable: function (file) {
            if (I.checkFileExist(file) === true) {
                assert.fail('Failed: The file is available')
            } else {
                output.print('Expected outcome: the file is not available')
            }
        },

        confirmFileOutputiSAvailable: function (file) {
            if (I.checkFileExist(file) === true) {
                console.log('The file output is available as expected')
            } else {
                assert.fail('Failed: The file output is NOT available')
            }
        }



    });
}
