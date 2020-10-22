const { I } = inject();

module.exports = {
  //locators
  fields: {
    email: `input[name='email']`,
    password: `input[name='password']`,
    loginError: "validation-error",
  },
  links: {
    passwordReset: `a[href*='pass-reminder']`,
    accountActivation: `a[id='accountActivationLink']`,
    sowChecklist: `a[href*='sow']`,
  },
  buttons: {
    login: `button[type='submit']`,
    terms: `p[class*='Login_linkTerms__1B6HH'] > a`,
    closeLoginTerms: "",
    modalClose: "",
  },

  //Methods

  /*
   * EmailAddress
   * ***************************************************************
   */
  setEmailAddress(value) {
    const element = this.fields.email;
    I.fillField(element, value);
  },

  /*
   * Password
   * ***************************************************************
   */
  setPassword(value) {
    const element = this.fields.password;
    I.fillField(element, value);
  },

  clickForgotPasswordLink() {
    const element = this.links.passwordReset;
    I.click(element);
  },

  /*
   * LoginTerms
   * ***************************************************************
   */
  clickLoginTermsButton() {
    const element = this.buttons.terms;
    I.click(element);
  },

  clickCloseLoginTerms() {
    const element = this.buttons.closeLoginTerms;
    I.click(element);
  },

  clickModalclosebutton() {
    const element = this.buttons.modalClose;
    I.click(element);
  },

  /*
   * LogIn
   * ***************************************************************
   */
  clickLogIn() {
    const element = this.buttons.login;
    I.click(element);
  },

  errorMsg() {
    let pin = I.grabTextFrom(this.fields.loginError);
  },

  loginWith(email, password) {
    I.fillField(this.fields.email, email);
    I.fillField(this.fields.password, password);
    I.click(this.buttons.login);
  },

  /*
   * AccountActivationLink
   * ***************************************************************
   */
  clickAccountActivationLink() {
    const element = this.links.accountActivation;
    I.click(element);
  },

  /*
   * SowChecklist
   * ***************************************************************
   */

  clickSowChecklist() {
    const element = this.links.sowChecklist;
    I.click(element);
  },
};
