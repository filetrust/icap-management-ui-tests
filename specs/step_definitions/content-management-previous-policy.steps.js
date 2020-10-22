const {
    I,
    env,
    loginPage
} = inject();

/*****************************************
 * Navigation
 ******************************************/

Given('the user has logged into the ui', () => {
    loginPage.loginWith(env.qa.username, env.qa.password)
    I.wait(2)
});
