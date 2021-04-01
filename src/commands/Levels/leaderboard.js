const { Client, Message, MessageEmbed } = require("discord.js");
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
    SystemXp.find({
      lb: "all",
    })
      .sort([["level", "descending"]]).sort([["xp", "descending"]])
      .exec((err, res) => {
        if (err) console.log(err);


        for (i = 0; i < res.length; i++) {}

        var page = Math.ceil(res.length / 10);

        let embed = new MessageEmbed();
        embed.setTitle("LEADERBOARD");
        //name
        let pg = parseInt(args[0]);
        if (pg != Math.floor(pg)) pg = 1;
        if (!pg) pg = 1;
        let end = pg * 10;
        let start = pg * 10 - 10;

        if (res.length === 0) {
          embed.addField("Error", "No pages found!");
        } else if (res.length <= start) {
          embed.addField("Error", "Page not found!");
        } else if (res.length <= end) {
          embed.setFooter(`page ${pg} of ${page}`);

          for (i = start; i < res.length; i++) {
            embed.addField(
              `${i + 1}. ${
                !client.users.cache.get(res[i].id)
                  ? res[i].name
                  : client.users.cache.get(res[i].id).username
              }`,
              `Level: ${res[i].level} Xp: ${res[i].xp}`
            );
          }
        } else {
          embed.setFooter(`page ${pg} of ${page}`);
          for (i = start; i < end; i++) {
            embed.addField(
              `${i + 1}. ${
                !client.users.cache.get(res[i].id)
                  ? res[i].name
                  : client.users.cache.get(res[i].id).username
              }`,
              `Level: ${res[i].level} Xp: ${res[i].xp}`
            );
          }
        }
        embed.setColor(colors.green)
        embed.setThumbnail("https://cdn.discordapp.com/attachments/823230928113238049/827297127909949440/unnamed.gif");
        message.channel.send(embed);
      });
  },
};
