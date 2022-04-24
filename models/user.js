// Importing mongoose
const mongoose = require("mongoose");
//  Creating the schema for user
const userSchema= new mongoose.Schema({
    // Adding datatypes for username, email and password
    // All are required
    // Username and email need to be unique too
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
// Making a function to return users information
userSchema.methods.getInfo = function () {
    return `Username: ${this.userName} Email: ${this.email}`;
}
// Exporting the model
module.exports = mongoose.model("User", userSchema);