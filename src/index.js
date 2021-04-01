const { Collection, Client, Discord } = require("discord.js");
const client = new Client({
  disableMention: "everyone",
});
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const config = require("./config.json");
const mongoose = require("mongoose");
module.exports = client;
client.commands = new Collection();
client.prefix = config.prefix;
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve("src/commands"));
["command"].forEach((handler) => {
  require(path.resolve(`src/handlers/${handler}`))(client);
});

client.login(process.env.token);

//? Connect to MongoDb
mongoose.connect(process.env.mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
