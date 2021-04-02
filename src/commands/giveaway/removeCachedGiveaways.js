const { Client, Message, MessageEmbed } = require('discord.js');
const giveawayClient = require('../../client');

module.exports = {
    name: 'rmv-cache',
    category: "Giveaway",
    description: "Deleted cached giveaways.",
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply("You don't have perms");

        giveawayClient.removeCachedGiveaways(true);
    }
}