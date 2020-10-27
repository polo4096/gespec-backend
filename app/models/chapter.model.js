const mongoose = require('mongoose');
var vermongo = require('mongoose-vermongo');
mongoose.Promise = require('bluebird');

const chapterSchema = mongoose.Schema({
    title: String,
    type: String,
    standard_version: Number,
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

chapterSchema.plugin(vermongo, "chapters.vermongo");


module.exports = mongoose.model('Chapter', chapterSchema);