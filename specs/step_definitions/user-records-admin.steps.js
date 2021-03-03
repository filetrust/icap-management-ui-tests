const {
    I,
    usersPage,
    env
} = inject();

const { output } = require('codeceptjs');
const faker = require('faker');

let randomId = faker.random.number();
let randomText = faker.random.uuid();
let current_user;
let newFirstname;
let dupEmail;
let uEmail;
let uName;
let fName;
let lName;
let exEmail;

Given('I have logged into the ui and navigated to the Users page', () => {
    I.login();
    I.goToUsers();
    I.seeElement('tbody');
});

/*
     *TEST-191
     * ***************************************************************
     */

When('I observe my account', () => {
    current_user = env.qa.user
    console.log('Current user is ' + current_user)
    usersPage.confirmUserDetailsAvailable(current_user)
});
Then('there will be no delete button next to my account', () => {
    usersPage.confirmUserDeleteIconNotAvailable(current_user);
});

/*
*TEST-171
* ***************************************************************
*/
When('I add a new user with details username {string}, firstname {string}, lastname {string} and email {string}', async (username, firstname, lastname, email) => {
    uEmail = randomId + email;
    fName = firstname + randomId;
    lName = lastname + randomId;
    uName = username + randomId;
    await usersPage.addUserDetails(uName, fName, lName, uEmail);
});
When('I click Save Changes', () => {
    usersPage.clickSaveChanges();
});
Then('The new user record is saved with a green tick', () => {
    usersPage.waitForUsersTable()
    usersPage.confirmUserDetailsAvailable(uEmail)
});

/*
*TEST-185
* ***************************************************************
*/
Then('the record is not saved and the expected validation error is displayed', async () => {
    I.wait(2)
    await usersPage.isErrorMessageDisplayed('Email Address: ' + uEmail + ' is invalid')
});

/*
*TEST-172
* ***************************************************************
*/
Given('A user exist with the email address {string}', async (email) => {
    exEmail = randomId + email;
    uName = 'testuname' + randomId;
    fName = 'testfname' + randomId;
    lName = 'testlName' + randomId;
    await I.addAUser(uName, fName, lName, exEmail);
    console.log('Existing email is ' + exEmail)
});
When('I delete the existing user with email {string}', (email) => {
    email = exEmail;
    usersPage.deleteUser(email);
});
Then('The user record with email {string} is no longer available', (email) => {
    email = exEmail;
    usersPage.confirmUserRecordNotAvailable(email)
});

/*
*TEST-142
* ***************************************************************
*/
Given('A user record exist with username {string}, firstname {string}, lastname {string} and email {string}', async (username, firstname, lastname, email) => {
    uEmail = randomId + email;
    fName = firstname + randomId;
    lName = lastname + randomId;
    uName = username + randomId;
    await I.addAUser(uName, fName, lName, uEmail);
    console.log('Existing email is ' + uEmail)
});

When('I click the edit on the user record and update the firstname to {string}', async(newfname) => {
    newFirstname = newfname + randomText;
    await usersPage.clickUserEditIcon(uEmail);
    await usersPage.updateUserName(newFirstname);
});

Then('The updated user record is saved', async () => {
    await usersPage.confirmUserFirstname(uEmail, newFirstname)
    output.print(`The firstname is updated as: ${newFirstname} for user with email: ${uEmail}`)
});

/*
*TEST-186
* ***************************************************************
*/
Given('A user record with the email {string} already exist', async (email) => {
    dupEmail = randomId + email;
    fName = 'dfirstname' + randomId;
    lName = 'dlastname' + randomId;
    uName = 'dusernamed' + randomId;
    await I.addAUser(uName, fName, lName, dupEmail);
    console.log('Existing email is ' + dupEmail)
});
When('I add a new user record with username {string}, firstname {string}, lastname {string} and the existing email {string}', async (username, firstname, lastname, email) => {
    email = dupEmail;
    await usersPage.addUserDetails(username, firstname, lastname, email);
});
Then('the expected validation error is displayed and the record is not saved', async () => {
    const errorMsg = 'Email Addresses must be unique. A user with email: ' + dupEmail + ' already exists'
    I.wait(2)
    await usersPage.isErrorMessageDisplayed(errorMsg)
});

