var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');
var clientdata;


router.get('/', function(req, res, next) {
  if(req.cookies.logged){
    var userid = req.cookies.logged;
    var query = User.findOne({ '_id' : userid });
    query.select('username email cardNo money');
    query.exec(function (err, user) {
      if (err) return handleError(err);
      clientdata=user;
      res.render('client', {clientdata: user, title: 'client', action: "CLIENTSPAGE" });
    });
  } else {
    res.redirect('/login');
  }
});

router.get('/withdraw', function(req, res, next) {
  res.render('client', { action: 'WITHDRAW', clientdata: clientdata, title: 'WITHDRAW' });
});

router.get('/deposit', function(req, res, next) {
  res.render('client', { action: 'DEPOSIT', clientdata: clientdata, title: 'DEPOSIT' });
});

router.get('/logout', function(req, res, next) {
  res.clearCookie("logged");
  res.redirect('/login');
});

router.get('/bank', function(req, res, next) {
  res.send('it goes to get');
});

router.post('/bank', function(req, res, next) {
  console.log('transaction in progress');
  var cash = req.body.cash;
  var cardNo = req.body.cardNo;
  var action = req.body.action;
  console.log(cash+' '+cardNo+' '+action);

    if(action=='DEPOSIT'){
      var newCash = (parseInt(cash) + parseInt(clientdata.money)).toString();
      var depositmoney = User.updateOne({ 'cardNo' : cardNo }, { $set: {'money' : newCash } }
    );
    deposit.exec(function (err, result) {
      if (err) return handleError(err);
      console.log(result);
    });
  };

  if(action=='WITHDRAW'){
    var newCash = parseInt(clientdata.money) - parseInt(cash);
    if(newCash<0){res.redirect('/client'); return;}
    var withdraw = User.updateOne(
      { 'cardNo' : cardNo },
      { $set: { 'money' : newCash } }
    );
    withdraw.exec(function (err, result) {
      if (err) return handleError(err);
      console.log(result);
    });
  };
  res.redirect('/client');
});


module.exports = router;
