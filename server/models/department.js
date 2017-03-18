var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var subDepartment = new Schema({
    name: String,
    staffNum: Number,
    manageId: String,
    parentId: String
});

var department = new Schema({
    name: String,
    children: [subDepartment],
    staffNum: Number,
    manageId: String,
},{
    collection: 'department'
});

department.methods.addTo = function(id, obj, cb){
    var depart = {
        name: obj.name,
        manageId: obj.manageId,
        parentId: obj.parentId
    }
    mongoose.model('department').findById(mongoose.Types.ObjectId(id), function(err, tar){
        tar.children.push(depart);
        tar.save(cb)
    })
}

var Department = mongoose.model('department', department);



// staff.plugin(passportLocalMongoose);

module.exports = Department;
