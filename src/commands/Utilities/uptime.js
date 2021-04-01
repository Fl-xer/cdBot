const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'uptime',
    category: "Utilities",
    description: "Displays server uptime message",
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let totalSeconds = client.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

    
        let uptime = `\n> 📅 ${days} Days \n> ⌚ ${hours} Hours \n> 🕐 ${minutes} Minutes \n> ⏳ ${seconds} Seconds`;
    
        const embed = new MessageEmbed()
          .setTitle("Bot Uptime")
          .setColor("#00c26f")
          .setDescription(`${uptime}`)
          .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          );
        message.delete().catch((O_o) => {});
        message.channel.send(embed);
    }
}