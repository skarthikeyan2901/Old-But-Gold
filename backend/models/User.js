const mongoose = require('mongoose');
const schema = mongoose.schema;

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone: String,
    address: String,
    verified:{type:Boolean,default:false}
})

const User = mongoose.model('User',UserSchema);

module.exports =User;