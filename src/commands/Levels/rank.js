const { Client, Message, MessageEmbed, MessageAttachment } = require("discord.js");
const SystemXp = require("../../models/levels.js");
const canvacord = require("canvacord");

module.exports = {
  name: "rank",
  category: "Levels",
  description: "User xp rank",
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0]) {
      var user = message.author;
    } else {
      var user = message.mentions.users.first() || bot.users.cache.get(args[0]);
    }

    SystemXp.findOne(
      {
        userID: user.id,
      },
      async (err, data) => {
        if (err) console.log(err);
        if (!data) {
          const newData = new SystemXp({
            userID: message.author.id,
            name: message.author.username,
            level: 1,
            xp: 0,
            lb: "all",
          });
          newData.save().catch((err) => console.log(err));

          const rank = new canvacord.Rank()
            .setAvatar(user.displayAvatarURL({ format: "jpg" }))
            .setCurrentXP(data.xp)
            .setRequiredXP(data.level * 100 - data.xp)
            .setStatus(user.presence.status)
            .setProgressBar("#FFFFFF", "COLOR")
            .setUsername(user.username)
            .setDiscriminator(user.discriminator);

          rank.build().then((data) => {
            const attachment = new MessageAttachment(
              data,
              "RankCard.png"
            );
            message.channel.send(attachment);
          });
        } else {
          const rank = new canvacord.Rank()
            .setAvatar(user.displayAvatarURL({ format: "jpg" }))
            .setLevel(data.level)
            .setCurrentXP(data.xp)
            .setRequiredXP(data.level * 100)
            .setStatus(user.presence.status)
            .setProgressBar("#FFFFFF", "COLOR")
            .setUsername(user.username)
            .setDiscriminator(user.discriminator);

          rank.build().then((data) => {
            const attachment = new MessageAttachment(
              data,
              "RankCard.png"
            );
            message.channel.send(attachment);
          });
        }
      }
    );
  },
};
