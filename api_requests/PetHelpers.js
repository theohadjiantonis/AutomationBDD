const { I, Request } = inject();
const jsf = require('json-schema-faker');
const petSchema = require('.././JsonSchemas/pet_schema.json');

const PetJson = async () => {
    I.addMochawesomeContext({ title: 'GENERATING PET JSON', value: ""});
    try {
        const fakeData = jsf.generate(petSchema);
        I.addMochawesomeContext({ title: 'PET JSON', value: fakeData });
        return fakeData;
    } catch (error) {
        I.addMochawesomeContext({ title: 'Something went wrong generating the Json:', value: error });
        return error;
    }
};

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

module.exports = {
    PetJson,
    AddPet,
    FindPetById
}
