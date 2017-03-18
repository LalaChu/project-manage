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
    Staff.find(function(err, staffs){
        Department.find(function(err, departs){
            var list = [];
            var user = {};
            staffs.map(function(staff){
                user = staff.toObject();
                user.departmentName = [];
                if(user.departmentId.length){
                    departs.map(function(depart){
                        if(user.departmentId[0] === depart._id.toString()){
                            user.departmentName.push(depart.name);
                            if(user.departmentId[1]){
                                user.departmentName.push(depart.children.id(user.departmentId[1]).name);
                            }
                        }
                    })
                }
                list.push(user)
            })
            res.setHeader("Content-Type","application/json");
            if(err){
                res.send({"result":err});
            }else{
                res.send({"result": list});
            }
        })
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
router.put('/department',function(req,res){
    function callback(err){
        res.setHeader("Content-Type","application/json");
        if(err){
            res.send({"result":err});
        }else{
            res.send({"result": 'success'});
        }
    }
    var info = req.body;
    if(info.parentId){
        console.log(info.name)
        Department.update({"_id": info.parentId, "children._id":mongoose.Types.ObjectId(info._id)}, { "$set" : {"children.$.name": info.name, "children.$.manageId": info.manageId}}, function(err, doc){callback(err)})
        // Department.findByIdAndUpdate(info.parentId, function(err, depart){
        //     var target = depart.children.id(info.parentId);
        //     target.name = info.name;
        //     target.manageId = info.manageId;
        //     target.save(callback(err));
        // })
    }else{
        Department.findById(info._id,function(err, depart){
            depart.name = info.name;
            depart.manageId = info.manageId;
            depart.save(callback(err));
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

router.post('/test',function(req, res){
    
    if(req.body.departmentId.length){
        var id = req.body.departmentId[1]
        Department.findById(req.body.departmentId[1],function(err, user){
            var temp 
            if(user){
                
            }else{
                temp = Department.children.id(id)
            }
            res.send(temp)
        })
    }
})

module.exports = function (app) {
    app.use('/', router);
};
