/// <reference types='codeceptjs' />
type PetService = typeof import('./api_requests/PetHelpers.js');
type Common = typeof import('./common_packages/common_functions.js');
type Request = typeof import('./common_packages/RequestHandler.js');
type MochawesomeHelper = import('./helpers/mochawesome-helper.js');
type MochaJunitReporterHelper = import('./helpers/mochaJunitReporter-helper.js');

declare namespace CodeceptJS {
    interface SupportObject { I: I, current: any, PetService: PetService, Common: Common, Request: Request }
    interface Methods extends REST, Puppeteer, MochawesomeHelper, MochaJunitReporterHelper { }
    interface I extends WithTranslation<Methods> { }
    namespace Translation {
        interface Actions { }
    }
}
