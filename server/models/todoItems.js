//import mongoose to import new schema
const mongoose = require("mongoose");

//create schema
const todoItemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
});

//export this schema
module.exports = mongoose.model("todo", todoItemSchema);
