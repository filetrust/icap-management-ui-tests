const MyHelper = require("../utils/helper");
const { I } = inject();

module.exports = {

    //Locators   

    inputs: {
        dateFilter: 'div[data-test-id="dateRangePicker"] > span',
        reportrange: `div[id='reportrange'] > span`,
    },
    sections: {
        dashboard_innerTop: `div[class*='Analytics_innerTop__']`,
        dashboard_lineChart: `div[class*='Analytics_lineChart__']`,
        totalFilesProcessed: `div[class*='Analytics_infoBlocks__'] > div:nth-of-type(1)`,
        maxFilesProcessed: `div[class*='Analytics_infoBlocks__'] > div:nth-of-type(3)`,
        totalIcapProcessed: `div[class*='Analytics_infoBlocks__'] > div:nth-of-type(2)`,
        countTotalProcessed: `div[class*='Analytics_infoBlocks__'] > div:nth-of-type(1) > span`,
        countMaxProcessed: `div[class*='Analytics_infoBlocks__'] > div:nth-of-type(2) > span`,
        countIcapRequests: `div[class*='Analytics_infoBlocks__'] > div:nth-of-type(3) > span`,

    },
    calendar: {
        daterangepicker: `div[class*='daterangepicker']`,
        //daterangeselected: `span[class*='drp-selected']`,
        cancelBtn: `button[class*='cancelBtn']`,
        applyBtn: `button[class*='applyBtn']`,
        next: `th[class*='next']`,
        prev: `th[class*='prev']`,
        startHourDropdown: `//div[@class='drp-calendar left']/descendant::select[@class='hourselect']`,
        startMinsDropdown: `//div[@class='drp-calendar left']/div[@class='calendar-time']/select[@class='minuteselect']`,
        startPeriodDropdown: `//div[@class='drp-calendar left']/div[@class='calendar-time']/select[@class='ampmselect']`,
        endHourDropdown: `//div[@class='drp-calendar right']/div[@class='calendar-time']/select[@class='hourselect']`,
        endMinsDropdown: `//div[@class='drp-calendar right']/div[@class='calendar-time']/select[@class='minuteselect']`,
        endPeriodDropdown: `//div[@class='drp-calendar right']/div[@class='calendar-time']/select[@class='ampmselect']`,
        startMonth: `//div[@class='drp-calendar left']/descendant::th[@class="month"]`,
    },
    button: {
        datetime: `div[data-test-id="dateRangePicker"] > span`
    },
    popup: {
        timeIntervalPopup: 'div[class^=Popup_Popup__]'
    },
    legend: {
        safe: `//span[contains(.,'Safe')]`,
        blocked: `//span[contains(.,'Blocked')]`,
        dangerous: `//span[contains(.,'Dangerous')]`,
        unclassified: `//span[contains(.,'Unclassified')]`,
        checked: `//span[contains(.,'Checked')]`,
        legendList: `//li[contains(@class,'legend-item-')]`,
        rechart_sector: `path.recharts-sector`,
        rechart_line: `path.recharts-curve.recharts-line-curve`,
        riskLabels: `g[class*='recharts-pie-labels']`,
        rechartsTwo: `div[data-test-id='pieChart'] > div > svg`,
        rechartsOne: `div[data-test-id='lineChart'] > div > div > svg`,
        label_Safe: `path[fill*='#91CAA8']`,
        label_AllowedByNCFS: `path[fill*='#85B5D5']`,
        label_BlockedByNCFS: `path[fill*='#D47779']`,
        label_BlockedByPolicy: `path[fill*='#DF9F81']`,
        label_AllowedByPolicy: `path[fill*='#91E1F3']`,
    },

    date:locale = {
        en: {
            month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    },

    //class="recharts-layer"

    //Methods

    /*
     * Getters
     * ***************************************************************
     */

    async getTotalFileProcessed() {
        const element = this.sections.countTotalProcessed;
        let count = parseInt(await I.grabTextFrom(element));
        return count;
    },

    async getMaxFileProcessed() {
        const element = this.sections.countMaxProcessed;
        let count = parseInt(await I.grabTextFrom(element));
        return count;
    },

    async getTotalIcapRequests() {
        const element = this.sections.countIcapRequests;
        let count = parseInt(await I.grabTextFrom(element));
        return count;
    },


    /*
     * Risk filtering
     * ***************************************************************
     */
    filterByRisk(chart, fileRisk) {
        let risk = fileRisk.trim();
        let element = this.getChartElement(chart)
        within(element, () => {
                I.click("//span[contains(.,'" + risk + "')]")
                    .catch(() =>  I.say('Required options not found'));
        })
    },

    getChartElement(chart) {
        let element = null;
        if (chart === 'pie'.trim()) {
            element = this.legend.rechartsTwo;
        } else {
            element = this.legend.rechartsOne;
        }
        return element;
    },

    async getRiskSector(risk) {
        let element = this.legend.rechart_sector;
        let sector = null;
        this.filterByRisk(element, risk);
        within(element, () => {
            try {
               sector = this.legend.label_ + risk
            } catch (e) {
                I.say('errors, sector element not found')
                console.warn(e);
            }
        })
        return sector;
    },

    async getRiskMetricsCount(risk) {
        let count = 0;
        let element = this.legend.rechart_sector;
        this.filterByRisk(element, risk);
        within(element, async () => {
            try {
            count = await I.grabValueFrom(this.legend.label_+ risk)
            } catch (e) {
                I.say('errors, unable to retrieve value')
                console.warn(e);
            }})
        return count;
    },

    async getCountOfSectors(chart) {
        let countsectors = null;
        if (chart === 'pie'.trim()) {
            countsectors = await I.grabNumberOfVisibleElements(this.legend.rechart_sector);
        } else {
            countsectors = await I.grabNumberOfVisibleElements(this.legend.rechart_line);
        }
        return countsectors;
    },

    async assertFilteredRisk(chart, riskLabel) {
        let element = this.getChartElement(chart);
        let label = riskLabel.trim();
        try {
            within(element, async () => {
                let countsectors = null;
                if (chart === 'pie'.trim()) {
                    countsectors = await I.grabNumberOfVisibleElements(this.legend.rechart_sector);
                } else {
                    countsectors = await I.grabNumberOfVisibleElements(this.legend.rechart_line);
                }
                I.assertEqual(countsectors, 1, "The number of filtered risks displayed (" + countsectors + ") is NOT as expected")
                if (riskLabel === 'Safe') {
                    I.seeElement(this.legend.label_Safe)
                } else if (label === 'Allowed By NCFS') {
                    I.seeElement(this.legend.label_AllowedByNCFS)
                } else if (label === 'Blocked By NCFS') {
                    I.seeElement(this.legend.label_BlockedByNCFS)
                } else if (label === 'Blocked By Policy') {
                    I.seeElement(this.legend.label_BlockedByPolicy)
                } else if (label === 'Allowed By Policy') {
                    I.seeElement(this.legend.label_AllowedByPolicy)
                } else {
                    I.say('Required options not found')
                }
            })
        } catch (e) {
            I.say('errors')
            console.warn(e);
        }
    },

    /*
     * Datetime
     * ***************************************************************
     */

    selectTimeInterval(timeInterval) {
        I.click(this.buttons.datetime);
        I.click("li[data-range-key='"+ timeInterval + "']");
    },

    setCustomTimeRange(start, end){
       const startArr = start.split(" ");
       const startTime = startArr[1];
       const startTimePeriod = startArr[2];
       this.setTime(startTime, startTimePeriod, "start");

       //21/09/2020
       let startDate = startArr[0].split("/");
        const day = startDate[0];
        const month = startDate[1];
        const year = startDate[2];
        this.setMonthYear(month, year);

    },

    setMonthYear(month, year){
        const monthNamesShort = this.date.en.month_names_short;
        const givenDate = monthNamesShort[month-1] + " " + year;
        let calendarDate =  I.grabTextFrom(this.calendar.startMonth);
        let calendarMonth = calendarDate.split(" ")[0];
        let monthNumber = 1;
        for (let i = 0; i < monthNamesShort.length; i++) {
            if (calendarMonth===monthNamesShort[i]) {
                monthNumber=i;
                break;
            }
        }
        if (monthNumber>month) {
            I.click("//div[@class='drp-calendar left']/descendant::th[@class=''prev available']")
        }
//todo: describe other variants
    },
    setTime(time, timePeriod, flag){
        switch (flag){
            case("start"):
                this.setStartTime(time, timePeriod);
                break;
            case("end"):
                this.setEndTime(time, timePeriod);
                break;
            default:
                I.say("No such element");
        }
    },

    setStartTime(startTime, startTimePeriod){
        const startHourDropdown = this.calendar.startHourDropdown;
        const startMinsDropdown = this.calendar.startMinsDropdown;
        const startPeriodDropdown = this.calendar.startPeriodDropdown;

        this.setTimeDropdowns(startTime, startTimePeriod, startHourDropdown, startMinsDropdown, startPeriodDropdown);
    },

    setEndTime(endTime, endTimePeriod){
        const endHourDropdown = this.calendar.endHourDropdown;
        const endMinsDropdown = this.calendar.endMinsDropdown;
        const endPeriodDropdown = this.calendar.endPeriodDropdown;

      this.setTimeDropdowns(endTime, endTimePeriod, endHourDropdown, endMinsDropdown, endPeriodDropdown);
    },

    setTimeDropdowns(time, timePeriod, hourDropdown, minsDropdown, startPeriodDropdown) {
        const hourMinsArr = time.split(":");
        this.setValueToDropdown(hourDropdown, hourMinsArr[0]);
        this.setValueToDropdown(minsDropdown, hourMinsArr[1]);
        this.setValueToDropdown(startPeriodDropdown, timePeriod);
    },

    setValueToDropdown(locator, value) {
        I.click(locator);
        I.selectOption(locator, value);
    }, 
    async getValueFromDateTimeInput(element) {
        return await I.grabValueFrom(element);
    },

    clickApply() {
        const element = this.buttons.apply;
        I.click(element);
    },


    async checkDateTimeFilterValues(dateRange) {
        I.seeInField(this.inputs.dateFilter, dateRange);
    },


    //23:00 --> 11:00 PM; 11:00 --> 11:00 AM
    convertTimeFrom24To12(time) {
        let timeArray = time.split(":");
        let hours = parseInt(timeArray[0]);
        let mins = timeArray[1];
        let newTime;
        if (hours > 12) {
            newTime = hours % 12 + ":" + mins + " PM";
        } else {
            newTime = hours + ":" + mins + " AM";
        }
        return newTime;
    }

}
