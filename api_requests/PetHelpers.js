const { I, Request } = inject();
const jsf = require('json-schema-faker');
const petSchema = require('.././JsonSchemas/pet_schema.json');

//retrieve exchange rate
const PetJson = async () => {
    I.addMochawesomeContext({ title: 'Generate Pet Json'});
    try {
        const schema = await fs.readJson(schemaFilePath);
        const fakeData = jsf.generate(schema);
        I.addMochawesomeContext({ title: 'Generated data from the schema:', value: fakeData });
        return fakeData;
    } catch (error) {
        I.addMochawesomeContext({ title: 'Something went wrong generating the Json:', value: error });
        return error;
    }
};

const PostRequest = async (payload) => {
    I.addMochawesomeContext({ title: 'SEND ADD PET POST REQUEST' });

    endpoint = '/pet'
      data ={
        endpoint,
        headers: {
          "Content-Type": "application/json"
        },
        payload
      }
    const response = await Request.Post(data);
  
    I.addMochawesomeContext({title: 'DEPOSIT STATUS', value: response.status});
    I.addMochawesomeContext({title: 'DEPOSIT HEADERS', value: response.headers});
    I.addMochawesomeContext({title: 'DEPOSIT DATA', value: response.data});

    return response;
}

module.exports = {
    PetJson
}
