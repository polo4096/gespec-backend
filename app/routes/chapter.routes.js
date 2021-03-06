module.exports = (app) => {
    const chapter = require('../controllers/chapter.controller.js');

    // Create a new chapter file
    app.post('/chapter', chapter.create);

    // Retrieve all chapter files
    app.get('/chapter', chapter.findAll);

    // Retrieve a single chapter file with chapterId
    app.get('/chapter/:chapterId', chapter.findOne);

    // Update a chapter file with chapterId
    app.put('/chapter/:chapterId', chapter.update);

    // Delete a chapter file with chapterId
    app.delete('/chapter/:chapterId', chapter.delete);
    
}