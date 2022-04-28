// Importing express router and our topicsController
const router = require("express").Router(),
topicController = require("../controllers/topicController");
// Routing the URL
router.get("/newtopics", topicController.newtopicView);
router.get("/newjournal", topicController.getAllTopics, topicController.journalEntry);
router.post("/savejournalentry", topicController.savejournalEntry, topicController.redirectView);
router.get("/topics", topicController.getAllTopics, topicController.topics);
router.post("/savingTopics", topicController.saveTopic, topicController.redirectView);
router.get("/topics/:id", topicController.getAllEntries, topicController.show, topicController.showView)
router.get("/topics/:id/:ID", topicController.getAllTopics, topicController.editEntry);
router.put("/topics/:id/:ID/update", topicController.updateEntry, topicController.redirectView);
router.delete("/topics/:id/:ID/delete", topicController.deleteEntry, topicController.redirectView);
// Exporting the module
module.exports = router;