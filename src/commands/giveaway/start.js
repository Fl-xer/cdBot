const { Client, Message, MessageEmbed } = require('discord.js');
const giveawayClient = require('../../client');
const ms = require("ms");

module.exports = {
    name: 'gstart',
    category: "Giveaway",
    description: "Starts a new giveaway.",
    cooldown: 0,
    /** 
    * @param {Client} client 
    * @param {Message} message 
    * @param {String[]} args 
    */
    run: async(client, message, args) => {
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply("You don't have perms");

        const channel = message.mentions.channels.first()
        let time = args[1];
        if(isNaN(args[2])) return message.channel.send('Numbers for winners are only allowed');
        const winners = parseInt(args[2]);
        const prize = args.slice(3).join(" ");


        if(!channel) return message.reply("Please select a channel");
        if(!time) return message.reply("Please select a time");
        if(!winners) return message.reply("Please select how many winners");
        if(!prize) return message.reply("Please type a prize");


        time = ms(time);

        giveawayClient.start({
            channel,
            time,
            hostedBy: message.author,
            description: "Click on 🥳 to join!",
            winners,
            prize,
        })
    }
}