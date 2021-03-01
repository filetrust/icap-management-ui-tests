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
            this.waitForElement(homePage.sections.menu);
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
            await policyPage.clickDraftTab();
            policyPage.clickAdaptationPolicy();
        },

        goToCurrentAdaptationPolicy: function () {
            policyPage.clickCurrentPolicyTab();
            policyPage.clickAdaptationPolicy();
        },

        goToDraftNcfsPolicy: async function () {
            await policyPage.clickDraftTab();
            await policyPage.clickNcfsPolicy();
        },

        goToCurrentNcfsPolicy: async function () {
            policyPage.clickCurrentPolicyTab();
            await policyPage.clickNcfsPolicy();
        },

        viewTransactions: function (period) {
            this.goToRequestHistory()
            this.waitForElement(requesthistoryPage.table.tableHeaders, 60)
            requesthistoryPage.openDatePicker();
            requesthistoryPage.selectTimePeriod(period)
        },

        setGwBlockFilesToBlock: async function () {
            await this.goToDraftNcfsPolicy();
            await policyPage.setRouteFlag(`block-glasswallBlockedFiles`);
            await policyPage.publishPolicy();
        },

        setRequiredContentFlag: async function (fileType, contentFlag, flagType) {
            await this.goToDraftAdaptationPolicy();
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

        uploadFileByType: function (fileType) {
            let path = null;
            switch (fileType) {
                case ('Safe_file'):
                    path = 'src/data/multiset/types/safe_file.xlsx';
                    break;
                case ('Blocked_file'):
                    path = 'src/data/multiset/types/blocked_file.doc';
                    break;
                //todo: add file
                case ('Dangerous_file'):
                    path = 'src/data/multiset/types/dangerous_file.doc';
                    break;
                case ('Unclassified_file'):
                    path = 'src/data/multiset/unsupported_icaptest.ps1';
                    break;
                default:
                    throw 'There is not such file type.'
            }
            this.uploadFile(path);
        },

        fail(message) {
            assert.fail(message);
        },

        clearField: function (locator) {
            this.doubleClick(locator);
            this.pressKey('Backspace');
        },

        onIcapProxyPage: function () {
            this.amOnPage("https://engineering.glasswallsolutions.com.glasswall-icap.com/docs/products/cloud-sdk/sample-files/");
            this.wait(5)
        },


        getIcapHeaderCode: function (icapResp) {
            try {
                if (typeof icapResp !== 'undefined') {
                    if (icapResp.includes('ICAP/1.0')) {
                        let icapCode = icapResp
                            .toString()
                            .split('ICAP/1.0 ')[1]
                            .split("\n")[0];
                        output.print('The icap header code is: ' + icapCode)
                        return icapCode;
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },

        getResponseCode: function (icapResp) {
            try {
                if (typeof icapResp !== 'undefined') {
                    if (icapResp.includes('HTTP/1.0')) {
                        let responseCode = icapResp
                            .toString()
                            .split('HTTP/1.0 ')[1]
                            .split("\n")[0];
                        if (responseCode !== null) {
                            output.print('The response code is: ' + responseCode)
                        } else {
                            output.print('The response header is not available')
                        } return responseCode;
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },

        getFileId: function (icapResp) {
            try {
                if (typeof icapResp !== 'undefined') {
                    if (icapResp.includes('X-Adaptation-File-Id')) {
                        let fileId = icapResp
                            .toString()
                            .split('X-Adaptation-File-Id: ')[1]
                            .split("\n")[0];
                        output.print('The file id: ' + fileId)
                    } else {
                        fileId = null
                    } return fileId;
                }
            } catch (error) {
                console.error(error);
            }
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

        getFileProcessingResult: function (resp) {
            try {
                const icapCode = this.getIcapHeaderCode(resp)
                if (typeof icapCode === 'undefined') {
                    assert.fail('File processing is not successful')
                } else if (icapCode === '204 Unmodified') {
                    console.log(`The submitted file is relayed as the responde code is: ${icapCode}`)
                } else {
                    const respCode = this.getResponseCode(resp)
                    if (!respCode) {
                        assert.fail('File processing is not successful')
                    } else if (respCode === '403 Forbidden') {
                        console.log(`Submitted file is blocked as the responde code is: ${respCode}`)
                    } else if (respCode === '200 OK') {
                        console.log(`Submitted file is successfully processed with response: ${respCode}`)
                    }
                } return icapCode
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
