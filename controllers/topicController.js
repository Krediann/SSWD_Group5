const Topic = require("../models/newtopics");
const JournalEntry = require("../models/journalEntry");
module.exports = {
    // Getting the topics using find()
    getAllTopics: (req, res, next) => {
        Topic.find({})
        .then(topics => {
            res.locals.topics =  topics; 
            next();
        })
        .catch((error) => {
            console.log(error.message);
            next(error);
        })
    },
    getAllEntries: (req, res, next) => {
        JournalEntry.find({})
            .then(entry => {
                res.locals.entry = entry;
                next();

            })
            .catch(error => {
                console.log(error.message);
                next(error);
            });
    },
    // Displaying the new topic page
    newtopicView: (req, res) => {
        res.render("topics/newtopics");
    },

    // Taking the answers from form and assigning them to a variable
    saveTopic: (req, res, next) => {
    let newTopic = {
        topicName: req.body.topicName
    };
    // Actually creating the new topic
    Topic.create(newTopic)
        // Redirecting after topic creation to thanking of registering
        .then(topic => {
            res.locals.redirect = "/newtopics";
            res.locals.topic = topic;
            next();
        })
        // Error catcher
        .catch(error => {
            console.log(`Error saving topic: ${error.message}`);
            next(error);
        });
    },

    journalEntry: (req, res) => {
        res.render("topics/newjournal");
    },

    savejournalEntry: (req, res, next) => {
        let newJournalEntry = {
            heading: req.body.heading,
            content: req.body.content,
            topic: req.body.topic
        };
        // Actually creating the new topic
        JournalEntry.create(newJournalEntry)
            // Redirecting after topic creation to thanking of registering
            .then(journalEntry => {
                res.locals.redirect = "/newjournal";
                res.locals.journalEntry = journalEntry;
                next();
            })
            // Error catcher
            .catch(error => {
                console.log(`Error saving journal entry: ${error.message}`);
                next(error);
            });
        },

    // Redirecting the view after posting the topic data
    redirectView:(req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath){res.redirect(redirectPath);}
        else next();
    },

    topics: (req, res) => {
        res.render("topics/topics");
    },
    show: (req, res, next) => {
        let topicId = req.params.id;
        Topic.findById(topicId)
            .then(topic => {
                res.locals.topic = topic;
                next();
            })
            .catch(error => {
                console.log(`There was an error fetching the topic ID: ${error.message}`);
                next(error);
            })
        },
    showView: (req, res) => {
        res.render("topics/show");
    }
};