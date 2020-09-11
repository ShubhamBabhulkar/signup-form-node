var express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user.model');
var router = express.Router();

router.post('/', async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if(error){
    return res.status(400).json({message: error.details[0].message});
  } else {
      let users = await User.findOne({email: req.body.email});
      if(users) return res.status(400).json({message: 'User already registered'});
      
      let user = new User(req.body);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      user = await user.save();
      user = _.pick(user, ['_id', 'firstName', 'email', 'scubscribe']);
      res.json(user);
    }
});

module.exports = router;
