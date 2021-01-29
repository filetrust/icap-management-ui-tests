const MyHelper = require("../utils/helper");
const moment = require('moment');
const assert = require('assert').strict;
const fs = require('fs');
const { output } = require("codeceptjs");
const I = actor();

module.exports = {
    //Locators

    fields: {
        inputFilterFileID: `input[name='fileId']`,
        customPaginatorGoTo: `input[class*='custom-paginator-goto']`,
    },
    options: {
        countOfFiles: "select[data-test-id='select-pageCountDropdown']"
    },
    buttons: {
        filterArrow: `button[class*='Filters_arrow__']`,
        moreFilters: `button[class*='Filters_moreFilters__']`,
        addFilter: `button[data-test-id='addFilterButton']`,
        dataId_addFilter: `$addFilterButton`,
        addFilterBytxt: "//button[contains(.,'+ Add Filter')]",
        dateTime: `//button[contains(.,'Date/Time')]`,
        time_1hour: `li[data-range-key='1 Hour']`,
        time_12hours: `li[data-range-key='12 Hours']`,
        time_24hours: `li[data-range-key='24 Hours']`,
        customRange: `.ranges li:nth-child(4)`,
        apply: `button[class*='applyBtn']`,
        cancel: `button[class*='cancelBtn']`,
        deleteAppliedFilter: `button[class^='SelectedFilter_buttonClose__']`,
        fileTypeMenu: "button[data-test-id='buttonFilterFileTypes']",
        fileOutcomeMenu: '$buttonFilterRisk',
        fileIdAdd: "//button[contains(.,'+ ADD')]",
        fileIdMenu: "button[data-test-id='buttonFilterFileId']",
        gotoPage: "",
        previousPage: "",
        firstPage: "",
        nextPage: "",
        lastPage: "",
        fileDetailClose: `[data-test-id="buttonClose"]`,
        sortTimestamp: "svg.MuiTableSortLabel-icon",
    },
    table: {
        fileTableBody1: `th[class*='MuiTableCell-root MuiTableCell-body']`,
        dataTransactionInfo: `//h2[contains(.,'No Transaction Data Found')]`,
        historyTable: `div[class*='RequestHistory_wrapTable__']`,
        fileTableBody: `tbody[class*='MuiTableBody-root']`,
        fileTableBodyRow: `tbody[class*='MuiTableBody-root'] > tr`,
        file: `tr:nth-of-type(2)`,
        emptyTableNotification: `//td[contains(.,'No Transaction Data Found')]`,
        errorTableNotification: `//td[contains(.,'Error Getting Transaction Data')]`,
        loading: `//div[contains(@class, 'RequestHistory_wrapTable')]/div`,
        tableHeaders: `tr[class*='MuiTableRow-head'] > th`,
    },
    calendar: {
        dateTimePicker: `div[class*='daterangepicker']`,
        dateTimePickerText: `div[id*='reportrange'] > span`,
        drp_calendar_left: `div[class*='drp-calendar left']`,
        drp_calendar_right: `div[class*='drp-calendar right']`,
        reportRange: `div[id*='reportrange']`,
        drp_selected: `span.drp-selected`,
        drp_selected_minutes_left: `div[class*='drp-calendar left'] .minuteselect option[selected='selected']`,
        drp_selected_hours_left: `div[class*='drp-calendar left'] .hourselect option[selected='selected']`,
        drp_month_and_year_left: `div[class*='drp-calendar left'] .month`,
        drp_month_and_year_right: `div[class*='drp-calendar right'] .month`,
        drp_arrow_left: `div[class*='drp-calendar left'] th.prev`,
        drp_day_left: `div[class*='drp-calendar left'] td:not(.ends)`,
        drp_day_right: `div[class*='drp-calendar right'] td:not(.ends)`,
        drp_hour_left: `div[class*='drp-calendar left'] .hourselect`,
        drp_hour_right: `div[class*='drp-calendar right'] .hourselect`,
        drp_minutes_left: `div[class*='drp-calendar left'] .minuteselect`,
        drp_minutes_right: `div[class*='drp-calendar right'] .minuteselect`
    },
    popup: {
        filterFileId: `button:nth-child(3) > p`,
        filterType: `div[class*='Filters_popup__'] > button:nth-child(3)`,
        fileTypeByCss: `button:nth-child(1) > p`,
        riskByCss: `button:nth-child(2) > p`,
        filterFileOutcomes: `div[class*='Filters_popup__'] > button:nth-child(2)`,
        filterMenu: `div[class*='Filters_popup__']`,
        filterMenuByTxt: `//div[@id='root']/div/div/section/div/div[3]`,
        filetypesPopup: `.MuiFormControl-root:nth-child(6) > .MuiFormGroup-root`
    },
    containers: {
        appliedFilterFamily: `div[class^=SelectedFilter_SelectedFilter__]`,
        appliedFilters: `div[class*=Filters_filters__] > div`,
        appliedFiltersFooter: `div[class*='SelectedFilter_footer__'] > span`,
        filters: `div[class*='Filters_wrap__']`
    },
    modal: {
        modalHeader: `section[class*='FileInfo_FileInfo__'] > header`,
        cmpDetailsBanner: `//*[starts-with(@class,"FileInfo_inner")]//div[contains(text(),'Content Management Policy')]`,
        sanitisationItemsBanner: `//*[starts-with(@class,"FileInfo_inner")]//div[contains(text(),'Sanitisation Items')]`,
        issueItemsBanner: `//*[starts-with(@class,"FileInfo_inner")]//div[contains(text(),'Issue Items')]`,
        remedyItemsBanner: `//*[starts-with(@class,"FileInfo_inner")]//div[contains(text(),'Remedy Items')]`,
        fileDetailModal: `section[class^='Modal_Modal']`,
        itemHeaders: `//thead[contains(@class, "MuiTableHead-root")]`
    },

    //Methods

    /*
     * General
     * ***************************************************************
     */
    clickAddFilterButton() {
        const mainEl = this.containers.filters;
        within(mainEl, () => {
            I.waitForClickable(this.buttons.addFilterBytxt)
            I.retry(2).click(this.buttons.addFilterBytxt);
        })
    },

    clickMoreFiltersButton() {
        const mainEl = this.containers.filters;
        within(mainEl, () => {
            I.retry(2).click(locate(this.buttons.moreFilters));
        })
    },

    closeFilterPopup() {
        I.moveCursorTo('p[data-test-id="navLinkRequestHistory"]');
    },

    selectCountOfFiles(itemCount) {
        const element = this.options.countOfFiles;
        I.clickElement(element);
        I.selectOption(element, itemCount);
    },

    removeAppliedFilter(filterName) {
        I.click(`//span[contains(., '` + filterName + `')]/parent::*/../div/button`);

    },

    /*
     * Datetimepicker
     * ***************************************************************
     */
    async getDatetimepicker() {
        const element = this.calendar.dateTimePicker;
        return await I.grabAttributeFrom(element, jsonValue());
    },

    setDatetimepicker(value) {
        const element = this.calendar.dateTimePicker;
        I.fillField(element, value);
    },

    openDatePicker() {
        const element = this.calendar.reportRange;
        I.waitForVisible(element, 30)
        I.click(element).catch(() => I.say(element + ' is not clickable'));
    },

    selectTimePeriod(period) {
        try {
            if (period === '1 Hour') {
                I.click(this.buttons.time_1hour);
            } else if (period === '12 Hours') {
                I.click(this.buttons.time_12hours);
            } else if (period === '24 Hours') {
                I.click(this.buttons.time_24hours);
            } else {
                I.say("Unable to find the required option");
            }
            I.waitForVisible(this.table.tableHeaders, 30)
        } catch (e) {
            I.say('Action unsuccessful')
            console.warn(e);
        }
    },

    getMonthName(monthNumber) {
        let monthName;
        switch (monthNumber) {
            case '01':
                monthName = 'JAN'
                break;
            case '02':
                monthName = 'FEB'
                break;
            case '03':
                monthName = 'MAR'
                break;
            case '04':
                monthName = 'APR'
                break;
            case '05':
                monthName = 'MAY'
                break;
            case '06':
                monthName = 'JUN'
                break;
            case '07':
                monthName = 'JUL'
                break;
            case '08':
                monthName = 'AUG'
                break;
            case '09':
                monthName = 'SEP'
                break;
            case '10':
                monthName = 'OCT'
                break;
            case '11':
                monthName = 'NOV'
                break;
            case '12':
                monthName = 'DEC'
                break;
            default:
                console.log(`Sorry, ${monthNumber} is not a month number`);
        }
        return monthName
    },

    parseDate(date) {
        const dateTimeArray = date.split(' ');
        const dateArray = dateTimeArray[0].split('/');
        const timeArray = dateTimeArray[1].split(':');
        const [hours, minutes] = timeArray
        const [day, month, year] = dateArray
        return {
            day,
            month,
            year,
            hours,
            minutes
        }
    },

    async selectMonthYear(month, year) {
        let currentYearAndMonthValueLeft = await I.grabTextFrom(this.calendar.drp_month_and_year_left)
        let currentYearAndMonthValueRight = await I.grabTextFrom(this.calendar.drp_month_and_year_right)
        while (currentYearAndMonthValueLeft !== `${month} ${year}` && currentYearAndMonthValueRight !== `${month} ${year}`) {
            await I.click(this.calendar.drp_arrow_left).catch(() => I.say(this.calendar.drp_arrow_left + 'is not clickable'))
            currentYearAndMonthValueLeft = await I.grabTextFrom(this.calendar.drp_month_and_year_left)
        }
        return currentYearAndMonthValueRight
    },

    async getRightMonth(month, year) {
        const currentYearAndMonthValueRight = await this.selectMonthYear(month, year);
        return currentYearAndMonthValueRight.split(" ")[0]
    },

    async selectCustomPriod() {
        const calendar = await I.grabNumberOfVisibleElements(this.calendar.drp_calendar_left)
        if (!calendar) {
            const element = this.buttons.customRange;
            await I.click(element).catch(() => I.say(element + 'is not clickable'));
        }
    },

    async setTimeFromEarleirOn(earleirOnMinutes) {
        let hours = Number(await I.grabTextFrom(this.calendar.drp_selected_hours_left))
        let minutes = Number(await I.grabTextFrom(this.calendar.drp_selected_minutes_left))
        if (minutes - earleirOnMinutes < 0) { // TODO: the issue with hour and date for midnight
            minutes = 60 - earleirOnMinutes
        } else {
            hours = hours + 1
            minutes = minutes - earleirOnMinutes
            I.selectOption(this.calendar.drp_hour_left, hours.toString());
        }
        I.selectOption(this.calendar.drp_minutes_left, minutes.toString());
        I.click(this.buttons.apply)
    },

    async setTimeFrom(datetimeFrom) {
        await this.selectCustomPriod()
        const from = this.parseDate(datetimeFrom)
        from.month = this.getMonthName(from.month);
        const selectedRightMonth = await this.getRightMonth(from.month, from.year)
        if (selectedRightMonth === from.month) {
            I.click(locate(this.calendar.drp_day_right).withText(from.day))
        } else {
            I.click(locate(this.calendar.drp_day_left).withText(from.day))
        }
        I.selectOption(this.calendar.drp_hour_left, from.hours);
        I.selectOption(this.calendar.drp_minutes_left, from.minutes);
    },

    async setTimeTo(datetimeFrom, datetimeTo) {
        const to = this.parseDate(datetimeTo)
        to.month = this.getMonthName(to.month);
        const from = this.parseDate(datetimeFrom)
        from.month = this.getMonthName(from.month);
        const selectedRightMonth = await this.getRightMonth(from.month, from.year)
        if (selectedRightMonth === to.month) {
            I.click(locate(this.calendar.drp_day_right).withText(to.day))
        } else {
            I.click(locate(this.calendar.drp_day_left).withText(to.day))
        }
        I.selectOption(this.calendar.drp_hour_right, to.hours);
        I.selectOption(this.calendar.drp_minutes_right, to.minutes);
    },

    async unableSetTimeTo(datetimeTo) {
        const to = this.parseDate(datetimeTo)
        to.month = this.getMonthName(to.month);
        let selectedRightMonth = await I.grabTextFrom(this.calendar.drp_month_and_year_right);
        selectedRightMonth = selectedRightMonth.split(" ")[0];
        let el;
        if (selectedRightMonth === to.month) {
            el = locate(this.calendar.drp_day_right).withText(to.day);
        } else {
            el = locate(this.calendar.drp_day_left).withText(to.day);
        }
        const classes = await I.grabAttributeFrom(el, 'class');
        if (!classes.includes('disabled') && !classes.includes('all')) {
            assert.fail(`It's possible to select more than 24 houts range - ${datetimeTo}`)
        }
    },

    async setTimePeriod(datetimeFrom, datetimeTo) {
        const element = this.buttons.customRange;
        I.click(element).catch(() => I.say(element + 'is not clickable'));
        try {
            await this.setTimeFrom(datetimeFrom)
            await this.setTimeTo(datetimeFrom, datetimeTo)
            I.click(this.buttons.apply)
            I.waitForElement(this.table.tableHeaders,60)
        } catch (e) {
            I.say('Action unsuccessful')
            console.warn(e);
        }
    },

    async getTimeFrom() {
        let startime = null;
        let range = await I.grabTextFrom(this.calendar.reportRange);
        startime = range.split("-")
        return startime;
    },

    async getTimeTo() {
        let endtime = null;
        let range = await I.grabTextFrom(this.calendar.reportRange);
        endtime = range.split("-")
        return startime;
    },

    async isCustomRangeApplied(dateFrom, dateTo) {
        // const element = null;
        const range = (dateFrom + " - " + dateTo).toString();
        const newrange = await I.grabTextFrom(this.calendar.reportRange)
        if (newrange === range) {
            I.say('The required range is applied ' + newrange + ' as selected ' + range)
        } else {
            I.say('The required range is not applied-- displayed range is ' + newrange + ' different to selected ' + range)
        }
    },

    setCustomRange(dateFrom, dateTo) {
        const start = this.setTimeFrom(dateFrom);
        const end = setTimeTo(dateTo);
        const range = moment.range(start, end);
        range.format()
    },

    async getSelectedRange() {
        const element = this.calendar.reportRange;
        await I.grabTextFrom(element);
    },

    isTimeApplied(start, end) {
        let time = null;
        if (end === 'current time') {
            time = moment();
        } else {
            time = end;
        }
        const currentTime = time.subtract(0, 'h').format('DD/MM/YYYY H:mm A')
        const timeFrom = time.subtract(start, 'h').format('DD/MM/YYYY H:mm A');
        //   I.seeInField(this.calendar.dateTimePickerText,  timeFrom + ` - ` + currentTime);
        //const range = (timeFrom + " - " + currentTime).toString();
        //  I.see(timeFrom + ` - ` + currentTime)
        I.seeElement(`//span[contains(.,'` + timeFrom + ` - ` + currentTime + `')]`)
    },


    getCurrentTime() {
        var currentTime = moment();
        return currentTime;
    },

    getRequiredTime(datetimeTo) {
        let time = null;
        try {
            if (datetimeTo === 'current time') {
                time = this.getCurrentTime();
            } else {
                time = datetimeTo
            }
        } catch (e) {
            I.say('errors')
            console.warn(e);
        }
        return time;
    },

    getPastPeriod(time) {
        const now = this.getCurrentTime();
        const pastPeriod = now.subtract(time, 'h')
        return pastPeriod;
    },

    async isDataAvailable() {
        const table = this.table.fileTableBody;
        try {
            const element = await I.grabNumberOfVisibleElements(this.table.emptyTableNotification);
            if (element) {
                I.say("No Transaction Data Found")
                return false;
            } else {
                I.say("The table data is available")
                return true;
            }
        } catch (e) {
            I.say('errors')
            console.warn(e);
        }
    },

    async isDataReturned() {
        I.waitForInvisible(this.table.loading)
        const isErr = await I.grabNumberOfVisibleElements(`//tbody/descendant::h2`)
        if (isErr) {
            const text = await I.grabTextFrom(`//tbody/descendant::h2`)
            if (text === 'Error Getting Transaction Data') {
                I.say(text)
                assert.fail(text)
            }
            if (text === 'No Transaction Data Found') {
                return text
            }
        }
    },

    async isDataDisplayed(range, col, check, isFailIfNoData) {
        try {
            const noData = await this.isDataReturned()
            if (noData) {
                if (isFailIfNoData) {
                    assert.fail(noData)
                }
                I.say(noData)
            } else {
                I.say("Data is available")
                await check(range, col)
            }
        } catch (err) {
            assert.fail(err);
        }
    },

    async isDataDisplayedByFileId(range, col, fileId, check, isFailIfNoData) {
        try {
            const noData = await this.isDataReturned()
            if (noData) {
                if (isFailIfNoData) {
                    assert.fail(noData)
                }
                I.say(noData)
            } else {
                I.say("Data is available")
                await check(range, col, fileId)
            }
        } catch (err) {
            assert.fail(err);
        }
    },

    async isDataInRange(range, col) {
        await this.isDataDisplayed(range, col, I.checkIfReturnedFilesInDateRange);
    },

    async checkRows(val, col) {
        await this.isDataDisplayed(val, col, I.checkRowsValue);
    },

    async checkRowByFileId(val, col, fileId, isFailIfNoData) {
        await this.isDataDisplayedByFileId(val, col, fileId, I.checkRowValueByFileId, isFailIfNoData);
    },

    /*
     * File Type Filtering
     * ***************************************************************
     */

    clickFileTypeAdd() {
        const mainEl = this.popup.filterMenu;
        try {
            within(mainEl, () => {
                I.retry(2).click(this.popup.fileTypeByCss);
            })
        } catch (e) {
            I.say('Unable to click on locator')
            console.warn(e);
        }
    },
    clickFileOutcomeAdd() {
        const mainEl = this.popup.filterMenu;
        try {
            within(mainEl, () => {
                I.retry(2).click(this.popup.riskByCss);
            })
        } catch (e) {
            I.say('Unable to click on locator')
            console.warn(e);
        }
    },


    selectFileType(value) {
        this.clickFileTypeAdd();
        try {
            I.say('Filter to set is: ' + value)
            let element = `//span[contains(.,'` + value + `')]/parent::label/span[1]/span/input`
            I.clickElement(element);
            this.closeFilterPopup();
            I.wait(5);
        } catch (e) {
            I.say('Unable to click on locator ' + element)
            console.warn(e);
        }
    },
    selectFileOutcome(value) {
        this.clickFileOutcomeAdd();
        try {
            I.say('Filter to set is: ' + value)
            let element = `//label/span[text()='` + value + `']`;
            I.clickElement(element);
            this.closeFilterPopup();
            I.wait(5);
        } catch (e) {
            I.say('Unable to click on locator ' + element)
            console.warn(e);
        }
    },

    async checkResultFileTypesAreAccurate(filteredFile, col) {
        try {
            const text = await I.grabTextFrom(`//tbody`);
            if (text === 'No Transaction Data Found') {
                I.say('No data returned')
            } else {
                I.say("Data is available")
                await this.checkRows(filteredFile, col)
            }
        } catch (e) {
            I.say('errors')
            console.warn(e);
        }
    },

    async verifyResultIsAccurate(filter) {
        let col;
        try {
            await this.isDataReturned()
            I.say("Data is available")
            col = this.getAppliedFilter(filter)
            await this.checkRows(filter, col)
        }
        catch (e) {
            assert.fail(e)
        }
    },

    checkFilters(appliedFilters, filterValues) {
        const filterRes = appliedFilters.split("_");
        const res = filterValues.split("_");
        for (let i = 0; i < filterRes.length; i++) {
            let filterValueLocator = `//div/span[contains(.,'` + filterRes[i] + `')]`;
            this.checkFilterByValue(res[i], filterValueLocator);
        }
    },

    checkFilterByValue(value, locator) {
        I.seeTextEquals(value, locator);
    },

    checkFileValues(filteredFile) {
        const res = filteredFile.split("_");
        const row = locate('tbody').find('tr').find('td:nth-child(3)').toXPath();
        I.seeInField(row, res[1]);
    },

    async checkFileTypeValues(filteredFile) {
        await this.checkRows(filteredFile, 3)
    },
    async checkFileOutcomeValues(filteredFile) {
        await this.checkRows(filteredFile, 4);
    },

    async checkFileTypeValueByFileId(filteredFile, fileId, isFailIfNoData) {
        await this.checkRowByFileId(filteredFile, 3, fileId, isFailIfNoData)
    },
    async checkFileOutcomeValueByFileId(filteredFile, fileId, isFailIfNoData) {
        await this.checkRowByFileId(filteredFile, 4, fileId, isFailIfNoData);
    },

    applyMultipleFilters(riskFilter, typeFilter) {
        this.clickMoreFiltersButton();
        this.clickAddFilterButton();
        this.selectFileOutcome(riskFilter);

        this.clickAddFilterButton();
        this.selectFileType(typeFilter);
    },

    getAppliedFilter(res) {
        let col;
        if (res === 'Safe') {
            col = 4;
        } else col = 3;
        return col;
    },

    /*
     * File ID Filtering
     * ***************************************************************
     */
    setFileId(value) {
        this.clickMoreFiltersButton();
        this.clickAddFilterButton();
        I.click(this.buttons.fileIdMenu);
        I.fillField(this.fields.inputFilterFileID, value);
        I.click(this.buttons.fileIdAdd);
       
    },

    filterByFileId(fileId) {
        this.setFileId(fileId);
        I.click(this.buttons.fileIdAdd);
    },

    filterByFileId(fileId) {
        this.setFileId(fileId);
        I.click(this.buttons.fileIdAdd);
    },
    async checkFileIdValues(filteredFile) {
        I.wait(5)
        await this.checkRows(filteredFile, 2)
    },

    /*
     * Pagination
     * ***************************************************************
     */
    clickFirst() {
        const element = this.buttons.firstPage;
        I.clickElement(element);
    },

    clickPrevious() {
        const element = this.buttons.previousPage;
        I.clickElement(element);
    },

    clickLast() {
        const element = this.buttons.lastPage;
        I.clickElement(element);
    },

    clickNext() {
        const element = this.buttons.nextPage;
        I.clickElement(element);
    },

    setCustomPage(value) {
        const element = this.fields.customPaginatorGoTo;
        I.fillField(element, value);
    },

    clickGo() {
        const element = this.buttons.go;
        I.clickElement(element);
    },

    /*
     * Opening file details
     * ***************************************************************
     */

    getFileRecord(fileId) {
        return "//tr[contains(., '" + fileId + "')]"
    },

    getFileRecordByTypeAndRisk(type, risk) {
        return `//tbody/tr[1]//th[contains(., '${type}')]/../th[contains(., '${risk}')]`
    },

    async verifyFileRecord(fileId) {
        await I.seeElementExist(this.getFileRecord(fileId))
    },

    verifyFileRecordByTypeAndRisk(type, risk) {
        I.seeElementExist(this.getFileRecordByTypeAndRisk(type, risk))
    },

    async getIdByTypeAndRisk(type, risk) {
        const el = this.getFileRecordByTypeAndRisk(type, risk)
        return await I.grabTextFrom(`${el}/../th[2]`)
    },

    openFileRecord(fileId) {
        I.click(this.getFileRecord(fileId))
    },

    async openExistingFileRecord() {
        I.clickRecord(2)
    },

    isFileDetailModalOpened() {
        const element = this.modal.fileDetailModal;
        I.waitForVisible(element)
    },


    checkFileDetailViewId(fileId) {
        const el = this.modal.fileDetailModal;
        if (I.seeElementExist(el) === true) {
            within(this.modal.modalHeader, () => {
                I.see(fileId);
            })
        }
    },

    isIssueItemsSectionAvailable() {
        const el = I.getModal(this.modal.fileDetailModal)
        //;
        if (I.seeElementExist(el) === true) {
            within(this.modal.fileDetailModal, () => {
                const element = this.modal.issueItemsBanner;
                I.seeElementExist(element)
            });
        }
    },

    isRemedyItemsSectionAvailable() {
        const el = this.modal.fileDetailModal;
        if (I.seeElementExist(el) === true) {
            within(this.modal.fileDetailModal, () => {
                const element = this.modal.remedyItemsBanner;
                I.seeElementExist(element)
            });
        }
    },

    async isCmpSectionAvailable() {
        const el = this.modal.fileDetailModal;
        (await I.seeElementExist(el) !== true) ? assert.fail('No modal window is displayed!') : output.log('Modal window is displayed');
        const elBanner = this.modal.cmpDetailsBanner;
        (await I.seeElementExist(elBanner) !== true) ? assert.fail('No Content Management Policy is displayed!') : output.log('Content Management Policy is displayed');
    },

    async isSanitisationItemsShowsDescription(description) {
        const el = this.modal.fileDetailModal;
        (await I.seeElementExist(el) !== true) ? assert.fail('No modal window is displayed!') : output.log('Modal window is displayed');
        const elBanner = this.modal.sanitisationItemsBanner;
        (await I.seeElementExist(elBanner) !== true) ? assert.fail('No Sanitisation Items are displayed!') : I.click(elBanner);
        const items = `${this.modal.sanitisationItemsBanner}${this.modal.itemHeaders}`
        I.waitForVisible(items)
        const elDescription = `//*[starts-with(@class,"FileInfo_inner")]//div[contains(text(),"Sanitisation Items")]//table//td[contains(text(),"${description}")]`;
        (await I.seeElementExist(elDescription) !== true) ? assert.fail(`No ${description} is displayed!`) : output.log(`${description} is displayed`);
    },

    async isIssueItemsSectionShowsDescription(description) {
        const el = this.modal.fileDetailModal;
        (await I.seeElementExist(el) !== true) ? assert.fail('No modal window is displayed!') : output.log('Modal window is displayed');
        const elBanner = this.modal.issueItemsBanner;
        (await I.seeElementExist(elBanner) !== true) ? assert.fail('No Issue Items are displayed!') : I.click(elBanner);
        const items = `${this.modal.issueItemsBanner}${this.modal.itemHeaders}`
        I.waitForVisible(items)
        const elIssue = `//*[starts-with(@class,"FileInfo_inner")]//div[contains(text(),"Issue Items")]//table//td[contains(text(),"${description}")]`;
        (await I.seeElementExist(elIssue) !== true) ? assert.fail(`No ${description} is displayed!`) : output.log(`${description} is displayed`);
    },

    async isRemedyItemsShowsDescription(description) {
        const el = this.modal.fileDetailModal;
        (await I.seeElementExist(el) !== true) ? assert.fail('No modal window is displayed!') : output.log('Modal window is displayed');
        const elBanner = this.modal.remedyItemsBanner;
        (await I.seeElementExist(elBanner) !== true) ? assert.fail('No Remedy Items are displayed!') : I.click(elBanner);
        const items = `${this.modal.remedyItemsBanner}${this.modal.itemHeaders}`
        I.waitForVisible(items)
        const elDescription = `//*[starts-with(@class,"FileInfo_inner")]//div[contains(text(),"Remedy Items")]//table//td[contains(text(),"${description}")]`;
        (await I.seeElementExist(elDescription) !== true) ? assert.fail(`No ${description} is displayed!`) : output.log(`${description} is displayed`);
    },

    async clickOnTimestampArrow() {
        const element = this.buttons.sortTimestamp;
        await I.clickElement(element);
    },

    async verifyTimestampArrow(isDecimal) {
        const el = this.buttons.sortTimestamp;
        const classes = await I.grabAttributeFrom(el, 'class');
        let logic;
        if (isDecimal) {
            logic = (classes.includes('MuiTableSortLabel-iconDirectionDesc') && !classes.includes('MuiTableSortLabel-iconDirectionAsc'))
        } else {
            logic = (classes.includes('MuiTableSortLabel-iconDirectionAsc') && !classes.includes('MuiTableSortLabel-iconDirectionDesc'))
        }
        if (!logic) {
            assert.fail('Reverse timestamp arrow is displayed')
        }
    },
    async checkRequiredSectionsAreAvailable() {
        const el = this.modal.fileDetailModal;
        (await I.seeElementExist(el) !== true) ? assert.fail('No modal window is displayed!') : output.log('Modal window is displayed');
        const iBanner = this.modal.issueItemsBanner;
        (await I.seeElementExist(iBanner) !== true) ? I.say('Issue Items are not available') : I.say('Issue Items section is available');
        const rBanner = this.modal.remedyItemsBanner;
        (await I.seeElementExist(rBanner) !== true) ? I.say('Remedy Items section is not available') : I.say('Remedy Items section is available');
        const sBanner = this.modal.sanitisationItemsBanner;
        (await I.seeElementExist(sBanner) !== true) ? I.say('Sanitisation Items section is not displayed!') : I.say('Sanitisation Items section is displayed!');
    },

};
