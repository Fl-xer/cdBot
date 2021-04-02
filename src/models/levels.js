const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  serverID: String,
  members: Array,
});

module.exports = mongoose.model("xp", dataSchema);
