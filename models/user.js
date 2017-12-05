const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
    firstName: String,
    lastName: String,
    login: String,
    password: String,
    email: String,
    avatar: String,
    specialty: [String],
    role: String,
    active: Boolean
});

module.exports = mongoose.model('User', userScheme);