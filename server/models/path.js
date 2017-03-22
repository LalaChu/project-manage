var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// var Department = require('./department')

var path = new Schema({
    name: String,
    description: String,
    path: String,
    creator: String,
    createTime: String
},{
    collection: 'path'
});

// staff.plugin(passportLocalMongoose);

module.exports = mongoose.model('path', path);
