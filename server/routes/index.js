var express = require('express');
var router = express.Router();
var passport = require('../passportConfig');
var mongoose = require('mongoose');
var Staff = require('../models/staff');


router.get('*', function(req, res, next){
    if(req.isAuthenticated()){
        if(req.url === '/login' || req.url === '/register'){
            res.redirect('/');
        }else{
            res.render('index',{user: req.user});
        }
    }else{
        if(req.url === '/login' || req.url === '/register'){
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
router.post('/login', passport.authenticate('local',{
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash : true
        }));


router.get('/register', function(req, res) {
    res.render('login')
})

router.post('/logout',function(req, res){
    req.logout();
    res.redirect('/login');
})

router.post('/addStaff',function(req, res){
    var staff = new Staff(req.body);
    staff.save(function(err){
        res.setHeader("Content-Type","application/json");
        if(err){
            res.send({"result":err});
        }else{
            res.send({"result": 'success'});
            // res.redirect('/')
        }
    })
})


module.exports = function (app) {
    app.use('/', router);
};
