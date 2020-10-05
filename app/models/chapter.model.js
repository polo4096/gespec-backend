const mongoose = require('mongoose');

const chapterSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('chapter', chapterSchema);