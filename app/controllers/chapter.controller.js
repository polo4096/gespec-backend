const Chapter = require('../models/chapter.model.js');
const mongoose = require('mongoose');
const Schema = require("mongoose/lib/schema");
const VersionnedChapter = mongoose.model('VersionnedChapter', new Schema({}), 'chapters.vermongo')

// Create and Save a new chapter file
exports.create = (req, res) => {
    // Validate request
    console.log(req)
    if(!req.body.title) {
        return res.status(400).send({
            message: "chapter file content can not be empty haha"
        });
    }

    // Create a chapter file
    const chapter = new Chapter({
        title: req.body.title || "Untitled chapter file", 
        type: req.body.type,
        version: req.body.version,
        standard_version: req.body.standard_version,
        topics          : req.body.topics
    });

    // Save chapter file in the database
    chapter.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the chapter file."
        });
    });
};

// Retrieve and return all chapter files from the database.
exports.findAll = (req, res) => {
    Chapter.find()
    .then(chapter => {
        res.send(chapter);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving chapter files."
        });
    });
};

exports.findVersions = (req,res) => {

    VersionnedChapter.find()
        .then(chapter => {
            let wantedChapters = []
            chapter.forEach((element, index) => {
                if(chapter[index]._id.valueOf() == req.params.chapterId.valueOf() ) {
                    wantedChapters.push(element)
                }
            })
            console.log("OLD CHAP :", wantedChapters )
            res.send(wantedChapters);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving chapter files."
        });
    });

}


// Find a single chapter file with a chapterId
exports.findOne = (req, res) => {
    Chapter.findById(req.params.chapterId)
    .then(chapter => {
        if(!chapter) {
            return res.status(404).send({
                message: "chapter file not found with id " + req.params.chapterId
            });            
        }
        res.send(chapter);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "chapter file not found with id " + req.params.chapterId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving chapter file with id " + req.params.chapterId
        });
    });
};

// Update a chapter file identified by the chapterId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "chapter file content can not be empty"
        });
    }



    // Find chapter file and update it with the request body
    Chapter.findById(req.params.chapterId)
    .then(chapter => {
        if(!chapter) {
            return res.status(404).send({
                message: "chapter file not found with id " + req.params.chapterId
            });
        }
        chapter.title = req.body.title || "Untitled chapter file";
        chapter.type = req.body.type;
        chapter.standard_version = req.body.standard_version;
        chapter.topics = req.body.topics;
        chapter.type = req.body.type;
        chapter.save();
        res.send(chapter);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "chapter file not found with id " + req.params.chapterId
            });                
        }
        return res.status(500).send({
            message: "Error updating chapter file with id " + req.params.chapterId
        });
    });
};

// Delete a chapter file with the specified chapterId in the request
exports.delete = (req, res) => {
    Chapter.findById(req.params.chapterId)
    .then(chapter => {
        if(!chapter) {
            return res.status(404).send({
                message: "chapter file not found with id " + req.params.chapterId
            });
        }
        chapter.remove()
        res.send({message: "chapter file deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "chapter file not found with id " + req.params.chapterId
            });                
        }
        return res.status(500).send({
            message: "Could not delete chapter file with id " + req.params.chapterId
        });
    });
};


function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}