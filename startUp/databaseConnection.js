const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    mongoose.connect('mongodb://localhost/reactive-form-news', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => winston.info('connected to mongodb...'))
}