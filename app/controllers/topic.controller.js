const Chapter = require('../models/chapter.model.js');
const Topic = require('../models/topic.model.js');

// Create and Save a new topic file
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "topic file content can not be empty"
        });
    }

    // Create a topic file
    const topic = new Topic({
        title: req.body.title || "Untitled topic file", 
        schema: req.body.schema,
        model: req.body.model
    });

    // Save topic file in the database
    chapter.save()
    .then(data => {
        res.send(data);
        Chapter.findByIdAndUpdate(
            chapterId,
            {
                $push: {
                    topics: docComment._id
                }
            },
            {
                new: true,
                useFindAndModify: false
            }
        )
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the topic file."
        });
    });
};

/* // Retrieve and return all chapter files from the database.
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
    if(!req.body.content) {
        return res.status(400).send({
            message: "chapter file content can not be empty"
        });
    }

    // Find chapter file and update it with the request body
    Chapter.findByIdAndUpdate(req.params.chapterId, {
        title: req.body.title || "Untitled chapter file",
        content: req.body.content
    }, {new: true})
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
            message: "Error updating chapter file with id " + req.params.chapterId
        });
    });
};

// Delete a chapter file with the specified chapterId in the request
exports.delete = (req, res) => {
    Chapter.findByIdAndRemove(req.params.chapterId)
    .then(chapter => {
        if(!chapter) {
            return res.status(404).send({
                message: "chapter file not found with id " + req.params.chapterId
            });
        }
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
}; */