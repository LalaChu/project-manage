var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var subDepartment = new Schema({
    name: String,
    staffnum: Number,
    manageId: String,
});

var department = new Schema({
    name: String,
    children: [subDepartment],
    staffnum: Number,
    manageId: String,
},{
    collection: 'department'
});


// staff.plugin(passportLocalMongoose);

module.exports = mongoose.model('department', department);
