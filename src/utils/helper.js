const Helper = require('@codeceptjs/helper');
var moment = require('moment');
const recorder = require('codeceptjs').recorder;
const event = require('codeceptjs').event;
const fs = require('fs');
const output = require('codeceptjs').output;
const assert = require('assert').strict;
//const PuppeteerController = require('puppeteer-core-controller');

class MyHelper extends Helper {


    async getElement(selector) {
        const page = this.helpers['Puppeteer'].page;
        return (await page.$(selector));
    }

    async getElementAttribute(selector) {
        const page = this.helpers['Puppeteer'].page;
        const element = this.getElement(selector);
        const is_disabled = (await page.$$(selector)).length !== 0;
        return is_disabled;
    }


    async seeElementExist(selector) {
        const helper = this.helpers['Puppeteer'];
        let elVisible;
        try {
            elVisible = await helper.grabNumberOfVisibleElements(selector);
            if (!elVisible || elVisible.length === 0) {
                output.print('The element ' + selector + ' is not available');
                return false;
            } else if (elVisible) {
                output.print(selector + ' is visible')
                return true
            }
            return elVisible;
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
                output.print('Skipping step, the element ' + selector + ' is not visible')
            }
        } catch (err) {
            output.print(err);
        }
    }

    async clickElements(selector1, selector2) {
        const helper = this.helpers['Puppeteer'];
        const page = this.helpers['Puppeteer'].page;

        try {
            await this.clickElement(selector1);
            page.waitForSelector(selector2);
            const elVisible = await helper.grabNumberOfVisibleElements(selector2);
            if (elVisible) {
                return await helper.click(selector2);
            } else {
                output.print('Skipping step, the element ' + selector2 + ' is not visible')
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

    async getRowText(tr, col) {
        const page = this.helpers['Puppeteer'].page;
        page.waitForSelector('tbody');
        const tableRows = 'tbody tr';
        let text = null;
        try {
            let rowCount = await page.$$eval(tableRows, rows => rows.length);
            if (rowCount > 1) {
                text = await page.$eval(`${tableRows}:nth-child(${tr}) th:nth-child(${col})`,
                    (e) => e.innerText)
                output.print(text)
            } return text;
        } catch (err) {
            output.log(err);
        }
    }

    getElementAttribute(sel, at) {
        const helper = this.helpers['Puppeteer'];
        helper.executeScript(function (sel, at) {
            var x = document.getElementById(sel);
            var attr = "";
            var i;
            for (i = 0; i < x.attributes.length; i++) {
                attr = attr + x.attributes[i].name;
                if (attr === at) {
                    output.print('The attribute: ' + at + ' is available')
                }
            } return attr;
        }, sel, at)
    }

    getElementAttr(selector) {
        const helper = this.helpers['Puppeteer'];
        helper.executeScript((selector) => {
            var el = document.getElementById(selector);
            for (var i = 0, atts = el.attributes, n = atts.length, arr = []; i < n; i++) {
                arr.push(atts[i].nodeName);
                //if (atts[i].nodeName==='checked'){
                return atts[i].nodeName
            }
        }, selector);
    }

    getText(selector, at) {
        return this.getElementAttr(selector).contains(at)
    }

    async setFlags(element) {
        const helper = this.helpers['Puppeteer'];
        try {
            let elCount = await this.getElement()
            for (let i = 0; i < elCount; i++) {
                this.clickElement((await page.$x(`//label[text()='Sanitise']`))[i])
            }
        } catch (err) {
            output.log(err);
        }
    }

    // convert 12 hours format to 24 hours
    timeConversionSlicker(s) {
        let AMPM = s.slice(-2);
        let timeArr = s.slice(0, -2).split(":");
        if (AMPM === "AM" && timeArr[0] === "12") {
            // catching edge-case of 12AM
            timeArr[0] = "00";
        } else if (AMPM === "PM") {
            // everything with PM can just be mod'd and added with 12 - the max will be 23
            timeArr[0] = (timeArr[0] % 12) + 12
        }
        return timeArr.join(":");
    }

    exchangeDayMonth(dateString) {
        return dateString.substr(3, 2) + "/" + dateString.substr(0, 2) + "/" + dateString.substr(6, 4);
    }

    parseRange(dateString, part) {
        const i = (part === 'from') ? 0 : 1
        let datePart = dateString.split('-')[i].trim()
        let date = datePart.split(' ')[0].trim()
        date = this.exchangeDayMonth(date)
        const time = datePart.split(' ')[1].trim()
        return `${date} ${time}`
    }

    async checkIfReturnedFilesInDateRange(range, col) {
        const page = this.helpers['Puppeteer'].page;
        page.waitForSelector('tbody');
        const tableRows = `tbody[class*='MuiTableBody-root'] > tr`;
        try {
            let rowCount = await page.$$eval(tableRows, rows => rows.length);
            for (let i = 0; i < rowCount; i++) {
                // get item time
                let timestamp = await page.$eval(`${tableRows}:nth-child(${i + 1}) th:nth-child(${col})`, (e) => e.innerText);
                // parse the item time
                let date = timestamp.split(',')[0]
                let time = timestamp.split(',')[1].trimStart()
                let dayPart = time.split(' ')[1]
                time = `${time.split(':')[0]}:${time.split(':')[1]} ${dayPart}`
                time = this.timeConversionSlicker(time)
                let itemDate = `${date} ${time}`
                // parse range time
                let dateFrom = this.parseRange(range, 'from')
                let dateTo = this.parseRange(range, 'to')
                // convert to ISO format to compare time
                dateFrom = new Date(dateFrom).toISOString()
                dateTo = new Date(dateTo).toISOString()
                itemDate = new Date(itemDate).toISOString()
                // verify if item timestamp in period
                if (moment(itemDate).isBetween(dateFrom, dateTo, undefined, [])) {
                    output.print(`The result list shows required files ${timestamp} within the selected time: ${range}`);
                } else {
                    assert.fail(`The result files ${timestamp} returned are not within the selected time: ${range}`);
                }
            }
        } catch (err) {
            assert.fail(err);
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
