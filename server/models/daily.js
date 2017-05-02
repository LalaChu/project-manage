var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// var Department = require('./department')

var daily = new Schema({
    taskId: [{type: Schema.Types.ObjectId, ref: 'task'}],
    content: String,
    title: String,
    type: String,
    documentId: String,
    date:String,
    staffId: {type: Schema.Types.ObjectId, ref: 'staff'}
},{
    collection: 'daily'
});

// staff.plugin(passportLocalMongoose);

module.exports = mongoose.model('daily', daily);
