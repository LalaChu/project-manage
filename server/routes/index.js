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
var ProjectState = require('../constants');
var schedule = require('node-schedule');

//定时任务
var j = schedule.scheduleJob({hour: 0, minute: 0 ,second: 0}, function(){
    var date = moment(new Date()).format().split('T')[0];
    console.log(date)
    Task.updateMany({startTime: { $lte: date}, state: ProjectState.toBeStarted}, 
                    {state: ProjectState.doing, updateTime: moment(new Date()).format(),lastManage: '系统更新'},
                    {multi: true}, 
                    function(test){
                        console.log('任务进行中的状态---更新成功')
                    }
    )
    Task.updateMany({endTime: { $lt: date}, state: {$ne: ProjectState.toBeReviewed}}, 
                    {state: ProjectState.delay, updateTime: moment(new Date()).format(), lastManage: '系统更新'},
                    {multi: true}, 
                    function(test){
                        console.log('任务延期的状态---更新成功')
                    }
    )
    //update sub project
    Project.updateMany({"categories.startTime": { $lte: date}, 
                        "categories.state": ProjectState.toBeStarted}, 
                    {"$set": {
                        "categories.$.state": ProjectState.doing
                    }},
                    {multi: true}, 
                    function(test){
                        console.log('工作分类进行中的状态---更新成功')
                    }
    )
    Project.updateMany({"categories.endTime": { $lt: date}}, 
                    {"$set": {
                        "categories.$.state": ProjectState.delay
                    }},
                    {multi: true}, 
                    function(test){
                        console.log('工作分类延期的状态---更新成功')
                    }
    )
    //update project
    Project.updateMany({startTime: { $lte: date}, state: ProjectState.toBeStarted}, 
                    {state: ProjectState.doing},
                    {multi: true}, 
                    function(test){
                        console.log('项目进行中的状态---更新成功')
                    }
    )
    Project.updateMany({endTime: { $lt: date} },{state: ProjectState.delay},
                    {multi: true}, 
                    function(test){
                        console.log('项目延期的状态--更新成功')
                    }
    )
});


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
    staff.set('date', moment(new Date()).format())
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
        let avatarBefore = person.avatar
        for(var e in info){
            person[e] = info[e]
        }
        if(person.avatar){
            var folderPath = path.join(__dirname, '../../public/')
            var filePath = folderPath + `img/${person.avatar}`
            var targetUrl = path.join(folderPath + 'avatar/', person.avatar);
            fs.readFile(filePath,function(err,data){
                if(err){
                    res.send(err)
                    return;
                }
                fs.writeFile(targetUrl, data, function(err){
                    if(err){
                        res.send({result: err})
                    }else{
                        person.save(function(err){
                            if(err){
                                res.send({"result":err});
                            }else{
                                res.send({"result": 'success'});
                            }
                        })
                        
                    }
                })
            })
        }else{
            person.avatar = avatarBefore 
            person.save(function(err){
                if(err){
                        res.send({"result":err});
                    }else{
                        res.send({"result": 'success'});
                    }
                })
            }
        
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
    Project.find().populate('manageId categories.manageId').exec(function(err,projects){
        res.setHeader("Content-Type","application/json");
        if(err){
            res.send({"result":err});
        }else{
            Task.find().populate('creator manageId').exec(function(err, tasks){
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
                    res.send({"result":list});
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
    project.set('manageId', mongoose.Types.ObjectId(req.body.manageId))
    if(moment(project.get('startTime')).isBefore(new Date())){
        project.set('state', ProjectState.doing)
    }
    if(req.body.parentId){
        project.addTo(req.body.parentId, project, callback)
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
                    "categories.$.description": info.description,
                    "categories.$.startTime": info.startTime,  
                    "categories.$.endTime": info.endTime, 
                    "categories.$.manageId": mongoose.Types.ObjectId(info.manageId), 
                }
            }, function(err, doc){callback(err)})
    }else{
        Project.findById(info._id,function(err, proj){
            proj.name = info.name;
            proj.manageId = mongoose.Types.ObjectId(info.manageId);
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
    Task.find().populate('manageId creator').exec(function(err,doc){
        res.setHeader("Content-Type","application/json");
        if(err){
            res.send({"result":err});
        }else{
            res.send({"result": doc});
        }
    })
})
router.post('/myTask', function(req, res){
    Task.find({manageId: req.user._id}).populate('manageId creator').exec(function(err,doc){
        res.setHeader("Content-Type","application/json");
        if(err){
            res.send({"result":err});
        }else{
            res.send({"result": doc});
        }
    })
})
router.post('/checkList', function(req, res){
    Task.find({creator: req.user._id, checkState: {$ne: ''}}).populate('manageId creator').exec(function(err,doc){
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
    task.set('manageId', new mongoose.Types.ObjectId(req.body.manageId));
    task.set('creator', new mongoose.Types.ObjectId(req.user._id));
    task.set('updateTime', moment(new Date()).format())
    task.set('lastManage', '创建')
    if(moment(task.get('startTime')).isBefore(new Date())){
        task.set('state', ProjectState.doing)
    }
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
        task.updateTime = moment(new Date()).format()
        task.lastManage = '更新'
        task.name = info.name;
        task.manageId = new mongoose.Types.ObjectId(info.manageId);
        task.startTime = info.startTime;
        task.endTime = info.endTime;
        task.description = info.description;
        task.parentId = info.parentId;
        task.save(callback(err));
    })
})

router.post('/taskStartCheck', function(req, res){
    var info = req.body;
    Task.findById(info._id, function(err, task){
        task.set('checkState', ProjectState.toBeReviewed)
        task.set('startCheckTime', moment(new Date()).format())
        task.save(function(err){
            if(err){
                res.send({result: err})
            }else{
                res.send({result: 'success'})
            }
        })
    })
})
router.post('/taskReview', function(req, res){
    var info = req.body
    function callback(err){
        res.setHeader("Content-Type","application/json");
        if(err){
            res.send({"result":err});
        }else{
            res.send({"result": 'success'});
        }
    }
    Task.findById(info._id, function(err, task){
        if(info.checkState === ProjectState.notPassed){
            task.set('checkState', ProjectState.notPassed)
            task.set('updateCheckTime', moment(new Date()).format())
            task.save(callback(err))
        }else{
            task.set('state', ProjectState.done)
            task.set('checkState', ProjectState.done)
            task.set('updateCheckTime', moment(new Date()).format())
            task.set('updateTime', moment(new Date()).format())
            task.set('lastManage', '完成')
            if(task.parentId.length === 0){
                task.save(callback(err))
            }else{
                Task.find({parentId: task.parentId[0], state: {$ne: ProjectState.done}}, function(err, tasks){
                        Project.findById(task.parentId[0], function(err, proj){
                            var subProj = ''
                           if(tasks.length <= 1){
                               proj.set('state', ProjectState.done)
                           }else{
                               if(task.parentId.length === 2){
                                   var subProj = proj.categories.id(task.parentId[1])
                                   subProj.set('state',ProjectState.done)
                               }
                           }
                            proj.save(function(err){
                                if(err){
                                    res.send({result: err})
                                }else{
                                    if(subProj !== ''){
                                        subProj.save(callback(err))
                                    }else{
                                        res.send({result: 'success'})
                                    }
                                }
                            })
                        })
                })
            }
        }
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
            if(info.parentPath === '' || info.location === ''){
                result.push({
                    name: 'daily',
                    parentId: '',
                    path: path.join(__dirname, '../../public/upload/daily'),
                    _id: -1
                })
            }
            folders.map(function(folder){
                infos.map(function(info){
                    if(info.path === filePath + '/' + folder){
                        result.push(info);
                    }
                })
            })
            Documents.find().exec().then(function(files){
                folders.map(function(folder){
                    files.map(function(file){
                        if(folder.split('.')[0] === file._id.toString()){
                            result.push(file)
                        }
                    })
                })
                res.send({"result": result});
            })
           
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
        folder.set('createTime',moment(new Date()).format())
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
    var info = {};
    info.creator = req.user.name;
    var filePath = req.files.file.path;
    var filename = path.basename(filePath);
    res.setHeader("Content-Type","application/json");
    info.name = filename.split('.')[0];
    info.type = filename.split('.')[1];
    var folderPath = path.join(__dirname, '../../public/upload')
    var targetUrl = path.join(folderPath, filename);
    var document = new Documents(info);
    document.set('createTime', moment(new Date()).format());
    document.save(function(err, msg){
        if(err){
            res.send({result: err})
        }else{
            fs.readFile(filePath,function(err,data){
                if(err){
                    res.send(err)
                    return;
                }
                fs.writeFile(targetUrl.replace(filename.split('.')[0], msg._id), data, function(err){
                    if(err){
                        res.send({result: err})
                    }else{
                        res.send({result: {id: msg._id}})
                    }
                })
            })
        }
    })
})
router.put('/file', function(req, res){
    var info = req.body;
    res.setHeader("Content-Type","application/json");
    Documents.findById(info._id, function(err, file){
        file.set('name', info.name);
        file.set('pathId', info.pathId);
        file.set('description', info.description);
        Path.findById(info.pathId, function(err, folder){
            if(!folder){
                file.save(function(err){
                    if(err){
                        res.send({result: err})
                    }else{
                        res.send({result: 'success'})
                    }
                })
            }else{
                var targetPath = folder.path;
                var oldPath = path.join(__dirname, '../../public/upload/' + file._id.toString() + `.${file.type}`);
                var newPath = path.join(targetPath, file._id.toString() + `.${file.type}`);
                fs.rename(oldPath, newPath, function(err){
                    if(err){
                        res.send({result: err});
                    }else{
                        file.save(function(err){
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
})
router.delete('/file', function(req, res){
    var info = req.body;
    res.setHeader("Content-Type","application/json");
    Documents.findById(info._id, function(err, file){
        Path.findById(file.pathId, function(err, folder){
            var nowPath = '';
            if(folder){
                nowPath = path.join(folder.path, `${file._id}.${file.type}`)
            }else{
                nowPath = path.join(__dirname, `../../public/upload/${file._id}.${file.type}`)
            }
            
            fs.unlink(nowPath, function(err){
                if(err){
                    res.send({result: err})
                }else{
                    file.remove(function(err){
                        if(err){
                            res.send({result: err})
                        }else{
                            res.send({result: 'success'})
                        }
                    })
                }
            })
        })
    })
})

router.post('/daily', function(req, res){
    var info = req.body;
    res.setHeader("Content-Type","application/json");
    info.date = moment(new Date()).format();
    info.staffId = new mongoose.Types.ObjectId(req.user._id);
    info.taskId = new mongoose.Types.ObjectId(info.taskId);
    var daily = new Daily(info);
    daily.save(function(err){
        if(err){
            res.send({result: err})
        }else{
            if(info.documentId){
                Documents.findById(info.documentId, function(err, file){
                file.set('name', `${req.user.name}--${moment(new Date()).format('YYYY年MM月DD日')}--日报文件`);
                var oldPath = path.join(__dirname, `../../public/upload/${file._id.toString()}.${file.type}`);
                var targetPath = path.join(__dirname, `../../public/upload/daily/${file._id.toString()}.${file.type}`);
                fs.rename(oldPath, targetPath, function(err){
                    if(err){
                        res.send({result: err})
                    }else{
                        file.save(function(err){
                            if(err){
                                res.send({result: err});
                            }else{
                                res.send({result: 'success'})
                            }
                        })
                    }
                })
            })
            }else{
                res.send({result: 'success'})
            }
            
        }
    })
})

router.put('/daily', function(req, res){
    var info = req.body;
    res.setHeader("Content-Type","application/json");
    Daily.findById(info._id, function(err, daily){
        daily.set('content', info.content);
        daily.set('title', info.title);
        daily.set('taskId', new mongoose.Types.ObjectId(info.taskId));
        if(daily.documentId !== info.documentId){
            daily.set('documentId', info.documentId)
            Documents.findById(info.documentId, function(err, file){
                file.set('name', `${req.user.name}--${moment(new Date()).format('YYYY年MM月DD日')}--日报文件`);
                var oldPath = path.join(__dirname, `../../public/upload/${file._id.toString()}.${file.type}`);
                var targetPath = path.join(__dirname, `../../public/upload/daily/${file._id.toString()}.${file.type}`);
                fs.rename(oldPath, targetPath, function(err){
                    if(err){
                        res.send({result: err})
                    }else{
                        file.save(function(err){
                            if(err){
                                res.send({result: err});
                            }else{
                                daily.save(function(err){
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
        }else{
            daily.save(function(err){
                if(err){
                    res.send({result: err})
                }else{
                    res.send({result: 'success'})
                }
            })
        }
    })
    
})

router.post('/myDailyList', function(req, res){
    var user = req.user._id;
    res.setHeader("Content-Type","application/json");
    Daily.find({staffId: mongoose.Types.ObjectId(user)}).exec(function(err, list){
        if(err){
            res.send({result: err})
        }else{
            res.send({result: list})
        }
    })
})
router.delete('/dailyFile', function(req, res){
    var info = req.body;
    var user = req.user._id;
    var filePath = path.join(__dirname, `../../public/upload/daily/${info.documentId}.doc`);
    Documents.findByIdAndRemove(info.documentId, function(err){
        if(err){
            res.send({result: err})
        }else{
            fs.unlink(filePath, function(err){
                if(err){
                    res.send({result: err})
                }else{
                    Daily.find({staffId: mongoose.Types.ObjectId(user), documentId: info.documentId}).exec(function(err, list){
                        if(err){
                            res.send({result: err})
                        }else{
                            list[0].set({documentId: ''}).save(function(err){
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
        }
    })
})
router.post('/allDaily', function(req,res){
    var info = req.body;
    var date = moment(new Date()).format();
    console.log(date)
    if(info.date){
        date = info.date;
    }
    var datearr = date.split('T');
    var regExp = new RegExp(datearr[0], 'i')
    Daily.find({date: regExp})
    .populate('staffId taskId')
    .exec(function(err, list){
        if(err){
            res.send({result: err})
        }else{
            console.log(date)
            Staff.find({date:{ $lt: date}})
            .exec(function(err, staff){
                if(err){
                    res.send({result: err})
                }else{
                    result = {
                        list,
                        allNum: staff.length,
                        dailyNum: list.length 
                    }
                    res.send({result: result})
                }
            })
        }
    })
})

router.post('/message',function(req, res){
    var result = [];
    var date = moment(new Date()).format();
    var datearr = date.split('T');
    var regExp = new RegExp(datearr[0], 'i')
    Task.find({updateTime: regExp})
         .populate('creator')
         .sort({date: 'asc'})
         .exec(function(err, list){
             if(err){
                 res.send({result: err})
             }else{
                 result = list;
                 res.send({result: list})
             }
         })
})

router.post('/avatar', multipartMiddleware, function(req,res){
    // var info = {};
    // info.creator = req.user.name;
    var filePath = req.files.avatar.path;
    var filename = path.basename(filePath);
    res.setHeader("Content-Type","application/json");
    var type = filename.split('.')[1];
    var folderPath = path.join(__dirname, '../../public/img')
    var targetUrl = path.join(folderPath, req.user._id + '.' + type);
    fs.readFile(filePath,function(err,data){
        if(err){
            res.send(err)
            return;
        }
        fs.writeFile(targetUrl, data, function(err){
            if(err){
                res.send({result: err})
            }else{
                res.send({result: req.user._id + '.' + type})
            }
        })
    })
})



module.exports = function (app) {
    app.use('/', router);
};
