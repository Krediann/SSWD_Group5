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
        }
    });

// Exporting the model
module.exports = mongoose.model("journalEntry", journalEntrySchema);