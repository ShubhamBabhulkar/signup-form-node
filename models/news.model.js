
    const Joi = require('joi');
    const mongoose = require('mongoose');
    const newsSchema = mongoose.model('news', new mongoose.Schema({
    title: {
        type: String,
        required: true, 
        minlength: 5,
        maxlength: 250
    },
    description: {
        type: String,
        required: true, 
        // minlength: 5000,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
        // ,
    // image: {
    //     type: String,
    //     maxlength:1024,
    //     required: true
    // }
}));

function validate(news) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).required(),
        user: Joi.string().required(),
    };
    return Joi.validate(news, schema);
};

function updateValidate(news) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).required(),
    };
    return Joi.validate(news, schema);
};

exports.News = newsSchema;
exports.validate = validate;
exports.updateValidate = updateValidate;

