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
const vermongo = require('mongoose-vermongo');
mongoose.Promise = require('bluebird');

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

  const addParentToChapter = function(childId, parentId) {
    return Chapter.findByIdAndUpdate(
      childId,
      { parentChapter: parentId },
      { new: true, useFindAndModify: false }
    );
  };


const run = async function() {
  var chapter = await createChapter({
    "title": "Mon premier chapitre",
    "type": "GTA",
    "version": "4.2",
    "standard_version": "1.3"
  });

  var chapter2 = await createChapter({
    "title": "Mon second chapitre",
    "type": "GTA",
    "version": "4.2",
    "standard_version": "1.3"
  });

  chapter = await addParentToChapter(chapter._id,chapter2._id);

  chapter = await createTopic(chapter._id, {
    title: "Topic1",
    formSchema: {},
    model: {}
  });
  console.log("\n>> Chapter:\n", chapter);

  chapter = await createTopic(chapter._id, {
    title: "Topic2",
    formSchema: {
        fields : [
            {
            type : "textbox",
            placeholder : "Hello je suis une textbox"
        },{
            type : "checkbox",
            placeholder : "Hello je suis une checkbox"
        }
    ]
    },
    model: {

    }
  });
  console.log("\n>> Chapter:\n", chapter);
};


mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useFindAndModify: true
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