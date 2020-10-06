module.exports = (app) => {
    const topic = require('../controllers/topic.controller.js');

    // Create a new topic file
    app.post('/topic', topic.create);
    /*
    // Retrieve all topic files
    app.get('/topic', topic.findAll);

    // Retrieve a single topic file with topicId
    app.get('/topic/:topicId', topic.findOne);

    // Update a topic file with topicId
    app.put('/topic/:topicId', topic.update);

    // Delete a topic file with topicId
    app.delete('/topic/:topicId', topic.delete);
    */
}