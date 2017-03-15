var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var staff = new Schema({
    username: String,
    password: String
},{
    collection: 'staff'
});

staff.plugin(passportLocalMongoose);

module.exports = mongoose.model('staff', staff);