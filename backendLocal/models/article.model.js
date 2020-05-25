const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema ({
    lenguage: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: false },
}, {
    timestamps: true,
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;