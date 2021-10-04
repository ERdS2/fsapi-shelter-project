const adoptionService = require('./adoption.service');
const logger = require('../../../config/logger');
const createHttpError = require('http-errors');


//upload new adoption
exports.uploadNewAdoption = (req, res, next) => {

    const { _id } = req.body;
    
    const user = req.user;

    if (!req.body["_id"]) {
        return next(new createHttpError.BadRequest('Invalid request body!'))
    }

    const newAdoption = {
        user_id: user._id,
        pet_id: _id
    }

    return adoptionService.uploadNewAdoption(newAdoption)
        .then(newAdoption => {
            res.status(201).json(newAdoption)
        }).catch(err => {

            logger.error(err);
            return next(new createHttpError[500]('could not save pet'))
        })
};
