const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const AdoptSchema = mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    pet_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Pet', require: true},
}, {
    timestamp: true
});

AdoptSchema.plugin(idValidator);

module.exports = mongoose.model('Adopt', AdoptSchema, 'adopts')