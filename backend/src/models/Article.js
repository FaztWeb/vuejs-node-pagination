const { Schema, model } = require('mongoose');

const ArticleSchema = new Schema({
    title: String,
    description: String,
    imageURL: String
});

module.exports = model('Articles', ArticleSchema);