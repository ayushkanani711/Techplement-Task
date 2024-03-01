const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    history: [{
        operation: String,
        result: Number,
        timestamp: Date
    }]

});

module.exports = mongoose.model('user', UserSchema);
