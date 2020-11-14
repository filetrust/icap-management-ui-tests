const Helper = require('@codeceptjs/helper');
var moment = require('moment');
const recorder = require('codeceptjs').recorder;
const event = require('codeceptjs').event;

class MyHelper extends Helper {

    // _before() {
    //         recorder.retry({
    //             retries: 2,
    //             when: err => err.message.indexOf('TypeError: arg.toString is not a function') > -1,
    //         });
    //     }

    // _failed() {
    //         recorder.catchWithoutStop({
    //             fail: ('Function Not Implemented'),
    //             when: err => err.message.indexOf('FAILED') > -1,

    //          })

    async passedStep() { }
    async failedStep() {
        await assert(false);
    }

    async checkIfVisible(selector, ...options) {
        const helper = this.helpers['Puppeteer'];
        try {
            const numVisible = await helper.grabNumberOfVisibleElements(selector);

            if (numVisible) {
                return await helper.grabTextFrom(selector, ...options);
            }
        } catch (err) {
            console.log('Skipping operation as element is not visible');
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
                    const text = await page.$eval(`${tableRows}:nth-child(${i + 1}) th:nth-child(${col})`,
                        (e) => e.innerText)
                    if (text === val) {
                        console.log('The result list shows required files with the filter: ' + text);
                    } else {
                        console.error('The result is not as expected, filter found is: ' + text);
                    }
                    break;}
                 } } catch (err) {
            console.log('Skipping operation as there was a problem getting the cell');
        }}
    

    async checkIfReturnedFilesInDateRange(range, col) {
        const page = this.helpers['Puppeteer'].page;
        page.waitForSelector('tbody');
        const tableRows = 'tbody tr';
        try {
            let rowCount = await page.$$eval(tableRows, rows => rows.length);
            for (let i = 0; i < rowCount; i++) {
                let timestamp = await page.$eval(`${tableRows}:nth-child(${i + 1}) th:nth-child(${col})`, (e) => e.innerText);
                let parsed = moment(timestamp, 'DD/MM/YYYY').toDate()
                if (moment(parsed).isBetween(range.split("-"))) {
                    console.log('The result list shows required files within the selected time: ' + range);
                } else {
                    console.error('The result files returned are not within the selected time: ' + range);
                }
                break;
            }
        } catch (err) {
            console.error('Skipping operation as there was a problem getting the cell');
        }
    }

    compareThatEqual(word1, word2) {
        return word1.toUpperCase() === word2.toUpperCase();
    }
}




module.exports = MyHelper;
