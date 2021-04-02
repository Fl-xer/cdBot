const client = require("../../src/index");
const prefix = process.env.prefix;
const { Collection } = require("discord.js");
const Timeout = new Collection();
const ms = require("ms");
const SystemXp = require("../models/levels.js");
const ServerMod = require("../models/settings.js");
const wordsFilter = require("../wordFilter.json");

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (
    message.mentions.has(client.user) &&
    message.content.split(" ").length === 1 &&
    message.content != "@everyone" &&
    message.content != "@here"
  )
    return message.reply(
      "HEY, \nMy prefix is `" +
        prefix +
        "`\nIf you want help use `" +
        prefix +
        "help`"
    );

  //? Level System
  let data = await SystemXp.findOne({
    serverID: message.member.guild.id,
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
  } else {
    const index = data.members.findIndex((x) => x.id === message.author.id);
    if (index === -1) {
      data.members.unshift({
        id: message.author.id,
        name: message.author.username,
        xp: 0,
        level: 1,
        invites: 0,
      });
      data.save().catch((err) => console.log(err));
    } else {
      const newXP =
        data.members[index].xp + (Math.floor(Math.random() * 10) + 1);
      const id = message.author.id;

      await SystemXp.updateOne(
        { "members.id": id },
        {
          $set: {
            "members.$.xp": newXP,
          },
        }
      );

      if (data.members[index].level * 100 <= data.members[index].xp) {
        const newLEVEL = data.members[index].level + 1;

        await SystemXp.updateOne(
          { "members.id": id },
          {
            $set: {
              "members.$.xp": 0,
              "members.$.level": newLEVEL,
            },
          }
        );

        message.reply(`Congrats for the level ${newLEVEL}`);
      }
    }
  }

  //? Setup a mod config
  data = await ServerMod.findOne({
    serverID: message.member.guild.id,
  });

  if (!data) {
    const newConfig = new ServerMod({
      serverID: message.member.guild.id,
      welcomeSys: false,
      welcomeMsg: "",
      welcomeChannel: "",
      goodbyeSys: false,
      goodbyeMsg: "",
      goodbyeChannel: "",
      profanityFilter: false,
      linkFilter: false,
      autoModLogSys: false,
      autoModLogChannel: "",
    });
    newConfig.save().catch((err) => console.log(err));
  }

  if (data.profanityFilter) {
    for (i = 0; i < wordsFilter.words.length; i++) {
      if (~message.content.indexOf(wordsFilter.words[i])) {
         message.reply("Language!");
         return message.delete();
      }
    }
  }

  if (!message.content.startsWith(prefix)) return;
  if (!message.guild) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) {
    if (command.cooldown) {
      if (Timeout.has(`${command.name}${message.author.id}`))
        return message.channel.send(
          `You are on a \`${ms(
            Timeout.get(`${command.name}${message.author.id}`) - Date.now(),
            { long: true }
          )}\` cooldown.`
        );
      command.run(client, message, args);
      Timeout.set(
        `${command.name}${message.author.id}`,
        Date.now() + command.cooldown
      );
      setTimeout(() => {
        Timeout.delete(`${command.name}${message.author.id}`);
      }, command.cooldown);
    } else command.run(client, message, args);
  }
});
