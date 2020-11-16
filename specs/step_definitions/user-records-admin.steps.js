const {
    I,
    homePage,
    usersPage,
    env
} = inject();

let user;
let userEmail;
let userName;
const MY_EMAIL = 'ahewitt@glasswallsolutions.com';

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

Given('I have logged into the ui and navigated to the Users page', () => {
    I.loginNoPwd();
    homePage.clickUsers();
});
When('I add a new user with a valid {string}', (email) => {
    userEmail = email;
    usersPage.addUser('', email, '');
});
Then('The new user record is saved', () => {
    I.seeElement(usersPage.findUserByEmail(userEmail));
});
When('I delete an existing user {string}', (name) => {
    userName = name;
    usersPage.deleteUser(userName)
});
Then('The user record is no longer available', () => {
    I.dontSeeElement(usersPage.findUserByName(userName))
});
When('I add a new user with a invalid {string}', (email) => {
    usersPage.addUser('', email, '');
});
Then('the record is not saved and the expected validation error is displayed', () => {
    I.seeElement(usersPage.fields.errorMessage);
    //todo: after add user feature implementation add an assert that the record is not saved
});
When('I add a new user with {string} that is already used', (email) => {
    usersPage.addUser('', email, '');
});
Then('the expected validation error is displayed and the record is not saved', () => {
    I.seeElement(usersPage.fields.errorMessage);
    //todo: after add user feature implementation add an assert that the record is not saved
});