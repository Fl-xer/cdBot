const { Client, Message, MessageEmbed } = require('discord.js');
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');
const versions = require('../../../package.json');

module.exports = {
    name: 'botinfo',
    category: "Utilities",
    description: "Displays information about the bot.",
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        function formatBytes(bytes) {
            if (bytes === 0) return '0 Bytes';
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            const i = Math.floor(Math.log(bytes) / Math.log(1024));
            return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
        }

        const user = message.author;
        const core = os.cpus()[0];
		const embed = new MessageEmbed()
			.setThumbnail(client.user.displayAvatarURL())
			.setColor(message.guild.me.displayHexColor || 'BLUE')
			.addField('General', [
				`**❯ Client:** ${client.user.tag} (${client.user.id})`,
				`**❯ Commands:** ${client.commands.size}`,
				`**❯ Servers:** ${client.guilds.cache.size.toLocaleString()} `,
				`**❯ Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
				`**❯ Channels:** ${client.channels.cache.size.toLocaleString()}`,
				`**❯ Creation Date:** ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
				`**❯ Node.js:** ${process.version}`,
				`**❯ Version:** v${versions.version}`,
				`**❯ Discord.js:** v${versions.dependencies['discord.js']}`,
				'\u200b'
			])
			.addField('System', [
				`**❯ Platform:** ${process.platform}`,
				`**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
				`**❯ CPU:**`,
				`> Cores: ${os.cpus().length}`,
				`> Model: ${core.model}`,
				`> Speed: ${core.speed}MHz`,
				`**❯ Memory:**`,
				`> Total: ${formatBytes(process.memoryUsage().heapTotal)}`,
				`> Used: ${formatBytes(process.memoryUsage().heapUsed)}`,
				'\u200b'
			])
			.addField('Support me 👇', [
				`<:discord:827328121837322260> [Join my server](${"https://discord.gg/AKDzZ8wrTP"})`,
				`💌 [Invite me to your server!](${"https://discord.com/api/oauth2/authorize?client_id=826966063849537567&permissions=8&scope=bot"})`,
			])

            .setFooter(
                `• Requested by: ${user.tag}`,
                user.displayAvatarURL({ format: "png" })
              )
			.setTimestamp();

		message.channel.send(embed);
    }
}