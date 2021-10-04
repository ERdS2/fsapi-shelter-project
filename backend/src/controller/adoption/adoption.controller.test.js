const { mockRequest, mockResponse } = require('jest-mock-req-res');
const adoptionController = require('./adoption.controller');
const adoptionService = require('./adoption.service');

jest.mock('./adoption.service.js')


describe("adoptionController tests", () => {
    const mockData = [
        {
            "id": 12312312,
            "user_id": 123,
            "pet_id": 211
        }
    ]

    let nextFunction;
    let response;

    // runs before EACH TEST
    beforeEach(() => {
        adoptionService.__setMockData(mockData);
        nextFunction = jest.fn();
        response = mockResponse()
    });

    test('saveAdoption method test', () => {

        const user = {
            _id: 123123
        }

        const body = {
            _id: 1202
        };

        const request = mockRequest({
            body: body,
            user: user
        });

        const newAdoption = {
            user_id: user._id,
            pet_id: body._id
        }

        return adoptionController.uploadNewAdoption(request, response, nextFunction)
            .then(() => {
                expect(adoptionService.uploadNewAdoption).toBeCalledWith(newAdoption);
                expect(response.json).toBeCalledWith(newAdoption);
            });
    });

});