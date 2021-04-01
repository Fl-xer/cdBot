const client = require("../../src/index");
const prefix = process.env.prefix;
const { Collection } = require("discord.js");
const Timeout = new Collection();
const ms = require("ms");
const SystemXp = require("../models/levels.js");

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
  SystemXp.findOne(
    {
      userID: message.author.id,
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
      } else {
        const newXP = Math.floor(Math.random() * 10) + 1;

        if (data.level * 100 <= data.xp) {
          data.level += 1;
          data.xp = 0;
          data.save().catch((err) => console.log(err));
          message.reply(`Congrats for the level ${data.level}`);
        } else {
          data.xp += newXP;
          data.save().catch((err) => console.log(err));
        }
      }
    }
  );
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
