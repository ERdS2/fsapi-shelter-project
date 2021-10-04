const logger = require('../../../config/logger');
const createHttpError = require('http-errors');
const userService = require('./user.service');

//upload new user
exports.uploadNewUser = (req, res, next) => {

  const { name, email, password} = req.body;

  if (!req.body["name"] || !req.body["email"] || !req.body["password"]) {
    return next(new createHttpError.BadRequest('Invalid request body!'))
  }

  const newUser = {
    name: name,
    email: email,
    password: password,
    role: "user"
  }

  return userService.uploadNewUser(newUser)
  .then(user => {
      const {password, ...userWithoutPassword} = user;
      res.status(201).json(userWithoutPassword);
  }).catch(err => {
      logger.error(err);
      return next(new createHttpError[500]('could not save user'))
  })
};

