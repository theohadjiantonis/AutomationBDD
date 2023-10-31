const addContext = require('mochawesome/addContext');
const stringify = require('json-stringify-safe');
const { removeSpecials } = require('../common_packages/common_functions');
const Helper = require('@codeceptjs/helper');

let currentTest;
let currentSuite;

class MochawesomeHelper extends Helper {
    constructor() {
        super();
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

    addMochawesomeContext(context) {
        if (currentTest === '') currentTest = { test: currentSuite.ctx.test };

        return addContext(currentTest, context);
    }

    logApiRequest(data, message) {
        let context;

       typeof message === "undefined" ? context = `${stringify(data)}` : context = `${message}: ${stringify(data)}`;

        return this.addMochawesomeContext(context);
    }
}

module.exports = MochawesomeHelper;
