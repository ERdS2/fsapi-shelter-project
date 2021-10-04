const { mockRequest, mockResponse } = require('jest-mock-req-res');
const petController = require('./pet.controller');
const petService = require('./pet.service');

jest.mock('./pet.service.js')


describe("PetController tests", () => {
    const mockData = [
        {
            "name": "manci",
            "id": 2,
            "age": "1hónap",
            "sex": "kan",
            "breed": "dog",
            "color": "fehér",
            "image": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80",
            "story": "egyszer volt hol nem volt",
            "available": true
        },
        {
            "name": "buksi",
            "id": 4,
            "age": "6hónap",
            "sex": "nőstény",
            "breed": "dog",
            "image": "https://images.unsplash.com/photo-1554456854-55a089fd4cb2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
            "story": "egyszer ő is volt hol nem volt",
            "available": true
        },
        {
            "name": "Liló",
            "id": 5,
            "age": "1év",
            "sex": "kandúr",
            "breed": "cat",
            "image": "https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
            "story": "egyszer ő volt hol nem volt",
            "available": true
        }
    ]

    let nextFunction;
    let response;

    // runs before EACH TEST
    beforeEach(() => {
        petService.__setMockData(mockData);
        nextFunction = jest.fn();
        response = mockResponse()
    });

    test('savePet method test', () => {
        const petToCreate = {
            name: 'mancika',
            age: '3hónap',
            sex: 'kan',
            color: 'fehér',
            breed: 'dog',
            story: 'egyszer volt hol nem volt se',
            image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80',
            available: true
        };

        const request = mockRequest({
            body: petToCreate,
        });

        return petController.uploadNewPet(request, response, nextFunction)
            .then(() => {
                expect(petService.uploadNewPet).toBeCalledWith(petToCreate);
                expect(response.json).toBeCalledWith(petToCreate);
            });
    });

   

    test("getPetsByBreed - valid breed", () => {

        const TARGET_PET_BREED = "dog";
        const TARGET_PET_LIST = mockData.filter(pet => pet.breed === TARGET_PET_BREED)
        const request = mockRequest({
            params: {
                category: TARGET_PET_BREED
            }
        });    

        return petController.getPetsByBreed(request, response, nextFunction)
            .then(() => {
                expect(petService.getPetsByBreed).toBeCalled()
                expect(response.json).toBeCalledWith(TARGET_PET_LIST)
            });
    })

});