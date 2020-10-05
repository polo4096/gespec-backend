const mongoose = require('mongoose');

const SpecsSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Specs', SpecsSchema);