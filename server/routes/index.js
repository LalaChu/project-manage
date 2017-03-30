var express = require('express');
var router = express.Router();
var passport = require('../passportConfig');
var mongoose = require('mongoose');
var Staff = require('../models/staff');
var Department = require('../models/department');
var Project = require('../models/project');
var Daily = require('../models/daily');
var Documents = require('../models/document');
var Path = require('../models/path');
var Task = require('../models/task');
var path = require('path');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var path = require('path');
var moment = require('moment');
var removePath = require('child_process');


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

router.post('/curUser',function(req, res){
    res.setHeader("Content-Type","application/json");
    res.send({result: req.user})
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
        Department.update(
            {"_id": info.parentId, "children._id":mongoose.Types.ObjectId(info._id)},
            { "$set" : 
                {
                    "children.$.name": info.name, 
                    "children.$.manageId": info.manageId
                }
            }, function(err, doc){callback(err)})
    }else{
        Department.findById(info._id,function(err, depart){
            depart.name = info.name;
            depart.manageId = info.manageId;
            depart.save(callback(err));
        })
    }
})
router.delete('/department', function(req, res){
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
        Department.findById(info.parentId, function(err, depart){
            if(!err){
                depart.children.id(info._id).remove();
                depart.save(function(err){
                    if(!err){
                        Staff.update({departmentId: info._id}, {departmentId: [info.parentId]},function(err){
                            callback(err)
                        })
                    }else{
                        callback(err);
                    }
                });
            }else{
                callback(err);
            }
        })
    }else{
        Department.findByIdAndRemove(info._id,function(err){
            if(!err){
                Staff.update({departmentId: info._id}, {departmentId: []}, function(err){
                    callback(err);
                })
            }else{
                callback(err);
            }
        })
    }
})

router.post('/departmentList', function(req, res){
    function callback(err,list){
        res.setHeader("Content-Type","application/json");
        if(err){
            res.send({"result":err});
        }else{
            res.send({"result": list});
        }
    }
    var department = new Department();
    Department.find().exec(function(err, departs){
        if(!err){
            Staff.find().exec(function(err,staffs){
                var result = [];
                departs.map(function(depart){
                    var temp = depart.toObject();
                    temp.staffNum = 0;
                    temp.manageName = '';
                    staffs.map(function(staff){
                        if(temp.manageId === staff._id.toString()){
                            temp.manageName = staff.name;
                        }
                        if(staff.departmentId[0] === temp._id.toString() && staff.departmentId.length === 1){
                            temp.staffNum++ ;
                        }
                    })
                    if(temp.children.length){
                        temp.children = temp.children.map(function(child){
                            var subtemp = child;
                            subtemp.staffNum = 0;
                            staffs.map(function(staff){
                                if(subtemp.manageId === staff._id.toString()){
                                    subtemp.manageName = staff.name
                                }
                                if(staff.departmentId.length === 2 && staff.departmentId[1] === subtemp._id.toString()){
                                    subtemp.staffNum ++ ;
                                    temp.staffNum ++;
                                }
                            })
                            return subtemp;
                        })
                    }
                    result.push(temp);
                })
                callback(err, result)
            })
        }else{
            callback(err);
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

router.post('/projectList', function(req, res){
    Project.find().exec(function(err,projects){
        res.setHeader("Content-Type","application/json");
        if(err){
            res.send({"result":err});
        }else{
            Task.find().exec(function(err, tasks){
                if(err){
                    res.send({"result": err})
                }else{
                    var list = projects.map(function(pro){
                        var projTemp = pro.toObject();
                        projTemp.children = [];
                        tasks.map(function(task){
                            if(task.parentId.length === 1 && task.parentId[0] === projTemp._id.toString()){
                                projTemp.children.push(task);
                            }
                        })
                        if(projTemp.categories.length){
                            var children = projTemp.categories.map(function(category){
                                var cate = category;
                                cate.children = [];
                                tasks.map(function(task){
                                    if(task.parentId.length === 2 && task.parentId[1] === cate._id.toString()){
                                        cate.children.push(task);
                                    }
                                })
                                return cate;
                            })
                            projTemp.children = projTemp.children.concat(children);
                        }
                        return projTemp
                    });
                    tasks.map(function(task){
                        if(task.parentId.length === 0){
                            list.push(task);
                        }
                    })
                    var findName = function(item,id){
                        return item._id === id
                    }
                    Staff.find().exec(function(err, staffs){
                        list = list.map(function(item){
                            var temp = item;
                            staffs.map(function(staff){
                                if(staff._id.toString() === temp.manageId){
                                    temp.manageName = staff.name
                                }
                            })
                            return temp
                        })
                        res.send({"result":list});
                    })
                }
            })
        }
    })
})
router.post('/project',function(req,res){
    function callback(err){
        res.setHeader("Content-Type","application/json");
        if(err){
            res.send({"result":err});
        }else{
            res.send({"result": 'success'});
        }
    }
    var project = new Project(req.body);
    if(req.body.parentId){
        project.addTo(req.body.parentId, req.body, callback)
    }else{
        project.save(function(err){
            callback(err);
        })
    }
})

router.put('/project',function(req,res){
    function callback(err){
        res.setHeader("Content-Type","application/json");
        if(err){
            res.send({"result":err});
        }else{
            res.send({"result": 'success'});
        }
    }
    var info = req.body;
    if(req.body.parentId){
        Project.update(
            {"_id": info.parentId, "categories._id":mongoose.Types.ObjectId(info._id)},
            { "$set" : 
                {
                    "categories.$.name": info.name, 
                    "categories.$.manageId": info.manageId,
                    "categories.$.description": info.description,
                    "categories.$.startTime": info.startTime,  
                    "categories.$.endTime": info.endTime, 
                }
            }, function(err, doc){callback(err)})
    }else{
        Project.findById(info._id,function(err, proj){
            proj.name = info.name;
            proj.manageId = info.manageId;
            proj.startTime = info.startTime;
            proj.endTime = info.endTime;
            proj.description = info.description;
            proj.save(callback(err));
        })
    }
})

router.delete('/project',function(req,res){
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
        Project.findById(info.parentId, function(err, proj){
            if(!err){
                proj.categories.id(info._id).remove();
                proj.save(function(err){
                    if(!err){
                        Task.find({parentId: info._id}).remove().exec(function(err){
                            callback(err);
                        })
                    }else{
                        callback(err);
                    }
                });
            }else{
                callback(err);
            }
        })
    }else{
        Project.findByIdAndRemove(info._id,function(err){
            if(!err){
                Task.find({parentId: info._id}).remove().exec(function(err){
                    callback(err);
                })
            }else{
                callback(err);
            }
        })
    }
})

router.post('/taskList', function(req, res){
    Task.find().exec(function(err,doc){
        res.setHeader("Content-Type","application/json");
        if(err){
            res.send({"result":err});
        }else{
            res.send({"result": doc});
        }
    })
})
router.post('/task',function(req,res){
    var task = new Task(req.body);
    task.save(function(err){
        res.setHeader("Content-Type","application/json");
        if(err){
            res.send({"result":err});
        }else{
            res.send({"result": 'success'});
        }
    });
})

router.put('/task',function(req,res){
    function callback(err){
        res.setHeader("Content-Type","application/json");
        if(err){
            res.send({"result":err});
        }else{
            res.send({"result": 'success'});
        }
    }
    var info = req.body;
    
        Task.findById(info._id,function(err, task){
            task.name = info.name;
            task.manageId = info.manageId;
            task.startTime = info.startTime;
            task.endTime = info.endTime;
            task.description = info.description;
            task.parentId = info.parentId;
            task.save(callback(err));
        })
})

router.delete('/task',function(req,res){
    Task.findByIdAndRemove(req.body._id, function(err){
        res.setHeader("Content-Type","application/json");
        if(err){
            res.send({"result":err});
        }else{
            res.send({"result": 'success'});
        }
    })
})



router.post('/fileList',function(req,res){
    var info = req.body;
    var location = req.body.location || '';
    var filePath = info.parentPath || path.join(__dirname, '../../public/upload' + location)
    res.setHeader("Content-Type","application/json");
    fs.readdir(filePath,function(err, folders){
        Path.find().exec().then(function(infos){
            var result = [];
            folders.map(function(folder){
                infos.map(function(info){
                    if(info.path === filePath + '/' + folder){
                        result.push(info);
                    }
                })
            })
            res.send({"result": result});
        })
    })
})

router.post('/folder', function(req,res){
    var info = req.body;
    res.setHeader("Content-Type","application/json");
    Path.findById(info.parentId, function(err, parent){
        var parentPath = parent ? parent.path : path.join(__dirname, '/../../public/upload');
        info.creator = req.user.name;
        var folder = new Path(info);
        folder.set('createTime',moment(new Date()))
        folder.save(function(err, msg){
            if(err){
                res.send({result: err});
            }else{
                var basePath = parentPath + '/' + msg._id;
                fs.mkdir(basePath, function(err, data){
                    if(err){
                        res.send({result: err});
                    }else{
                        msg.path = basePath;
                        msg.save(function(err){
                            if(err){
                                res.send({result: err})
                            }else{
                                res.send({result: 'success'});
                            }
                        })
                    }
                })
            }
        })
    })
})

router.put('/folder', function(req,res){
    var info = req.body;
    res.setHeader("Content-Type","application/json");
    Path.findById(info._id , function(err, folder){
        if(err){
            res.send({result: err})
        }else{
            folder.name = info.name;
            folder.description = info.description;
            folder.save(function(err){
                if(err){
                    res.send({result: err})
                }else{
                    res.send({result: 'success'})
                }
            })
        }
    })
})

router.delete('/folder', function(req,res){
    var info = req.body;
    res.setHeader("Content-Type","application/json");
    Path.findById(info._id , function(err, delFolder){
        var pathtemp = delFolder.path;
        if(err){
            res.send({result: err})
        }else{
            removePath.exec('rm -rf ' + pathtemp, function(err){
                if(err){
                    res.send({result: err});
                }else{

                    pathtemp = pathtemp.replace(/\//g, '\/')
                    Path.find().remove({path: {$regex: new RegExp(pathtemp)}}).exec(function(err){
                        if(err){
                            res.send({result: err})
                        }else{
                            res.send({result: 'success'})
                        }
                    })
                }
            })
        }
    })
})

router.post('/folderTree', function(req, res){
    var folderTree = [];
    function getLocation(location){
        return location.split(path.join(__dirname, '/../../public/upload/'))[1];
    }
    function addToTree(tree, folder){
        if(!folder.parentId){
            folder.children = [];
            folder.value = folder._id;
            folder.label = folder.name;
            tree.push(folder);
        }else{
            tree.map(function(targetFolder){
                if(targetFolder._id.toString() === folder.parentId){
                    folder.children = [];
                    folder.value = folder._id;
                    folder.label = folder.name;
                    targetFolder.children.push(folder)
                }else{
                    var targetLocation = getLocation(targetFolder.path).split('/');
                    var folderLocation = getLocation(folder.path).split('/');
                    if(targetLocation[0] === folderLocation[0]){
                        addToTree(targetFolder.children, folder)
                    }
                }
                
            })
        }
    }
    Path.find().exec(function(err, data){
        data.map(function(folder){
            addToTree(folderTree, folder.toObject());
        })
        res.send({result: folderTree})
    })
})

router.post('/file', multipartMiddleware, function(req,res){
    var info = req.body;
    info.creator = req.user.name;
    var filePath = req.files.file.path;
    var filename = path.basename(filePath);
    res.setHeader("Content-Type","application/json");
    info.name = filename;
    Path.findById(info.pathId, function(err, folder){
        var folderPath = folder ? folder.path : path.join(__dirname, '../../public/upload/')
        var targetUrl = path.join(folderPath + filename);
        var document = new Documents(info);
        document.set('createTime',moment(new Date()))
        document.save(function(err, msg){
            if(err){
                res.send({result: err})
            }else{
                fs.readFile(filePath,function(err,data){
                    if(err){
                        res.send(err)
                        return;
                    }
                    fs.writeFile(targetUrl, data, function(err){
                        if(err){
                            res.send({result: err})
                        }else{
                            res.send({result: 'success'})
                        }
                    })
                })
            }
        })
    })
    // res.send({result: req.files})
})

router.post('/file/daily',multipartMiddleware,function(req,res){
    // var filePath = req.files.file.path;
    // var extName = path.extname(req.files.file.name);
    // var tarUrl = '/upload/daily/' + path.basename(filePath) + extName;
    // var newPath = path.join(__dirname, '../../public/upload' + tarUrl)
    // 
    // fs.readFile(filePath,function(err,data){
    //     if(err){
    //         res.send(err)
    //         return;
    //     }
    //     fs.writeFile(newPath, data, function(err){
    //         if(!err){
    //             var fileInfo = new Document({
    //                 name: path.basename(filePath),
    //                 path: newPath
    //             })
    //             res.send({result: path.basename(filePath)});
    //         }else{
    //             res.send(err)
    //         }
    //     })
    // })
})

module.exports = function (app) {
    app.use('/', router);
};
