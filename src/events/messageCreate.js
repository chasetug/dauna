const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'messageCreate',
	async execute(message, client) {
		if(message.author.bot) return;
		if(message.content.includes('discord.com/channels/')) {
			const snowflakes = message.content.match(/([0-9]+){3}/ig);
			let targetMessage;
			client.guilds.fetch(snowflakes[0])
				.then(guild => guild.channels.fetch(snowflakes[1]))
				.then(channel => channel.messages.fetch(snowflakes[2]))
				.then(m => {
					targetMessage = m;
					const embed = new MessageEmbed()
						.setColor('#0099ff')
						.setTitle(`#${targetMessage.channel.name}`)
						.setURL(`https://discord.com/channels/${snowflakes[0]}/${snowflakes[1]}/${snowflakes[2]}`)
						.setAuthor(targetMessage.author.username, targetMessage.author.avatarURL() ?? targetMessage.author.defaultAvatarURL)
						.setDescription(targetMessage.content)
						.setFooter(targetMessage.createdAt.toString());
					message.reply({ embeds: [embed] });
				})
				.catch(console.error);
		}
		else if(message.mentions.has(client.user.id)) {
			message.channel.send('Ping chilling');
		}
	},
};