var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');


router.get('/', function(req, res, next) {
  if(req.cookies.logged){
    res.redirect('/client');
  } else {
    res.render('login', { title: 'LOGIN'});
  }
});


router.post('/', function(req,res,next) {
  var username = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var query = User.findOne({'username': username, 'email': email, 'password': password });
  query.select('id username email password');
  query.exec(function (err, user) {
    if (err) return handleError(err);
    console.log('Username: %s, Email: %s, Password: %s', user.username, user.email, user.password);
    res.cookie('logged', user.id);
    res.redirect('/client');
  });
});

module.exports = router;
