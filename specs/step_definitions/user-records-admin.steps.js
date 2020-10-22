//<reference path="./steps.d.ts" />


const {I} = inject();
let user;

Given('I am logged into the ui', () => {
    I.loginNoPwd();
});

Given('I have logged into the ui and has navigated to the Users page', () => {
    homePage.clickUsers();
    I.seeElement(usersPage.table.userTable);
});

When('I observe my account', () => {
    user = usersPage.findUserByEmail(env.qa.email);
});

Then('there will be no delete button next to my account', () => {
    I.dontSeeElement(usersPage.buttons.deleteUser);

});
