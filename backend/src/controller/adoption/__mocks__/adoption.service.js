const adoptionService = jest.mock('./adoption.service.js');

let mockData;

adoptionService.uploadNewAdoption = jest.fn(newAdopt => Promise.resolve(newAdopt));

adoptionService.__setMockData = data => mockData = data;

module.exports = adoptionService;