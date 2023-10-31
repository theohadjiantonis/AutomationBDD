const { PetService, I, Common } = inject();
const chai = require('chai');

//common variables
let payload, formPayload, addPetResponse, findPetResponse, delPetResponse, updatePetFormResponse, uploadPictureResponse;
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
    //Add pet
    addPetResponse = await PetService.AddPet(payload)
});

When('I look for the pet', async () => {
    //finds pet by id
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
    //reusing addPetResponse because assertions between update and add pet are the same
    addPetResponse = await PetService.UpdatePetPut(payload)
});


When('I update the pet using a form', async () => {
    formPayload = {
        name: payload.name,
        status: payload.status
    }
    updatePetFormResponse = await PetService.UpdatePetForm(formPayload, addPetResponse.data.id)
});

When('I update the pet with id {string}, using a form', async (id) => {
    updatePetFormResponse = await PetService.UpdatePetForm(formPayload, id)
});

When('I upload a picture for the pet with additional metadata: {string}', async (additionalMetaData) => {
    uploadPictureResponse = await PetService.UploadPictureForm(addPetResponse.data.id, additionalMetaData)
});

When('I upload a picture for the pet with id {string}', async (id) => {
    uploadPictureResponse = await PetService.UploadPictureForm(id)
});

When('I Delete the pet', async () => {
    //reusing addPetResponse because assertions between update and add pet are the same
    delPetResponse = await PetService.DeletePet(addPetResponse.data.id)
});

When('I Delete a pet with id {string}', async (id) => {
    //reusing addPetResponse because assertions between update and add pet are the same
    delPetResponse = await PetService.DeletePet(id)
});
//---------------------------------------------------------THEN STEPS------------------------------------------------//
Then('The pet request is successful with status {int}', async (status) => {
    I.addMochawesomeContext({ title: "PET REQUEST RESPONSE", value: addPetResponse.data });

    chai.assert.equal(addPetResponse.status, status, `Status code is ${addPetResponse.status}`)
    chai.assert.equal(addPetResponse.data.id, payload.id, `ID in response body is ${addPetResponse.data.id}`)
    chai.assert.equal(addPetResponse.data.category.id, payload.category.id, `Category ID in response body is ${addPetResponse.data.category.id}`)
    chai.assert.equal(addPetResponse.data.category.name, payload.category.name, `Category Name in response body is ${addPetResponse.data.category.name}`)
    chai.assert.equal(addPetResponse.data.name, payload.name, `Pet name in response body is ${addPetResponse.data.name}`)
    chai.assert(addPetResponse.data.photoUrls != null, `PhotoUrls is empty: ${addPetResponse.data.photoUrls}`)
    chai.assert.equal(addPetResponse.data.tags[0].id, payload.tags[0].id, `Tag ID in response body is ${addPetResponse.data.tags[0].id}`)
    chai.assert.equal(addPetResponse.data.tags[0].name, payload.tags[0].name, `Tag Name in response body is ${addPetResponse.data.tags[0].name}`)
    chai.assert(addPetResponse.data.status === "available", `Status in response body is ${addPetResponse.data.status}`)
});

Then('The Get pet request is successful with pet status {string}', async (status) => {
    I.addMochawesomeContext({ title: "FIND PET REQUEST RESPONSE", value: findPetResponse.data });

    chai.assert.equal(findPetResponse.status, 200, `Status code is ${findPetResponse.status}`)
    chai.assert.equal(findPetResponse.data.id, payload.id, `ID in response body is ${findPetResponse.data.id}`)
    chai.assert.equal(findPetResponse.data.category.id, payload.category.id, `Category ID in response body is ${findPetResponse.data.category.id}`)
    chai.assert.equal(findPetResponse.data.category.name, payload.category.name, `Category Name in response body is ${findPetResponse.data.category.name}`)
    chai.assert.equal(findPetResponse.data.name, payload.name, `Pet name in response body is ${findPetResponse.data.name}`)
    chai.assert(findPetResponse.data.photoUrls != null, `PhotoUrls is empty: ${findPetResponse.data.photoUrls}`)
    chai.assert.equal(findPetResponse.data.tags[0].id, payload.tags[0].id, `Tag ID in response body is ${findPetResponse.data.tags[0].id}`)
    chai.assert.equal(findPetResponse.data.tags[0].name, payload.tags[0].name, `Tag Name in response body is ${findPetResponse.data.tags[0].name}`)
    chai.assert(findPetResponse.data.status === status, `Status in response body is ${findPetResponse.data.status}`)
});

Then('The Get pet request is successful and the photoUrl Array has one entry', async (status) => {
    I.addMochawesomeContext({ title: "FIND PET REQUEST RESPONSE", value: findPetResponse.data });

    chai.assert.equal(findPetResponse.status, 200, `Status code is ${findPetResponse.status}`)
    chai.assert.equal(findPetResponse.data.id, payload.id, `ID in response body is ${findPetResponse.data.id}`)
    chai.assert.equal(findPetResponse.data.category.id, payload.category.id, `Category ID in response body is ${findPetResponse.data.category.id}`)
    chai.assert.equal(findPetResponse.data.category.name, payload.category.name, `Category Name in response body is ${findPetResponse.data.category.name}`)
    chai.assert.equal(findPetResponse.data.name, payload.name, `Pet name in response body is ${findPetResponse.data.name}`)
    chai.assert(findPetResponse.data.photoUrls.length != 0 && findPetResponse.data.photoUrls.length < 2, `PhotoUrls is empty: ${findPetResponse.data.photoUrls}`)
    chai.assert.equal(findPetResponse.data.tags[0].id, payload.tags[0].id, `Tag ID in response body is ${findPetResponse.data.tags[0].id}`)
    chai.assert.equal(findPetResponse.data.tags[0].name, payload.tags[0].name, `Tag Name in response body is ${findPetResponse.data.tags[0].name}`)
    chai.assert(findPetResponse.data.status === status, `Status in response body is ${findPetResponse.data.status}`)
});

Then('The Get Pet Response only has pets that are {string}', async (status) => {
    chai.assert.equal(findPetResponse.status, 200, `Status code is 200`)

    for (let i = 0; i < findPetResponse.data.length; i++) {
        I.addMochawesomeContext({ title: "FIND PET REQUEST RESPONSE", value: findPetResponse.data[i] });
        chai.assert(findPetResponse.data[i].status === status, `Status in response body is ${findPetResponse.data.status}`)
    }
});

Then('The Delete response was successful', async () => {
    I.addMochawesomeContext({ title: "DELETE PET RESPONSE", value: delPetResponse.data });

    chai.assert.equal(delPetResponse.status, 200, `Status code is ${findPetResponse.status}`)
    chai.assert.equal(delPetResponse.data.code, 200, `Code in response body is ${delPetResponse.data.code}`)
    chai.assert.equal(delPetResponse.data.type, "unknown", `Category ID in response body is ${delPetResponse.data.type}`)
    chai.assert.equal(delPetResponse.data.message, addPetResponse.data.id, `Category Name in response body is ${delPetResponse.data.message}`)
});

Then('The Delete response was not successful', async () => {
    I.addMochawesomeContext({ title: "FIND PET RESPONSE", value: delPetResponse.status });

    chai.assert.equal(delPetResponse.status, 404, `Status code is ${delPetResponse.status}`)
});

Then('The response has error code {int} with message {string}, type {string} and status {int}', async (errorCode, errorMessage, errorType, status) => {
    I.addMochawesomeContext({ title: "REQUEST RESPONSE", value: addPetResponse.data });

    chai.assert.equal(addPetResponse.status, status, `Status is ${addPetResponse.status}`)
    chai.assert.equal(addPetResponse.data.code, errorCode, `Error code is ${addPetResponse.data.code}`)
    chai.assert.equal(addPetResponse.data.type, errorType, `Type is ${addPetResponse.data.type}`)
    chai.assert.equal(addPetResponse.data.message, errorMessage, `Error Message is ${addPetResponse.data.message}`)
});

Then('The update pet with form response has error code {int} with message {string}, type {string} and status {int}', async (errorCode, errorMessage, errorType, status) => {
    I.addMochawesomeContext({ title: "UPDATE PET WITH FORM RESPONSE", value: updatePetFormResponse.data });

    chai.assert.equal(updatePetFormResponse.status, status, `Status is ${updatePetFormResponse.status}`)
    chai.assert.equal(updatePetFormResponse.data.code, errorCode, `Error code is ${updatePetFormResponse.data.code}`)
    chai.assert.equal(updatePetFormResponse.data.type, errorType, `Type is ${updatePetFormResponse.data.type}`)
    chai.assert.equal(updatePetFormResponse.data.message, errorMessage, `Error Message is ${updatePetFormResponse.data.message}`)
});

Then('The Get Pet Response has error code {int} with message {string}, type {string} and status {int}', async (errorCode, errorMessage, errorType, status) => {
    I.addMochawesomeContext({ title: "GET PET RESPONSE", value: findPetResponse.data });

    chai.assert.equal(findPetResponse.status, status, `Status is ${findPetResponse.status}`)
    chai.assert.equal(findPetResponse.data.code, errorCode, `Error code is ${findPetResponse.data.code}`)
    chai.assert.equal(findPetResponse.data.type, errorType, `Type is ${findPetResponse.data.type}`)
    chai.assert.equal(findPetResponse.data.message, errorMessage, `Error Message is ${findPetResponse.data.message}`)
});

Then('The Delete Pet Response has error code {int} with message {string}, type {string} and status {int}', async (errorCode, errorMessage, errorType, status) => {
    I.addMochawesomeContext({ title: "DELETE PET RESPONSE", value: delPetResponse.data });

    chai.assert.equal(delPetResponse.status, status, `Status is ${delPetResponse.status}`)
    chai.assert.equal(delPetResponse.data.code, errorCode, `Error code is ${delPetResponse.data.code}`)
    chai.assert.equal(delPetResponse.data.type, errorType, `Type is ${delPetResponse.data.type}`)
    chai.assert.equal(delPetResponse.data.message, errorMessage, `Error Message is ${delPetResponse.data.message}`)
});

Then('The update pet with form request is successful', async () => {
    I.addMochawesomeContext({ title: "UPDATE PET WITH FORM RESPONSE", value: updatePetFormResponse.data });

    chai.assert.equal(updatePetFormResponse.status, 200, `Status code is ${updatePetFormResponse.status}`)
    chai.assert.equal(updatePetFormResponse.data.code, 200, `Code is ${updatePetFormResponse.data.code}`)
    chai.assert.equal(updatePetFormResponse.data.type, "unknown", `Type is ${updatePetFormResponse.data.type}`)
    chai.assert.equal(updatePetFormResponse.data.message, payload.id, `Id in response is ${updatePetFormResponse.data.message}`)
});

Then('The upload picture request is successful', async () => {
    I.addMochawesomeContext({ title: "UPLOAD PICTURE OF PET RESPONSE", value: uploadPictureResponse.data });

    chai.assert.equal(uploadPictureResponse.status, 200, `Status code is ${uploadPictureResponse.status}`)
    chai.assert.equal(uploadPictureResponse.data.code, 200, `Code is ${uploadPictureResponse.data.code}`)
    chai.assert.equal(uploadPictureResponse.data.type, "unknown", `Type is ${uploadPictureResponse.data.type}`)
    chai.assert.equal(uploadPictureResponse.data.message, "additionalMetadata: somethingorRather\nFile uploaded to ./dog.jpg, 668704 bytes", `Id in response is ${uploadPictureResponse.data.message}`)
});

Then('The upload picture for the pet response has error code {int} with message {string}, type {string} and status {int}', async (errorCode, errorMessage, errorType, status) => {
    I.addMochawesomeContext({ title: "UPDATE PET WITH FORM RESPONSE", value: uploadPictureResponse.data });

    chai.assert.equal(uploadPictureResponse.status, status, `Status is ${uploadPictureResponse.status}`)
    chai.assert.equal(uploadPictureResponse.data.code, errorCode, `Error code is ${uploadPictureResponse.data.code}`)
    chai.assert.equal(uploadPictureResponse.data.type, errorType, `Type is ${uploadPictureResponse.data.type}`)
    chai.assert.equal(uploadPictureResponse.data.message, errorMessage, `Error Message is ${uploadPictureResponse.data.message}`)
});