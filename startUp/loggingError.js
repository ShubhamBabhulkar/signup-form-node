const winston = require('winston');
require('express-async-errors');
require('winston-mongodb')
module.exports = function() {
    winston.add(new winston.transports.File({ filename: 'logs/generaLog.log' }));
    
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/reactive-form', leve: 'info' }));
    
    winston.exceptions.handle( new winston.transports.File({ filename: 'logs/HighlevelLog.log' }) );

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
}