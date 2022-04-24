const User = require("../models/user");

exports.getAllUsers = (req, res) => {
    User.find({})
        .exec()
        .then((users) => {
            res.render("users/users", {
                users: users
            });
        })
        .catch((error) => {
            console.log(error.message);
            return[];
        })
        .then(() => {
            console.log("promise complete");
        });
};

exports.getSignInPage = (req, res) => {
    res.render("users/register");
};

exports.saveUser = (req, res) => {
    let newUser = new User( {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save()
        .then( () => {
            res.render("thanks");
        })
        .catch(error => {
            res.send(error);
        });
};