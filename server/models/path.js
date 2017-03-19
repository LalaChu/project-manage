var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// var Department = require('./department')

var path = new Schema({
    namd: String,
    description: String,
    path: String,
    children: Array,
},{
    collection: 'path'
});

// staff.plugin(passportLocalMongoose);

module.exports = mongoose.model('path', path);
