var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Department = require('./department')

var staff = new Schema({
    email: {type: String, unique: true},
    name: String,
    password: String,
    telephone: {type: String, unique: true},
    departmentId: {type: Array},
    authority: String,
    date: String
},{
    collection: 'staff'
});

// staff.plugin(passportLocalMongoose);

module.exports = mongoose.model('staff', staff);
