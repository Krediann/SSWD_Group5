// Importing mongoose
const mongoose = require("mongoose");
//  Creating the schema for topics
const topicSchema= new mongoose.Schema({
    // Adding datatypes
    topicName: {
        type: String,
        required: true,
        unique: true
    }
});
// Making a function to return topics information
topicSchema.methods.getInfo = function () {
    return `Topic's name: ${this.topicName}`;
}
// Exporting the model
module.exports = mongoose.model("topic", topicSchema);