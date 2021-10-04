const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const PetSchema = mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId, ref: 'Pet', require: true},
    name: { type: String, require: true },
    age: { type: String, require: true },
    sex: { type: String, require: true },
    breed: { type: String, require: true},
    color: { type: String, require: true },
    story: { type: String, require: true },
    image: { type: String, require: true},
    available: { type: Boolean, require: true }
}, {
    timestamp: true
});

PetSchema.plugin(idValidator);

module.exports = mongoose.model('Pet', PetSchema, 'pets')