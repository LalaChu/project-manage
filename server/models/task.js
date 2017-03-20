var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// var Department = require('./department')
var ProjectState = require('../constants');

var task = new Schema({
    name: String,
    startTime: String,
    endTime: String,
    manageId: String,
    reviewerId: String,
    state: {type: String, default: ProjectState.toBeStarted},
    startCheckTime: String,
    type:{type:String, default: 'task'},
    parentId: Array
},{
    collection: 'task'
});

// staff.plugin(passportLocalMongoose);

module.exports = mongoose.model('task', task);
