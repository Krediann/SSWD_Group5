// Import user mode
const passport = require("passport");
const User = require("../models/user");
const getUserParameters = body => {
    return {
        userName: body.userName,
        email: body.email,
        password: body.password
    };
};
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
        if(req.skip) return next();

        let newUser = new User(getUserParameters(req.body));

        User.register(newUser, req.body.password, (error, user) => {
            if (user) {
                req.flash("success", `Account named: ${user.userName} was created`);
                res.locals.redirect = "/";
                next();
            }
            else {
                req.flash("error", `Failed to create account due to: ${error.message}`);
                res.locals.redirect = "/register";
                next();
            }
        });
    },

    thanks: (req, res) => {
        res.render("thanks");
    },
    login: (req, res) => {
        res.render("users/login");
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "/login",
        failutreFlash: "Failed to login",
        successRedirect: "/",
        successFlash: "Logged in!"
    }),

    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have logged out");
        res.locals.redirect = "/";
        next();
    },
    redirectView:(req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath){res.redirect(redirectPath);}
        else next();
        }
};