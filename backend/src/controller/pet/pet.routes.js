const express = require('express');
const routes = express.Router();

const petController = require('./pet.controller');

//auth
const adminRoleHandler = require('../../auth/adminOnly')
const authenticate = require('../../auth/authenticate')

//get pets by breed

routes.get('/:category', (req, res, next) => {
    return petController.getPetsByBreed(req, res, next);
});

//upload new pet
routes.post('/', authenticate, adminRoleHandler, (req, res, next) => {
    return petController.uploadNewPet(req, res, next);
});


module.exports = routes;