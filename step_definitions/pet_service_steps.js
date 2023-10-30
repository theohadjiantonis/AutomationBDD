const { PetService, I, Common } = inject();
const chai = require('chai');

//common variables
let payload, addPetResponse, findPetResponse;
//---------------------------------------------------------GIVEN REQUESTS------------------------------------------------//
Given('I have a pet for sale', async () => {
    payload = await PetService.PetJson();

    payload.status = 'available';
});

Given("Its' {string} is {string}", async (propertyPath, value) => {
    //spliting the path to the object and saving it in an array 
    const pathArray = propertyPath.split('.');

    //changing the property based on the path
    payload = await Common.replacePropertyValue(payload, pathArray, pathArray[pathArray.length - 1], value);
});
//---------------------------------------------------------WHEN STEPS------------------------------------------------//
When('I send the pet request', async () => {
    //executes withdraw plan
    addPetResponse = await PetService.AddPet(payload)
});

When('I look for the pet', async () => {
    //finds pet by id
    I.addMochawesomeContext({ title: "PET ID", value: addPetResponse.data.id });
    findPetResponse = await PetService.FindPetById(addPetResponse.data.id)
});

When('I look for the pet with {string} {string}', async (findPetByTerm, findPetByValue) => {
    //finds pet by id

    if (findPetByTerm === "id") {
        //Because I'm using this step for both positive and negative scenarios, I want to be able to parse the string to an integer if that is possible and not change if its not(trying to parse "hello" to an int for example returns NaN)
        //Hence the need for a custom parse to int function that parses a "10" to 10 but doesn't change the value if it is "Hello" for example. 
        // And because I can use this step with strings, then it can be reused for searching for pets by availability status
        findPetByValue = await Common.parseToInt(findPetByValue);

        findPetResponse = await PetService.FindPetById(findPetByValue)
    } else {
        findPetResponse = await PetService.FindPetByStatus(findPetByValue)
    }

});

When('I update the pet', async () => {
    //executes withdraw plan
    addPetResponse = await PetService.UpdatePetPut(payload)

    I.addMochawesomeContext({ title: "PET ID", value: addPetResponse.data });

});
//---------------------------------------------------------THEN STEPS------------------------------------------------//
Then('The pet request is successful with status {int}', async (status) => {
    I.addMochawesomeContext({ title: "PET REQUEST RESPONSE", value: addPetResponse.data });

    chai.assert.equal(addPetResponse.status, status, `Status code is ${addPetResponse.status}`)
    chai.assert.equal(addPetResponse.data.id, payload.id, 'ID in response body is correct')
    chai.assert.equal(addPetResponse.data.category.id, payload.category.id, 'Category ID in response body is correct')
    chai.assert.equal(addPetResponse.data.category.name, payload.category.name, 'Category Name in response body is correct')
    chai.assert.equal(addPetResponse.data.name, payload.name, 'Pet name in response body is correct')
    chai.assert(addPetResponse.data.photoUrls != null, 'PhotoUrls is not empty')
    chai.assert.equal(addPetResponse.data.tags[0].id, payload.tags[0].id, 'Tag ID in response body is correct')
    chai.assert.equal(addPetResponse.data.tags[0].name, payload.tags[0].name, 'Tag Name in response body is correct')
    chai.assert(addPetResponse.data.status === "available", `Status in response body is ${addPetResponse.data.status}`)
});

Then('The Get pet request is successful with pet status {string}', async (status) => {
    I.addMochawesomeContext({ title: "FIND PET REQUEST RESPONSE", value: findPetResponse.data });

    chai.assert.equal(findPetResponse.status, 200, `Status code is 200`)
    chai.assert.equal(findPetResponse.data.id, payload.id, 'ID in response body is correct')
    chai.assert.equal(findPetResponse.data.category.id, payload.category.id, 'Category ID in response body is correct')
    chai.assert.equal(findPetResponse.data.category.name, payload.category.name, 'Category Name in response body is correct')
    chai.assert.equal(findPetResponse.data.name, payload.name, 'Pet name in response body is correct')
    chai.assert(findPetResponse.data.photoUrls != null, 'PhotoUrls is not empty')
    chai.assert.equal(findPetResponse.data.tags[0].id, payload.tags[0].id, 'Tag ID in response body is correct')
    chai.assert.equal(findPetResponse.data.tags[0].name, payload.tags[0].name, 'Tag Name in response body is correct')
    chai.assert(findPetResponse.data.status === status, `Status in response body is ${findPetResponse.data.status}`)
});

Then('The Get Pet Response only has pets that are {string}', async (status) => {
    chai.assert.equal(findPetResponse.status, 200, `Status code is 200`)

    for (let i = 0; i < findPetResponse.data.length; i++) {
        I.addMochawesomeContext({ title: "FIND PET REQUEST RESPONSE", value: findPetResponse.data[i] });
        chai.assert(findPetResponse.data[i].status === status, `Status in response body is ${findPetResponse.data.status}`)
    }
});

Then('The response has error code {int} with message {string}, type {string} and status {int}', async (errorCode, errorMessage, errorType, status) => {
    I.addMochawesomeContext({ title: "REQUEST RESPONSE", value: addPetResponse.data });

    chai.assert.equal(addPetResponse.status, status, `Status is ${addPetResponse.status}`)
    chai.assert.equal(addPetResponse.data.code, errorCode, `Error code is ${addPetResponse.data.code}`)
    chai.assert.equal(addPetResponse.data.type, errorType, `Type is ${errorType}`)
    chai.assert.equal(addPetResponse.data.message, errorMessage, `Error Message is ${addPetResponse.data.message}`)
});

Then('The Get Pet Response has error code {int} with message {string}, type {string} and status {int}', async (errorCode, errorMessage, errorType, status) => {
    I.addMochawesomeContext({ title: "GET PET RESPONSE", value: findPetResponse.data });

    chai.assert.equal(findPetResponse.status, status, `Status is ${findPetResponse.status}`)
    chai.assert.equal(findPetResponse.data.code, errorCode, `Error code is ${findPetResponse.data.errorCode}`)
    chai.assert.equal(findPetResponse.data.type, errorType, `Type is ${findPetResponse.data.errorType}`)
    chai.assert.equal(findPetResponse.data.message, errorMessage, `Error Message is ${findPetResponse.data.errorMessage}`)
});