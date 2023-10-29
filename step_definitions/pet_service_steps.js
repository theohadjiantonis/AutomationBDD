const { PetService, I, Common } = inject();
const chai = require('chai');

//common variables
let payload, addPetResponse;

Given('I have a pet for sale', async () => {
    payload = await PetService.PetJson();

    payload.status = 'available';
});

Given("it's {string} is {string}", async (propertyPath, value) => {
    //spliting the path to the object and saving it in an array 
    const pathArray = propertyPath.split('.');

    //changing the property based on the path
    payload = await Common.replacePropertyValue(payload, pathArray, pathArray[pathArray.length - 1], value);
});

When('I send the pet request', async () => {
    //executes withdraw plan
    addPetResponse = await PetService.PostRequest(payload)
});

Then('The pet request request is successful with status {int}', async (status) => {
    I.addMochawesomeContext({ title: "ADD PET REQUEST RESPONSE", value: addPetResponse.data });

    chai.assert.equal(addPetResponse.status, status, `Status code is ${status}`)
    chai.assert.equal(addPetResponse.data.id, payload.id, 'ID in response body is correct')
    chai.assert.equal(addPetResponse.data.category.id, payload.category.id, 'Category ID in response body is correct')
    chai.assert.equal(addPetResponse.data.category.name, payload.category.name, 'Category Name in response body is correct')
    chai.assert.equal(addPetResponse.data.name, payload.name, 'Pet name in response body is correct')
    chai.assert(addPetResponse.data.photoUrls != null, 'PhotoUrls is not empty')
    chai.assert.equal(addPetResponse.data.tags[0].id, payload.tags[0].id, 'Tag ID in response body is correct')
    chai.assert.equal(addPetResponse.data.tags[0].name, payload.tags[0].name, 'Tag Name in response body is correct')
    chai.assert(addPetResponse.data.status === "available", 'Status in response body is available')
});

Then('The pet request returns error code {int} with message {string}, type {string} and status {int}', async (errorCode, errorType, errorMessage, status) => {
    I.addMochawesomeContext({ title: "ADD PET REQUEST RESPONSE", value: addPetResponse.data });

    chai.assert.equal(addPetResponse.status, status, `Status is ${status}`)
    chai.assert.equal(addPetResponse.data.code, errorCode, `Error code is ${errorCode}`)
    chai.assert.equal(addPetResponse.data.type, errorType, `Type is ${errorType}`)
    chai.assert.equal(addPetResponse.data.message, errorMessage, `Error Message is ${errorMessage}`)
});