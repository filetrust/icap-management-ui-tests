const { I, policyPage, filedropPage, requesthistoryPage, sharepoint } = inject();
const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const { output } = require("codeceptjs");

module.exports = {

    async processFiles(inPath, outPath) {
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
                    fileIn = dir + '/' + file;
                    var fileOut = outPath + '/' + file;
                    I.cleanupFile(fileOut);
                    fs.stat(file, async function (error, stat) {
                        if (stat && stat.isDirectory()) {
                            find(file, function (error) {
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
        process.argv.forEach(function (val, index, array) {
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
    }
}