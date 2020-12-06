const I = actor();

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
    login: `//button[@type='submit']`,
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
    I.clickElement(element);
  },

  /*
   * LoginTerms
   * ***************************************************************
   */
  clickLoginTermsButton() {
    const element = this.buttons.terms;
    I.clickElement(element);
  },

  clickCloseLoginTerms() {
    const element = this.buttons.closeLoginTerms;
    I.clickElement(element);
  },

  clickModalclosebutton() {
    const element = this.buttons.modalClose;
    I.clickElement(element);
  },

  /*
   * LogIn
   * ***************************************************************
   */
  clickLogIn() {
    const element = this.buttons.login;
    I.clickElement(element);
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
    I.clickElement(element);
  },

  /*
   * SowChecklist
   * ***************************************************************
   */

  clickSowChecklist() {
    const element = this.links.sowChecklist;
    I.clickElement(element);
  },
};
