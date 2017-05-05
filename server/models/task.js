var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// var Department = require('./department')
var ProjectState = require('../constants');

var task = new Schema({
    name: String,
    startTime: String,
    endTime: String,
    manageId: {type: Schema.Types.ObjectId, ref: 'staff'},
    reviewerId: String,
    state: {type: String, default: ProjectState.toBeStarted},
    checkState: {type: String, default: ''},
    startCheckTime: String,
    updateCheckTime: String,
    type:{type:String, default: 'task'},
    parentId: Array,
    description: String,
    creator: {type: Schema.Types.ObjectId, ref: 'staff'}
},{
    collection: 'task'
});

// staff.plugin(passportLocalMongoose);

module.exports = mongoose.model('task', task);
