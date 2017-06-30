var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// var Department = require('./department')
var ProjectState = require('../constants');

var category = new Schema({
    name: String,
    startTime: String,
    endTime: String,
    manageId: {type: Schema.Types.ObjectId, ref: 'staff'},
    state: {type: String, default: ProjectState.toBeStarted},
    parentId: String,
    type:{type:String, default: 'category'},
    description: String
});

var project = new Schema({
    name: String,
    startTime: String,
    endTime: String,
    manageId: {type: Schema.Types.ObjectId, ref: 'staff'},
    state: {type: String, default: ProjectState.toBeStarted},
    categories: [category],
    type:{type:String, default: 'project'},
    description: String
},{
    collection: 'project'
});

project.methods.addTo = function(id, obj, cb){
    mongoose.model('project').findById(mongoose.Types.ObjectId(id), function(err, tar){
        obj.set('type', 'category');
        tar.categories.push(obj);
        
        tar.save(cb)
    })
}

// staff.plugin(passportLocalMongoose);

module.exports = mongoose.model('project', project);
