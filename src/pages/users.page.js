const I = actor();

module.exports = {

    //Locators   

    fields: {
        userName: `tr[class*='NewUserRow_NewUser__'] > td:nth-of-type(1) > div`,
        firstName: `tr[class*='NewUserRow_NewUser__'] > td:nth-of-type(2) > div > input`,
        lastName: `tr[class*='NewUserRow_NewUser__'] > td:nth-of-type(3) > div > input`,
        email: `tr[class*='NewUserRow_NewUser__'] > td:nth-of-type(4) > form > div > input`,
        cFirstName: `//td[2]/div/input`,
        error: ".Toastify__toast-body"
    },
    buttons: {
        addUser: `td[class*='Users_newUserCell__']`,
        delete: `/td[6]/*[@id="Layer_1"]`,
        saveChanges: `button[class*='Users_saveButton__']`,
        cancelChanges: `button[class*='Users_cancelButton__']`,
        editIcon: `//td[1]/div/*[@id="Pencil"]` 
    },  
    table: {
        userTable: `//tbody`,
    },

    //Methods

    /*
        * AddingUser
        * ***************************************************************
        */
    clickAddUserBtn() {
        const element = this.buttons.addUser;
        I.clickElement(element);
    },

    setNewUserName(userName) {
        const element = this.fields.userName;
        I.click(element)
        I.type(userName);
    },

    setFirstName(firstName) {
        const element = this.fields.firstName;
        I.click(element)
        I.type(firstName);
    },

    setLastName(lName) {
        const element = this.fields.lastName;
        I.click(element)
        I.type(lName)
        //I.fillInField(element, lName);
    },

    async getNewUserRowNameInput() {
        return this.getUserRecord(1);
    },

    async getNewUserRowEmailInput() {
        return this.getUserRecord(2);
    },
    setNewUserEmail(userEmail) {
        const element = this.fields.email;
        I.click(element)
        I.type(userEmail);
    },

    addUser(userName,fName, lName, userEmail) {
        this.clickAddUserBtn();
        this.setNewUserName(userName);
        this.setFirstName(fName);
        this.setLastName(lName);
        this.setNewUserEmail(userEmail);
        this.clickSaveChanges();
        this.waitForUsersTable()
    },

    addUserDetails(userName,fName, lName, userEmail) {
        this.clickAddUserBtn();
        this.setNewUserName(userName);
        this.setFirstName(fName);
        this.setLastName(lName);
        this.setNewUserEmail(userEmail);
    },

    clickUserEditIcon(data){
        const user_record = `//tr[contains(.,'`+data+`')]`;
        const userEditIcon= user_record+this.buttons.editIcon;
        I.clickElement(userEditIcon);
    },

    updateUserName(userName) {
        const element = this.fields.cFirstName;
        I.click(element)
        I.type(userName);
        I.wait(1);
    },

    updateEmail(email) {
        const element = this.fields.userName;
        I.click(element)
        I.pressKey('Backspace')
        I.type(userName);
    },

    deleteUser(email) {
        const user_record = `//tr[contains(.,'`+email+`')]`
        const deleteUserButton = user_record+this.buttons.delete;
        I.click(deleteUserButton);
    },
   
    getUserDeleteIcon(name) {
        const user_record = `//tr[contains(.,'`+name+`')]`
        const deleteUserButton = user_record+this.buttons.delete;
        return deleteUserButton.toString();
    },

    clickSaveChanges (){
        const element = this.buttons.saveChanges;
        I.waitForElement(element,5)
        I.click(element);
      
    },

    getUserRecord(n) {
        let element = null;
        const rows = locate(`//*[@id="usersTable2"]/tbody/tr`);
        for (let i in rows) {
            const text = I.grabTextFrom(rows[i] + "/td[" + n + "]/input")
            if (text === "") {
                element = rows[i] + "/td[" + n + "]/input"
            }
        }
        return element;
    },

    findUserByEmail(email) {
        waitForUsersTable()
        const element = `//tr[contains(.,'`+email+`')]`;
        return element;
    },

    findUserByName(name) {
        waitForUsersTable()
        return `//tr[contains(.,'`+name+`')]`;
    },

    waitForUsersTable(){
        const element = this.table.userTable
        I.waitForElement(element,60);
        I.waitForElement(this.buttons.addUser, 60);
    },

   confirmUserDetailsAvailable(data){
        this.waitForUsersTable();
        I.seeElement(`//tr[contains(.,'`+data+`')]`);
    },

    confirmUserRecordNotAvailable(data){
        this.waitForUsersTable()
        I.dontSeeElement(`//tr[contains(.,'`+data+`')]`);
    },       

    confirmUserDeleteIconNotAvailable(data){
        this.waitForUsersTable()
        I.dontSeeElement(`//tr[contains(.,'`+data+`')]`+this.buttons.delete);
    },       

    async isErrorMessageDisplayed(error){
        const element = this.fields.error;
        const errorMessage = await I.grabTextFrom(element)
        if (errorMessage===error){
            I.say('The expected error message: '+errorMessage+ ' is displayed')
        }else{
            I.say('The error message: '+errorMessage+ ' is not as expected')
        };
        }



}