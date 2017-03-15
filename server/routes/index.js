var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var Staff = require('../models/staff');


router.all('*', function(req, res, next){
    if(req.isAuthenticated() || req.url === '/login'){
        return next();
    }else{
        res.redirect('/login');
    }
})

router.get('/', function(req, res, next) {
    console.log('login success');
    if(req.user){
        // console.log('this is user:',req.user)
        res.render('index');
        res.end();
    }else{
        res.redirect('/login');
    }
});

router.get('/login', function(req, res) {
    res.render('login')
})

router.get('/loginFailure',function(req,res){
    res.send('loginFailure')
})

router.post('/login', function(req,res){
    res.redirect('/')
})


router.get('/register', function(req, res) {
    res.render('login')
})

router.post('/test',function(req,res){
    Staff.findOne({"username":'hurina'}, function(err,person){
        res.send(person)
    })
})

module.exports = function (app) {
    app.use('/', router);
};
