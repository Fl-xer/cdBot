const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "say",
  category: "Miscellaneous",
  description:
    "Bot will reply with an embed containing all text input after the say command",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const text = args.join(" ");
    const user = message.author;
    const embed = new MessageEmbed()
      .setDescription(text)
      .setColor("2F3136")
      .setFooter(
        `• Send by: ${user.tag}`,
        user.displayAvatarURL({ format: "png" })
      );
    message.channel.send(embed);
  },
};
