const {
    I
} = inject();

module.exports = {

    //Locators   

    fields: {
        newUserNameField: `div[class*='Input_Input__'] > input`,
        newUserEmailField: `div[class*='User_tr__'] > div:nth-of-type(2)`,
        errorMessage: ""
    },
    buttons: {
        addUser: `div[class*='Users_header__'] > button`,
        deleteUser: `svg[id='Layer_1'] > path:nth-of-type(1)`,
    },
    table: {
        userTable: `div[class*='Users_table__']`,
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
        const element = this.fields.newUserNameField;
        I.fillInField(element, userName);
    },

    async getNewUserRowNameInput() {
        return this.getUserRecord(1);
    },

    async getNewUserRowEmailInput() {
        return this.getUserRecord(2);
    },
    setNewUserEmail(userEmail) {
        const element = this.fields.newUserEmailField;
        I.fillInField(element, userEmail);
    },

    addUser(userName, userEmail, userGroup) {
        this.clickAddUserBtn();
        this.setNewUserName(userName);
        this.setNewUserEmail(userEmail);
        this.openNewUserGroup();
        this.selectNewUserGroup(userGroup);
        this.clickSaveUsersButton();
    },

    deleteUser(userName) {
        let userRow = this.findUserByName(userName);
        const deleteUserButton = userRow+"/td[4]/*[@id='Layer_1']";
        I.click(deleteUserButton);


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
        return "//td[text()='" + email + "']/parent::tr";
    },

    findUserByName(name) {
        return "//input[@value='" + name + "']/parent::tr";
    }

}