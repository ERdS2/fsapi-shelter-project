const Adopt = require('../../models/adopt.model');
const Pet = require('../../models/pet.model');

exports.uploadNewAdoption = (adoption) => {
    const newAdoption = new Adopt(adoption)
    Pet.findById(newAdoption.pet_id)
        .then((pet) => {
        pet.available = false;
        pet.save()
    })

    return newAdoption.save()
};
