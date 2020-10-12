const mongoose = require('mongoose');

const chapterSchema = mongoose.Schema({
    title: String,
    type: String,
    version: String,
    standard_version: String,
    topics : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic"
        }
    ],
    parentChapter : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter"
    }
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Chapter', chapterSchema);