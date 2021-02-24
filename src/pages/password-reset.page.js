const I = actor();

module.exports = {

    //Locators

    fields: {
        forgotPasswordFields: '#forgotPasswordForm',
        captchaBox: '',
        recaptchaResponse: '',
        email: `input[name='Email']`,
        requestVerificationToken: ''
    },
    buttons: {
        sendLink: `div[class*='PassReminder_wrapButtons__sX7Ee'] > button`,
        cancel: `div[class*='PassReminder_wrapButtons__sX7Ee'] > a > button`
    },


    /*
     * PasswordRequestSetting
     * ***************************************************************
     */
    setEmailAddress(value) {
        const element = this.fields.email;
        I.fillField(element, value);
    },

    setGrecaptcharesponse(value) {
        const element = this.fields.recaptchaResponse;
        I.fillField(element, value);
    },

    clickForgotPasswordCancelButton() {
        const element = this.buttons.cancel;
        I.clickElement(element);
    },

    clickSendLink() {
        const element = this.buttons.sendLink;
        I.clickElement(element);
    },

    sendResetRequest(emailAddress) {
        I.fillField(this.fields.email, emailAddress);
        I.click(this.fields.captchaBox);
        I.click(this.fields.sendLink);
    },

    /*
     * RequestVerificationToken
     * ***************************************************************
     */


    setRequestVerificationToken(value) {
        const element = this.fields.requestVerificationToken;
        I.fillField(element, value);
    }

}