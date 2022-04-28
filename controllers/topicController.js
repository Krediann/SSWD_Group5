const Topic = require("../models/newtopics");
const JournalEntry = require("../models/journalEntry");
const getEntryParameters = body => {
    return {
        heading: body.heading,
        content: body.content,
        topic: body.topic
    };
};

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
        let newJournalEntry = new JournalEntry(getEntryParameters(req.body));
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

        editEntry: (req, res, next) => {
            let entryId = req.params.ID;
            let topicId = req.params.id;
            Topic.findById(topicId)
            .then(topic => {
                res.locals.topic = topic;
                next();
            })
            .catch (error => {
                console.log(error.message + "LOL");
                next(error);
            })
            JournalEntry.findById(entryId)
              .then(entry => {
                res.render("topics/editentry", {
                    entry: entry
                });
              })
              .catch(error => {
                console.log(`Error fetching journal entry by ID: ${error.message}`);
                next(error);
              });
          },
        
        updateEntry: (req, res, next) => {
            let entryId = req.params.ID;
            entryParameters = getEntryParameters(req.body);
            JournalEntry.findByIdAndUpdate(entryId, {
                $set: entryParameters
            })
            .then(entry => {
                res.locals.entry = entry;
                res.locals.redirect = "/topics";
                next();
            })
            .catch(error => {
                console.log("There was an error updating journal entry" + error.message);
                next(error);
            });
        },

        deleteEntry: (req, res, next) => {
            let entryId = req.params.ID;
            JournalEntry.findByIdAndRemove(entryId)
            .then(() => {
                res.locals.redirect = "/topics";
                next();
            })
            .catch (error => {
                console.log("Error deleting entry" + error.message);
                next();
            })
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