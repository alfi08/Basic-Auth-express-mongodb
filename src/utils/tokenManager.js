const jwt = require('jsonwebtoken');

exports.generateToken = (id) => jwt.sign({ id }, process.env.SECRET_KEY, {expiresIn: '1d'});

exports.verifyToken = (token) => jwt.verify(token, process.env.SECRET_KEY);
