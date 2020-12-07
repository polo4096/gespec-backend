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
const VersionnedChapter = require("./app/models/VersionnedChapter.model");

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
        const chapter_prime = await createChapter({
            "title": "Primes",
            "type": "PAIE",
            "tag": "prime",
            "_version": 1,
            "standard_version": "1.3"
        });
        const chapter_prime_excep = await createChapter({
          "title": "Prime exceptionnelle",
          "type": "PAIE",
          "tag": "prime",
          "_version": 1,
          "standard_version": "1.3"
        });
        const chapter_prime_obj = await createChapter({
            "title": "Prime d'objectif",
            "type": "PAIE",
            "tag": "prime",
            "_version": 1,
            "standard_version": "1.3"
        });
        const chapter_conge = await createChapter({
          "title": "Gestion des congés payés",
          "type": "PAIE",
          "tag": "congé",
          "_version": 1,
          "standard_version": "1.3"
      });
      const chapter_conge_acqui = await createChapter({
          "title": "Règles d'acquisition",
          "type": "PAIE",
          "tag": "congé",
          "_version": 1,
          "standard_version": "1.3"
      });
      const chapter_conge_prise = await createChapter({
          "title": "Règles de prise",
          "type": "PAIE",
          "tag": "congé",
          "_version": 1,
          "standard_version": "1.3"
      });
      const chapter_conge_valo = await createChapter({
        "title": "Valorisation en paie des prises",
        "type": "PAIE",
        "tag": "congé",
        "_version": 1,
        "standard_version": "1.3"
      });
      const chapter_abs = await createChapter({
        "title": "Demandes d'absences",
        "type": "SMART",
        "tag": "congé",
        "_version": 1,
        "standard_version": "1.3"
      });
      const chapter_abs_invent = await createChapter({
        "title": "Inventaire des congés",
        "type": "SMART",
        "tag": "congé",
        "_version": 1,
        "standard_version": "1.3"
      });
      const chapter_abs_calc = await createChapter({
        "title": "Principe de calcul du solde dans le portail",
        "type": "SMART",
        "tag": "congé",
        "_version": 1,
        "standard_version": "1.3"
      });
      const chapter_abs_sold = await createChapter({
        "title": "Affichage des soldes",
        "type": "SMART",
        "tag": "congé",
        "_version": 1,
        "standard_version": "1.3"
      });
      const chapter_abs_val = await createChapter({
        "title": "Workflow de validation",
        "type": "SMART",
        "tag": "congé",
        "_version": 1,
        "standard_version": "1.3"
      });


      chapter_prime_excep.topics.push({
        schema: {
            fields : [
                {
                type : "checkbox",
                label: "Client concerné ?",
                model: "Client concerné ?",
                default: true
            }
          ]
        },
        model: {
          "Client concerné ?" : true
        }
        })
      
      chapter_prime_excep.topics.push({
        schema: {
            fields : [
                {
                type : "textArea",
                label: "Type de déclenchement",
                model: "Type de déclenchement",
                default: true
            }
          ]
        },
        model: {
          "Type de déclenchement" : "Tous les mois"
        }
        })
      
      chapter_prime_excep.topics.push({
        schema: {
            fields : [
                {
                type : "radios",
                label: "type de saisie",
                model: "type de saisie",
                default: true,
                values: [
                  "Nombre",
                  "Taux",
                  "Montant",
                ]
            }
          ]
        },
        model: {
          "type de saisie" : "Montant"
        }
        })

      chapter_prime_excep.topics.push({
        schema: {
            fields : [
                {
                type : "textArea",
                label: "Population concernée",
                model: "Population concernée",
                default: true
            }
          ]
        },
        model: {
          "Population concernée" : "Tous les hommes unijambistes"
        }
        })

      chapter_prime_excep.topics.push({
        schema: {
            fields : [
                {
                type : "radios",
                label: "Inclus dans la (les) base(s)",
                model: "Inclus dans la (les) base(s)",
                default: true,
                values: [
                  "Taux horaire",
                  "Prime ancienneté",
                  "1/10ème CP",
                  "Prime 13ème mois",
                  "Prime de Vacances",
                ]
            }
          ]
        },
        model: {
          "Inclus dans la (les) base(s)" : "1/10ème CP"
        }
        })  

      chapter_prime_excep.topics.push({
        schema: {
            fields : [
                {
                type : "radios",
                label: "Edition sur le bulletin",
                model: "Edition sur le bulletin",
                default: true,
                values: [
                  "Base",
                  "Taux",
                  "Montant",
                  
                ]
            }
          ]
        },
        model: {
          "Edition sur le bulletin" : "Montant"
        }
        }) 
        
      chapter_prime_excep.topics.push({
        schema: {
            fields : [
                {
                type : "textArea",
                label: "Commentaires",
                model: "Commentaires",
                default: true
            }
          ]
        },
        model: {
          "Commentaires" : "C'était une très bonne expérience... I guess.."
        }
        })


        await chapter_prime.save();
        await chapter_conge.save();
        await chapter_abs.save();
        await addParentToChapter(chapter_prime_excep,chapter_prime);
        await chapter_prime_excep.save();
        await addParentToChapter(chapter_prime_obj,chapter_prime);
        await chapter_prime_obj.save();
        await addParentToChapter(chapter_conge_acqui,chapter_conge);
        await chapter_conge_acqui.save();
        await addParentToChapter(chapter_conge_prise,chapter_conge);
        await chapter_conge_prise.save();
        await addParentToChapter(chapter_conge_valo,chapter_conge);
        await chapter_conge_valo.save();
        await addParentToChapter(chapter_abs_calc,chapter_abs);
        await chapter_abs_calc.save();
        await addParentToChapter(chapter_abs_invent,chapter_abs);
        await chapter_abs_invent.save();
        await addParentToChapter(chapter_abs_sold,chapter_abs);
        await chapter_abs_sold.save();
        await addParentToChapter(chapter_abs_val,chapter_abs);
        await chapter_abs_val.save();

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

app.get('/reset', (req, res) => {
    Chapter.remove({}, function(err) {
        console.log('Chapter collection removed')
    });
    VersionnedChapter.remove({}, function(err) {
        console.log('Versionned chapter collection removed')
    });
    run();
    res.json({"message": "Database reset"});
});
