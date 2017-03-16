var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var staff = new Schema({
    name: String,
    children: Array,
    staffnum: Number,
    manageId: String,
},{
    collection: 'department'
});

// staff.plugin(passportLocalMongoose);

module.exports = mongoose.model('department', staff);
