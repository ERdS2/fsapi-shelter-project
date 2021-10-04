const petService = jest.mock('./pet.service.js');

let mockData;

petService.uploadNewPet = jest.fn(newPet => Promise.resolve(newPet));

petService.getPetsByBreed = jest.fn(filterBy => Promise.resolve(mockData.filter(pet => pet.breed === filterBy)));

petService.__setMockData = data => mockData = data;

module.exports = petService;