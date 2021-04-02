const { Client, Message, MessageEmbed } = require("discord.js");
const ServerMod = require("../../models/settings.js");

module.exports = {
  name: "profanity",
  category: "Moderation",
  description: "You turn on/off the profanity filter for this server!",
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let data = await ServerMod.findOne({
      serverID: message.member.guild.id,
    });
    if (data.profanityFilter) {
        data.profanityFilter = false;
        data.save();
        return message.reply("Profanity filter turned off!");
    } else {
        data.profanityFilter = true;
        data.save();
        return message.reply("Profanity filter turned on!");
    }
  },
};
