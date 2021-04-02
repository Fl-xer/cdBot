const client = require("../index");

const { GiveawayClient } = require("reconlx");
const colors = require("../colors.json");

const giveaway = new GiveawayClient(client, {
  mongoURI: process.env.mongo,
  emoji: "🥳",
  defaultColor: colors.blue,
});

module.exports = giveaway;
