const jwt = require('jsonwebtoken');

exports.generateToken = (id) => jwt.sign({ id }, 'rahasia', {expiresIn: '1d'});

exports.verifyToken = (token) => jwt.verify(token, 'rahasia');
