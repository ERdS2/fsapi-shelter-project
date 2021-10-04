const User = require('../../models/user.model')

exports.uploadNewUser = async (user) => {
    if(await User.findOne({email: user.email})) {
        return next(new createError.BadRequest("Email is not available"));
    }
    const newUser = new User(user);
    return await newUser.save();
};

