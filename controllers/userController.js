// Import user mode
const User = require("../models/user");
// export modules
module.exports = {
    // Getting the users using find()
    getAllUsers: (req, res, next) => {
    User.find({})
        .then(users => {
            res.locals.users = users; 
            next();
        })
        .catch((error) => {
            console.log(error.message);
            next(error);
        })
    },
    // Displaying the users
    usersView: (req, res) => {
        res.render("users/users");
    },
    // Displaying the registering page
    getSignInPage: (req, res) => {
        res.render("users/register");
    },
    // Taking the answers from form and assigning them to a variable
    saveUser: (req, res, next) => {
    let newUser = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    };
    // Actually creating the new user
    User.create(newUser)
        // Redirecting after user creation to thanking of registering
        .then(user => {
            res.locals.redirect = "/thanks";
            res.locals.user = user;
            next();
        })
        // Error catcher
        .catch(error => {
            console.log(`Error saving user: ${error.message}`);
            next(error);
        });
    },
    // Redirecting the view after posting the user data
    redirectView:(req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath){res.redirect(redirectPath);}
    else next();
    },
    // Rendering the page after registering
    thanks: (req, res) => {
        res.render("thanks");
    }
};