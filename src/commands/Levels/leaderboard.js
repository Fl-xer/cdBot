const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const SystemXp = require("../../models/levels.js");
const colors = require("../../colors.json");

module.exports = {
  name: "leaderboard",
  category: "Levels",
  description: "Displays the leaderboard for the xp system",
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    var array = await SystemXp.findOne({
      serverID: message.member.guild.id,
    });
    array = array.members;

    array.sort(function (a, b) {
      return a["level"] - b["level"] || a["xp"] - b["xp"];
    });

    array.reverse();

    var page = Math.ceil(array.length / 10);

    let embed = new MessageEmbed();
    embed.setTitle("LEADERBOARD");
    //name
    let pg = parseInt(args[0]);
    if (pg != Math.floor(pg)) pg = 1;
    if (!pg) pg = 1;
    let end = pg * 10;
    let start = pg * 10 - 10;

    if (array.length === 0) {
      embed.addField("Error", "No pages found!");
    } else if (array.length <= start) {
      embed.addField("Error", "Page not found!");
    } else if (array.length <= end) {
      embed.setFooter(`page ${pg} of ${page}`);

      for (i = start; i < array.length; i++) {
        embed.addField(
          `${i + 1}. ${
            !client.users.cache.get(array[i].id)
              ? array[i].name
              : client.users.cache.get(array[i].id).username
          }`,
          `Level: ${array[i].level} Xp: ${array[i].xp}`
        );
      }
    } else {
      embed.setFooter(`page ${pg} of ${page}`);
      for (i = start; i < end; i++) {
        embed.addField(
          `${i + 1}. ${
            !client.users.cache.get(array[i].id)
              ? array[i].name
              : client.users.cache.get(array[i].id).username
          }`,
          `Level: ${array[i].level} Xp: ${array[i].xp}`
        );
      }
    }
    embed.setColor(colors.green);
    embed.setThumbnail(
      "https://cdn.discordapp.com/attachments/823230928113238049/827367935873515550/tenor.gif"
    );
    message.channel.send(embed);
  },
};
