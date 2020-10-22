const {
    I
} = inject();

module.exports = {

    //Locators   

    fields: {
        newUserNameField: `div[class*='Input_Input__17Nwp'] > input`,
        newUserEmailField: `div[class*='User_tr__ppbfc'] > div:nth-of-type(2)`,
    },
    buttons: {
        addUser: `div[class*='Users_header__2gDwu'] > button`,
        deleteUser: `svg[id='Layer_1'] > path:nth-of-type(1)`,
    },
    table: {
        userTable: `div[class*='Users_table__3T8bv']`,
    },

    //Methods

    /*
        * AddingUser
        * ***************************************************************
        */
    clickAddUserBtn() {
        const element = this.buttons.addUser;
        I.click(element);
    },

    setNewUserName(userName) {
        const element = this.fields.newUserNameField;
        I.fillField(element, userName);
    },

    async getNewUserRowNameInput() {
        return await this.getUserRecord(1)
    },

    async getNewUserRowEmailInput() {
        return await this.getUserRecord(2)
    },
    setNewUserEmail(userEmail) {
        const element = this.fields.newUserEmailField;
        I.fillField(element, userEmail);
    },

    addUser(userName, userEmail, userGroup) {
        this.clickAddUserBtn();
        this.setNewUserName(userName);
        this.setNewUserEmail(userEmail);
        this.openNewUserGroup();
        this.selectNewUserGroup(userGroup);
        this.clickSaveUsersButton();
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
        let className = null;
        const rowArray = document.querySelectorAll(`div[class*='Users_table__'] > div[class*='User_User__']`);
        rowArray.forEach(row => {
            console.log('Observing row : ', row);
            let rowClassName = row.className;
            // this locator is written here `div[class*='Users_table__'] > div[class*='User_User__'] > div > div:nth-child(2)`
            let rowUserEmail = row.firstChild.childNodes.item(2).textContent;
            if (rowUserEmail === email) {
                className = rowClassName;
            }
        })
        //    let userRowEmail = locate(`div[class*='Users_table__'] > div[class*='User_User__'] > div > div:nth-child(2)`);
        //   let userEmail = I.grabTextFrom(userRowEmail);
        return className;
    }

}