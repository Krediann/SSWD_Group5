// Importing express router and our topicsController
const router = require("express").Router(),
topicController = require("../controllers/topicController");
// Routing the URL
router.get("/newtopics", topicController.newtopicView);
router.get("/topics", topicController.getAllTopics, topicController.topics);
router.post("/savingTopics", topicController.saveTopic, topicController.redirectView);
router.get("/topics/:id", topicController.show, topicController.showView);
// Exporting the module
module.exports = router;