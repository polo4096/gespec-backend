const mongoose = require('mongoose');
var vermongo = require('mongoose-vermongo');
const Schema = require("mongoose/lib/schema");
mongoose.Promise = require('bluebird');


module.exports = mongoose.model('VersionnedChapter', new Schema({}), 'chapters.vermongo')