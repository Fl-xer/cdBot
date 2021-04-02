const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
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
      var member = message.member;
    } else {
      var member =
        message.mentions.members.first() || client.members.cache.get(args[0]);
    }
    if (member.user.bot) return message.reply("That is a bot! :/");
    let data = await SystemXp.findOne({
      serverID: member.guild.id,
    });
    if (!data) {
      const newData = new SystemXp({
        serverID: message.member.guild.id,
        members: [],
      });
      newData.members.unshift({
        id: message.author.id,
        name: message.author.username,
        xp: 0,
        level: 1,
        invites: 0,
      });
      newData.save().catch((err) => console.log(err));
    }
    data = await SystemXp.findOne({
      serverID: member.guild.id,
    });
    const index = data.members.findIndex((x) => x.id === member.id);
    const rank = new canvacord.Rank()
      .setAvatar(member.user.displayAvatarURL({ format: "jpg" }))
      .setCurrentXP(data.members[index].xp)
      .setRequiredXP(data.members[index].level * 100)
      .setStatus(member.user.presence.status)
      .setProgressBar("#FFFFFF", "COLOR")
      .setUsername(member.user.username)
      .setDiscriminator(member.user.discriminator);

    rank.build().then((data) => {
      const attachment = new MessageAttachment(data, "RankCard.png");
      message.channel.send(attachment);
    });
  },
};
