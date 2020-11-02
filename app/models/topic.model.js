const mongoose = require('mongoose');
var vermongo = require('mongoose-vermongo');
mongoose.Promise = require('bluebird');

const topicSchema = mongoose.Schema({
    title       : String,
    formSchema  : Object,
    model       : Object,
    /* parentChapter : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter"
    } */
}, {
    timestamps: true
});
topicSchema.plugin(vermongo, "topics.vermongo");

module.exports = mongoose.model('Topic', topicSchema);