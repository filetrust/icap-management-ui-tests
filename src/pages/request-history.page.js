const MyHelper = require("../utils/helper");
const moment = require('moment');

const {
    I
} = inject();

module.exports = {
    //Locators

    fields: {
        inputFilterFileID: `input[name='fileId']`,
        customPaginatorGoTo: `input[class*='custom-paginator-goto']`,
    },
    options: {
        countOfFiles: "div[class*='Pagination_pageCountSelector__'] > select"
    },
    buttons: {
        filterArrow: `button[class*='Filters_arrow__']`,
        moreFilters: `button[class*='Filters_moreFilters__']`,
        addFilter: `button[data-test-id='addFilterButton']`,
        dataId_addFilter: `$addFilterButton`,
        addFilterBytxt: "//button[contains(.,'+ Add Filter')]",
        dateTime: `//button[contains(.,'Date/Time')]`,
        time_1hour: `li[data-range-key='1 Hour']`,
        time_12hours: '$12 Hours',
        time_24hours: '$24 Hours',
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
    },
    table: {
        fileTableBody1: `th[class*='MuiTableCell-root MuiTableCell-body']`,
        dataTransactionInfo: `//h2[contains(.,'No Transaction Data Found')]`,
        historyTable: `div[class*='RequestHistory_wrapTable__']`,
        fileTableBody: `tbody[class*='MuiTableBody-root']`,
        fileTableBodyRow: `tbody[class*='MuiTableBody-root'] > tr`
    },
    calendar: {
        dateTimePicker: `div[class*='daterangepicker']`,
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
        modalHeader: `section[class*='FileInfo_FileInfo__1Z457'] > header`,
        cmpDetailsBanner: `div[class*='FileInfo_inner__1NnWT'] > div:nth-of-type(5) > div > label`,
        issueItemsBanner: `.FileInfo_block__3_27q:nth-child(2) .MuiFormControlLabel-root`,
        sanitisationItemsBanner: `div[class*='FileInfo_inner__1NnWT'] > div:nth-of-type(3)`,
        remedyItemsBanner: `div[class*='FileInfo_inner__1NnWT'] > div:nth-of-type(4)`,
        fileDetailModal: `//section[2]/section/div`,
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
        I.click('tbody');
    },

    selectCountOfFiles(itemCount) {
        const element = this.options.countOfFiles;
        I.selectOption(element, itemCount);
    },

    removeAppliedFilter(filterName) {
        const res = filterName.split("_");
        const filterValue = res[1];
        I.click(`//span[contains(., '` + filterValue + `')]/parent::*/../div/button`);

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
            }}catch (e) {
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

   async  isCustomRangeApplied(dateFrom, dateTo) {
       // const element = null;
      const range = (dateFrom + " - " + dateTo).toString();
      const newrange = await I.grabTextFrom(this.calendar.reportRange)
        if (newrange ===range){
            I.say('The required range is applied ' + newrange + ' as selected '+range)
    }else{
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
        var time = null;
        if (end === 'current time') {
            time = moment();
        } else {
            time = datetimeTo
        }
        const currentTime = time.subtract(0, 'h').format('DD/MM/YYYY H:mm A')
        const timeFrom = time.subtract(start, 'h').format('DD/MM/YYYY H:mm A');
        //const range = (timeFrom + " - " + currentTime).toString();
        I.seeElement(`//span[contains(.,'` + timeFrom + ` - ` + currentTime +`')]`)
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

    async isDataAvailable(range) {
        const table = this.table.fileTableBody;
        try {
            const element = await I.grabNumberOfVisibleElements(this.table.dataTransactionInfo);
            if (element) {
                I.say("No Transaction Data Found")
            } else {
                I.say("The table data is available")
            }
        } catch (e) {
            I.say('errors')
            console.warn(e);
        }
    },

    async isDataInRange(range, col) {
           try {
            const text = await I.grabTextFrom(`//tbody`);
            if (text == 'No Transaction Data Found') {
                I.say('No data returned')
                 } else {
                I.say("Data is available")
                I.checkIfReturnedFilesInDateRange(range, col)
           }
        } catch (e) {
            I.say('errors')
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
                I.retry(2).click(this.popup.filterFileOutcomes);
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
            I.click(element);
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
            let element = `//span[text()='`+value+`']`;
            I.click(element);
            this.closeFilterPopup();
            I.wait(5);
        } catch (e) {
            I.say('Unable to click on locator ' + element)
            console.warn(e);
        }
    },

    async checkFileTypeValues(filteredFile, col) {
        I.checkRow(filteredFile, col)
    },

    async verifyResultIsAccurate(filter, col) {
            this.checkRow(filter, col)
    },
    selectCountOfFiles(itemCount) {
        const element = this.options.countOfFiles;
        I.selectOption(element, itemCount);
    },

    async checkFilters(filteredFile) {
        const res = filteredFile.split("_");
        if (res.length === 1) {
            const filterValue = this.containers.appliedFiltersFooter;
            await this.checkFilterByValue(res[0], filterValue);
        } else {
            for (let i = 0; i < res.length; i++) {
                let filterValueLocator = `//div/span[contains(.,'` + res[i] + `')]`;
                await this.checkFilterByValue(res[i].toLowerCase(), filterValueLocator);
            }
        }
    },

    async checkFilterByValue(value, locator) {
        let filterValueText = (await I.grabTextFrom(locator)).toLowerCase();
        I.assert(value, filterValueText);
    },

    checkFileValues(filteredFile) {
        const res = filteredFile.split("_");
        const row = locate('tbody').find('tr').find('td:nth-child(3)').toXPath();
        I.seeInField(row, res[1]);
    },


    async checkFileTypeValues(filteredFile) {
        const table = locate('tbody');
     I.checkRow(filteredFile, 3)
    },
    async checkFileOutcomeValues(filteredFile) {
     I.checkRow(filteredFile, 4);

    },

    /*
     * File ID Filtering
     * ***************************************************************
     */
    setFileId(value) {
        this.clickMoreFiltersButton()
        this.clickAddFilterButton()
        I.click(this.buttons.fileIdMenu);
        I.fillField(this.fields.inputFilterFileID, value);
        I.click(this.buttons.fileIdAdd);
    },

    filterByFileId(fileId) {
        this.setFileId(fileId);
        I.click(this.buttons.fileIdAdd);
    },

    /*
     * Pagination
     * ***************************************************************
     */
    clickFirst() {
        const element = this.buttons.firstPage;
        I.click(element);
    },

    clickPrevious() {
        const element = this.buttons.previousPage;
        I.click(element);
    },

    clickLast() {
        const element = this.buttons.lastPage;
        I.click(element);
    },

    clickNext() {
        const element = this.buttons.nextPage;
        I.click(element);
    },

    setCustomPage(value) {
        const element = this.fields.customPaginatorGoTo;
        I.fillField(element, value);
    },

    clickGo() {
        const element = this.buttons.go;
        I.click(element);
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

    checkFileDetailViewId(fileId) {
        within(this.modal.modalHeader, () => {
            I.see(fileId);
        })
    }
};