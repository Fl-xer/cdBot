const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  serverID: String,
  welcomeSys: Boolean,
  welcomeMsg: String,
  welcomeChannel: String,
  goodbyeSys: Boolean,
  goodbyeMsg: String,
  goodbyeChannel: String,
  profanityFilter: Boolean,
  autoModLogSys: Boolean,
  autoModLogChannel: String,
});

module.exports = mongoose.model("setting", dataSchema);
