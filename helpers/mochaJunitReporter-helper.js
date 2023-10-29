let currentTest;
let currentSuite;

class MochaJunitReporterHelper extends Helper {
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

    addMochaJunitSystemOutContext(context) {  
        if (currentTest === '') currentTest = { test: currentSuite.ctx.test };
        currentSuite.ctx.test.consoleOutputs = (currentSuite.ctx.test.consoleOutputs || []).concat(context);
    }

    addMochaJunitSystemErrorContext(context) {  
        if (currentTest === '') currentTest = { test: currentSuite.ctx.test };
        currentSuite.ctx.test.consoleErrors = (currentSuite.ctx.test.consoleErrors || []).concat(context);
    }
}

module.exports = MochaJunitReporterHelper;
