var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var Staff = require('../models/staff');


router.all('*', function(req, res, next){
    if(req.isAuthenticated()){
        if(req.url === '/login'){
            res.redirect('/');
        }else{
            res.render('index');
        }
    }else{
        if(req.url === '/login'){
            return next();
        }else{
            res.redirect('/login');
        }
    }
})

router.get('/', function(req, res, next) {
    if(req.user){
        res.render('index');
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

router.post('/login', passport.authenticate('local',{
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash : true
        }));


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
