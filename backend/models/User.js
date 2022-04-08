const mongoose = require('mongoose');
const schema = mongoose.schema;

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    username: String,
    password:String,
    confirmPassword:String,
    phone: String,
    address: String,
})

const User = mongoose.model('User',UserSchema);

module.exports =User;