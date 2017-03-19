var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// var Department = require('./department')

var project = new Schema({
    name: String,
    startTime: String,
    endTime: String,
    manageId: String,
    state: String,
    categories: Array
},{
    collection: 'project'
});

// staff.plugin(passportLocalMongoose);

module.exports = mongoose.model('project', project);
