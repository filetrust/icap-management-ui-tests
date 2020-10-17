/// <reference types='codeceptjs' />
type steps_file = typeof import('./specs/step_definitions/common-steps.js');
type env = typeof import('./env.js');
type homePage = typeof import('./src/pages/home.page.js');
type loginPage = typeof import('./src/pages/login.page.js');
type configurationsPage = typeof import('./src/pages/configurations.page.js');
type dashboardPage = typeof import('./src/pages/dashboard.page.js');
type filedropPage = typeof import('./src/pages/file-drop.page.js');
type passwordResetPage = typeof import('./src/pages/password-reset.page.js');
type policyPage = typeof import('./src/pages/policy.page.js');
type requesthistoryPage = typeof import('./src/pages/request-history.page.js');
type usersPage = typeof import('./src/pages/users.page.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, env: env, homePage: homePage, loginPage: loginPage, configurationsPage: configurationsPage, dashboardPage: dashboardPage, filedropPage: filedropPage, passwordResetPage: passwordResetPage, policyPage: policyPage, requesthistoryPage: requesthistoryPage, usersPage: usersPage }
  interface Methods extends Puppeteer {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
