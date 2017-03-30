var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// var Department = require('./department')

var document = new Schema({
    name: String,
    description: String,
    creatot: String,
    createTime: String,
    type: String,
    pathId: String
},{
    collection: 'document'
});

// staff.plugin(passportLocalMongoose);

module.exports = mongoose.model('document', document);
