const { I, icapclient } = inject();
const fs = require('fs');
const { output } = require("codeceptjs");
const cp = require('child_process')
const path = require('path');
const assert = require('assert').strict;
const inputPath = `./src/data/multiset`;
const outputPath = `./src/data/fileOutput`;
const icapLogs = path.join(`${outputPath}`, 'icap.log')
const icapClient = process.env.ICAP_URL_T03;


module.exports = {

    submitFile(file) {
        output.print('Sending file...')
        console.log(`Command to send the file: c-icap-client -i ${icapClient} -p 1344  -s gw_rebuild  -f "${inputPath}/${file}" -o "${outputPath}/${file}" -v 2> ${icapLogs}`)
        cp.execSync(`c-icap-client -i ${icapClient} -p 1344  -s gw_rebuild  -f "${inputPath}/${file}" -o "${outputPath}/${file}" -v 2> ${icapLogs}`).toString()
        const icapOutput = fs.readFileSync(`${icapLogs}`);
        output.log('icapLogs: ' + icapOutput)
        if (icapOutput.includes(`ICAP server:${icapClient}, ip:`)) {
            console.log(`ICAP Server respone OK`);
        } else {
            assert.fail(`No response returned from ICAP Server`)
        } if (icapOutput.includes(`Error opening output file`)) {
            let fileErr = icapOutput.split(`Error opening output file`)[1]
            assert.fail(`File error: ${fileErr}`)
        }
        return icapOutput;
    },

    processFiles(inPath, outPath) {
        let find = function (dir, done) {
            fs.readdir(dir, function (error, list) {
                if (error) {
                    return done(error);
                }
                let i = 0;
                (function next() {
                    let file = list[i++];
                    if (!file) {
                        return done(null);
                    }
                    let fileIn = dir + '/' + file;
                    let fileOut = outPath + '/' + file;
                    I.cleanupFile(fileOut);
                    fs.stat(file, async function (error, stat) {
                        if (stat && stat.isDirectory()) {
                            find(file, function () {
                                next();
                            });
                        } else {
                            console.log(file);
                            const resp = icapclient.processFile(fileIn, fileOut);
                            icapclient.getFileProcessingResult(resp);
                            next();
                        }

                    });
                })();
            });
        };
        process.argv.forEach(function (val) {
            if (val.indexOf('source') !== -1) {
                inPath = val.split('=')[1];
            }
        });
        find(inPath, function (error) {
            if (error) {
                assert.fail(`Inpath Error occurred ${error}`)
            } else {
                console.log('finished.');
            }
        });
    },

    sendFileICAP: function (fileName) {
        // use NodeJS child process to run a bash command in sync way
        output.print('Sending file...')
        console.log(`Command to send the file: c-icap-client -i ${icapClient} -p 1344 -s gw_rebuild  -f "${inputPath}/${fileName}" -o "${outputPath}/${fileName}" -v 2> ${icapLogs}`)
        let fileId;
        cp.execSync(`c-icap-client -i ${icapClient} -p 1344 -s gw_rebuild  -f "${inputPath}/${fileName}" -o "${outputPath}/${fileName}" -v 2> ${icapLogs}`).toString()
        const icapOutput = fs.readFileSync(`${icapLogs}`);
        output.print('icapLogs: ' + icapOutput)
        I.wait(60)
        const statusCode = icapOutput
            .toString()
            .split('ICAP/1.0 ')[1]
            .split(" ")[0];
        if (statusCode === '200') {
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

    processFile: function (inPath, outPath) {
        //const icapOutput = null;
        try {
            console.log('Sending file...')
            console.log(`Command to send the file: c-icap-client -i ${icapClient} -p 1344  -s gw_rebuild  -f "${inPath}" -o "${outPath}" -v 2> ${icapLogs}`)
            cp.execSync(`c-icap-client -i ${icapClient} -p 1344  -s gw_rebuild  -f "${inPath}" -o "${outPath}" -v 2> ${icapLogs}`).toString()
            const icapOutput = fs.readFileSync(`${icapLogs}`);
            if (icapOutput)
                if (icapOutput.includes(`ICAP server:${icapClient}, ip:`)) {
                    console.log(`ICAP Server respone OK`);
                } else {
                    assert.fail(`No response returned from ICAP Server`)
                } if (icapOutput.includes(`Error opening output file`)) {
                    let fileErr = icapOutput.split(`Error opening output file`)[1]
                    assert.fail(`File error: ${fileErr}`)
                }
            console.log('icapLogs: ' + icapOutput)
            return icapOutput;
        } catch (err) {
            console.warn(err);
        }
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
                 return fileId;
            }}
        } catch (error) {
            console.log(error);
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

    getHtmlReport(file) {
        try {
            const exists = fs.existsSync(file);
            if (exists) {
                const s = fs.readFileSync(file, 'utf8').toString();
                if (s.includes(`<html>`)) {
                    return s;
                }
            }
        } catch (error) {
            console.error(error);
        }
    },

    getHtmlReportHeader(file) {
        const s = this.getHtmlReport(file);
        let rHeader;
        try {
            if (typeof s !== 'undefined') {
                rHeader = s.substring(s.indexOf(`<h1>`) + `<h1>`.length, s.indexOf(`</h1>`));
            }return rHeader;
        } catch (error) {
            console.error(error);
        }
    },

    getHtmlReportMessage(file) {
        const s = this.getHtmlReport(file);
        let rMsg;
        try {
            if (typeof s !== 'undefined') {
                rMsg = s.substring(s.indexOf(`</h1>`) + `</h1>`.length, s.indexOf(`<br>`));
            }return rMsg;
        } catch (error) {
            console.error(error);
        }
    }
}