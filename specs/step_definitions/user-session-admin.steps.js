const {I, homePage, loginPage, env} = inject();


Given('I hover over my profile and select Change Password', () => {
    homePage.hoverOnAccountToggle();
    homePage.clickChangePassword();
});

When('I enter login details', () => {
    username = env.qa.userId
    password = env.qa.password
    I.enterLoginDetails(username, password);
});

When('I click login', () => {
    loginPage.clickLogIn();
});

Then('The home screen is displayed', () => {
    I.seeElement(homePage.links.userLink);
});

When('I log out', () => {
    homePage.clickAccountToggle();
    homePage.clickLogout();
});
Then('the next time I log in, the Password I have to use is {string}', (newPassword) => {
    loginPage.loginWith(env.qa.email, newPassword);
    I.seeElement(homePage.sections.menu);
});

When('I hover over my profile and select Log Out', () => {
    homePage.clickAccountToggle();
    homePage.clickLogout();
});
Then('I am taken to the Login Screen', () => {
    I.seeElement(loginPage.fields.password);
});
When('I fill in {string}, {string}, {string}, and click Save', (currentPassword, newPassword, confirmNewPassword) => {
    homePage.changePassword(currentPassword, newPassword, confirmNewPassword);

});
Given('I am logged into the ui', () => {
    I.login(env.qa.userId, env.qa.password);
});

Given('I am on the login screen', () => {
    I.onLoginPage();
});

