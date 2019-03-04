var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
    phoneNumber: {type:String, required: true},
    roles: [String]
});

var User = module.exports = mongoose.model('User', userSchema);