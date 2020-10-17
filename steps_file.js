const homePage = require('./src/pages/home.page.js')
const loginPage = require('./src/pages/login.page.js')

module.exports = function () {
    return actor({
        loginNoPwd: function () {
            this.amOnPage('http://localhost:3000')
            loginPage.clickLogIn();
        },
    });
}
