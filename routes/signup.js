var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

// SIGNUP PAGE
router.get('/', function(req, res, next) {
  if(req.cookies.logged){
    res.redirect('/client');
  } else {
    res.render('signup', { title: 'SIGNUP' });
  }
});


router.post('/', function(req, res, next) {
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    cardNo: req.body.card,
    password: req.body.password
  });

  user.save();
  res.render('login', { title: 'LOGIN' });
});

module.exports = router;
