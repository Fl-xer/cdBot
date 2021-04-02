const { Client, Message, MessageEmbed } = require('discord.js');
const giveawayClient = require('../../client');


module.exports = {
    name: 'gwin',
    category: "Giveaway",
    description: "End a giveaway, which lets you choose custom winner.",
    cooldown: 0,
    /** 
    * @param {Client} client 
    * @param {Message} message 
    * @param {String[]} args 
    */
    run: async(client, message, args) => {
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply("You don't have perms");

        if(!args[0]) return message.reply("Please provide the message id from the giveaway");

        const member = message.mentions.members.last();

        if(!member) return message.reply("Please mention a member");

        giveawayClient.end(args[0], true);
    }
}