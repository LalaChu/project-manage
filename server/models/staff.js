var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var staff = new Schema({
    email: String,
    username: String,
    password: String,
    telephone: String,
    departmentId: String,
},{
    collection: 'staff'
});

staff.plugin(passportLocalMongoose);

module.exports = mongoose.model('staff', staff);
