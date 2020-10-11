const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const Chapter = require("./app/models/chapter.model");
const Topic = require("./app/models/topic.model");

const createChapter = function(chapter) {
  return Chapter.create(chapter).then(docChapter => {
    console.log("\n>> Created new Chapter :\n", docChapter);
    return docChapter;
  });
};

const createTopic = function(chapterId, topic) {
    return Topic.create(topic).then(docTopic => {
      console.log("\n>> Created new Topic:\n", docTopic);
  
      return Chapter.findByIdAndUpdate(
        chapterId,
        { $push: { topics: docTopic._id } },
        { new: true, useFindAndModify: false }
      );
    });
  };


const run = async function() {
  var chapter = await createChapter({
    "title": "Mon premier chapitre",
    "type": "GTA",
    "version": "4.2",
    "standard_version": "1.3"
  });

  chapter = await createTopic(chapter._id, {
    title: "TEXT 1",
    schema: {},
    model: {}
  });
  console.log("\n>> Chapter:\n", chapter);

  chapter = await createTopic(chapter._id, {
    title: "TEXT 42",
    schema: {},
    model: {}
  });
  console.log("\n>> Chapter:\n", chapter);
};


mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Gespec application. Take your CAs quickly."});
});

// Require chapter routes
require('./app/routes/chapter.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

run();