const express = require('express');
const routes = express.Router();

const userController = require('./user.controller');


//upload new user
routes.post('/', (req, res, next)=>{
    return userController.uploadNewUser(req, res, next);
});



module.exports = routes;