const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    title   : String,
    schema  : Object,
    model   : Object,
    /* parentChapter : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter"
    } */
}, {
    timestamps: true
});

module.exports = mongoose.model('Topic', topicSchema);