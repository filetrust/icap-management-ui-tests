const { I } = inject();

module.exports = {
  //locators
  fields: {
    email: `input[name='email']`,
    password: `input[name='password']`
  },
  links: {
  },
  buttons: {
    login: `button[type='submit']`
  },

  //Methods
  /*
   * LogIn
   * ***************************************************************
   */
  clickLogIn() {
    const element = this.buttons.login;
    I.click(element);
  },

  loginWith(email, password) {
    I.fillField(this.fields.email, email);
    I.fillField(this.fields.password, password);
    I.click(this.buttons.login);
  }
};
