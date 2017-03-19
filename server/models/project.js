var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// var Department = require('./department')

var category = new Schema({
    name: String,
    startTime: String,
    endTime: String,
    manageId: String,
    state: String,
    parentId: String
});

var project = new Schema({
    name: String,
    startTime: String,
    endTime: String,
    manageId: String,
    state: String,
    categories: [category]
},{
    collection: 'project'
});

project.methods.addTo = function(id, obj, cb){
    console.log('this is',id)
    mongoose.model('project').findById(mongoose.Types.ObjectId(id), function(err, tar){
        console.log(tar);
        tar.categories.push(obj);
        tar.save(cb)
    })
}

// staff.plugin(passportLocalMongoose);

module.exports = mongoose.model('project', project);
