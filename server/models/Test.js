const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Test", testSchema);
