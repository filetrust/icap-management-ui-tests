const { I} = inject();
const fs = require('fs');

module.exports = {

    async processFiles(inPath, outPath) {
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
                    file = dir + '/' + file;
                    let fileOut = outPath + '/' + file;
                    I.cleanupFile(fileOut);
                    fs.stat(file, async function (error, stat) {
                        if (stat && stat.isDirectory()) {
                            find(file, function () {
                                next();
                            });
                        } else {
                            console.log(file);
                            const resp = await I.processFile(file, fileOut);
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
    }
}