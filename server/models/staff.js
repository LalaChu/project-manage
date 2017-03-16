var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var staff = new Schema({
    email: {type: String, unique: true},
    name: String,
    password: String,
    telephone: {type: String, unique: true},
    departmentId: Array,
    authority: String,
},{
    collection: 'staff'
});

// staff.plugin(passportLocalMongoose);

module.exports = mongoose.model('staff', staff);
