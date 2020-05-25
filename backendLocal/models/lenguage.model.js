const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lenguageSchema = new Schema({
    lenguage: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

const Lenguage = mongoose.model('Lenguage', lenguageSchema);

module.exports = Lenguage;