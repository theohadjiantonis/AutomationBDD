const { getDir } = require('./common_packages/transformative_functions');
require('dotenv').config();

exports.config = {
    output: getDir(),
    helpers: {
        REST: {
            endpoint: process.env.URL,
            timeout: 60000
        },
        Puppeteer: {
            url: process.env.URL || 'http://localhost',
            waitForNavigation: 'networkidle0',
            waitForAction: 500,
            waitForTimeout: 10000
        },
        MochawesomeHelper: {
            require: './helpers/mochawesome-helper.js'
        },
        MochaJunitReporterHelper: {
            require: './helpers/mochaJunitReporter-helper.js'
        }
    },
    include: {
        PetService: './api_requests/PetHelpers.js',
        Common: './common_packages/common_functions.js',
        Request: './common_packages/RequestHandler.js'
    },
    mocha: {
        "reporterOptions": {
            "codeceptjs-cli-reporter": {
                "stdout": '-',
                "options": {
                    "verbose": true
                }
            },
            "mochawesome": {
                "stdout": `${getDir()}/console.log`,
                "options": {
                    "reportDir": getDir(),
                    "overwrite": false,
                    "reportTitle": 'MICAuto',
                    "reportFilename": 'microservices_automation_results'
                }
            },
            "mocha-junit-reporter": {
                "stdout": '-',
                "options": {
                    "mochaFile": `${getDir()}/result.xml`,
                    "outputs": true,
                    "testsuitesTitle": 'MICAuto',
                    "attachments": true
                },
                "attachments": true
            }
        }
    },
    bootstrap: null,
    teardown: null,
    hooks: [],
    gherkin: {
        features: './features/**/*.feature',
        steps: './step_definitions/**/*.js'
    },
    plugins: {
        retryFailedStep: {
            enabled: true
        }
    },
    tests: 'tests/**/*_test.js',
    name: 'CodeceptJSAuto'
}
