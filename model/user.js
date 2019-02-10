const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true, trim: true},
    password: {type: String, required: true, trim: true}
})

module.exports = mongoose.model('user', userSchema);