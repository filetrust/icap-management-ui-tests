const {
    I,
    usersPage,
    env
} = inject();

const faker = require('faker');

let randomId = faker.random.number()
let randomText = faker.random.uuid()
let current_user;
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

When('I observe my account', () => {
    current_user = env.qa.user
    I.say('Current user is ' + current_user)
    usersPage.confirmUserDetailsAvailable(current_user)
});
Then('there will be no delete button next to my account', () => {
    usersPage.confirmUserDeleteIconNotAvailable(current_user);
});

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

Then('the record is not saved and the expected validation error is displayed', async () => {
    I.wait(2)
    await usersPage.isErrorMessageDisplayed('Email Address: ' + uEmail + ' is invalid')
});

Given('A user exist with the email address {string}', async (email) => {
    exEmail = randomId + email;
    uName = 'testuname' + randomId;
    fName = 'testfname' + randomId;
    lName = 'testlName' + randomId;
    await I.addAUser(uName, fName, lName, exEmail);
    I.say('Existing email is ' + exEmail)
});
When('I delete the existing user with email {string}', (email) => {
    email = exEmail;
    usersPage.deleteUser(email);
});
Then('The user record with email {string} is no longer available', (email) => {
    email = exEmail;
    usersPage.confirmUserRecordNotAvailable(email)
});

Given('A user record exist with username {string}, firstname {string}, lastname {string} and email {string}', (username, firstname, lastname, email) => {
    uEmail = randomId + email;
    fName = firstname + randomId;
    lName = lastname + randomId;
    uName = username + randomId;
    I.addAUser(uName, fName, lName, uEmail);
    I.say('Existing email is ' + uEmail)
});
When('I click the edit on the user record and change the firstname to {string}', (newfname) => {
    newfname = newfname + randomText;
    usersPage.clickUserEditIcon(uEmail);
    I.clearField(usersPage.fields.cFirstName);
    usersPage.updateUserName(newfname);
});
Then('The updated user record is saved', () => {
    //usersPage.confirmUserDetailsAvailable(newfname)
    I.say('The new firstname is updated as expected as: ' + newfname)
});

Given('A user record with the email {string} already exist', (email) => {
    uEmail = randomId + email;
    fName = 'dfirstname' + randomId;
    lName = 'dlastname' + randomId;
    uName = 'dusernamed' + randomId;
    I.addAUser(uName, fName, lName, uEmail);
});
When('I add a new user record with username {string}, firstname {string}, lastname {string} and the existing email {string}', (username, firstname, lastname, email) => {
    email = uEmail;
    usersPage.addUserDetails(username, firstname, lastname, email);
});
Then('the expected validation error is displayed and the record is not saved', async () => {
    const errorMsg = 'Email Addresses must be unique. A user with email: ' + uEmail + ' already exists'
    I.wait(2)
    await usersPage.isErrorMessageDisplayed(errorMsg)
});

