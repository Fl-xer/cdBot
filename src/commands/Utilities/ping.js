const { MessageEmbed } = require("discord.js");
const colors = require("../../colors.json");

module.exports = {
  name: "ping",
  category: "Utilities",
  description: "Returns latency and API ping",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const user = message.author;
    const msg = await message.channel.send(`🏓 Pinging...`);
    const embed = new MessageEmbed()
      .setTitle("Pong! 🏓")
      .setColor(colors.red)
      .setDescription(
        `WebSocket ping is ${
          client.ws.ping
        }MS\nMessage edit ping is ${Math.floor(
          msg.createdAt - message.createdAt
        )}MS!`
      )
      .setFooter(
        `• Requested by: ${user.tag}`,
         user.displayAvatarURL({ format: "png" })
      );
    await message.channel.send(embed);
    msg.delete();
  },
};
