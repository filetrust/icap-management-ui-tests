const MyHelper = require("../utils/helper");
const moment = require('moment');
const assert = require('assert');
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
    },
    table: {
        fileTableBody1: `th[class*='MuiTableCell-root MuiTableCell-body']`,
        dataTransactionInfo: `//h2[contains(.,'No Transaction Data Found')]`,
        historyTable: `div[class*='RequestHistory_wrapTable__']`,
        fileTableBody: `tbody[class*='MuiTableBody-root']`,
        fileTableBodyRow: `tbody[class*='MuiTableBody-root'] > tr`,
        file: `tr:nth-of-type(2)`,
        emptyTableNotification: `//td[contains(.,'No Transaction Data Found')]`,

    },
    calendar: {
        dateTimePicker: `div[class*='daterangepicker']`,
        dateTimePickerText: `div[id*='reportrange'] > span`,
        drp_calendar_left: `div[class*='drp-calendar left']`,
        drp_calendar_right: `div[class*='drp-calendar right']`,
        reportRange: `div[id*='reportrange']`,
        drp_selected: `span.drp-selected`,
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
        cmpDetailsBanner: `div[class*='FileInfo_inner__'] > div:nth-of-type(5) > div > label`,
        issueItemsBanner: `.FileInfo_block__:nth-child(2) .MuiFormControlLabel-root`,
        sanitisationItemsBanner: `div[class*='FileInfo_inner__'] > div:nth-of-type(3)`,
        remedyItemsBanner: `div[class*='FileInfo_inner__'] > div:nth-of-type(4)`,
        fileDetailModal: `.Modal_Modal__RCeBB`,
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
        I.moveCursorTo('#root');
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
        I.click(element).catch(() => I.say(element + 'is not clickable'));
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

    setTimeTo(dateTo) {
        const element = this.calendar.dateTimePicker;
        within(element, () => {
            if (dateTo === 'current time') {
                I.type(this.getCurrentTime());
            } else {
                I.type(dateTo);
            }
        })
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
                return false;
                I.say("No Transaction Data Found")
            } else {
                return true;
                I.say("The table data is available")
            }
        } catch (e) {
            I.say('errors')
            console.warn(e);
        }
    },

    async isDataInRange(range, col) {
        try {
            const el = await I.grabNumberOfVisibleElements(this.table.emptyTableNotification);
            if (el || el.length > 0) {
                I.say('No Transaction Data Found')
            } else {
                I.say("Data is available")
                I.checkIfReturnedFilesInDateRange(range, col)
            }
        } catch (e) {
            console.warn(e);
        }
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
                I.checkRow(filteredFile, col)
            }
        } catch (e) {
            I.say('errors')
            console.warn(e);
        }
    },



    async verifyResultIsAccurate(filter) {
        let col;
        let text;
        try {
            if (I.seeNumberOfElements(`//tbody/descendant::h2`, 1)) {
                I.grabTextFrom(`//tbody/descendant::h2`).then((value) => {
                    I.say(value);
                    text = value;
                    if (text === 'Error Getting Transaction Data' || text === 'No Transaction Data Found') {
                        I.say('No data returned');
                    }
                });
            }
            else {
                Promise.all([
                    I.say("Data is available"),
                    col = this.getAppliedFilter(filter),
                    I.checkRow(filter, col),
                ]);
            }
        }
        catch (e) {
            I.say('errors')
            console.warn(e);
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
        I.checkRow(filteredFile, 3)
    },
    async checkFileOutcomeValues(filteredFile) {
        I.checkRow(filteredFile, 4);

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
        this.closeFilterPopup();
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
        I.checkRow(filteredFile, 2)
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

    openFileRecord(fileId) {
        I.click(this.getFileRecord(fileId))
    },

    async openAFileRecord() {
        I.clickRecord(2)
        //     this.openDatePicker();
        //     this.selectTimePeriod('24 Hours')
        //      try {
        //     const element = await I.grabNumberOfVisibleElements(this.table.emptyTableNotification);
        //     //if (element || element.length >= 0) {
        //         const text = await I.grabTextFrom(`//tbody`);
        //        if (text === 'No Transaction Data Found' || text === 'Error Getting Transaction Data'){
        //         I.say('No Transaction Data Found')
        //     } else {
        //         I.say("Transaction Data is available")

        //     }
        // } catch (e) {
        //     console.warn(e);
        // }
    },

    isFileDetailModalOpened() {
        const element = this.modal.fileDetailModal;
        //;
        // I.getModal(element);
        //I.getModal(element)
        I.seeElementExist(element)

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

    isCmpSectionAvailable() {
        const el = this.modal.fileDetailModal;
        if (I.seeElementExist(el) === true) {
            within(el, () => {
                const element = this.modal.cmpDetailsBanner;
                I.seeElementExist(element)
            });
        }
    },

    isSanitisationItemsSectionAvailable() {
        const el = this.modal.fileDetailModal;
        if (I.seeElementExist(el) === true) {
            within(this.modal.fileDetailModal, () => {
                const element = this.modal.sanitisationItemsBanner;
                I.seeElementExist(element)
            });
        }
    },


};