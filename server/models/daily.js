var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// var Department = require('./department')

var daily = new Schema({
    taskId: String,
    content: String,
    title: String,
    type: String,
    documentId: String,
    date:String,
    staffId: String
},{
    collection: 'daily'
});

// staff.plugin(passportLocalMongoose);

module.exports = mongoose.model('daily', daily);
