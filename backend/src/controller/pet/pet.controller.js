
const petService = require('./pet.service');
const logger = require('../../../config/logger');
const createHttpError = require('http-errors');

//get pets by breed

exports.getPetsByBreed = (req, res, next) => {
    const filterBy = req.params.category;

    return petService.getPetsByBreed(filterBy).then(petList => {
        
         const filteredList = petList.filter(pet => pet.available === true);

         if (filteredList.length === 0 || !filteredList) {
           logger.error(err);
             return next(new createError[500]('could not send filteredlist'));
         }
        res.json(filteredList);
    }).catch (err => {
        logger.error(err);
        return next(new createHttpError[500]('could not send list'));
    })

};


//upload new pet
exports.uploadNewPet = (req, res, next) => {

    const { name, age, color, breed, story, image, sex } = req.body;

    if (!req.body["name"] || !req.body["age"] || !req.body["breed"] || !req.body["sex"] || !req.body["color"] || !req.body["story"] || !req.body["image"]) {
        return next(new createHttpError.BadRequest('Invalid request body!'))
    }

    const newPet = {
        name: name,
        age: age,
        sex: sex,
        color: color,
        breed: breed,
        story: story,
        image: image,
        available: true
    }

    return petService.uploadNewPet(newPet)
        .then(pet => {
            res.status(201).json(pet)
        }).catch(err => {
            logger.error(err);
            return next(new createHttpError[500]('could not save pet'))
        })
};



