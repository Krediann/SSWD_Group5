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
    },
    login: (req, res) => {
        res.render("users/login");
    },
    authenticate: (req, res, next) => {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    user.passwordComparison(req.body.password).then(passwordsMatch => {
                        if (passwordsMatch) {
                            res.locals.redirect ="/topics/topics";
                            req.flash("success", `${user.userName} logged in succesfully`);
                            res.locals.user = user;
                        } else {
                            req.flash("error", "Failed to log in due to wrong password");
                            res.locals.redirect = "/users/login";
                        }
                        next();
                    });
                } else {
                    req.flash("error", "No account found");
                    res.locals.redirect = "/users/login";
                    next();
                }
            })
        .catch(error => {
            console.log(`Error logging in: ${error.message}`);
        });
    }
};