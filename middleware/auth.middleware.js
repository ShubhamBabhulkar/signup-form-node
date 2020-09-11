const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).json('Access denied. No tokem provided.');
    }
    try {
        const decoded =  jwt.verify(token, config.get('jwt.password'));
        req.user = decoded;
        next();
    }
    catch {
        res.status(400).send('Invalid token.');
    }
}