const homePage = require('./src/pages/home.page.js')
const loginPage = require('./src/pages/login.page.js')
const policyPage = require('./src/pages/policy.page.js')

module.exports = function () {
    return actor({

        onLoginPage: function () {
            this.amOnPage('http://localhost:3000')
        },
        loginNoPwd: function () {
            this.onLoginPage()
            loginPage.clickLogIn();
        },

        enterValidCredential: function () {
            loginPage.loginWith(env.qa.email, env.qa.password)
        },
        enterInvalidPassword: function () {
            loginPage.setPassword(faker.random.number())
        },

        goToPolicy: function () {
            policyPage.clickPolicyTab()
        },
    });
}
