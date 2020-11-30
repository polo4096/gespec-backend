const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(cors())

// Configuring the database
const dbConfig = require('./config/database.config.js');

const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const Chapter = require("./app/models/chapter.model");
const Topic = require("./app/models/topic.model");

const createChapter = (chapter) => {
  return Chapter.create(chapter).then(docChapter => {
    console.log("\n>> Created new Chapter :\n", docChapter);
    return docChapter;
  });
};

const createTopic = (topic) => {
    return Topic.create(topic)
  };

const addTopicToChapter = (topic, chapter) => {
    chapter.topics.push(topic)
    console.log("Updated chapter", chapter)
    return chapter;
}


  const addParentToChapter = (child, parent) => {
    child.parentChapter = parent._id
      console.log("Updated chapter parent", child)
    return child;
  };


const run = async () => {
    try {
        const chapter = await createChapter({
            "title": "Primes",
            "type": "Paie",
            "_version": 1,
            "standard_version": "1.3"
        });
        const chapter_prime_excep = await createChapter({
          "title": "Prime exceptionnelle",
          "type": "Paie",
          "_version": 1,
          "standard_version": "1.3"
        });
        const chapter_prime_obj = await createChapter({
            "title": "Prime d'objectif",
            "type": "Paie",
            "_version": 1,
            "standard_version": "1.3"
        });

        
        await chapter.save();
        await addParentToChapter(chapter_prime_excep,chapter);
        await chapter_prime_excep.save();
        await addParentToChapter(chapter_prime_obj,chapter);
        await chapter_prime_obj.save();
        //const unchapitre = await Chapter.findById(chapter2._id)
        //console.log("Chapitre :", unchapitre )
    }catch (e) {
        console.log(e)
    }



    //console.log("caca", chapter2)
    //process.exit()





    /*var chapter2 = await createChapter({
    "title": "Mon second chapitre",
    "type": "GTA",
    "_version": 1,
    "standard_version": "1.3"
    });

    chapter = await addParentToChapter(chapter._id,chapter2._id);
    console.log("CACA 1")

    console.log("CACA 1")
    //console.log("\n>> Chapter:\n", chapter);

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
    //console.log("\n>> Chapter:\n", chapter);*/
};

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useFindAndModify: true
}).then((client) => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

/*mongoose.connection.on('connected', () => {
    var chapter = new Chapter({
        "title": "Mon premier chapitre",
        "type": "GTA",
        "standard_version": "1.3"
    });
    console.log("CHAPTER 1 : ", chapter);
    chapter.save()
        .then(() => { createTopic(chapter._id, {
            title: "Topic1",
            formSchema: {},
            model: {}
            });
        })
        .then(() => { chapter.title = "test 2"; return chapter.save(); })
        .then(() => { process.exit(); })
        .catch(() => { console.log(err); process.exit(); })
});*/

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