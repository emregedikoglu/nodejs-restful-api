const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create a schema
let exampleSchema = new Schema({
  key: {
    type: String
  },
  createdAt: {
    type: Date
  },
  totalCount: {
    type: Number
  }
});

module.exports = mongoose.model("example", exampleSchema);