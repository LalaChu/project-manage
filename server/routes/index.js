var express = require('express');
var router = express.Router();
var passport = require('../passportConfig');
var mongoose = require('mongoose');
var Staff = require('../models/staff');
var Department = require('../models/department');


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
router.put('/staff',function(req, res){
    var info = req.body;
    Staff.findById(info._id, function(err, person){
        for(var e in info){
            person[e] = info[e]
        }
        person.save(function(err){
            res.setHeader("Content-Type","application/json");
            if(err){
                res.send({"result":err});
            }else{
                res.send({"result": 'success'});
            }
        })
    })
})
router.delete('/staff',function(req,res){
    Staff.findByIdAndRemove(req.body._id, function(err){
        res.setHeader("Content-Type","application/json");
        if(err){
            res.send({"result":err});
        }else{
            res.send({"result": 'success'});
        }
    })
})
router.post('/staff', function(req,res){
    Staff.find(function(err, data){
        res.setHeader("Content-Type","application/json");
        if(err){
            res.send({"result":err});
        }else{
            res.send({"result": data});
        }
    })
})

router.post('/addDepartment', function(req, res){
    var department = new Department(req.body);
    if(req.body.parentId){
        department.addTo(req.body.parentId, req.body, function(err){
            res.setHeader("Content-Type","application/json");
            if(err){
                res.send({"result":err});
            }else{
                res.send({"result": 'success'});
            }
        })
    }else{
        department.save(function(err){
            res.setHeader("Content-Type","application/json");
            if(err){
                res.send({"result":err});
            }else{
                res.send({"result": 'success'});
            }
        })
    }
    
})

router.post('/departmentList', function(req, res){
    var department = new Department();
    Department.find(function(err, data){
        res.setHeader("Content-Type","application/json");
        if(err){
            res.send({"result":err});
        }else{
            res.send({"result": data});
            // res.redirect('/')
        }
    })
})

module.exports = function (app) {
    app.use('/', router);
};
