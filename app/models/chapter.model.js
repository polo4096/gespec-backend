const mongoose = require('mongoose');
var vermongo = require('mongoose-vermongo');
mongoose.Promise = require('bluebird');

const chapterSchema = mongoose.Schema({
    title: String,
    type: String,
    tag: String,
    standard_version: Number,
    topics : [],
    parentChapter : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter"
    }
    
}, {
    timestamps: true
});

chapterSchema.plugin(vermongo, "chapters.vermongo");


module.exports = mongoose.model('Chapter', chapterSchema);