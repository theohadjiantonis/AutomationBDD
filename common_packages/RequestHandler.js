const { I } = inject();

module.exports = function () {
    return actor({
        Get: async function (data) {
            I.logApiRequest(`Get ${data.endpoint}`);
            try {
                const response = await I.sendGetRequest(data.endpoint, data.headers);
                return response;

            } catch (error) {
                return error;
            }
        },

        Post: async function (data) {
            I.logApiRequest(data.payload, `POST ${data.endpoint}`);
            try {
                const response = await I.sendPostRequest(data.endpoint, data.payload, data.headers);
                return response;

            } catch (error) {
                return error;
            }
        },

        Put: async function (data) {
            I.logApiRequest(data.payload, `PUT ${data.endpoint}`);
            try {
                const response = await I.sendPutRequest(data.endpoint, data.payload, data.headers);
                return response;

            } catch (error) {
                return error;
            }
        },

        Delete: async function (data) {
            I.logApiRequest(`DEL ${data.endpoint}`);
            try {
                const response = await I.sendDeleteRequest(data.endpoint, data.headers);
                return response;

            } catch (error) {
                return error;
            }
        }
    });
}
