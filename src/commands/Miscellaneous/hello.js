const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'hello',
    category: "Miscellaneous",
    description: "The bot says hello",
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.reply("Hello there!");
    }
}