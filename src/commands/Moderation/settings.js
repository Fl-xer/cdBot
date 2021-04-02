const { Client, Message, MessageEmbed } = require("discord.js");
const ServerMod = require("../../models/settings.js");

module.exports = {
  name: "settings",
  category: "Moderation",
  description: "Show the server moderation settings",
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

    const embed = new MessageEmbed()
      .setTitle("Server Moderation Settings!")
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(`Profanity filter: ${data.profanityFilter ? "✅" : "❌"}\n`)
      .setFooter(
        `• Requested by: ${message.author.tag}`,
        message.author.displayAvatarURL({ format: "png" })
      )
      .setTimestamp();

    return message.channel.send(embed);
  },
};
