const {setHeadlessWhen} = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

exports.config = {
    tests: './*_test.js',
    name: 'icap-management-ui-test',
    output: './output',
    helpers: {
        Puppeteer: {
            url: 'http://localhost:3000',
            show: true,
            windowSize: '1536 x 826',
            chrome: {
                args: ['--no-sandbox', '--window-size=1536,826'],
            },
            waitForNavigation: ["domcontentloaded", "networkidle0"],
            waitForAction: 2000,
            waitForTimeout: 60000,
            AssertWrappe: {
                "require": "codeceptjs-assert"
            }
        }
    },
    include: {
        I: './specs/step_definitions/common-steps.js',
        env: './env.js',
        homePage: './src/pages/home.page.js',
        loginPage: './src/pages/login.page.js',
        configurationsPage: './src/pages/configurations.page.js',
        dashboardPage: './src/pages/dashboard.page.js',
        filedropPage: './src/pages/file-drop.page.js',
        passwordResetPage: './src/pages/password-reset.page.js',
        policyPage: './src/pages/policy.page.js',
        requesthistoryPage: './src/pages/request-history.page.js',
        usersPage: './src/pages/users.page.js'
    },
    bootstrap: null,
    teardown: null,
    gherkin: {
        features: './specs/features/*.feature',
        steps: './specs/step_definitions/*.steps.js'
    },
    mocha: {
        reporterOptions: {
            "reportDir": "output"
        },
        "mochawesome": {
            "stdout": "./output/console.log",
            "options": {
                "reportDir": "./output",
                "reportname": "report"
            }
        }
    },
    name: 'icap-management-ui-tests',
    plugins: {
        allure: {
            enabled: true,
        },
        pauseOnFail: {},
        retryFailedStep: {
            enabled: true
        },
        tryTo: {
            enabled: true
        },
        screenshotOnFail: {
            enabled: true
        },
        autoDelay: {
            enabled: true
        },
        stepByStepReport: {
            enabled: false,
            deleteSuccessful: false,
            screenshotsForAllureReport: false
        },
    }
}