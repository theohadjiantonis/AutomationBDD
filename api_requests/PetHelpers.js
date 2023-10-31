const { I, Request } = inject();
const jsf = require('json-schema-faker');
const fs = require('fs');
const FormData = require('form-data');
const petSchema = require('.././JsonSchemas/pet_schema.json');

//Generate a Json from the schema
const PetJson = async () => {
    I.addMochawesomeContext({ title: 'GENERATING PET JSON....', value: ""});
    try {
        const fakeData = jsf.generate(petSchema);
        return fakeData;
    } catch (error) {
        I.addMochawesomeContext({ title: 'Something went wrong generating the Json:', value: error });
        return error;
    }
};

//--------------------------------------------POST REQUESTS--------------------------------//
const AddPet = async (payload) => {
    I.addMochawesomeContext({ title: 'SEND ADD PET POST REQUEST', value: "" });

    endpoint = '/pet'
      data ={
        endpoint,
        headers: {
          "Content-Type": "application/json"
        },
        payload
      }
    const response = await Request.Post(data);  
    return response;
}

const UpdatePetForm = async (payload, id) => {
    I.addMochawesomeContext({ title: 'UPDATE PET POST REQUEST', value: "" });

    endpoint = `/pet/${id}`
    data = {
        endpoint,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        payload
    }
    const response = await Request.Post(data);
    return response;
}

const UploadPictureForm = async (id, additionalMetadata = "") => {
    I.addMochawesomeContext({ title: 'UPLOAD PET PICTURE POST REQUEST', value: "" });

    endpoint = `/pet/${id}/uploadImage`
    const fileStream = fs.createReadStream('./Images_For_Upload/dog.jpg');

    const payload = new FormData();

    payload.append("file", fileStream);
    payload.append("additionalMetadata", additionalMetadata)

    data = {
        endpoint,
        headers: {
            "Content-Type": `multipart/form-data; boundary=${payload._boundary}`
        },
        payload
    }
    const response = await Request.Post(data);

    //adding a small delay in case upload is slow 
    I.wait(5);
    return response;
}

//--------------------------------------GET REQUESTS----------------------------------------------//
const FindPetById = async (Id) => {
    I.addMochawesomeContext({ title: 'SEND FIND PET GET REQUEST', value: "" });

    endpoint = `/pet/${Id}`;
    data = {
        endpoint,
        headers: {
            "Content-Type": "application/json"
        }
    };
    const response = await Request.Get(data);
    return response;
}

const FindPetByStatus = async (status) => {
    I.addMochawesomeContext({ title: 'SEND FIND PET GET REQUEST', value: "" });

    endpoint = `/pet/findByStatus?status=${status}`;
    data = {
        endpoint,
        headers: {
            "Content-Type": "application/json"
        }
    };
    const response = await Request.Get(data);
    return response;
}
//----------------------------------DELETE REQUESTS------------------------------------------//
const DeletePet = async (Id) => {
    I.addMochawesomeContext({ title: 'DELETE PET REQUEST', value: "" });

    endpoint = `/pet/${Id}`;
    data = {
        endpoint,
        headers: {
            "Content-Type": "application/json",
            "api_key": secret("someApiKey")
        }
    };
    const response = await Request.Delete(data);
    return response;
}

//----------------------------------PUT REQUESTS--------------------------------------------//
const UpdatePetPut = async (payload) => {
    I.addMochawesomeContext({ title: 'UPDATE PET PUT REQUEST', value: "" });

    endpoint = '/pet'
    data = {
        endpoint,
        headers: {
            "Content-Type": "application/json"
        },
        payload
    }
    const response = await Request.Put(data);
    return response;
}

module.exports = {
    PetJson,
    AddPet,
    FindPetById,
    FindPetByStatus,
    UpdatePetForm,
    UploadPictureForm,
    UpdatePetPut,
    DeletePet
}
