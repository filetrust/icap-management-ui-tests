/// <reference types='codeceptjs' />
type steps_file = typeof import('./src/utils/steps_file.js');
type env = typeof import('./src/data/credentials.js');
type homePage = typeof import('./src/pages/home.page.js');
type loginPage = typeof import('./src/pages/login.page.js');
type analyticsPage = typeof import('./src/pages/analytics.page.js');
type filedropPage = typeof import('./src/pages/file-drop.page.js');
type passwordResetPage = typeof import('./src/pages/password-reset.page.js');
type policyPage = typeof import('./src/pages/policy.page.js');
type requesthistoryPage = typeof import('./src/pages/request-history.page.js');
type usersPage = typeof import('./src/pages/users.page.js');
type icapProxyPage = typeof import('./src/pages/icap-proxy.page.js');
type MyHelper = import('./src/utils/helper.js');
type AssertWrapper = import('codeceptjs-assert');
type ChaiWrapper = import('codeceptjs-chai');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, env: env, homePage: homePage, loginPage: loginPage, analyticsPage: analyticsPage, filedropPage: filedropPage, passwordResetPage: passwordResetPage, policyPage: policyPage, requesthistoryPage: requesthistoryPage, usersPage: usersPage, icapProxyPage: icapProxyPage }
  interface Methods extends MyHelper, Puppeteer, FileSystem, AssertWrapper, ChaiWrapper {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
