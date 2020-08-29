const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    productImage: { 
        type: String, 
        required: false 
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;