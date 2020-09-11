
    const Joi = require('joi');
    const mongoose = require('mongoose');
    const userSchema = mongoose.model('User', new mongoose.Schema({
    firstName: {
        type: String,
        required: true, 
        minlength: 5,
        maxlength: 250
    },
    lastName: {
        type: String,
        required: true, 
        minlength: 5,
        maxlength: 250
    },
    email: {
        type: String,
        required: true
        },
    password: {
        type: String,
        maxlength:1024,
        required: true
    },
    phoneNo: {
        type: String,
        required: true,
        maxlength:10,
        required: 10
    },
    scubscribe: {
        type: Boolean,
    },
}));

function validateCustomer(user) {
    const schema = {
        firstName: Joi.string().min(5).max(50).required(),
        lastName: Joi.string().min(5).max(250).required(),
        email: Joi.string().required().email(),
        password: Joi.string().max(1024).required(),
        phoneNo: Joi.string().min(10).max(10).required(),
        scubscribe : Joi.boolean(),
    };
    return Joi.validate(user, schema);
};

exports.User = userSchema;
exports.validate = validateCustomer;
