const { setHeadlessWhen } = require('@codeceptjs/configure');
require('dotenv').config({ path: '.env' });

setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  output: './output',
  helpers: {
    MyHelper: {
      require: "./src/utils/helper.js"
    },

    Puppeteer: {
      //browser: 'firefox',
      windowSize: '1536 x 826',
      url: '',
      show: true,
      chrome: {
        args: ['--headless', '--no-sandbox', '--window-size=1536,826', '--ignore-certificate-errors'],
        //args: ['--no-sandbox', '--window-size=1536,826','--ignore-certificate-errors'],
        prefs:
          ['--download.default_directory= /output/downloads'],
      },
      firefox: {
        args: [
          '--ignore-certificate-errors'
        ],
      },
      waitForNavigation: ["domcontentloaded", "networkidle0"],
      waitForTimeout: 120000,
      waitForAction: 2000
    },
    FileSystem: {},

  },
  include: {
    I: './src/utils/steps_file.js',
    env: './src/utils/config.js',
    homePage: './src/pages/home.page.js',
    loginPage: './src/pages/login.page.js',
    analyticsPage: './src/pages/analytics.page.js',
    filedropPage: './src/pages/file-drop.page.js',
    passwordResetPage: './src/pages/password-reset.page.js',
    policyPage: './src/pages/policy.page.js',
    requesthistoryPage: './src/pages/request-history.page.js',
    usersPage: './src/pages/users.page.js',
    icapProxyPage: './src/pages/icap-proxy.page.js',
    sharepoint: './src/pages/sharepoint.page.js',
    modal: './src/fragments/modal.js',
    icapclient: './src/utils/icap_client.js'

  },
  bootstrap: null,
  gherkin: {
    features: './specs/features/*.feature',
    steps: './specs/step_definitions/*.steps.js'
  },
  mocha: {},
  name: 'icap-management-ui-tests',
  plugins: {
    allure: {
      outputDir: './allure/results'
    },
    pauseOnFail: {},
    retryFailedStep: {
      enabled: false
    },

    screenshotOnFail: {
      enabled: true
    },
    autoDelay: {
      enabled: true,
      delayBefore: 300,
      delayAfter:300
    }
  },
  multiple: {
    parallel: {
      chunks: 10,
      browsers: ['puppeteer']
    }
  },
  tests: './specs/*_test.js',
}
