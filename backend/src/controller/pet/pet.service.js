const Pet = require('../../models/pet.model');

exports.uploadNewPet = (pet) => {
    const newPet = new Pet(pet)
    return newPet.save()
};

exports.getPetsByBreed = (filterBy) => Pet.find({breed: filterBy});
