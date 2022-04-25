// Importing express router and our userController
const router = require("express").Router(),
userController = require("../controllers/userController");
// Routing the different URLs

// Routes for seeing all users, register page and the post for actually registering
router.get("/users", userController.getAllUsers, userController.usersView);
router.get("/register", userController.getSignInPage);
router.get("/thanks", userController.thanks)
router.post("/registering", userController.saveUser, userController.redirectView);
// Exporting the module
module.exports = router;