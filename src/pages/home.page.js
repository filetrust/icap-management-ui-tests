const I = actor();

module.exports = {
    //Locators

    fields: {
        currentPassword: "input[name=currentPassword]",
        newPassword: "input[name=newPassword]",
        confirmNewPassword: "input[name=confirmNewPassword]",

    },
    buttons: {
        accountPopupToggle: "div[data-test-id='userLink']",
        changePassword: "button[data-test-id='userLinksButtonChangePassword']",
        logout: "button[data-test-id='userLinksButtonLogout']",
        saveNewPassword: `button[class*='ChangePassword_button__']`
    },
    sections: {
        menu: `nav[class*='NavigationItems_NavigationItems__'] > ul`,

    },
    links: {
        analytics: `a[href*="analytics"] > div`,
        fileDrop: `a[href*='file-drop'] > div`,
        requestsHistory: `a[href*='request-history'] > div`,
        policy: `a[href*='policy'] > div`,
        configuration: `a[href*='configuration'] > div`,
        users: `a[href*='users'] > div`,
        userLink: `div[data-test-id="userLink"]`
    },

    //Methods
    /*
     * MenuLinks
     * ***************************************************************
     */

    clickAnalytics() {
        const element = this.links.analytics;
        I.clickElement(element);
    },
    clickRequestsHistory() {
        const element = this.links.requestsHistory;
        I.clickElement(element);
    },

    clickFileDrop() {
        const element = this.links.fileDrop;
        I.clickElement(element);
    },

    clickPolicy() {
        const element = this.links.policy;
        I.clickElement(element);
    },


    clickUsers() {
        const element = this.links.users;
        I.clickElement(element);
    },

    clickLogout() {
        const element = this.buttons.logout;
        I.clickElement(element);
    },

    clickAccountToggle() {
        const element = this.buttons.accountPopupToggle;
        I.clickElement(element);
    },

    hoverOnAccountToggle() {
        const element = this.buttons.accountPopupToggle;
        I.moveCursorTo(element);
    },

    clickChangePassword() {
        const element = this.buttons.changePassword;
        I.clickElement(element);
    },

    changePassword(currentPasswordValue, newPasswordValue, confirmNewPasswordValue) {
        const currentPassword = this.fields.currentPassword;
        const newPassword = this.fields.newPassword;
        const confirmNewPassword = this.fields.confirmNewPassword;
        const saveButton = this.buttons.saveNewPassword;
        I.fillInField(currentPassword, currentPasswordValue);
        I.fillInField(newPassword, newPasswordValue);
        I.fillInField(confirmNewPassword, confirmNewPasswordValue);
        I.clickElement(saveButton);


    }


};
