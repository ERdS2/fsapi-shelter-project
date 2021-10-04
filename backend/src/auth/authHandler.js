const jwt = require('jsonwebtoken');
const Users = require('../models/user.model');
const Token = require('../models/token.model');

module.exports.login = (req, res) => {
    
    const { inputEmail, inputPassword } = req.body;

    Users.findOne({ email: inputEmail, password: inputPassword })
    .then(user => {

        if (user) {
            const accessToken = jwt.sign({
                email: user.email,
                role: user.role,
                _id: user._id
            }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRY
            });

            const refreshToken = jwt.sign({
                email: user.email,
                role: user.role,
                _id: user._id
            }, process.env.REFRESH_TOKEN_SECRET);

            const newRefreshToken = new Token({
                token: refreshToken
            });

            newRefreshToken.save()

            res.json({
                accessToken,
                refreshToken,
                email: user.email,
                _id: user._id,
                role: user.role
            })
        } else {
            res.status(400).json('email or password is incorrect');
        }
    });

}

module.exports.refresh = (req, res) => {

    const { token } = req.body;

    if (!token) {
        res.sendStatus(401);
        return;
    }
    Token.findOne({ token: token })
        .then(data => {
            if (data) {
                jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                    console.log(user)
                    if (err) {
                        res.sendStatus(403);
                    }
                    const accessToken = jwt.sign({
                        email: user.email,
                        role: user.role,
                        _id: user._id
                    }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: process.env.TOKEN_EXPIRY
                    });
                    res.json(
                        {
                            accessToken,
                            userData: {
                                email: user.email,
                                role: user.role,
                                _id: user._id
                            }
                        }
                    );
                    return;
                })
            }
        })
}

module.exports.logout = (req, res) => {
    const { token } = req.body;
    if (!token) {
        res.sendStatus(403);
        return;
    }


    Token.findOneAndRemove({ token: token })
        .then(data => {
            if (data) {
                res.status(200).send({});
            } else {
                res.sendStatus(403);
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json("Could not logout user");
        })


}