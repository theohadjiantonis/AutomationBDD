const { I } = inject();
const assert = require('chai').assert;

module.exports = function () {
    return actor({
        Get: async function (data) {
            I.logApiRequest(`Get ${data.endpoint}`);
            try {
                const response = await I.sendGetRequest(data.endpoint, data.headers);

                return response.data;

            } catch (error) {
                console.log(error)
            }
        },

        Post: async function (data) {
            I.logApiRequest(data.payload, `POST ${data.endpoint}`);
            try {
                const response = await I.sendPostRequest(data.endpoint, data.payload, data.headers);
                return response;

            } catch (failures) {
                return failures;
            }
        },

        Patch: async function (data) {
            I.logApiRequest(data.payload, `PATCH ${data.endpoint}`);
            try {
                const response = await I.sendPatchRequest(data.endpoint, data.payload, data.headers);
                assert.equal(response.status, 200)
                return response;

            } catch (failures) {
                console.log(failures)
            }
        },

        Delete: async function (data) {
            I.logApiRequest(data.payload, `DEL ${data.endpoint}`);
            try {
                const response = await I.sendDeleteRequest(data.endpoint, data.payload, data.headers);
                assert.equal(response.status, 200)
                return response;

            } catch (failures) {
                console.log(failures)
            }
        }
    });
}
