// Create a Mongoose model for parking slots
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true }
});

const UserModel = mongoose.model('user', userSchema);


module.exports = {
    UserModel
};
