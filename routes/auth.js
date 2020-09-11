var express = require('express');
var router = express.Router();
const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const config = require('config');

router.put('/', async (req, res) => {
  const { error } = validate(req.body);
  if(error){
      return res.status(400).json({message: error.details[0].message});
  } else {
        let user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).json('Invalie emial or password');
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json('Invalie emial or password');
        
        const token = jwt.sign(_.pick(user, ['_id', 'name', 'email']), config.get('jwt.password'));
        res.json({token: token});
    }
});

function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(50).required().email(),
      password: Joi.string().max(1024).required(),
    };
    return Joi.validate(req, schema);
  };

module.exports = router;
