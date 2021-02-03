const I = actor();
const cp = require('child_process')
const fs = require('fs')
const path = require('path');
const config = fs.readFileSync(path.join(__dirname, "../../config.json"), "UTF-8");
const configObj = JSON.parse(config);
const Cpass = require('cpass').Cpass;
let cpass = new Cpass();
const { ui_user, ui_password} = configObj;

// Fill in the valid credentials here before running test
module.exports = {
    qa: {
        userId: cpass.decode(ui_user),  
        password: cpass.decode(ui_password) 
    }
}
