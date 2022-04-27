// Importing mongoose
const mongoose = require("mongoose"),
//  Creating the schema for journal entries
{ Schema } = mongoose,
    Topic = require("./newtopics"),
    journalEntrySchema= new mongoose.Schema({
        // Adding datatypes
        heading: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true
        },
        topic: {
            type: String,
            required: true
        },
        topicname: {
            type: String,
            ref: "topic"
        }
    });

// Making a function to return topics information
journalEntrySchema.methods.getInfo = function () {
    return `Entry's heading: ${this.heading}`;
};

journalEntrySchema.methods.getInfo = function () {
    return `Journal entry's heading:': ${this.heading} content: ${this.content}`;
};

// Exporting the model
module.exports = mongoose.model("journalEntry", journalEntrySchema);