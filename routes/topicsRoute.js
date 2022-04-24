// Importing express router and our topicsController
const router = require("express").Router(),
topicController = require("../controllers/topicController");
// Routing the URL
router.get("/newtopics", topicController.newtopicView);
router.get("/topics", topicController.getAllTopics);
router.get("savingTopics", topicController.saveTopic);
// Exporting the module
module.exports = router;