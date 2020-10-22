const homePage = require("./src/pages/home.page.js");
const loginPage = require("./src/pages/login.page.js");
const policyPage = require("./src/pages/policy.page.js");
const fileDropPage = require("./src/pages/file-drop.page.js");

module.exports = function () {
  return actor({
    onLoginPage: function () {
      this.amOnPage("http://localhost:3000");
    },

    loginNoPwd: function () {
      this.onLoginPage();
      loginPage.clickLogIn();
    },

    enterValidCredential: function () {
      loginPage.loginWith(env.qa.email, env.qa.password);
    },
    enterInvalidPassword: function () {
      loginPage.setPassword(faker.random.number());
    },

    goToPasswordResetPage: function () {
      this.click(loginPage.clickForgotPasswordLink());
    },

    goToDashboard: function () {
      homePage.clickDashboard();
    },

    goToFileDrop: function () {
      homePage.clickFileDrop();
      I.seeElement(fileDropPage.buttons.fileSelectButton)
    },

    goToUsers: function () {
      homePage.clickUsers();
    },

    goToRequestHistory: function () {
      homePage.clickRequestsHistory();
    },

    goToContentManagementPolicy: function () {
      homePage.clickPolicy();
    },

    goToPolicyHistory: function () {
      homePage.clickPolicy();
      policyPage.clickHistoryTab();
    },
  });
};
