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
        try{
        let rowCount = await page.$$eval(tableRows, rows => rows.length);
        for (let i = 0; i < rowCount; i++) {
            const str = await page.$eval(
                `${tableRows}:nth-child(${i + 1}) th:nth-child(${col})`,
                (e) => e.innerText
            )
            if (str === val) {
                console.log('The result list shows files with the selected types: ' + str);
            }
            else {
                console.log('The result is not as expected, file type found is: ' + str);
            }
            break;
        }
    } catch (err) {
        console.log('Skipping operation as there was a problem getting the cell');
    }
}
}




module.exports = MyHelper;
