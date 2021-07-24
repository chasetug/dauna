const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'guildMemberAdd',
	execute(member, client) {
		const welcomeChannel = client.channels.cache.get('782470041382944818');
		welcomeChannel.send(`<:hmmNice:852393444839522325> **${member.user.username}** has joined the server!`);

		member.user.send('Welcome to **Unofficial GTFO Modding**! \n\nPlease make sure to accept our rules to gain access to the server. \n*Cheating in public matches will get you removed from this server permanently!*')
			.catch(e => {
				console.error(e);
			});

		const embed = new MessageEmbed()
			.setColor('#32CD32')
			.setAuthor(`${member.user.username} (${member.id})`, member.user.avatarURL() == null ? 'https://images-ext-2.discordapp.net/external/6tVaUxectogf8lZc5X8fWTGd2tbzlG6I5AtVbWYYLNI/https/cdn.discordapp.com/embed/avatars/4.png' : member.user.avatarURL())
			.setThumbnail(member.user.avatarURL() == null ? 'https://images-ext-2.discordapp.net/external/6tVaUxectogf8lZc5X8fWTGd2tbzlG6I5AtVbWYYLNI/https/cdn.discordapp.com/embed/avatars/4.png' : member.user.avatarURL())
			.addFields(
				{ name: 'Joined Guild', value: member.joinedAt, inline: true },
				{ name: 'Joined Discord', value: member.user.createdAt, inline: true },
			)
			.setTimestamp()
			.setFooter('Member joined');

		const memberLogs = client.channels.cache.get('782753763441770586');
		memberLogs.send(embed);
	},
};