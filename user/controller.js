const UUID = require('uuid/v4');
const { db } = require('../config/db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRET_KEY } = require('../config/config')
module.exports.sign_up = function (req, res, next) {
    try {
        const user = req.body;
        user.id = UUID()
        user.password = bcrypt.hashSync(req.body.password);
        const existing_user = db.get('users').find({ email: user.email }).value()
        if (existing_user) {
            return res.status(500).send({ status: 'failure', message: 'User Exists' })
        }
        db.get('users')
            .push(user)
            .write()
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.email }, SECRET_KEY, {
            expiresIn: expiresIn
        });
        res.status(201).send({
            "user": { email: user.email }, "access_token": accessToken, "expires_in": expiresIn
        });
    } catch (e) {
        res.status(500).send({ status: 'failure', message: 'Internal error' })
    }
}
module.exports.sign_in = function (req, res, next) {
    try {
        const user = req.body;
        const existing_user = db.get('users').find({ email: user.email }).value()
        if (existing_user) {
            bcrypt.compare(user.password, existing_user.password, function (err, result) {
                if (result) {
                    const expiresIn = 24 * 60 * 60;
                    const accessToken = jwt.sign({ email: user.email }, SECRET_KEY, {
                        expiresIn: expiresIn
                    });
                    res.status(201).send({
                        "user": user, "access_token": accessToken, "expires_in": expiresIn
                    });
                } else {
                    return res.status(500).send({ status: 'failure', message: 'Invalid credentials' })
                }
            });
        } else {
            res.status(400).send({ status: 'failure', message: 'User not found' });
        }
    } catch (e) {
        res.status(500).send({ status: 'failure', message: 'Internal error' })
    }
}
