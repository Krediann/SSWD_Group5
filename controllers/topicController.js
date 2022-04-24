const Topic = require("../models/newtopics");

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
    // Displaying the new topic page
    newtopicView: (req, res) => {
        res.render("topics/newtopics");
    },

    // Taking the answers from form and assigning them to a variable
    saveTopic: (req, res, next) => {
    let newTopic = {
        topicName: req.body.topicName
    };
    // Actually creating the new user
    Topic.create(newTopic)
        // Redirecting after user creation to thanking of registering
        .then(topic => {
            console.log(newTopic);
            res.locals.redirect = "/topics";
            res.locals.topic = topic;
            next();
        })
        // Error catcher
        .catch(error => {
            console.log(`Error saving user: ${error.message}`);
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
    }
};