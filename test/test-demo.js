
// kode implementasi
// describe('Test Suite 1', () => {
//     it('Test Case 1', () => {
//         console.log("Isi dari test case 1")
//     });

//     it('Test Case 2', () => {
//         console.log("Isi dari test case 2")
//     });

//     describe('Test Suite didalem test suite', () => {
//         it('Test Case 5', () => {
//             console.log("Isi dari test case 5")
//         });
//     });
// });

// describe('Test Suite 2', () => {
//     it('Test Case 3', () => {
//         console.log("Isi dari test case 3")
//     });

//     it('Test Case 4', () => {
//         console.log("Isi dari test case 4")
//     });
// });


const { should } = require('chai');
const request = require('supertest');
const assert = require('chai').assert;
const chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs');

describe('API Test for "restful-api.dev"', () => {

    const BASE_URL = "https://api.restful-api.dev/"

    // get
    it('Test - GET All Objects', async () => {
        const response = await request(BASE_URL)
            .get("objects")
        // console.log(response.statusCode);
        // console.log(response.body)

        //assertion
        assert.equal(response.statusCode, 200)
        assert.equal(response.body[0].name, 'Google Pixel 6 Pro')
        assert.equal(response.body[0].data.color, 'Cloudy White')
    });

    // post
    it('Test - POST All Objects', async () => {
        const body = {
            "name": "Apple MacBook Pro 16",
            "data": {
                "year": 2019,
                "price": 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
        }

        const response = await request(BASE_URL)
            .post("objects")
            .send(body);
        console.log(response.statusCode);
        console.log(response.body)

        const schemaPath = "resources/post-object-schema.json";
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))

        assert.jsonSchema(response.body, jsonSchema);
    });
});


