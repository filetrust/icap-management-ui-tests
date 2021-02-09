const { I, policyPage, filedropPage, requesthistoryPage, sharepoint } = inject();
const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const { output } = require("codeceptjs");

Feature('File Processing');

// });


Scenario('I process a supported file using icap client tool for rebuild successfully', async () => {
    const file = '22.pdf'
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
    //I.cleanupFile(file);
    const resp = await I.submitFile(file)
    const icapCode = I.getIcapHeaderCode(resp)
    if (icapCode === '204 Unmodified') {
        I.say('The responde is: ' + icapCode)
        I.say('Submitted file is relayed')
    } else {
        const respCode = await I.getResponseCode(resp)
        //let fileId = await I.getFileId(resp)
        if (respCode === '403 Forbidden') {
            I.say('Submitted file is blocked')
        } else {
            I.say('Submitted file response is: ' + respCode)
        }
    }
}).tag('@ns').tag('@fileprocess').tag('@functional');

Scenario('Process supported office files and verify successful', async () => {
    var inPath = './src/data/pdf';
    var outputPath = './output/downloads'
    const resp = await I.processFilesSet(inPath, outputPath);
    I.getFileProcessingResult(resp);
}).tag('@pd').tag('@fileprocess').tag('@functional');


Scenario('I process a supported file and get a 200 response', async () => {
    //I.walk('./src/data/set', 'done')
    var walkPath = './src/data/pdf';
    var outputPath = './output/downloads'
    var walk = function (dir, done) {
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
                fileIn = dir + '/' + file;
                var fileOut = outputPath + '/' + file;
                I.cleanupFile(fileOut);
                fs.stat(file, async function (error, stat) {
                    if (stat && stat.isDirectory()) {
                        walk(file, function (error) {
                            next();
                        });
                    } else {
                        console.log(file);
                        const resp = await I.processFile(fileIn, fileOut);
                        I.getFileProcessingResult(resp);
                        next();
                    }
                });
            })();
        });
    };
    // optional command line params
    //      source for walk path
    process.argv.forEach(function (val, index, array) {
        if (val.indexOf('source') !== -1) {
            walkPath = val.split('=')[1];
        }
    });

    console.log('-------------------------------------------------------------');
    console.log('processing...');
    console.log('-------------------------------------------------------------');

    walk(walkPath, function (error) {
        if (error) {
            throw error;
        } else {
            console.log('-------------------------------------------------------------');
            console.log('finished.');
            console.log('-------------------------------------------------------------');
        }
    });
}).tag('@sh');

