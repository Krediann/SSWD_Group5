// Importing express router and our userController
const router = require("express").Router(),
userController = require("../controllers/userController");
// Routing the different URLs
router.get("/register", userController.getSignInPage);
router.get("/users", userController.getAllUsers);
router.get("/thanks", userController.saveUser);
// Exporting the module
module.exports = router;