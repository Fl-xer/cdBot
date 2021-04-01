const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  userID: String,
  name: String,
  level: Number,
  xp: Number,
  lb: String,
});

module.exports = mongoose.model("xp", dataSchema);
