const { I,icapclient} = inject();
const fs = require('fs');
const { output } = require("codeceptjs");
const cp = require('child_process')
const path = require('path');
const inputDir = path.join('src', 'data', 'multiset');
const outputDir = path.join('output', 'downloads');
const inputPath = path.join(process.cwd(), inputDir);
const outputPath = path.join(process.cwd(), outputDir);
const icapLogs = path.join('output', 'icap.log')
const icapClient = process.env.ICAP_URL_NEU;


module.exports = {

    submitFile (file) {
        output.print('Sending file...')
        console.log(`Command to send the file: c-icap-client -i ${icapClient} -p 1344  -s gw_rebuild  -f "${inputPath}/${file}" -o "${outputPath}/${file}" -v 2> ${icapLogs}`)
        cp.execSync(`c-icap-client -i ${icapClient} -p 1344  -s gw_rebuild  -f "${inputPath}/${file}" -o "${outputPath}/${file}" -v 2> ${icapLogs}`).toString()
        const icapOutput = fs.readFileSync(`${icapLogs}`);
        output.print('icapLogs: ' + icapOutput)
        I.wait(60)
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
                            I.getFileProcessingResult(resp);
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
                throw error;
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
        //output.print
        console.log('Sending file...')
        console.log(`Command to send the file: c-icap-client -i ${icapClient} -p 1344  -s gw_rebuild  -f "${inPath}" -o "${outPath}" -v 2> ${icapLogs}`)
        cp.execSync(`c-icap-client -i ${icapClient} -p 1344  -s gw_rebuild  -f "${inPath}" -o "${outPath}" -v 2> ${icapLogs}`).toString()
        const icapOutput = fs.readFileSync(`${icapLogs}`);
        //output.print
        console.log('icapLogs: ' + icapOutput)
        //output.print
        console.log('File is sent...')
        return icapOutput;
    },

}