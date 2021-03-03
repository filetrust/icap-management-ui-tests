const {I} = inject();

module.exports = {

  fields: {
    email: `input[name='username']`,
    password: `input[name='password']`,
    loginError: "validation-error",
    userid: `input[name='username']`
  },
  links: {
    passwordReset: `a[href*='pass-reminder']`,
    accountActivation: `a[id='accountActivationLink']`,
    sowChecklist: `a[href*='sow']`,
  },
  buttons: {
    login: `//button[contains(.,'Log In')]`,
    terms: `p[class*='Login_linkTerms__1B6HH'] > a`,
    closeLoginTerms: "",
    modalClose: "",
  },


  /*
   * EmailAddress
   * ***************************************************************
   */
  setEmailAddress(value) {
    const element = this.fields.email;
    I.fillInField(element, value);
  },

  /*
   * Password
   * ***************************************************************
   */
  setPassword(value) {
    const element = this.fields.password;
    I.fillInField(element, value);
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
    //const element = this.buttons.login;
    //I.waitForVisible(element)
    I.wait(5)
    I.pressKey('Enter')
    
  },

  errorMsg() {
    return I.grabTextFrom(this.fields.loginError);
  },

  loginWith(email, password) {
    I.fillInField(this.fields.email, email);
    I.fillInField(this.fields.password, password);
    I.pressKey('Enter')
  },


  /*
   * AccountActivationLink
   * ***************************************************************
   */
  // clickAccountActivationLink() {
  //   const element = this.links.accountActivation;
  //   I.clickElement(element);
  // },

  /*
   * SowChecklist
   * ***************************************************************
   */

  clickSowChecklist() {
    const element = this.links.sowChecklist;
    I.clickElement(element);
  },
};
