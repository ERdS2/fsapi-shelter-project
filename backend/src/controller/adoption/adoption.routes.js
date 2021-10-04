const express = require('express');
const routes = express.Router();
const authenticate = require('../../auth/authenticate')

const adoptionController = require('./adoption.controller');

routes.post('/', authenticate, (req, res, next) => {
    return adoptionController.uploadNewAdoption(req, res, next);
});

module.exports = routes;