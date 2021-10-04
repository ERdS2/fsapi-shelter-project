const { mockRequest, mockResponse } = require('jest-mock-req-res');
const userController = require('./user.controller');
const userService = require('./user.service');
const createError = require('http-errors');

jest.mock('./user.service.js')

describe("UserController tests", () => {
    const mockData = [
        {
            "name": "admin",
            "id": 2,
            "password": "adminadmin",
            "email": "admin@admin.hu",
            "pets": [2, 5],
            "type": "admin"
        },
        {
            "name": "Jani",
            "id": 5,
            "password": "janivagyok",
            "email": "jani@mail.hu",
            "pets": [4],
            "type": "user"
        },
    ]

    let nextFunction;
    let response;

    // runs before EACH TEST
    beforeEach(() => {
        userService.__setMockData(mockData);
        nextFunction = jest.fn();
        response = mockResponse()
    });

    test('saveUser method test', () => {
        
        const userToCreate = {
            name: 'Teszt',
            email: 'teszt@mail.hu',
            role: 'user',
            password: "asdasd"
        };
        
        const request = mockRequest({
            body: userToCreate,
        });

        const {password, ...userWithoutPassword} = userToCreate;
        return userController.uploadNewUser(request, response, nextFunction)
            .then(() => {
                expect(userService.uploadNewUser).toBeCalledWith(userToCreate);
                expect(response.json).toBeCalledWith(userWithoutPassword);
            });
    });

});