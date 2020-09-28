const Specs = require('../models/specs.model.js');

// Create and Save a new Specs file
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Specs file content can not be empty"
        });
    }

    // Create a Specs file
    const specs = new Specs({
        title: req.body.title || "Untitled Specs file", 
        content: req.body.content
    });

    // Save Specs file in the database
    specs.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Specs file."
        });
    });
};

// Retrieve and return all Specs files from the database.
exports.findAll = (req, res) => {
    Specs.find()
    .then(specs => {
        res.send(specs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Specs files."
        });
    });
};

// Find a single Specs file with a specsId
exports.findOne = (req, res) => {
    Specs.findById(req.params.specsId)
    .then(specs => {
        if(!specs) {
            return res.status(404).send({
                message: "Specs file not found with id " + req.params.specsId
            });            
        }
        res.send(specs);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Specs file not found with id " + req.params.specsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Specs file with id " + req.params.specsId
        });
    });
};

// Update a Specs file identified by the specsId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Specs file content can not be empty"
        });
    }

    // Find Specs file and update it with the request body
    Specs.findByIdAndUpdate(req.params.specsId, {
        title: req.body.title || "Untitled Specs file",
        content: req.body.content
    }, {new: true})
    .then(specs => {
        if(!specs) {
            return res.status(404).send({
                message: "Specs file not found with id " + req.params.specsId
            });
        }
        res.send(specs);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Specs file not found with id " + req.params.specsId
            });                
        }
        return res.status(500).send({
            message: "Error updating Specs file with id " + req.params.specsId
        });
    });
};

// Delete a Specs file with the specified specsId in the request
exports.delete = (req, res) => {
    Specs.findByIdAndRemove(req.params.specsId)
    .then(specs => {
        if(!specs) {
            return res.status(404).send({
                message: "Specs file not found with id " + req.params.specsId
            });
        }
        res.send({message: "Specs file deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Specs file not found with id " + req.params.specsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Specs file with id " + req.params.specsId
        });
    });
};