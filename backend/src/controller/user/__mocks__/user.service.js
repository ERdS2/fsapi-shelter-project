const userService = jest.mock('./user.service.js');

let mockData;

userService.uploadNewUser = jest.fn(newUser => Promise.resolve(newUser));

userService.__setMockData = data => mockData = data;

module.exports = userService;