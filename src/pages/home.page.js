const {I} = inject();

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
        menu: `section[class*='Toolbar_Toolbar__']`,
    },
    links: {
        analytics: `a[href*="analytics"] > div`,
        fileDrop: `a[href*='file-drop'] > div`,
        requestsHistory: `a[href*='request-history'] > div`,
        policy: `a[href*='policy'] > div`,
        configuration: `a[href*='configuration'] > div`,
        users: `a[href*='users'] > div`,
    },

    //Methods
    /*
     * MenuLinks
     * ***************************************************************
     */

    clickAnalytics() {
        const element = this.links.analytics;
        I.click(element);
    },
    clickRequestsHistory() {
        const element = this.links.requestsHistory;
        I.click(element);
    },

    clickFileDrop() {
        const element = this.links.fileDrop;
        I.click(element);
    },

    clickPolicy() {
        const element = this.links.policy;
        I.click(element);
    },

    
    clickUsers() {
        const element = this.links.users;
        I.click(element);
    },

    clickLogout() {
        const element = this.buttons.logout;
        I.click(element);
    },

    clickAccountToggle() {
        const element = this.buttons.accountPopupToggle;
        I.click(element);
    },

    hoverOnAccountToggle() {
        const element = this.buttons.accountPopupToggle;
        I.moveCursorTo(element);
    },

    clickChangePassword() {
        const element = this.buttons.changePassword;
        I.click(element);
    },

    changePassword(currentPasswordValue, newPasswordValue, confirmNewPasswordValue) {
        const currentPassword = this.fields.currentPassword;
        const newPassword = this.fields.newPassword;
        const confirmNewPassword = this.fields.confirmNewPassword;
        const saveButton = this.buttons.saveNewPassword;
        I.fillField(currentPassword, currentPasswordValue);
        I.fillField(newPassword, newPasswordValue);
        I.fillField(confirmNewPassword, confirmNewPasswordValue);
        I.click(saveButton);


    }


};
