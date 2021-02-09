'use strict';
const homePage = require("../pages/home.page.js");
const usersPage = require("../pages/users.page.js");
const loginPage = require("../pages/login.page.js");
const policyPage = require("../pages/policy.page.js");
const filedropPage = require("../pages/file-drop.page.js");
const requesthistoryPage = require("../pages/request-history.page.js");
const { output } = require("codeceptjs");
const I = actor();
const env = require("../utils/config")
const assert = require('assert').strict;
const cp = require('child_process')
const fs = require('fs')
const path = require('path');
const inputDir = path.join('src', 'data', 'multiset');
const outputDir = path.join('output', 'downloads');
const inputPath = path.join(process.cwd(), inputDir);
const outputPath = path.join(process.cwd(), outputDir);
const icapLogs = path.join('output', 'icap.log')
const fileDropUrl = `http://54.78.215.70`;
const icapClient = process.env.ICAPURL;

module.exports = function () {
    return actor({
        onLoginPage: function () {
            this.amOnPage(process.env.URL)
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
            //homePage.clickFileDrop();
            this.waitForElement(filedropPage.buttons.fileSelectButton)
        },

        goToUsers: function () {
            homePage.clickUsers();
        },

        addAUser: function (userName, fName, lName, userEmail) {
            usersPage.addUser(userName, fName, lName, userEmail)
            usersPage.checkUserDetailsSaved(userEmail)
            //I.see(userEmail)
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

        viewTransactions: function (period) {
            this.goToRequestHistory()
            requesthistoryPage.openDatePicker();
            requesthistoryPage.selectTimePeriod(period)
        },

        searchFileById: function (id) {
            requesthistoryPage.setFileId(id);
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
            filedropPage.clickViewResult();
        },

        checkFileInFileDropUrl: function (file) {
            this.amOnPage(fileDropUrl)
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

        sendFileICAP: async function (fileName) {
            // use NodeJS child process to run a bash command in sync way
            output.print('Sending file...')
            console.log(`Command to send the file: c-icap-client -i ${icapClient} -p 1344 -s gw_rebuild  -f "${inputPath}/${fileName}" -o "${outputPath}/${fileName}" -v 2> ${icapLogs}`)
            let fileId;
            await cp.execSync(`c-icap-client -i ${icapClient} -p 1344 -s gw_rebuild  -f "${inputPath}/${fileName}" -o "${outputPath}/${fileName}" -v 2> ${icapLogs}`).toString()
            const icapOutput = fs.readFileSync(`${icapLogs}`);
            output.print('icapLogs: ' + icapOutput)
            this.wait(60)
            const statusCode = icapOutput
                .toString()
                .split('ICAP/1.0 ')[1]
                .split(" ")[0];
            if (statusCode === '200' || statusCode === '201') {
                fileId = icapOutput
                    .toString()
                    .split('X-Adaptation-File-Id: ')[1]
                    .split("\n")[0];
                output.print('File is sent...')
                return fileId;
            } else if (statusCode === '204') {
                output.print('File is sent...')
                output.print('File is Unmodified')
            } else {
                assert.fail(`${statusCode} code was received`)
            }
        },

        submitFile: async function (fileName) {
            output.print('Sending file...')
            console.log(`Command to send the file: c-icap-client -i ${icapClient} -p 1344  -s gw_rebuild  -f "${inputPath}/${fileName}" -o "${outputPath}/${fileName}" -v 2> ${icapLogs}`)
            await cp.execSync(`c-icap-client -i ${icapClient} -p 1344  -s gw_rebuild  -f "${inputPath}/${fileName}" -o "${outputPath}/${fileName}" -v 2> ${icapLogs}`).toString()
            const icapOutput = fs.readFileSync(`${icapLogs}`);
            output.print('icapLogs: ' + icapOutput)
            this.wait(60)
            output.print('File is sent...')
            return icapOutput;
        },

        processFile: async function (filePath, output) {
            //output.print
            console.log('Sending file...')
            console.log(`Command to send the file: c-icap-client -i ${icapClient} -p 1344  -s gw_rebuild  -f "${filePath}" -o "${output}" -v 2> ${icapLogs}`)
            await cp.execSync(`c-icap-client -i ${icapClient} -p 1344  -s gw_rebuild  -f "${filePath}" -o "${output}" -v 2> ${icapLogs}`).toString()
            const icapOutput = fs.readFileSync(`${icapLogs}`);
            //output.print
            console.log('icapLogs: ' + icapOutput)
            this.wait(60)
            //output.print
            console.log('File is sent...')
            return icapOutput;
        },

        getIcapHeaderCode: function (icapResp) {
            let icapCode = icapResp
                .toString()
                .split('ICAP/1.0 ')[1]
                .split("\n")[0];
            output.print('The icap header code is: ' + icapCode)
            return icapCode;
        },

        getResponseCode: function (icapResp) {
            let responseCode = icapResp
                .toString()
                .split('HTTP/1.0 ')[1]
                .split("\n")[0];
            if (responseCode) {
                output.print('The responde code is: ' + responseCode)
            } else {
                output.print('The responde hearder is not available')
            }
            return responseCode;
        },

        getFileId: function (icapResp) {
            let fileId;
            fileId = icapResp
                .toString()
                .split('X-Adaptation-File-Id: ')[1]
                .split("\n")[0];
            output.print('The file id: ' + fileId)
            return fileId;
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
            const icapCode = this.getIcapHeaderCode(resp)
            if (icapCode === '204 Unmodified') {
                I.say('The submitted file is relayed as the responde code is: ' + icapCode)
            } else {
                const respCode = this.getResponseCode(resp)
                if (respCode === '403 Forbidden') {
                    I.say('Submitted file is blocked as the responde code is: ' + respCode)
                } else {
                    I.say('Submitted file response is: ' + respCode)
                }
            }
        },

        processFilesSet: async function (inPath, outputPath) {
            var find = function (dir, done) {
                fs.readdir(dir, function (error, list) {
                    if (error) {
                        return done(error);
                    }
                    var i = 0;
                    (function next() {
                        var file = list[i++];
                        if (!file) {
                            return done(null);
                        }
                        var fileIn = dir + '/' + file;
                        var fileOut = outputPath + '/' + file;
                        //I.removeFiles(outputPath);
                        fs.stat(file, async function (I,error, stat) {
                            if (stat && stat.isDirectory()) {
                                find(file, function (error) {
                                    next();
                                });
                            } else {
                                console.log(file);
                              
                                next();
                            }return file;
                        });
                    })();
                }); 
            };
            // optional command line params
            //      source for find path
            process.argv.forEach(function (val, index, array) {
                if (val.indexOf('source') !== -1) {
                    inPath = val.split('=')[1];
                }
            });

            console.log('-------------------------------------------------------------');
            console.log('processing...');
            console.log('-------------------------------------------------------------');

            find(inPath, function (error) {
                if (error) {
                    throw error;
                } else {
                    console.log('-------------------------------------------------------------');
                    console.log('finished.');
                    console.log('-------------------------------------------------------------');
                }
            });
        }

    });
}
