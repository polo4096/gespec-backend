module.exports = (app) => {
    const specs = require('../controllers/specs.controller.js');

    // Create a new specs file
    app.post('/specs', specs.create);

    // Retrieve all specs files
    app.get('/specs', specs.findAll);

    // Retrieve a single specs file with specsId
    app.get('/specs/:specsId', specs.findOne);

    // Update a specs file with specsId
    app.put('/specs/:specsId', specs.update);

    // Delete a specs file with specsId
    app.delete('/specs/:specsId', specs.delete);
}