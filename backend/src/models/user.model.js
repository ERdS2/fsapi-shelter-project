const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const UserSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, require: true },
}, {
    timestamp: true
});

UserSchema.plugin(idValidator);

module.exports = mongoose.model('User', UserSchema, "users")