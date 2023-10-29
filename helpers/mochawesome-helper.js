const addContext = require('mochawesome/addContext');
const stringify = require('json-stringify-safe');
const { removeSpecials } = require('../common_packages/common_functions');
const Helper = require('@codeceptjs/helper');

let currentTest;
let currentSuite;

class MochawesomeHelper extends Helper {
    constructor() {
        super();

        this.options = {
            uniqueScreenshotNames: true
        };
    }

    _beforeSuite(suite) {
        currentSuite = suite;
        currentTest = '';
    }

    _before() {
        if (currentSuite && currentSuite.ctx) {
            currentTest = { test: currentSuite.ctx.currentTest };
        }
    }

    _test(test) {
        currentTest = { test };
    }

    _failed(test) {
        let fileName;
        let uuid;
        // Get proper name if we are fail on hook
        if (test.ctx.test.type === 'hook') {
            test.ctx.test.skipInfo = 'skipped';
            currentTest = { test: test.ctx.test };
            // ignore retries if we are in hook
            test._retries = -1;
            fileName = removeSpecials(`${test.title}_${currentTest.test.title}`);
        } else {
            currentTest = { test };
            fileName = removeSpecials(test.title);
        }
        if (this.options.uniqueScreenshotNames) {
            uuid = test.uuid || test.ctx.test.uuid;
            fileName = `${fileName.substring(0, 10)}_${uuid}`;
        }
        if (test._retries < 1 || test._retries === test.retryNum) {
            fileName = `${fileName}.failed.png`;
            return addContext(currentTest, fileName);
        }
    }

    addMochawesomeContext(context) {
        if (currentTest === '') currentTest = { test: currentSuite.ctx.test };

        return addContext(currentTest, context);
    }

    logApiRequest(data, message) {
        const context = `${message}: ${stringify(data)}`;

        return this.addMochawesomeContext(context);
    }
}

module.exports = MochawesomeHelper;
