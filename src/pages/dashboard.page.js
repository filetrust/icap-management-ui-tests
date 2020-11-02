const {I} = inject();

module.exports = {

//Locators   

    inputs: {
        datetimeFrom: 'div[class^=MuiInputBase-inputAdornedEnd]::before > input',
        datetimeTo: 'div[class^=MuiInputBase-inputAdornedEnd]::after > input',
    },
    sections: {
        dashboard_innerTop: `div[class*='Analytics_innerTop__3k8hH']`,
        dashboard_lineChart: `div[class*='Analytics_lineChart__3DTCr']`,
        totalfilesprocessed: `div[class*='Analytics_infoBlocks__JMNAV']`,
    },
    calendar: {
        datetime_left: `input[id='datetime-local-left']`,
        datetime_right: `input[id='datetime-local-right']`,
    },
    button: {
        datetime: 'button[class*=DateAndTimePickers_intervalButton__]'
    },
    popup: {
        timeIntervalPopup: 'div[class^=Popup_Popup__]'
    },


//Methods

    /*
     * Getters
     * ***************************************************************
     */

    async getTotalFileNumber() {
        const total = this.sections.totalfilesprocessed;
        let totalText = await I.grabTextFrom(total);
        return totalText;
    },

    /*
     * Datetime
     * ***************************************************************
     */


    openDatetimeStart() {
        const element = this.buttons.datetime_left;
        I.click(element);
    },

    openDatetimeEnd() {
        const element = this.buttons.datetime_right;
        I.click(element);
    },

    async setDatetimelocalleft(value) {
        const element = await this.getDatetimelocalleftElement();
        await element.type(value);
    },

   async  getValueFromDateTimeInput(element){
        return await I.grabValueFrom(element);
    },

    chooseTimeInterval(timeInterval) {
        const datetimeButton = this.buttons.datetime;
        I.click(datetimeButton);
        I.click(timeInterval.toUpperCase());
    },


    async checkDateTimeFilterValues(dateRange) {
        const array = dateRange.split(" ");
        const dateFrom = array[0];
        const timeFrom = array[1];
        const dateTo = array[3];
        const timeTo = array[4];

        I.seeTextEquals(dateFrom + " " + this.convertTimeFrom24To12(timeFrom), this.inputs.datetimeFrom);
        I.seeTextEquals(dateTo + " " + this.convertTimeFrom24To12(timeTo), this.inputs.datetimeTo);

    },

    convertTimeFrom12To24(time, modifier) {
        let timeArray = time.split(":");
        let hours = timeArray[0];
        let mins = timeArray[1];
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        return hours + ":" + mins;
    },

    //23:00 --> 11:00 PM; 11:00 --> 11:00 AM
    convertTimeFrom24To12(time){
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
