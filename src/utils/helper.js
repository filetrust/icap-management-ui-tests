const Helper = require('@codeceptjs/helper');
var moment = require('moment');
const recorder = require('codeceptjs').recorder;
const event = require('codeceptjs').event;
const fs = require('fs');
const output = require('codeceptjs').output;
const assert = require('assert').strict;
let modalContents;

class MyHelper extends Helper {

    // _before() {
    //         recorder.retry({
    //             retries: 2,
    //             when: err => err.message.indexOf('TypeError: arg.toString is not a function') > -1,
    //         });
    //     }

    // _failed() {
    //      recorder.catchWithoutStop({
    //         fail: ('Test Failed'),
    //         when: event.dispatcher.on(event.step.failed, (step,err) => {
    //         if (event.step.comment)
    //             failed = true;
    //        })
    //      })
    //     }

    async seeElementExist(selector) {
        const helper = this.helpers['Puppeteer'];
        try {
            const elVisible = await helper.grabNumberOfVisibleElements(selector);
            if (!elVisible || elVisible.length === 0) {
                return output.print('The element ' + selector + ' is not available');
            } else {
                return output.print(selector + ' is visible')
            }
        } catch (err) {
            output.log(err);
        }
    }

    async getModal(element) {
        const page = this.helpers['Puppeteer'].page;
        await page.waitForSelector('.modal', { visible: true });
        const button = await page.waitForSelector(element, { visible: true });
    }

    async getTextFrom(selector, ...options) {
        const helper = this.helpers['Puppeteer'];
        try {
            const numVisible = await helper.grabNumberOfVisibleElements(selector);
            if (numVisible) {
                return await helper.grabTextFrom(selector, ...options);
            } else {
                output.print(selector + ' is not visible')
            }
        } catch (err) {
            output.log(err);
        }
    }

    async clickElement(selector) {
        const helper = this.helpers['Puppeteer'];
        try {
            const elVisible = await helper.grabNumberOfVisibleElements(selector);
            if (elVisible) {
                return helper.click(selector);
            } else {
                output.error('The element ' + selector + ' is not visible')
            }
        } catch (err) {
            output.print(err);
        }
    }

    async fillInField(selector, value) {
        const helper = this.helpers['Puppeteer'];
        try {
            const elVisible = await helper.grabNumberOfVisibleElements(selector);
            if (elVisible) {
                return helper.fillfield(selector, value);
            } else {
                output.error('The element ' + selector + ' is not visible')
            }
        } catch (err) {
            output.log(err);
        }
    }

    async clickRecord(i) {
        const helper = this.helpers['Puppeteer'];
        const page = this.helpers['Puppeteer'].page;
        page.waitForSelector('tbody');
        try {
            const tableRows = 'tbody tr';
            let rowCount = await page.$$eval(tableRows, rows => rows.length);
            if (rowCount > 2) {
                output.log(rowCount + ' rows are displayed');
                return await this.clickElement('//tbody/tr[2]/th');
            } else {
                output.print('The table record is not available')
            }
        } catch (err) {
            output.log(err);
        }
    }

    async checkRow(val, col) {
        const page = this.helpers['Puppeteer'].page;
        page.waitForSelector('tbody');
        const tableRows = 'tbody tr';
        try {
            let rowCount = await page.$$eval(tableRows, rows => rows.length);
            if (rowCount > 1) {
                for (let i = 0; i < rowCount; i++) {
                    let text = await page.$eval(`${tableRows}:nth-child(${i + 1}) th:nth-child(${col})`,
                        (e) => e.innerText)
                    if (this.compareThatEqual(text, val)) {
                        console.log('The result list shows required files with the filter: ' + text);
                    } else {
                        output.error('The result is not as expected, filter found is: ' + text);
                        break;
                    }
                }
            }
        } catch (err) {
            output.log(err);
        }
    }


    async checkIfReturnedFilesInDateRange(range, col) {
        const page = this.helpers['Puppeteer'].page;
        page.waitForSelector('tbody');
        const tableRows = 'tbody tr';
        try {
            let rowCount = await page.$$eval(tableRows, rows => rows.length);
            if (rowCount > 1) {
                for (let i = 0; i < rowCount; i++) {
                    let timestamp = await page.$eval(`${tableRows}:nth-child(${i + 1}) th:nth-child(${col})`, (e) => e.innerText);
                    let parsed = moment(timestamp, 'DD/MM/YYYY').toDate()
                    if (moment(parsed).isBetween(range.split("-"))) {
                        output.print('The result list shows required files within the selected time: ' + range);
                    } else {
                        assert.fail('The result files returned are not within the selected time: ' + range);
                    }
                    break;
                }
            } else {
                output.print('No Transactions are available')
            }
        } catch (err) {
            output.error(err);
        }
    }

    compareThatEqual(word1, word2) {
        return word1.toString().toUpperCase() === word2.toString().toUpperCase();
    }

    checkFileIsDownloaded(file) {
        var f = new File(file);
        if (f.exists()) {
            write('The file is downloaded');
        } else {
            write('The file does not exist');
        }
    }

    checkFileContains(content) {
        try {
            I.amInPath('output/downloads');
            I.seeInThisFile(content, 'utf8')
        } catch (err) {
            assert.fail('The file does not contain required content:-  ' + content);
        }
    }

    checkFileExist(path) {
        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                output.log('The file does not exist');
                return;
            }
        })
    }
}


module.exports = MyHelper;
