const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
     title: {
        type: String,
        required: true,
     },
     body: {
        type: String,
        required: true,
     },
     date: {
        type: Date,
        default: Date.now, 
        required: true,
     },
});

module.exports = mongoose.model("Articles",articleSchema);
